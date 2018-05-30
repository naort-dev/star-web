import React from 'react';
import { Link } from 'react-router-dom';
import HeaderSection from './styled';

export const Header = props => (
  <HeaderSection>
    <HeaderSection.HeaderDiv >
      <HeaderSection.HeaderLeft>
        <HeaderSection.ImgLogo
          src="assets/images/logo_starsona.png"
          alt=""
        />
        <HeaderSection.MenuButton
          menuActive={props.menuActive}
          onClick={() => props.enableMenu()}
        />
      </HeaderSection.HeaderLeft>
      <HeaderSection.SearchBar>
        <HeaderSection.SearchIcon
          src="assets/images/icon_search_40a.png"
          alt=""
        />
        <HeaderSection.Input placeholder="Let’s search the Stars!" />
      </HeaderSection.SearchBar>
      <HeaderSection.HeaderRight>
        <HeaderSection.SearchButton />
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
