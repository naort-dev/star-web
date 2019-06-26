import styled from 'styled-components';
import { media } from '../../styles/mediaQueries';

export const Layout = styled.section`
  max-width: 320px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 40px;
  padding-top: 30px;
  ${media.webView} {
    max-width: 400px;
  }
  .button.payment-btn {
    margin-top: 15px;
    ${media.webView} {
      margin-top: 30px;
    }
  }
`;

export const SubHeader = styled.section`
  padding: 50px 57px 0;
  position: relative;
  .svg-inline--fa {
    font-size: 50px;
    color: #707070;
    cursor: pointer;
  }
`;

export const Heading = styled.span`
  font-family: Gilroy;
  font-size: 24px;
  color: #ff6c58;
`;

