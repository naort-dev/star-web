import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  .head1 {
    ${media.webView} {
      text-align: left;
    }
  }
  .arrow {
    ${media.webView} {
      display: none;
    }
  }
  .card-layout {
    padding: 29px 28px;
    display: none;
    ${media.webView} {
      display: block;
    }
  }
  .promo-head {
    font-size: 18px;
    font-family: Gilroy-Light;
    color: #999;
    padding-bottom: 17px;
    ${media.webView} {
      font-size: 24px;
    }
  }
  .promo-note {
    font-size: 14px;
    font-family: Gilroy;
    color: #888;
    ${media.webView} {
      font-size: 16px;
    }
  }
  .template-wrap {
    padding-right: 0;
    padding-top: 0;
    ${media.webView} {
      padding-right: 36px;
      padding-top: 31px;
    }
  }
  .share-text {
    font-family: Gilroy_Light;
    font-size: 16px;
    color: #999;
    display: inline-block;
    text-align: center;
    width: 100%;
  }
  .social-wrap {
    font-size: 30px;
    padding-top: 18px;
    display: flex;
    justify-content: space-between;
    width: 135px;
    margin: 0 auto;
    .social-icon {
      color: #2f839d;
    }
  }
`;

export const TemplateList = styled.section`
  display: flex;
  flex-wrap: wrap;
  padding-left: 17px;
  .template-card {
    padding-bottom: 30px;
  }
`;

export const Accordion = styled.section`
  padding: 28px;
  display: block;
  ${media.webView} {
    display: none;
  }
  .card-mob {
    padding: 10px 18px;
    margin-bottom: 17px;
    .collapse-root {
      box-shadow: none;
      .collapse-arrow {
        color: #999;
      }
      .fontawesome-icons {
        right: -8px;
      }
    }
    .collapse-exp {
      margin: 0;
    }
  }
  .collapse-details {
    justify-content: center;
  }
  .collapse-head {
    font-size: 20px;
    color: #999;
    font-family: Gilroy-Light;
    min-height: 0 !important;
    padding: 0 24px 0 6px;
    div:first-of-type {
      margin: 12px 0 !important;
    }
  }
  .template-card {
    padding-bottom: 35px;
  }
`;
