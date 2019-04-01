import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Scrollbars } from 'react-custom-scrollbars';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Tabs from '../../components/Tabs';
import { Starprofile } from '../starProfile';
import { VideoSharePage } from '../videoSharePage';
import { GroupProfile } from '../groupProfile';
import FilterSection from '../../components/filterSection';
import LandingStyled from './styled';
import { setMetaTags } from '../../utils/setMetaTags';
import ScrollList from '../../components/ScrollList';

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
      filterSelected: false,
      subCategoryList: [],
      groupClick: true,
    };
  }

  componentWillMount() {
    if (this.props.isSignup && !this.props.isLoggedIn) {
      this.props.toggleSignup(true);
    }
    if (this.props.location.pathname === '/' || this.props.isSignup) {
      switch (this.props.filters.selectedTab) {
        case 'Stars':
          if (!this.props.celebList.data.length ||
            this.props.isLoggedIn !== this.props.celebList.isLoggedIn ||
            this.props.filters.searchParam !== this.props.celebList.currentSearchParam
  
          ) {
            this.props.fetchCelebrityList(0, true, 'Stars');
          }
          break;
        case 'Videos':
          if (!this.props.videosList.data.length) {
            this.props.fetchVideosList(0, true);
          }
          break;
        default:
          this.props.fetchCelebrityList(0, true, 'Stars');
      }
    }
    window.addEventListener('resize', this.setScrollHeight);
  }

  componentDidMount() {
    window.onpopstate = this.onBackButtonEvent;
  }

  componentWillReceiveProps(nextProps) {
    const loginChange = this.props.isLoggedIn !== nextProps.isLoggedIn;
    const categoryChange = this.props.filters.category.label !== nextProps.filters.category.label;
    const searchParamChange = this.props.filters.searchParam !== nextProps.filters.searchParam;
    const lowPriceChange = this.props.filters.lowPrice !== nextProps.filters.lowPrice;
    const highPriceChange = this.props.filters.highPrice !== nextProps.filters.highPrice;
    const sortValueChange = this.props.filters.sortValue !== nextProps.filters.sortValue;
    const selectedVideoTypeChange = this.props.filters.selectedVideoType !== nextProps.filters.selectedVideoType;
    const selectedVideoDateChange = this.props.filters.selectedVideoDate !== nextProps.filters.selectedVideoDate;
    const tabChange = this.props.filters.selectedTab !== nextProps.filters.selectedTab;
    const locationChange = this.props.location.pathname !== nextProps.location.pathname && nextProps.location.pathname === '/';
    if (searchParamChange || lowPriceChange || highPriceChange || sortValueChange || selectedVideoTypeChange || selectedVideoDateChange || locationChange ) {
      if (nextProps.filters.selectedTab === 'Videos') {
        if (searchParamChange) {
          this.props.switchTab('Stars');
        } else {
          this.props.fetchVideosList(0, true, 'Stars');
        }
      } else {
        this.props.fetchCelebrityList(0, true, nextProps.filters.category.selectedCategory);
      }
    }
    if (categoryChange && nextProps.filters.selectedTab === 'Stars') {
      this.findSubCategoryList(nextProps.filters.category.value);
    }
    if ((nextProps.filters.selectedTab === 'Stars' && nextProps.filters.category.label === 'featured') ||
      (tabChange && nextProps.filters.selectedTab === 'Videos')) {
      this.setState({ filterSelected: false });
    }
    if (tabChange || loginChange) {
      this.setState({ filterSelected: false });
      if (nextProps.filters.selectedTab === 'Videos') {
        if ((tabChange && !this.props.videosList.data.length) || loginChange) {
          this.props.fetchVideosList(0, true);
        }
      } else if (nextProps.filters.selectedTab === 'Stars') {
        if ((tabChange && !this.props.celebList.data.length) || loginChange) {
          this.props.fetchCelebrityList(0, true, 'Stars');
        }
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.setScrollHeight);
  }
  onBackButtonEvent = event => event.preventDefault()
  getFilterCount = () => {
    let count = 0;
    switch (this.props.filters.selectedTab) {
      case 'Stars':
        // if (this.props.filters[this.props.filters.category.value]) {
        //   count = Object.keys(this.props.filters[this.props.filters.category.value]).length;
        // }
        break;
      case 'Videos':
        if (this.props.filters.selectedVideoType !== '') {
          count += 1;
        }
        if (this.props.filters.selectedVideoDate !== '') {
          count += 1;
        }
        break;
      default:
        break;
    }
    return count;
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
  updateCategory = (label, value, category) => {
    if (category === 'Group') {
      this.setState({
        groupClick: false,
      });
    } else {
      this.setState({
        groupClick: true,
      });
      this.props.switchTab('Stars');
    }
    this.props.fetchCelebrityList(0, true, category);
  }
  updateSubCategoryList = (selectedList) => {
    this.props.updateSelectedSubCategory(selectedList, this.props.filters.category.value);
    this.props.fetchCelebrityList(0, true, 'Stars');
  }
  activateMenu = () => {
    this.setState({ menuActive: !this.state.menuActive });
  }
  searchFilter = (searchText) => {
    this.props.updateSearchParam(searchText);
  }
  toggleFilterSection = () => {
    const filterState = this.state.filterSelected;
    this.setState({ filterSelected: !this.state.filterSelected });
    if (!filterState && this.props.filters.selectedTab === 'Stars') {
      this.findSubCategoryList(this.props.filters.category.value);
    }
  }
  fetchCelebrityList = category => (offset, refresh) => {
    this.props.fetchCelebrityList(offset, refresh, category);
  }
  fetchVideosList = (offset, refresh) => {
    this.props.fetchVideosList(offset, refresh);
  }
  renderScrollList() {
    if (this.props.filters.selectedTab === 'Stars') {
      return (
        <ScrollList
          noDataText="Sorry! no matches"
          banner
          searchText={this.props.filters.searchParam}
          dataList={this.props.celebList.data}
          menuActive={this.state.menuActive}
          limit={this.props.celebList.limit}
          totalCount={this.props.celebList.count}
          offset={this.props.celebList.offset}
          loading={this.props.celebList.loading}
          fetchData={this.fetchCelebrityList('Stars')}
        />
      );
    } else if (this.props.filters.selectedTab === 'Videos') {
      return (
        <ScrollList
          dataList={this.props.videosList.data}
          videos
          limit={this.props.videosList.limit}
          totalCount={this.props.videosList.count}
          offset={this.props.videosList.offset}
          loading={this.props.videosList.loading}
          fetchData={this.fetchVideosList}
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
          history={this.props.history}
        />
        {
          this.props.isSignup &&
            <Helmet
              title="Starsona ~ Personalized Video Grams & Shout-Outs from the Stars"
              meta={[...setMetaTags(
                'Starsona ~ Personalized Video Grams & Shout-Outs from the Stars',
                'https://starsona.com/assets/images/logo_starsona.png',
                'Starsona - personalized video grams and shout-outs from the stars, to help you celebrate everyday moments. Find actors, athletes, musicians, YouTubers and more with the Starsona app. Select a star, and request a personalized video shout-out. Then share your shout-out via SMS, email, or social media!',
              ),
              { property: 'al:ios:app_store_id', content: env('IOS_APP_ID') },
              { property: 'al:ios:url', content: `${this.props.configData.web_url}signup${this.props.history.location.search}` },
              { property: 'al:ios:app_name', content: env('IOS_APP_NAME') },
              { property: 'al:android:package', content: env('ANDROID_APP_ID') },
              { property: 'al:android:url', content: `${this.props.configData.web_url}signup${this.props.history.location.search}` },
              { property: 'al:android:app_name', content: env('ANDROID_APP_NAME') },
              ]}
            />
        }
        <LandingStyled.sectionWrapper>
          <LandingStyled.sideSection menuActive={this.state.menuActive}>
            <Scrollbars
              autoHide
              renderView={props => <div {...props} className="view" />}
            >
              <Sidebar
                list={this.props.professionsList}
                selectedCategory={this.props.filters.category.value}
                selectedSubCategories={{ ...this.props.filters[this.props.filters.category.value] }}
                menuActive={this.state.menuActive}
                toggleMenu={this.activateMenu}
                updateMainCategory={this.updateCategory}
                updateSelectedSubCategory={this.updateSubCategoryList}
              />
            </Scrollbars>
          </LandingStyled.sideSection>
          <Switch>
            <Route
              exact
              path="/(signUp|)/"
              render={() => (
                <LandingStyled.mainSection menuActive={this.state.menuActive}>
                  <div>
                    <Tabs
                      labels={['Stars', 'Videos']}
                      switchTab={this.props.switchTab}
                      selectedCategory={this.props.filters.category.label}
                      filterSelected={this.state.filterSelected}
                      selected={this.props.filters.selectedTab}
                      filterCount={this.getFilterCount}
                      toggleFilter={this.toggleFilterSection}
                      noTabs={this.state.groupClick}
                    />
                    {
                      this.state.filterSelected &&
                      <FilterSection
                        selectedPriceRange={{ low: this.props.filters.lowPrice, high: this.props.filters.highPrice }}
                        selectedTab={this.props.filters.selectedTab}
                        selectedSort={this.props.filters.sortValue}
                        selectedSubCategories={this.props.filters[this.props.filters.category.value]}
                        subCategoryList={this.state.subCategoryList}
                        selectedVideoType={this.props.filters.selectedVideoType}
                        selectedVideoDate={this.props.filters.selectedVideoDate}
                        filterSelected={this.state.filterSelected}
                        updatePriceRange={this.props.updatePriceRange}
                        updateSort={this.props.updateSort}
                        updateSelectedSubCategory={this.updateSubCategoryList}
                        updateSelectedVideoType={this.props.updateSelectedVideoType}
                        updateSelectedVideoDate={this.props.updateSelectedVideoDate}
                        toggleFilter={this.toggleFilterSection}
                        groupClicked={this.state.groupClick}
                      />
                    }
                  </div>
                  <LandingStyled.ScrollListWrapper>
                    {this.renderScrollList()}
                  </LandingStyled.ScrollListWrapper>
                </LandingStyled.mainSection>
              )}
            />
            <Route
              exact
              path="/video/:id"
              render={props => (
                <VideoSharePage {...props} menuActive={this.state.menuActive} />
                )}
            />
            <Route
              exact
              path="/:id"
              render={props => (
                <Starprofile {...props} menuActive={this.state.menuActive} />
                )}
            />
            <Route
              exact
              path="/group-profile/:id"
              render={props => (
                <GroupProfile {...props} menuActive={this.state.menuActive} />
              )}
            />
          </Switch>
        </LandingStyled.sectionWrapper>
      </LandingStyled>
    );
  }
}
