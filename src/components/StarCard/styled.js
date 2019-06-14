import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  width: 100%
  &.customStar-layout {
    margin-bottom: 10px;
  }
  .headLbl {
    font-size: 40px;
    ${media.smallScreen} {
      font-size: 24px;
    }
    font-family: Gilroy-Semibold;
    &:before {
      font-size: 14px;
      color: #9b9b9b;
      display: flex;
      padding-bottom: 5px;
      font-family: Gilroy-Medium;
      @media(max-width: 831px) {
        padding-bottom: 3px;
      }
    }
    @media(max-width: 831px) {
      font-size: 26px;
    }
  }
  .earnings {
    color: #5a5a5a;
    &:before {
      content: attr(data-val);
    }
  }
  .payments {
    color: #2f839d;
    ${media.webView} {
      padding-left: 168px;
    }
    &:before {
      content: attr(data-val);
    }
  }
  .cardLayout {
    padding: 22px;
    ${media.smallScreen} {
      padding: 10px;
    }
    ${media.webView} {
      padding: 29px 38px 23px;
    }
    @media(max-width: 831px) {
      padding: 21px 23px 13px;
    }
  }
  .earningPercentage {
    font-family: Gilroy-Light;
    font-size: 14px;
    color: #9b9b9b;
    display: inline-block;
    padding-top: 5px;
    padding-bottom: 22px;
    ${media.webView} {
      display: none;
    }
    @media(max-width: 831px) {
      padding-top: 7px;
      padding-bottom: 16px;
    }
  }
  .rating-wrap {
    align-items: flex-start;
    .rating-label {

    }
    .rating {
      margin-top: 1px;
      .start-rate {
        @media(max-width: 831px) {
          font-size: 17px !important;
        }
      }
    }
  }
  .flex-start {
    ${media.webView} {
      justify-content: flex-start;
    }
  }
`;

export const SummaryItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding-bottom: 7px;
  align-items: center;
  svg {
    color: #cbcbcb;
  }
  .rating {
    width: 50%;
    padding-left: 40px;
    ${media.smallScreen} {
      font-size: 12px;
    }
    ${media.webView} {
      width: 65%;
      padding-left: 0;
    }
  }
  .start-rate {
    padding: 0;
  }
  .commenticon {
    transform: rotateY(180deg);
  }
`;
export const Label = styled.span`
  padding-left: 16px;
  font-family: Gilroy;
  font-size: 14px;
  color: #484848;
  ${media.smallScreen} {
    font-size: 12px;
  }
`;
export const Value = styled.span`
  font-family: Gilroy-Semibold;
  font-size: 14px;
  color: #484848;
  display: inline-block;
  width: 50%;
  padding-left: 45px;
  ${media.smallScreen} {
    font-size: 12px;
  }
  ${media.webView} {
    width: 65%;
    padding-left: 0;
  }
`;
export const Summary = styled.ul`
  ${media.webView} {
    padding-top: 19px;
  }
  li {
    padding-bottom: 9px;
    @media(max-width: 831px) {
      padding-bottom: 6px;
    }
  }
`;
