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
    padding-top: 20px;
    padding-bottom: 48px;
    text-align: center;
  }
  .heading {
    font-size: 34px;
    font-family: Gilroy;
  }
  .button {
    font-size: 18px;
    padding: 7px 55px;
    font-family: Gilroy-Medium;
  }
  .whiteBtn {
    margin-top: 16px;
    color: #2f839d;
    background: #fff;
    padding: 7px 80px;
  }
`;

export const Head = styled(Heading)``;
