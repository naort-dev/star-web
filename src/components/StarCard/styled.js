import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  width: 336px;
  max-width: 336px;
  margin: 0 auto;
  ${media.webView} {
    max-width: 567px;
    width: 567px;
  }
  ${media.smallScreen} {
    max-width: 300px;
  }
  .headLbl {
    font-size: 26px;
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
      padding: 37px 30px;
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
    padding-top: 25px;
  }
`;
