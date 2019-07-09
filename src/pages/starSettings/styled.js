import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  padding-left: 40px;
  padding-right: 40px;
  .arrow-head {
    background-size: 14px 28px;
    top: 91px;
  }
  .head1 {
    display: ${props => (props.showMenu ? 'block' : 'none')};
    font-family: Gilroy-Light;
    font-size: 30px;
    color: #888888;
    margin-bottom: 15px;
    font-weight: normal;
    @media(min-width: 832px) and (max-width: 1280px) {
      padding: 0;
    }
    ${media.webView} {
      text-align: left;
      display: block;
    }
    ${media.mobileScreen} {
      font-size: 28px;
      line-height: 27px;
      padding-top: 20px;
      margin-bottom: 0;
      padding-bottom: 20px;
    }
    &:before {
      content: attr(data-mob);
      ${media.webView} {
        content: attr(data-web);
      }
    }
  }
  .sub-menu-wrap {
    display: ${props => (props.showMenu ? 'block' : 'none')};
    ${media.webView} {
      display: block;
    }
  }
`;

export const ContentWrapper = styled.section`
  display: flex;
  height: 100%;
  .sub-menu-wrap {
    width: 90%;
    padding-left: 30px;
    ${media.webView} {
      padding-left: 0;
      width: 268px;
    }
    .menu-ul {
      padding: 0;
    }
  }
`;
