import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronLeft } from '@fortawesome/pro-light-svg-icons';
import { faUserCircle } from '@fortawesome/pro-regular-svg-icons';
import { connect } from 'react-redux';
import HeaderSection from './styled';
import CategorySection from './components/CategorySection';
import { fetchUserDetails } from '../../store/shared/actions/getUserDetails';
import { fetchSuggestionList, resetSearchParam } from '../../store/shared/actions/getSuggestionsList';
import { updateSearchParam } from '../../pages/landing/actions/updateFilters';
import { logOutUser } from '../../store/shared/actions/login';
import { toggleLogin, toggleSignup, toggleRefer } from '../../store/shared/actions/toggleModals';
import Search from '../Search';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchActive: false,
      profileDropdown: false,
      profilePhoto: null,
      showCategories: false,
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

  componentWillReceiveProps(nextProps) {
    const categoryChange = this.props.filters.category.label !== nextProps.filters.category.label;
    if (this.props.isLoggedIn !== nextProps.isLoggedIn) {
      this.props.updateSearchParam('');
      this.setState({ searchText: '' });
    }

    if (nextProps.userValue.settings_userDetails.avatarPhoto !== this.props.userValue.settings_userDetails.avatar_photo) {
      const profilePhoto = nextProps.userValue.settings_userDetails.avatarPhoto;
      this.setProfileImage(profilePhoto);
      this.setState({ profilePhoto: null });
    }
  }

  componentWillUnmount() {
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

  logoutUser = () => {
    this.setState({ profileDropdown: false });
    this.props.history.push('/');
    this.props.logOut();
  }

  handleBackClick = () => {
    const { showCategories } = this.state;
    if (showCategories) {
      this.toggleCategories();
    }
  }

  toggleCategories = () => {
    const { showCategories } = this.state;
    this.setState({ showCategories: !showCategories });
  }

  render() {
    const { props } = this;
    const { showCategories } = this.state;
    return (
      <HeaderSection notFixed={props.notFixed}>
        <HeaderSection.HeaderDiv notFixed={props.notFixed} shouldAlign={props.disableLogo && props.disableSearch}>
          {
            !showCategories &&
              <HeaderSection.MenuButton onClick={this.toggleCategories} >
                <FontAwesomeIcon icon={faBars} />
              </HeaderSection.MenuButton>
          }
          {
            showCategories &&
              <HeaderSection.BackIcon>
                <FontAwesomeIcon icon={faChevronLeft} onClick={this.handleBackClick} />
              </HeaderSection.BackIcon>
          }
          {
            !props.disableLogo &&
              <HeaderSection.HeaderLeft hide={this.state.searchActive}>
                <Link to="/">
                  <HeaderSection.ImgLogo
                    src="assets/images/logo_starsona.svg"
                    alt=""
                  />
                </Link>
              </HeaderSection.HeaderLeft>
          }
          <HeaderSection.HeaderRight visible={!showCategories}>
            {
              this.props.isLoggedIn ?
                <React.Fragment>
                  <HeaderSection.ProfileButton
                    profileUrl={this.state.profilePhoto}
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
                </React.Fragment>
            :
                <React.Fragment>
                  <HeaderSection.SignInButtonMobile onClick={() => this.props.toggleLogin(true)}>
                    <FontAwesomeIcon icon={faUserCircle} />
                  </HeaderSection.SignInButtonMobile>
                  <HeaderSection.AuthButton notFixed={props.notFixed} onClick={() => this.props.toggleSignup(true)}>
                    Sign Up
                  </HeaderSection.AuthButton>
                  <HeaderSection.AuthButton notFixed={props.notFixed} onClick={() => this.props.toggleLogin(true)}>
                    Log In
                  </HeaderSection.AuthButton>
                </React.Fragment>
            }
          </HeaderSection.HeaderRight>
          {
            !this.props.disableSearch &&
              <HeaderSection.SearchWrapper>
                <Search />
              </HeaderSection.SearchWrapper>
          }
        </HeaderSection.HeaderDiv>
        {
          !props.notFixed &&
            <HeaderSection.CategoryWrapper visible={showCategories}>
              <CategorySection showCategories closeCategories={this.toggleCategories} />
            </HeaderSection.CategoryWrapper>
        }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
