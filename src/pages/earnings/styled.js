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
    padding-top: 20px;
  }
  .top-heading {
    padding-top: 9px;
    @media (max-width: 832px) {
      font-size: 24px;
    }
  }
  .arrow {
    ${media.webView} {
      display: none;
    }
  }
  .head1 {
    padding-top: 4px;
    padding-bottom: 32px;
    color: #888888;
    font-weight: normal;
    ${media.webView} {
      text-align: left;
      padding-top: 9px;
      padding-bottom: 25px;
    }
    @media (max-width: 831px) {
      padding-bottom: 17px;
      font-size: 24px;
    }
  }

  .middle-section {
    max-width: 620px;
    margin: 0 auto;
    position: relative;
    ${media.smallScreen} {
      width: 310px;
    }
    @media (min-width: 832px) {
      width: 560px;
      flex: 1 1 auto;
    }
    @media (min-width: 1280px) {
      width: 567px;
    }
    ${media.largeScreen} {
      max-width: 100%;
      width: 100%;
      .rate {
        padding-left: 29px;
      }
    }
    .custom-loader {
      position: absolute;
    }
  }
`;

export const Wrapper = styled.section`
  .cardLayout {
    ${media.largeScreen} {
      display: flex;
      padding: 30px 50px 38px 62px;
      .summary-wrap {
        width: 100%;
        margin-left: 105px;
        border-left: 1px solid #d9d9d9;
        padding-left: 48px;
        padding-top: 0;
        .rating-wrap {
          padding-bottom: 0;
          .rating {
            width: 50%;
            .rating-star {
              font-size: 25px;
            }
          }
        }
        .value {
          width: 50%;
          padding-left: 32px;
        }
      }
      .payments {
      }
      .flex-start {
        display: flex;
        justify-content: space-between;
        min-width: 400px;
      }
      .earnings-wrap {
        padding-top: 10px;
      }
    }
  }
`;
