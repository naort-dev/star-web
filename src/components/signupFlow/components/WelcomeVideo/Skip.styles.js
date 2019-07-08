import styled from 'styled-components';
import { media } from '../../../../styles/mediaQueries';
import { Layout, Heading } from './styled';

export const Container = styled(Layout)`
  display: flex;
  .colAlign {
    flex-direction: column;
    align-items: center;
  }
  .leftArrow {
    position: absolute;
    @media (max-width: 831px) {
      left: 30px;
      top: 21px;
    }
  }
  .content {
    max-width: 470px;
    margin: 0 auto;
    @media (max-width: 831px) {
      padding: 0 15px;
    }
  }
  .note {
    max-width: 383px;
    font-size: 18px;
    font-family: Gilroy;
    color: #555555;
    padding-top: 22px;
    padding-bottom: 31px;
    text-align: center;
    line-height: 26px;
  }
  .heading {
    font-size: 34px;
    font-family: Gilroy;
    padding-top: 38px;
    @media (max-width: 831px) {
      padding-top: 20px;
      max-width: 260px;
      line-height: 32px;
      font-size: 24px;
    }
  }
  .whiteBtn {
    margin-top: 16px;
  }
`;

export const Head = styled(Heading)``;
