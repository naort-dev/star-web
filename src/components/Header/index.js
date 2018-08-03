import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import HeaderSection from './styled';
import Loader from '../Loader';
import { fetchUserDetails } from '../../store/shared/actions/getUserDetails';
import { fetchSuggestionList, resetSearchParam } from '../../store/shared/actions/getSuggestionsList';
import { updateSearchParam } from '../../pages/landing/actions/updateFilters';
import { logOutUser } from '../../store/shared/actions/login';

class Header extends React.Component {
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
    this.suggestionsFetchDelay=undefined;
  }

  componentWillMount() {
   
    if (this.props.isLoggedIn) {
      this.props.fetchUserDetails(this.props.userValue.settings_userDetails.id);
      const profilePhoto = this.props.userValue.settings_userDetails.avatar_photo && this.props.userValue.settings_userDetails.avatar_photo.thumbnail_url;
      this.setState({ profilePhoto });
    }
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.removeSuggestions.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoggedIn !== nextProps.isLoggedIn) {
      this.props.updateSearchParam('');
      this.setState({ searchText: '' });
    }

    if (JSON.stringify(nextProps.userDetails.avatar_photo) !== JSON.stringify(this.props.userDetails.avatar_photo)) {
      const profilePhoto = nextProps.userDetails.avatar_photo && nextProps.userDetails.avatar_photo.thumbnail_url;
      this.setState({ profilePhoto });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.removeSuggestions.bind(this));
  }

  handleSearchChange = (e) => {
    this.setState({ searchText: e.target.value });
    if (e.target.value.length >= 3) {
      this.setState({ showSuggestions: true });
      if (this.suggestionsFetchDelay) {
        clearTimeout(this.suggestionsFetchDelay);
      }
      this.suggestionsFetchDelay = setTimeout(() => {
        this.props.fetchSuggestionList(this.state.searchText);
      }, 500);
    } else {
      this.setState({ showSuggestions: false });
    }
  }

  handleSearchSubmit = (e) => {
    if (e.keyCode === 13) {
      this.props.updateSearchParam(e.target.value);
      if (this.props.history.location.pathname != '/') {
        this.props.history.push('/');
      }
      this.setState({ searchActive: false, showSuggestions: false });
    }
  }

  showSuggestions = () => {
    if (this.state.searchText.length >= 3) {
      this.setState({ showSuggestions: true });
    }
  }

  removeSuggestions = (e) => {
    if (this.searchRef && !this.searchRef.contains(e.target)) {
      this.setState({ showSuggestions: false, searchActive: false });
    }
    if (this.profileDropDown && !this.profileButton.contains(e.target) && !this.profileDropDown.contains(e.target)) {
      this.setState({ profileDropdown: false });
    }
  }

  activateSearch = () => {
    this.setState({ searchActive: true }, () => {
      this.searchInput.focus();
    });
    if (this.state.searchText.length >= 3) {
      this.setState({ showSuggestions: true });
    }
  }

  deactivateSearch = () => {
    this.setState({ searchActive: false, searchText: '', showSuggestions: false });
    this.props.updateSearchParam('');
    this.props.fetchSuggestionList('');
  }

  handleSearchItemClick = () => {
    this.props.resetSearchParam('');
    this.props.updateSearchParam('');
    this.setState({ searchActive: false, searchText: '', showSuggestions: false });
  }

  logoutUser = () => {
    if (window.gapi.auth2) {
      window.gapi.auth2.getAuthInstance().signOut();
    }
    this.props.logOut();
  }

  renderSuggestionsList = () => {
    if (this.props.suggestionsList.suggestions.length) {
      return (
        <HeaderSection.SuggestionList>
          {
            this.props.suggestionsList.suggestions.map((item, index) => (
              <HeaderSection.SuggestionListItem
                key={index}
              >
                <Link to={`/starDetail/${item.id}`}>
                  <HeaderSection.SuggestionListContent onClick={this.handleSearchItemClick}>
                    {item.get_short_name}
                  </HeaderSection.SuggestionListContent>
                </Link>
              </HeaderSection.SuggestionListItem>
            ))
          }
        </HeaderSection.SuggestionList>
      );
    }
    return (
      <HeaderSection.noDataWrapper>
        <HeaderSection.noDataText>No Results</HeaderSection.noDataText>
      </HeaderSection.noDataWrapper>
    );
  }

  render() {
    const { props } = this;
    return (
      <HeaderSection>
        <HeaderSection.HeaderDiv >
          <HeaderSection.HeaderLeft hide={this.state.searchActive}>
            <Link to="/">
              <HeaderSection.ImgLogo
                src="assets/images/logo_starsona.png"
                alt=""
              />
            </Link>
            {
              !props.disableMenu && <HeaderSection.MenuButton
                menuActive={props.menuActive}
                onClick={() => props.enableMenu()}
              />
            }
          </HeaderSection.HeaderLeft>
          <HeaderSection.SearchBar innerRef={(node) => { this.searchRef = node; }} hide={!this.state.searchActive}>
            <HeaderSection.InputWrapper>
              <HeaderSection.Input
                innerRef={(node) => { this.searchInput = node; }}
                placeholder="Let’s search the Stars!"
                value={this.state.searchText}
                onClick={this.showSuggestions}
                onChange={this.handleSearchChange}
                onKeyUp={this.handleSearchSubmit}
              />
              {
                this.state.searchText.length >= 3 ?
                  <HeaderSection.ClearButton onClick={this.deactivateSearch} />
                : null
              }
              {this.state.showSuggestions &&
                <HeaderSection.SuggestionListWrapper>
                  <HeaderSection.AutoSuggest>
                    <Scrollbars>
                      {
                        this.props.suggestionsList.loading ?
                          <Loader />
                        : this.renderSuggestionsList()
                      }
                    </Scrollbars>
                  </HeaderSection.AutoSuggest>
                </HeaderSection.SuggestionListWrapper>
              }
            </HeaderSection.InputWrapper>
          </HeaderSection.SearchBar>
          <HeaderSection.HeaderRight>      
            {
              this.props.isLoggedIn ?
                <div style={{position: 'relative'}}>
                  <Link to="/user/favorites">
                    <HeaderSection.FavoriteButton />
                  </Link>
                  <Link to="/user/myVideos">
                    <HeaderSection.MyvideoButton />
                  </Link>
                  <HeaderSection.SearchButton
                    hide={this.state.searchActive}
                    onClick={this.activateSearch}
                  />
                  <HeaderSection.ProfileButton
                    profileUrl={this.state.profilePhoto}
                    innerRef={(node) => { this.profileButton = node }}
                    hide={this.state.searchActive}
                    onClick={()=>this.setState({profileDropdown: !this.state.profileDropdown})}
                  />
                  {
                    this.state.profileDropdown &&
                      <HeaderSection.ProfileDropdown innerRef={(node) => { this.profileDropDown = node }}>
                        <HeaderSection.UserProfileName>{this.props.userValue.settings_userDetails.first_name} {this.props.userValue.settings_userDetails.last_name}</HeaderSection.UserProfileName>
                        <HeaderSection.UserLink>
                          <Link to="/user/favorites">
                            Favourites
                          </Link>
                        </HeaderSection.UserLink>
                        <HeaderSection.UserLink>
                          <Link to="/user/myVideos">
                            My Videos
                          </Link>
                        </HeaderSection.UserLink>
                        <HeaderSection.ProfileDropdownItem >
                          <Link to="/settings">
                            Settings
                          </Link></HeaderSection.ProfileDropdownItem>
                        <HeaderSection.ProfileDropdownItem onClick={() => this.logoutUser()}>Logout</HeaderSection.ProfileDropdownItem>
                      </HeaderSection.ProfileDropdown>
                  }
                </div>
            :
                <div>
                  <HeaderSection.SearchButton onClick={this.activateSearch} />
                  <Link to="/login">
                    <HeaderSection.SignInButtonMobile />
                  </Link>
                  <Link to="/login">
                    <HeaderSection.SignIn>
                      Log In
                    </HeaderSection.SignIn>
                    <HeaderSection.SignInIcon
                      src="assets/images/icon_profile_40a.png"
                      alt=""
                    />
                  </Link>
                  <Link to="/signuptype">
                    <HeaderSection.Join>Sign Up!</HeaderSection.Join>
                  </Link>
                </div>
            }
          </HeaderSection.HeaderRight>
        </HeaderSection.HeaderDiv>
      </HeaderSection>
    );
  }
}

const mapStateToProps = state => ({
  suggestionsList: state.suggestionsList,
  isLoggedIn: state.session.isLoggedIn,
  userDetails: state.session.auth_token,
  filters: state.filters,
  userValue: state.userDetails,
});

const mapDispatchToProps = dispatch => ({
  fetchUserDetails: id => dispatch(fetchUserDetails(id)),
  fetchSuggestionList: searchParam => dispatch(fetchSuggestionList(searchParam)),
  resetSearchParam: searchParam => dispatch(resetSearchParam(searchParam)),
  logOut: () => dispatch(logOutUser()),
  updateSearchParam: searchParam => dispatch(updateSearchParam(searchParam)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
