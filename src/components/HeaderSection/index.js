import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderSection } from './styled';

const HeaderLogin = props => (
  <HeaderSection>
    <Link to="/">
      <HeaderSection.LogoImage
        src="assets/images/logo_starsona_large.svg"
        alt=""
      />
    </Link>
    <Link to="/signuptype">
      <HeaderSection.RightDiv>{ props.RightContent }</HeaderSection.RightDiv>
    </Link>
  </HeaderSection>
);
export default HeaderLogin;
