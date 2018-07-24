import React from 'react';
import LayoutWrapper from './styled';

const Layout = props => (
  <LayoutWrapper>
    <LayoutWrapper.Container>
      <LayoutWrapper.LeftSection>
        left
      </LayoutWrapper.LeftSection>
      <LayoutWrapper.RightSection>
        right
      </LayoutWrapper.RightSection>
    </LayoutWrapper.Container>
  </LayoutWrapper>
);
export default Layout;
