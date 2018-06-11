import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import HeaderSection from './styled';
import Loader from '../Loader';
import { fetchSuggestionList, resetSearchParam } from '../../store/shared/actions/getSuggestionsList';
import { logOut } from '../../store/shared/actions/login';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchActive: false,
      showSuggestions: false,
      profileDropdown: false,
      searchText: this.props.suggestionsList.searchText || '',
    };
    this.suggestionsFetchDelay=undefined;
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.removeSuggestions.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoggedIn !== nextProps.isLoggedIn) {
      if (this.props.searchFilter) {
        this.props.searchFilter('');
      }
      this.setState({ searchText: '' });
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
    if (e.keyCode === 13 && this.props.searchFilter) {
      if (this.props.searchFilter) {
        this.props.searchFilter(e.target.value);
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
    this.props.searchFilter('');
  }

  handleSearchItemClick = () => {
    this.props.resetSearchParam('');
    if (this.props.searchFilter) {
      this.props.searchFilter('');
    }
    this.setState({ searchActive: false, showSuggestions: false });
  }

  logoutUser = () => {
    if (window.gapi.auth2) {
      window.gapi.auth2.getAuthInstance().signOut();
    }
    if (localStorage) {
      localStorage.removeItem('data');
      this.props.logOut();
    }
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
              <HeaderSection.ClearButton onClick={this.deactivateSearch} />
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
                  {/* <HeaderSection.FavoriteButton />
                  <HeaderSection.MyvideoButton /> */}
                  <HeaderSection.SearchButton
                    hide={this.state.searchActive}
                    onClick={this.activateSearch}
                  />
                  <HeaderSection.ProfileButton
                    hide={this.state.searchActive}
                    onClick={()=>this.setState({profileDropdown: !this.state.profileDropdown})}
                  />
                  {
                    this.state.profileDropdown &&
                      <HeaderSection.ProfileDropdown>
                        <HeaderSection.UserProfileName>{this.props.userDetails.first_name} {this.props.userDetails.last_name}</HeaderSection.UserProfileName>
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
                    <HeaderSection.SignIn>Sign In
                      <HeaderSection.SignInIcon
                        src="assets/images/icon_profile_40a.png"
                        alt=""
                      />
                    </HeaderSection.SignIn>
                  </Link>
                  <Link to="/signuptype">
                    <HeaderSection.Join>Join Free!</HeaderSection.Join>
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
});

const mapDispatchToProps = dispatch => ({
  fetchSuggestionList: searchParam => dispatch(fetchSuggestionList(searchParam)),
  resetSearchParam: searchParam => dispatch(resetSearchParam(searchParam)),
  logOut: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
