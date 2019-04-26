import styled from 'styled-components';
import { media } from '../../../../styles/mediaQueries';
import { Layout, Heading } from './styled';

export const Container = styled(Layout)`
  .colAlign {
    flex-direction: column;
    align-items: center;
  }
  .leftArrow {
    left: 30px;
    position: absolute;
  }
  .content {
    padding-top: 120px;
    max-width: 470px;
    margin: 0 auto;
  }
  .note {
    max-width: 383px;
    font-size: 18px;
    font-family: Gilroy;
    color: #555555;
    padding-top: 26px;
    padding-bottom: 56px;
    text-align: center;
  }
  .heading {
    font-size: 34px;
  }
  .button {
    font-size: 18px;
    padding: 10px 50px;
  }
  .whiteBtn {
    margin-top: 10px;
    color: #2f839d;
    background: #fff;
    padding: 10px 80px;
  }
`;

export const Head = styled(Heading)``;
