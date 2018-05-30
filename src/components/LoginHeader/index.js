import React from 'react';
import { Link } from 'react-router-dom';
import HeaderSection from './styled';

export const LoginHeader = props => (
  <HeaderSection>
    <Link to="/">
      <HeaderSection.HeaderNavigation />
    </Link>
    <HeaderSection.MiddleDiv> Join Free</HeaderSection.MiddleDiv>
    <HeaderSection.RightDiv>Sign In</HeaderSection.RightDiv>
  </HeaderSection>
);
