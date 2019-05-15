import styled from 'styled-components';
import { media } from '../../../../styles/mediaQueries';

export const Layout = styled.section`
  display: flex;
  justify-content: center;
  height: 100%;
`;

export const Container = styled.section`
  display: flex;
  .colAlign {
    flex-direction: column;
    align-items: center;
  }
  .leftArrow {
    position: absolute;
  }
  .content {
    max-width: 431px;
    margin: 0 auto;
  }
  .heading {
    font-size: 30px;
    font-family: Gilroy;
    max-width: 332px;
    color: #ff6c58;
  }
  .whiteBtn {
    font-size: 18px;
    font-family: Gilroy-Medium;
    margin-top: 16px;
    color: #2f839d;
    background: #fff;
    width: 431px;
  }
`;

export const Head = styled.section``;
