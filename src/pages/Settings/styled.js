import styled from 'styled-components';
import { media } from 'styles/mediaQueries';
import { Card } from 'styles/CommonStyled';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  .head1 {
    ${media.webView} {
      text-align: left;
    }
  }
`;

export const ContentWrapper = styled.section`
  display: flex;
  .sub-menu-wrap {
    width: 268px;
    .menu-ul {
      padding: 0;
    }
  }
`;
