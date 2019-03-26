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
import { updateSearchParam } from '../../pages/landing/actions/updateFilters';
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
    };
    this.cursorPos = -1;
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
    window.addEventListener('mousedown', this.removeSuggestions.bind(this));
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
    window.removeEventListener('mousedown', this.removeSuggestions.bind(this));
    this.mounted = false;
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

  renderSuggestionsList = () => {
    if (this.props.suggestionsList.suggestions.length) {
      return (
        <SearchSection.SuggestionList onKeyDown={this.setListFocus} innerRef={node => this.suggestionList = node}>
          <SearchSection.StarHeading>Categories</SearchSection.StarHeading>
          <SearchSection.CategoryList>
            <SearchSection.CategoryItem>
              <Link to={`/jordanloyd`}>Baseball</Link>
            </SearchSection.CategoryItem>
            <SearchSection.CategoryItem>
              <Link to={`/jordanloyd`}>Baseball</Link>
            </SearchSection.CategoryItem>
            <SearchSection.CategoryItem>
              <Link to={`/jordanloyd`}>Baseball</Link>
            </SearchSection.CategoryItem>
          </SearchSection.CategoryList>
          <SearchSection.StarHeading>Stars</SearchSection.StarHeading>
          {
            this.props.suggestionsList.suggestions.map((item) => {
              let fullName = '';
              if (item.nick_name || item.first_name || item.last_name) {
                fullName = item.nick_name ? item.nick_name
                  : `${item.first_name} ${item.last_name}`;
              }
              return (
                <SearchSection.SuggestionListItem
                  tabIndex="0"
                  key={item.user_id}
                  onKeyDown={this.handleSearchListClick(item.has_group_account ? `/group-profile/${item.user_id}` : `/${item.user_id}`)}
                >
                  <Link to={item.has_group_account ? `/group-profile/${item.user_id}` : `/${item.user_id}`}>
                    <SearchSection.SuggestionListContent onClick={this.handleSearchItemClick}>
                      <SearchSection.SuggestionListImage imageUrl={item.avatar_photo && item.avatar_photo.thumbnail_url} />
                      <SearchSection.SuggestionListName>
                        <SearchSection.SuggestionDetails>
                          {
                            item.has_group_account ?
                              item.group_type
                              : starProfessionsFormater(item.celebrity_profession)
                          }
                        </SearchSection.SuggestionDetails>
                        {fullName}
                      </SearchSection.SuggestionListName>
                    </SearchSection.SuggestionListContent>
                  </Link>
                </SearchSection.SuggestionListItem>
              );
            })
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
      <SearchSection innerRef={(node) => { this.searchRef = node; }} hide={!this.state.searchActive}>
        <SearchSection.InputWrapper alternate={this.props.alternate}>
          <FontAwesomeIcon icon={faSearch} />
          <SearchSection.Input
            innerRef={(node) => { this.searchInput = node; }}
            placeholder="Search for your favorite stars!"
            value={this.state.searchText}
            onClick={this.showSuggestions}
            onChange={this.handleSearchChange}
            onKeyUp={this.handleSearchSubmit}
          />
          {
            this.state.searchText.length >= 3 ?
              <SearchSection.ClearButton onClick={this.deactivateSearch} />
              : null
          }
          {this.state.showSuggestions &&
            <SearchSection.SuggestionListWrapper>
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
  isLoggedIn: state.session.isLoggedIn,
  filters: state.filters,
  userValue: state.userDetails,
});

const mapDispatchToProps = dispatch => ({
  fetchUserDetails: id => dispatch(fetchUserDetails(id)),
  toggleRefer: state => dispatch(toggleRefer(state)),
  fetchSuggestionList: searchParam => dispatch(fetchSuggestionList(searchParam)),
  resetSearchParam: searchParam => dispatch(resetSearchParam(searchParam)),
  updateSearchParam: searchParam => dispatch(updateSearchParam(searchParam)),
  toggleLogin: state => dispatch(toggleLogin(state)),
  toggleSignup: state => dispatch(toggleSignup(state)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
