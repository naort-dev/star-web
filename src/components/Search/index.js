import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SearchSection from './styled';
import Loader from '../Loader';
import { fetchUserDetails } from '../../store/shared/actions/getUserDetails';
import { fetchSuggestionList, resetSearchParam } from '../../store/shared/actions/getSuggestionsList';
import { updateSearchParam, updateSelectedSubCategory, updateCategory } from '../../pages/landing/actions/updateFilters';
import { toggleLogin, toggleSignup, toggleRefer } from '../../store/shared/actions/toggleModals';
import { starProfessionsFormater } from '../../utils/dataToStringFormatter';

class Search extends React.Component {
  constructor(props) {
    super(props);
    let searchText = '';
    if (this.props.history.location.pathname === '/') {
      searchText = this.props.filters.searchParam || '';
    }
    this.state = {
      searchActive: false,
      showSuggestions: false,
      profileDropdown: false,
      searchText,
      profilePhoto: null,
      suggestionTopOffset: null,
    };
    this.cursorPos = -1;
    this.searchInput = React.createRef();
    this.suggestionsFetchDelay = undefined;
    this.profileImage = new Image();
    this.mounted = true;
  }

  componentWillMount() {
    if (this.props.isLoggedIn) {
      const profilePhoto = this.props.userValue.settings_userDetails.avatarPhoto;
    }
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.removeSuggestions);
    window.addEventListener('resize', this.onWindowResize);
    this.getTopOffset();
  }

  componentWillReceiveProps(nextProps) {
    const categoryChange = this.props.filters.category.label !== nextProps.filters.category.label;
    if (this.props.isLoggedIn !== nextProps.isLoggedIn) {
      this.props.updateSearchParam('');
      this.setState({ searchText: '' });
    }

    if (categoryChange) {
      this.handleSearchItemClick();
    }

    if (nextProps.userValue.settings_userDetails.avatarPhoto !== this.props.userValue.settings_userDetails.avatar_photo) {
      const profilePhoto = nextProps.userValue.settings_userDetails.avatarPhoto;
      this.setState({ profilePhoto: null });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.removeSuggestions);
    window.removeEventListener('resize', this.onWindowResize);
    this.mounted = false;
  }

  onWindowResize = () => {
    if (document.body.getBoundingClientRect().width < 832 || window.innerWidth < 832) {
      this.getTopOffset();
    }
  }

  setListFocus = (e) => {
    const { showSuggestions } = this.state;
    let { cursorPos } = this;
    const { suggestions } = this.props.suggestionsList;
    if (e.key === 'ArrowUp' && showSuggestions && cursorPos - 1 >= 0) {
      this.suggestionList.childNodes[cursorPos - 1].focus();
      this.cursorPos = cursorPos - 1;
    } else if (e.key === 'ArrowDown' && showSuggestions && cursorPos + 1 < suggestions.length) {
      this.suggestionList.childNodes[cursorPos + 1].focus();
      this.cursorPos = cursorPos + 1;
    }
  }

  getTopOffset = () => {
    if (this.searchInput.current) {
      const bounding = this.searchInput.current.getBoundingClientRect();
      this.setState({ suggestionTopOffset: bounding.bottom });
    } else {
      this.setState({ suggestionTopOffset: null });
    }
  }

  handleSearchChange = (e) => {
    this.setState({ searchText: e.target.value });
    if (e.target.value.trim('').length >= 3) {
      this.setState({ showSuggestions: true });
      if (this.suggestionsFetchDelay) {
        clearTimeout(this.suggestionsFetchDelay);
      }
      this.suggestionsFetchDelay = setTimeout(() => {
        this.props.fetchSuggestionList(this.state.searchText.trim(''));
      }, 500);
    } else {
      this.setState({ showSuggestions: false });
      this.cursorPos = -1;
    }
  }

  handleSearchSubmit = (e) => {
    if (e.keyCode === 13) {
      this.props.updateSearchParam(e.target.value.trim(''));
      if (this.props.history.location.pathname != '/') {
        this.props.history.push('/');
      }
      this.setState({ searchText: e.target.value.trim(''), searchActive: false, showSuggestions: false });
    }
    this.setListFocus(e);
  }

  showSuggestions = () => {
    if (this.state.searchText.trim('').length >= 3) {
      this.setState({ showSuggestions: true });
    }
  }

  removeSuggestions = (e) => {
    if (this.searchRef && !this.searchRef.contains(e.target)) {
      this.setState({ showSuggestions: false, searchActive: false });
      this.cursorPos = -1;
    }
    if (this.profileDropDown && !this.profileButton.contains(e.target) && !this.profileDropDown.contains(e.target)) {
      this.setState({ profileDropdown: false });
    }
  }

  deactivateSearch = () => {
    this.setState({ searchActive: false, searchText: '', showSuggestions: false });
    this.cursorPos = -1;
    this.props.updateSearchParam('');
    this.props.fetchSuggestionList('');
  }

  handleSearchItemClick = () => {
    this.props.resetSearchParam('');
    this.props.updateSearchParam('');
    this.setState({ searchActive: false, searchText: '', showSuggestions: false });
    this.cursorPos = -1;
  }

  handleSearchListClick = link => (e) => {
    if (e.keyCode === 13) {
      this.handleSearchItemClick();
      this.props.history.push(link);
    }
  }

  categoryClick = profession => () => {
    const { professions } = this.props.professionsList;
    if (profession.parent_id) {
      const parentProfession = professions.find(item => item.id === profession.parent_id);
      this.props.updateCategory(parentProfession.title, profession.parent_id, parentProfession.child);
      this.props.updateSelectedSubCategory([profession]);
    } else {
      const parentProfession = professions.find(item => item.id === profession.id);
      this.props.updateCategory(parentProfession.title, parentProfession.id, parentProfession.child);
    }
    this.deactivateSearch();
    if (this.props.location.pathName !== '/browse-stars') {
      this.props.history.push('./browse-stars');
    }
  }

  renderSuggestionsList = () => {
    const { suggestions } = this.props.suggestionsList;
    if (suggestions && (suggestions.professions.length || suggestions.stars.length)) {
      return (
        <SearchSection.SuggestionList onKeyDown={this.setListFocus} innerRef={node => this.suggestionList = node}>
          {
            suggestions.professions.length > 0 &&
              <React.Fragment>
                <SearchSection.StarHeading>Categories</SearchSection.StarHeading>
                <SearchSection.CategoryList>
                  {
                    suggestions.professions.map(profession => (
                      <SearchSection.CategoryItem onClick={this.categoryClick(profession)} key={profession.id}>
                        <span>{profession.title}</span>
                      </SearchSection.CategoryItem>
                    ))
                  }
                </SearchSection.CategoryList>
              </React.Fragment>
          }
          {
            suggestions.stars.length > 0 &&
              <React.Fragment>
                <SearchSection.StarHeading>Stars</SearchSection.StarHeading>
                {
                  suggestions.stars.map((item) => {
                    let fullName = '';
                    if (item.nick_name || item.first_name || item.last_name) {
                      fullName = item.nick_name ? item.nick_name
                        : `${item.first_name} ${item.last_name}`;
                    }
                    return (
                      <SearchSection.SuggestionListItem
                        tabIndex="0"
                        key={item.user_id}
                        onKeyDown={this.handleSearchListClick(item.has_group_account ? `/group-profile/${item.user_id}` : `/${item.vanity_id}`)}
                      >
                        <Link to={item.has_group_account ? `/group-profile/${item.user_id}` : `/${item.vanity_id}`}>
                          <SearchSection.SuggestionListContent onClick={this.handleSearchItemClick}>
                            <span>
                              <SearchSection.SuggestionListImage imageUrl={item.image_url} />
                            </span>
                            <SearchSection.SuggestionListName>
                              <SearchSection.SuggestionDetails>
                                { starProfessionsFormater(JSON.parse(item.professions.replace(/'/g, '"')), 'search') }
                              </SearchSection.SuggestionDetails>
                              {fullName}
                            </SearchSection.SuggestionListName>
                          </SearchSection.SuggestionListContent>
                        </Link>
                      </SearchSection.SuggestionListItem>
                    );
                  })
                }
              </React.Fragment>
          }
        </SearchSection.SuggestionList>
      );
    }
    return (
      <SearchSection.noDataWrapper>
        <SearchSection.noDataText>No Results</SearchSection.noDataText>
      </SearchSection.noDataWrapper>
    );
  }

  render() {
    return (
      <SearchSection innerRef={(node) => { this.searchRef = node; }}>
        <SearchSection.InputWrapper alternate={this.props.alternate}>
          <FontAwesomeIcon icon={faSearch} className="search-icon"/>
          <SearchSection.Input
            innerRef={this.searchInput}
            placeholder="Search for your favorite stars!"
            value={this.state.searchText}
            onClick={this.showSuggestions}
            onChange={this.handleSearchChange}
            // onKeyUp={this.handleSearchSubmit}
          />
          {
            this.state.searchText.length >= 3 ?
              <SearchSection.ClearButton onClick={this.deactivateSearch} />
              : null
          }
          {this.state.showSuggestions &&
            <SearchSection.SuggestionListWrapper topOffset={this.state.suggestionTopOffset}>
              <SearchSection.AutoSuggest>
                <Scrollbars>
                  {
                    this.props.suggestionsList.loading ?
                      <Loader />
                      : this.renderSuggestionsList()
                  }
                </Scrollbars>
              </SearchSection.AutoSuggest>
            </SearchSection.SuggestionListWrapper>
          }
        </SearchSection.InputWrapper>
      </SearchSection>
    );
  }
}

const mapStateToProps = state => ({
  suggestionsList: state.suggestionsList,
  professionsList: state.professionsList,
  isLoggedIn: state.session.isLoggedIn,
  filters: state.filters,
  userValue: state.userDetails,
});

const mapDispatchToProps = dispatch => ({
  fetchUserDetails: id => dispatch(fetchUserDetails(id)),
  toggleRefer: state => dispatch(toggleRefer(state)),
  updateSelectedSubCategory: selectedList => dispatch(updateSelectedSubCategory(selectedList)),
  updateCategory: (label, value, subCategories) => dispatch(updateCategory(label, value, subCategories)),
  fetchSuggestionList: searchParam => dispatch(fetchSuggestionList(searchParam)),
  resetSearchParam: searchParam => dispatch(resetSearchParam(searchParam)),
  updateSearchParam: searchParam => dispatch(updateSearchParam(searchParam)),
  toggleLogin: state => dispatch(toggleLogin(state)),
  toggleSignup: state => dispatch(toggleSignup(state)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
