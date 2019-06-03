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
    font-size: 24px;
    font-family: Gilroy-Light;
    color: #999;
    padding-bottom: 17px;
  }
  .promo-note {
    font-size: 16px;
    font-family: Gilroy;
    color: #888;
  }
  .template-wrap {
    padding-right: 36px;
    padding-top: 31px;
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
    padding: 22px 18px;
    margin-bottom: 17px;
    .collapse-root {
      box-shadow: none;
    }
  }
  .collapse-details {
    justify-content: center;
  }
  .collapse-head {
    font-size: 20px;
    color: #999;
    font-display: Gilroy-Light;
  }
`;
