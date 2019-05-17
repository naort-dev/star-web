import styled from 'styled-components';
import { media } from '../../../../styles/mediaQueries';
import { Layout, Heading } from './styled';

export const Container = styled(Layout)`
  display: flex;
  .colAlign {
    flex-direction: column;
    align-items: center;
    .button {
      font-size: 18px;
      font-family: Gilroy-Semibold;
    }
    .button:first-child {
      padding: 7px 55px;
    }
    .button:last-child {
      padding: 7px 79px;
    }
    .button:hover {
      background-color: #2f839d;
      color: #fff;
      box-shadow: none;
    }
  }
  .leftArrow {
    position: absolute;
  }
  .content {
    max-width: 470px;
    margin: 0 auto;
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
      padding-top: 0;
      max-width: 260px;
      line-height: 32px;
    }
  }
  .whiteBtn {
    margin-top: 16px;
    color: #2f839d;
    background: #fff;
    padding: 7px 80px;
  }
`;

export const Head = styled(Heading)``;
