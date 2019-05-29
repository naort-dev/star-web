import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
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
    &:before {
      content: attr(data-val);
    }
  }
  .cardLayout {
    padding: 22px;
    ${media.smallScreen} {
      padding: 10px;
    }
  }
  .earningPercentage {
    font-family: Gilroy-Light;
    font-size: 14px;
    color: #9b9b9b;
    display: inline-block;
    padding-top: 5px;
    padding-bottom: 22px;
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
`;
