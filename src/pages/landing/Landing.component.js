import React from 'react';
import Header from '../../components/Header';
import { Footer } from '../../components/Footer';
import DesktopHome from './components/DesktopHome';
import MobileHome from './components/MobileHome';
import Sidebar from '../../components/Sidebar';
import Tabs from '../../components/Tabs';
import FilterSection from '../../components/filterSection';
import LandingStyled from './styled';

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
      filterSelected: false,
      subCategoryList: [],
      groupClick: true,
      desktopLanding: true,
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
    window.addEventListener('resize', this.handleResize);
  }

  componentDidMount() {
    this.handleResize();
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
    window.removeEventListener('resize', this.handleResize);
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
  handleResize = () => {
    if (document.body.getBoundingClientRect().width >= 834) {
      this.setState({ desktopLanding: true });
    } else {
      this.setState({ desktopLanding: false });
    }
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
  render() {
    const { desktopLanding } = this.state;
    return (
      <LandingStyled>
        <Header
          notFixed
          disableLogo
          disableSearch
        />
        <LandingStyled.Container>
          {
            desktopLanding ?
              <React.Fragment>
                <DesktopHome />
                <Footer />
              </React.Fragment>
            : <MobileHome />
          }
        </LandingStyled.Container>
      </LandingStyled>
    );
  }
}
