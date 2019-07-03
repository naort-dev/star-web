import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  .head1 {
    display: ${props => (props.showMenu ? 'block' : 'none')};
    ${media.webView} {
      text-align: left;
      display: block;
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
  .click-here {
    font-size: 16px;
    color: #2f839d;
    font-family: Gilroy-Light;
    cursor: pointer;
  }
  .progress-bar {
    display: flex;
    margin-bottom: 54px;
    justify-content: center;
    width: 90%;
    padding-left: 40px;
    ${media.largeScreen} {
      margin-right: 11px;
      margin-bottom: 49px;
      justify-content: flex-end;
    }
    ${media.webView} {
      width: 100%;
      padding-left: 0;
    }
    .progress-wrap {
      max-width: 700px;
      width: 100%;
      .progress-fill {
        font-family: Gilroy-Semibold;
      }
    }
  }
`;

export const ContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  ${media.largeScreen} {
    flex-direction: row;
  }
  .sub-menu-wrap {
    order: 2;
    ${media.largeScreen} {
      order: 1;
    }
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

export const RightContentWrap = styled.section`
  order: 1;
  ${media.largeScreen} {
    order: 2;
  }
  .note-progress {
    max-width: 80%;
    text-align: center;
    margin: 0 auto;
    padding-bottom: 24px;
    color: #888;
    font-family: Gilroy-Semibold;
    font-size: 16px;
    line-height: 23px;
    display: block;
    ${media.largeScreen} {
      display: none;
    }
  }
`;
