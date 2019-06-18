import styled from 'styled-components';
import { media } from 'styles/mediaQueries';
import { Card } from 'styles/CommonStyled';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  padding-left: 19px;
  padding-right: 19px;
  ${media.webView} {
    padding-left: 0;
    padding-right: 0;
  }
  ${media.smallScreen} {
    padding-left: 0;
    padding-right: 0;
  }
  .head1 {
    ${media.webView} {
      text-align: left;
    }
  }
`;

export const MenuSection = styled.section``;
