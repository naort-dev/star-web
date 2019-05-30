import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  width: 336px;
  max-width: 336px;
  margin: 0 auto;
  ${media.webView} {
    max-width: 567px;
    width: 567px;
    margin: 0;
  }
  ${media.smallScreen} {
    max-width: 300px;
  }
  .activityCard {
    padding: 22px;
    margin-bottom: 12px;
    ${media.smallScreen} {
      padding: 10px;
    }
    .web-padding {
      ${media.webView} {
        padding-left: 55px;
      }
    }
    .todo-padding {
      ${media.webView} {
        padding-left: 48px;
      }
    }
    .bar-separator {
      display: none;
      ${media.webView} {
        display: inline-block;
      }
    }
  }
  .button-booking {
    width: 91px;
    height: 40px;
    min-width: 91px;
    min-height: 40px;
    font-size: 14px;
    ${media.webView} {
      min-width: 160px;
      width: 160px;
    }
  }
  .button-activity {
    width: 69px;
    height: 40px;
    min-width: 69px;
    min-height: 40px;
    font-size: 14px;
    ${media.webView} {
      min-width: 160px;
      width: 160px;
    }
  }
  .button-promote {
    width: 329px;
    height: 55px;
  }
  .button-margin {
    padding-top: 18px;
    padding-bottom: 40px;
    ${media.webView} {
      display: none;
    }
  }
  .text-activity-cus {
    max-width: 204px;
  }
  .head2 {
    font-family: Gilroy-Bold;
    font-size: 18px;
    color: #5d5d5d;
    padding-top: 30px;
    padding-bottom: 21px;
  }
  .web-icons {
    display: inherit;
    align-items: center;
    padding-left: 0;
    ${media.webView} {
      padding-left: 19px;
    }
    .icons {
      font-size: 24px;
      display: none;
      margin-left: 4px;
      ${media.webView} {
        display: block;
      }
    }
    .icon-heart {
      color: #ff3636;
    }
    .icon-dollar {
      color: #ff6c58;
    }
  }
  .btn-extra {
    display: none;
    ${media.webView} {
      display: none;
      display: inline-block;
    }
  }
`;
