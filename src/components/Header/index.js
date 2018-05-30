import React from 'react';
import { Link } from 'react-router-dom';
import HeaderSection from './styled';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchActive: false,
    };
  }

  activateSearch = () => {
    this.setState({ searchActive: true });
  }

  deactivateSearch = () => {
    this.setState({ searchActive: false });
  }

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
          <HeaderSection.SearchBar hide={!this.state.searchActive}>
            {/* <HeaderSection.SearchIcon
              src="assets/images/icon_search_40a.png"
              alt=""
            /> */}
            <HeaderSection.InputWrapper>
              <HeaderSection.Input placeholder="Let’s search the Stars!" />
              <HeaderSection.ClearButton onClick={() => this.deactivateSearch()} />
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
};
