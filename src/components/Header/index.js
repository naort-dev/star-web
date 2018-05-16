import React from 'react';
import { HeaderDiv } from './styled';


export const Header = props => (
  <header>
    <HeaderDiv >
      <HeaderDiv.Left>
        <HeaderDiv.Logo
          src="assets/images/logo_starsona.png"
          alt=""
        />
        <HeaderDiv.MenuButton menuActive={props.menuActive} onClick={() => props.enableMenu()} />
      </HeaderDiv.Left>
      <HeaderDiv.SearchBar>
        <HeaderDiv.SearchIcon
          src="assets/images/icon_search_40a.png"
          alt=""
        />
        <HeaderDiv.Input placeholder="Let's search the Star's" />
      </HeaderDiv.SearchBar>
      <HeaderDiv.Right>
        <HeaderDiv.SearchButton />
       { /*<HeaderDiv.FavoriteButton />
        <HeaderDiv.MyvideoButton />
	   <HeaderDiv.ProfileButton /> */}
        <HeaderDiv.SignInButtonMobile />
        <HeaderDiv.SignIn>Sign In</HeaderDiv.SignIn>
        <HeaderDiv.Join>Join Free!</HeaderDiv.Join>
      </HeaderDiv.Right>
    </HeaderDiv>
  </header>
);
