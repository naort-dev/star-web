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
    const filterChange = categoryChange
    || this.props.filters.searchParam !== nextProps.filters.searchParam
    || this.props.filters.lowPrice !== nextProps.filters.lowPrice
    || this.props.filters.highPrice !== nextProps.filters.highPrice;
    const tabChange = this.props.filters.selectedTab !== nextProps.filters.selectedTab;
    if (filterChange) {
      if (nextProps.filters.selectedTab === 'Videos') {
        if (categoryChange) {
          this.props.switchTab('Stars');
        } else {
          this.props.fetchVideosList(0, true);
        }
      } else {
        this.props.fetchCelebrityList(0, true);
      }
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
  updateCategory = (label, value) => {
    this.props.updateCategory(label, value);
    this.props.fetchCelebrityList(0, true);
  }
  activateMenu = () => {
    this.setState({ menuActive: !this.state.menuActive });
  }
  searchFilter = (searchText) => {
    this.props.updateSearchParam(searchText);
  }
  toggleFilterSection = () => {
    this.setState({ filterSelected: !this.state.filterSelected }, () => {
      this.setScrollHeight();
    });
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
                filterSelected={this.state.filterSelected}
                selected={this.props.filters.selectedTab}
                toggleFilter={this.toggleFilterSection}
              />
              {
                this.state.filterSelected &&
                  <FilterSection
                    selectedPriceRange={{low: this.props.filters.lowPrice, high: this.props.filters.highPrice}}
                    updatePriceRange={this.props.updatePriceRange}
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
