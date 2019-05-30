import styled from 'styled-components';
import { media } from 'styles/mediaQueries';
import { Card } from 'styles/CommonStyled';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  background: #f6f6f6;
  padding-left: 19px;
  padding-right: 19px;
  ${media.webView} {
    padding-left: 0;
    padding-right: 0;
  }
  .head1 {
    color: #999999;
    font-size: 30px;
    font-family: Gilroy-Light;
    text-align: center;
    padding-top: 34px;
    padding-bottom: 30px;
    ${media.webView} {
      text-align: left;
    }
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

export const Wrapper = styled.section`
  ${media.webView} {
    display: flex;
  }
`;

export const Social = styled(Card)`
  width: 369px;
  margin-left: 27px;
  padding: 29px 49px;
  display: none;
  ${media.webView} {
    display: block;
  }
`;
