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
import { toggleLogin, toggleSignup, toggleRefer } from '../../store/shared/actions/toggleModals';
import { starProfessionsFormater } from '../../utils/dataToStringFormatter';
import { render } from 'react-dom';
import ReactSVG from 'react-svg';

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
      burgerMenuClicked: false,
      hamburgerMenuShowClass: '',
    };
    this.cursorPos = -1;
    this.suggestionsFetchDelay = undefined;
    this.profileImage = new Image();
    this.mounted = true;
  }

  componentWillMount() { 
    if (this.props.isLoggedIn) {
      const profilePhoto = this.props.userValue.settings_userDetails.avatarPhoto;
      this.setProfileImage(profilePhoto);
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
      this.setProfileImage(profilePhoto);
      this.setState({ profilePhoto: null });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.removeSuggestions.bind(this));
    this.mounted = false;
  }

  setProfileImage = (photo) => {
    this.profileImage.src = photo;
    this.profileImage.onload = () => {
      if (this.mounted) {
        this.setState({ profilePhoto: this.profileImage.src });
      }
    };
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

  activateSearch = () => {
    this.setState({ searchActive: true }, () => {
      this.searchInput.focus();
    });
    if (this.state.searchText.trim('').length >= 3) {
      this.setState({ showSuggestions: true });
      this.cursorPos = -1;
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

  logoutUser = () => {
    this.setState({ profileDropdown: false });
    this.props.history.push('/');
    this.props.logOut();
  }

  handleSearchListClick = link => (e) => {
    if (e.keyCode === 13) {
      this.handleSearchItemClick();
      this.props.history.push(link);
    }
  }

  logoClick = () => {
    if (this.props.history.location.pathname === '/') {
      this.props.enableMenu();
    }
  }

  handleBurgerMenu = () => {
    let hamburgerMenuShowClass = '';
    if(!this.state.burgerMenuClicked) {
      hamburgerMenuShowClass = 'show-nav';
    }
    this.setState({burgerMenuClicked: !this.state.burgerMenuClicked, hamburgerMenuShowClass: hamburgerMenuShowClass});
  }

  renderSuggestionsList = () => {
    if (this.props.suggestionsList.suggestions.length) {
      return (
        <HeaderSection.SuggestionList onKeyDown={this.setListFocus} innerRef={node => this.suggestionList = node}>
          {
            this.props.suggestionsList.suggestions.map((item) => {
              let fullName = '';
              if (item.nick_name || item.first_name || item.last_name) {
                fullName = item.nick_name ? item.nick_name
                  : `${item.first_name} ${item.last_name}`;
              }
              return (
                <HeaderSection.SuggestionListItem
                  tabIndex="0"
                  key={item.user_id}
                  onKeyDown={this.handleSearchListClick(item.has_group_account ? `/group-profile/${item.user_id}` : `/${item.user_id}`)}
                >
                  <Link to={item.has_group_account ? `/group-profile/${item.user_id}` : `/${item.user_id}`}>
                    <HeaderSection.SuggestionListContent onClick={this.handleSearchItemClick}>
                      <HeaderSection.SuggestionListImage imageUrl={item.avatar_photo && item.avatar_photo.thumbnail_url} />
                      <HeaderSection.SuggestionListName>
                        {fullName}
                        <HeaderSection.SuggestionDetails>
                          {
                            item.has_group_account ?
                              item.group_type
                            : starProfessionsFormater(item.celebrity_profession)
                          }
                        </HeaderSection.SuggestionDetails>
                      </HeaderSection.SuggestionListName>
                    </HeaderSection.SuggestionListContent>
                  </Link>
                </HeaderSection.SuggestionListItem>
              );
            })
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
          <HeaderSection.ResponsiveNavStack>
            {/*On Responsive Mode This should be "turned off" after 736px */}
            {(!this.state.burgerMenuClicked)?
            <ReactSVG src="./assets/images/hamburger-stack.svg" onClick={this.handleBurgerMenu} />:''
            }
            {/* on click show line 234 and add class on line 353*/}
            {/*On Responsive Mode This should be "turned off" */}
            {/*On Responsive Mode This should be "turned on" after 736px */}
            {(this.state.burgerMenuClicked)?
            <div style={{width: 9}}>
              <ReactSVG src="./assets/images/back-nav.svg" onClick={this.handleBurgerMenu}  />
            </div>:""
            }
            {/*On Responsive Mode This should be "turned on" */}
          </HeaderSection.ResponsiveNavStack>
          <HeaderSection.HeaderLeft hide={this.state.searchActive}>
            <Link to="/" onClick={this.handleSearchItemClick}>
              <HeaderSection.ImgLogo
                src="assets/images/logo_starsona.png"
                alt=""
                onClick={this.logoClick}
              />
            </Link>
            {
              !props.disableMenu && <HeaderSection.MenuButton
                menuActive={props.menuActive}
                onClick={props.enableMenu}
              />
            }
          </HeaderSection.HeaderLeft>
          <HeaderSection.SearchBar innerRef={(node) => { this.searchRef = node; }} hide={!this.state.searchActive}>
            <HeaderSection.InputWrapper>
              <HeaderSection.Input
                innerRef={(node) => { this.searchInput = node; }}
                placeholder="Search Starsona"
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
                  <HeaderSection.SearchButton
                    hide={this.state.searchActive}
                    onClick={this.activateSearch}
                  />
                  <HeaderSection.ProfileButton
                    profileUrl={this.state.profilePhoto}
                    innerRef={(node) => { this.profileButton = node; }}
                    hide={this.state.searchActive}
                    onClick={() => this.setState({ profileDropdown: !this.state.profileDropdown })}
                  />
                  {
                    this.state.profileDropdown &&
                      <HeaderSection.ProfileDropdown innerRef={(node) => { this.profileDropDown = node; }}>
                        <HeaderSection.UserProfileName>{this.props.userValue.settings_userDetails.first_name} {this.props.userValue.settings_userDetails.last_name}</HeaderSection.UserProfileName>
                        <HeaderSection.ProfileDropdownItem>
                          <Link to="/user/favorites">
                            Favorite stars
                          </Link>
                        </HeaderSection.ProfileDropdownItem>
                        <HeaderSection.ProfileDropdownItem>
                          <Link to="/user/myVideos">
                            <HeaderSection.LinkElement>
                              My videos
                              {
                                this.props.userValue.settings_userDetails.completed_fan_unseen_count ?
                                  <HeaderSection.InnerListItemCount>
                                    {
                                      this.props.userValue.settings_userDetails.completed_fan_unseen_count
                                    }
                                  </HeaderSection.InnerListItemCount>
                                : null
                              }
                            </HeaderSection.LinkElement>
                          </Link>
                        </HeaderSection.ProfileDropdownItem>
                        <HeaderSection.ProfileDropdownItem >
                          <Link to="/settings">
                            Settings
                          </Link>
                        </HeaderSection.ProfileDropdownItem>
                        <HeaderSection.ProfileDropdownItem onClick={() => props.toggleRefer(true)}>Refer a Star</HeaderSection.ProfileDropdownItem>
                        <HeaderSection.ProfileDropdownItem onClick={this.logoutUser}>Logout</HeaderSection.ProfileDropdownItem>
                      </HeaderSection.ProfileDropdown>
                  }
                </div>
            :
                <div>
                  <HeaderSection.SearchButton onClick={this.activateSearch} />
                  <span onClick={() => this.props.toggleLogin(true)}>
                    <HeaderSection.SignInButtonMobile />
                  </span>
                  <span onClick={() => this.props.toggleLogin(true)}>
                    <HeaderSection.SignIn>
                      Log in
                    </HeaderSection.SignIn>
                    <HeaderSection.SignInIcon
                      src="assets/images/icon_profile_40a.png"
                      alt=""
                    />
                  </span>
                  <span onClick={() => this.props.toggleSignup(true)}>
                    <HeaderSection.Join>Sign up!</HeaderSection.Join>
                  </span>
                </div>
            }
          </HeaderSection.HeaderRight>
          {/*On Responsive Mode Add class "show-nav" to show after 736px  className="show-nav" */}
          <HeaderSection.Navigation className={this.state.hamburgerMenuShowClass}>
            <HeaderSection.NavList>
              <HeaderSection.NavListItem className="active">
                <a href="">Featured</a>
              </HeaderSection.NavListItem>
              <HeaderSection.NavListItem>
                <a href="">Sports</a>
              </HeaderSection.NavListItem>
              <HeaderSection.NavListItem>
                <a href="">Movies / TV</a>
              </HeaderSection.NavListItem>
              <HeaderSection.NavListItem>
                <a href="">Music</a>
              </HeaderSection.NavListItem>
              <HeaderSection.NavListItem>
                <a href="">Radio / Podcast</a>
              </HeaderSection.NavListItem>
              <HeaderSection.NavListItem>
                <a href="">Social / YouTube</a>
              </HeaderSection.NavListItem>
              <HeaderSection.NavListItem>
                <a href="">Comedians</a>
              </HeaderSection.NavListItem>
              <HeaderSection.NavListItem>
                <a href="">Everyday Stars</a>
              </HeaderSection.NavListItem>
              <HeaderSection.NavListItem>
                <a href="">Imitators</a>
              </HeaderSection.NavListItem>
            </HeaderSection.NavList>
          </HeaderSection.Navigation>
          {/*On Responsive Mode Add class "show-nav" to show */}
        </HeaderSection.HeaderDiv>
      </HeaderSection>
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
  logOut: () => dispatch(logOutUser()),
  updateSearchParam: searchParam => dispatch(updateSearchParam(searchParam)),
  toggleLogin: state => dispatch(toggleLogin(state)),
  toggleSignup: state => dispatch(toggleSignup(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
