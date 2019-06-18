import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  width: 100%;
  .activityCard {
    padding: 22px;
    margin-bottom: 15px;
    min-height: 90px;
    display: flex;
    align-items: center;

    &.last-child {
      margin-bottom: 0;
    }
    .activityCard-inner {
      width: 100%;
    }
    ${media.smallScreen} {
      padding: 10px;
    }
    @media(max-width: 831px) {
      padding: 17px 22px;
      margin-bottom: 13px;
      min-height: 74px;
    }
    .web-padding {
      ${media.webView} {
        padding-left: 55px;
      }
    }
    .todo-padding {
      padding-right: 20px;
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
    padding: 5px;
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
    padding-top: 32px;
    padding-bottom: 18px;
    @media(max-width: 831px) {
      padding-top: 17px;
    }
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
      display: inline-block;
    }
  }
  .tick-text {
    display: none;
    white-space: nowrap;
    ${media.webView} {
      display: flex;
    }
  }
`;
