import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import HeaderSection from './styled';
import Loader from '../Loader';
import { Scrollbars } from 'react-custom-scrollbars';
import { fetchSuggestionList } from '../../store/shared/actions/getSuggestionsList';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchActive: false,
      showSuggestions: false,
      searchText: this.props.suggestionsList.searchText || '',
    };
    this.suggestionsFetchDelay=undefined;
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.removeSuggestions.bind(this));
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
      this.props.searchFilter(e.target.value);
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
      this.setState({ showSuggestions: false });
    }
  }

  activateSearch = () => {
    this.setState({ searchActive: true });
  }

  deactivateSearch = () => {
    this.setState({ searchActive: false, searchText: '' });
  }

  renderSuggestionsList = () => (
    this.props.suggestionsList.suggestions.map((item, index) => (
      <HeaderSection.SuggestionListItem
        key={index}
      >
        {item.get_short_name}
      </HeaderSection.SuggestionListItem>
    ))
  )

  render() {
    const { props } = this;
    return (
      <HeaderSection>
        <HeaderSection.HeaderDiv >
          <HeaderSection.HeaderLeft hide={this.state.searchActive}>
            <HeaderSection.ImgLogo
              src="assets/images/logo_starsona.png"
              alt=""
            />
            <HeaderSection.MenuButton
              menuActive={props.menuActive}
              onClick={() => props.enableMenu()}
            />
          </HeaderSection.HeaderLeft>
          <HeaderSection.SearchBar innerRef={(node) => { this.searchRef = node; }} hide={!this.state.searchActive}>
            <HeaderSection.InputWrapper>
              <HeaderSection.Input
                ref={(node) => { this.searchInput = node; }}
                placeholder="Let’s search the Stars!"
                value={this.state.searchText}
                onClick={() => this.showSuggestions()}
                onChange={e => this.handleSearchChange(e)}
                onKeyUp={e => this.handleSearchSubmit(e)}
              />
              <HeaderSection.ClearButton onClick={() => this.deactivateSearch()} />
              {this.state.showSuggestions &&
                <HeaderSection.SuggestionListWrapper>
                  <Scrollbars>
                    {
                      this.props.suggestionsList.loading ?
                        <Loader />
                      : this.renderSuggestionsList()
                    }
                  </Scrollbars>
                </HeaderSection.SuggestionListWrapper>
              }
            </HeaderSection.InputWrapper>
          </HeaderSection.SearchBar>
          <HeaderSection.HeaderRight>
            <HeaderSection.SearchButton onClick={() => this.activateSearch()} />
              { /*<HeaderSection.FavoriteButton />
                <HeaderSection.MyvideoButton />
            <HeaderSection.ProfileButton /> */}
            <HeaderSection.SignInButtonMobile />
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
          </HeaderSection.HeaderRight>
        </HeaderSection.HeaderDiv>
      </HeaderSection>
    );
  }
}

const mapStateToProps = state => ({
  suggestionsList: state.suggestionsList,
});

const mapDispatchToProps = dispatch => ({
  fetchSuggestionList: searchParam => dispatch(fetchSuggestionList(searchParam)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
