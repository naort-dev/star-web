import React from 'react';
import HeaderSection from './styled';


export const LoginHeader = props => (
  <HeaderSection>
    <HeaderSection.HeaderNavigation />
    <HeaderSection.MiddleDiv> Join Free</HeaderSection.MiddleDiv>
    <HeaderSection.RightDiv>Sign In</HeaderSection.RightDiv>
  </HeaderSection>
);
