import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  background: #f6f6f6;
  min-height: 100vh;
  padding-left: 19px;
  padding-right: 19px;
  .head1 {
    color: #999999;
    font-size: 30px;
    font-family: Gilroy-Light;
    text-align: center;
    padding-top: 34px;
    padding-bottom: 30px;
  }
  .arrow {
    width: 14px;
    height: 28px;
    top: 110px;
    ${media.webView} {
      display: none;
    }
  }
`;
