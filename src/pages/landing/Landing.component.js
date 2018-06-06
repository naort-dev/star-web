import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Tabs from '../../components/Tabs';
import Loader from '../../components/Loader';
import FilterSection from '../../components/filterSection';
import LandingStyled from './styled';
import ScrollList from '../../components/ScrollList';

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
      tabsRef: undefined,
      tabsClientHeight: 0,
      filterSelected: false,
      subCategoryList: [],
    };
  }
  componentWillMount() {
    switch (this.props.filters.selectedTab) {
      case 'Stars':
        this.props.fetchCelebrityList(0, true);
        break;
      case 'Videos':
        this.props.fetchVideosList(0, true);
        break;
      default:
        this.props.fetchCelebrityList(0, true);
    }
    window.addEventListener('resize', this.setScrollHeight);
  }
  componentWillReceiveProps(nextProps) {
    const categoryChange = this.props.filters.category.label !== nextProps.filters.category.label;
    const searchParamChange = this.props.filters.searchParam !== nextProps.filters.searchParam;
    const lowPriceChange = this.props.filters.lowPrice !== nextProps.filters.lowPrice;
    const highPriceChange = this.props.filters.highPrice !== nextProps.filters.highPrice;
    const sortValueChange = this.props.filters.sortValue !== nextProps.filters.sortValue;
    const selectedVideoTypeChange = this.props.filters.selectedVideoType !== nextProps.filters.selectedVideoType;
    const tabChange = this.props.filters.selectedTab !== nextProps.filters.selectedTab;
    if (searchParamChange || lowPriceChange || highPriceChange || sortValueChange || selectedVideoTypeChange) {
      if (nextProps.filters.selectedTab === 'Videos') {
        this.props.fetchVideosList(0, true);
      } else {
        this.props.fetchCelebrityList(0, true);
      }
    }
    if (categoryChange && nextProps.filters.selectedTab === 'Stars') {
      this.findSubCategoryList(nextProps.filters.category.value);
    }
    if (nextProps.filters.category.label === 'featured' || nextProps.filters.selectedTab === 'Videos') {
      this.setState({ filterSelected: false }, () => {
        this.setScrollHeight();
      });
    }
    if (tabChange) {
      if (nextProps.filters.selectedTab === 'Videos') {
        this.props.fetchVideosList(0, true);
      } else {
        this.props.fetchCelebrityList(0, true);
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.setScrollHeight);
  }
  setScrollHeight = () => {
    this.setState({ tabsClientHeight: this.state.tabsRef.clientHeight });
  }
  findSubCategoryList = (selectedCategory) => {
    const { professions } = this.props.professionsList;
    let subCategoryList;
    professions.forEach((item) => {
      if (item.id === selectedCategory) {
        subCategoryList = item.child;
      }
    });
    this.setState({ subCategoryList });
  }
  updateCategory = (label, value) => {
    this.props.switchTab('Stars');
    this.props.updateCategory(label, value);
    this.props.fetchCelebrityList(0, true);
  }
  updateSubCategoryList = (selectedList) => {
    this.props.updateSelectedSubCategory(selectedList, this.props.filters.category.value);
    this.props.fetchCelebrityList(0, true);
  }
  activateMenu = () => {
    this.setState({ menuActive: !this.state.menuActive });
  }
  searchFilter = (searchText) => {
    this.props.updateSearchParam(searchText);
  }
  toggleFilterSection = () => {
    const filterState = this.state.filterSelected;
    this.setState({ filterSelected: !this.state.filterSelected }, () => {
      this.setScrollHeight();
    });
    if (!filterState && this.props.filters.selectedTab === "Stars") {
      this.findSubCategoryList(this.props.filters.category.value);
    }
  }
  renderScrollList() {
    if (this.props.filters.selectedTab === 'Stars') {
      return (
        <ScrollList
          dataList={this.props.celebList.data}
          totalCount={this.props.celebList.count}
          offset={this.props.celebList.offset}
          loading={this.props.celebList.loading}
          fetchData={(offset, refresh) => this.props.fetchCelebrityList(offset, refresh)}
        />
      );
    } else if (this.props.filters.selectedTab === 'Videos') {
      return (
        <ScrollList
          dataList={this.props.videosList.data}
          videos
          totalCount={this.props.videosList.count}
          offset={this.props.videosList.offset}
          loading={this.props.videosList.loading}
          fetchData={(offset, refresh) => this.props.fetchVideosList(offset, refresh)}
        />
      );
    }
    return null;
  }
  render() {
    return (
      <LandingStyled>
        <Header
          menuActive={this.state.menuActive}
          enableMenu={this.activateMenu}
          searchFilter={this.searchFilter}
        />
        <LandingStyled.sectionWrapper>
          <LandingStyled.sideSection menuActive={this.state.menuActive}>
            <Scrollbars
              autoHide
              renderView={props => <div {...props} className="view" />}
            >
              <Sidebar
                list={this.props.professionsList}
                selectedCategory={this.props.filters.category.value}
                menuActive={this.state.menuActive}
                toggleMenu={this.activateMenu}
                updateCategory={this.updateCategory}
              />
            </Scrollbars>
          </LandingStyled.sideSection>
          <LandingStyled.mainSection menuActive={this.state.menuActive}>
            <div
              ref={node => !this.state.tabsRef && this.setState({ tabsRef: node, tabsClientHeight: node.clientHeight })}
            >
              <Tabs
                labels={['Stars', 'Videos']}
                switchTab={this.props.switchTab}
                selectedCategory={this.props.filters.category.label}
                filterSelected={this.state.filterSelected}
                selected={this.props.filters.selectedTab}
                toggleFilter={this.toggleFilterSection}
              />
              {
                this.state.filterSelected  &&
                  <FilterSection
                    selectedPriceRange={{low: this.props.filters.lowPrice, high: this.props.filters.highPrice}}
                    selectedTab={this.props.filters.selectedTab}
                    selectedSort={this.props.filters.sortValue}
                    selectedSubCategories={this.props.filters[this.props.filters.category.value]}
                    subCategoryList={this.state.subCategoryList}
                    selectedVideoType={this.props.filters.selectedVideoType}
                    updatePriceRange={this.props.updatePriceRange}
                    updateSort={this.props.updateSort}
                    updateSelectedSubCategory={this.updateSubCategoryList}
                    updateSelectedVideoType={this.props.updateSelectedVideoType}
                    toggleFilter={this.toggleFilterSection}
                  />
              }
            </div>
            {
              (!this.props.celebList.data.length && this.props.celebList.loading) ||
              (!this.props.videosList.data.length && this.props.videosList.loading) ?
                <LandingStyled.loaderWrapper style={this.state.tabsRef && {height: `calc(100% - ${this.state.tabsClientHeight}px)` }}>
                  <Loader />
                </LandingStyled.loaderWrapper>
              :
                <div style={this.state.tabsRef && {height: `calc(100% - ${this.state.tabsClientHeight}px)` }}>
                  {this.renderScrollList()}
                </div>
            }
          </LandingStyled.mainSection>
        </LandingStyled.sectionWrapper>
      </LandingStyled>
    );
  }
}
