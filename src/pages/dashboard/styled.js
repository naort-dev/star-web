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
  @media (max-width: 831px) {
    padding-top: 30px;
  }
  .top-heading {
    padding-top: 9px;
  }
  .arrow {
    ${media.webView} {
      display: none;
    }
  }
  .head1 {
    padding-top: 9px;
    padding-bottom: 32px;
    color: #888888;
    ${media.webView} {
      text-align: left;
      padding-top: 9px;
      padding-bottom: 32px;
    }
    @media (max-width: 831px) {
      padding-bottom: 22px;
    }
  }
  .middle-section {
    width: 336px;
    margin: 0 auto;
    ${media.smallScreen}{
      width: 310px;
    }
    @media (min-width: 832px) {
      width: 560px;
    }
    @media (min-width: 1280px) {
      width: 567px;
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
  padding: 24px 49px 29px;
  display: none;
  ${media.largeScreen} {
    display: block;
  }
`;
