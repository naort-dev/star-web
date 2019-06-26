import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  .modal-head {
    padding-top: 30px;
    text-align: center;
    color: #ff6c58;
    font-size: 24px;
    font-family: Gilroy;
    ${media.webView} {
      padding-top: 50px;
    }
  }
  .crop-wrap {
    margin-top: 40px;
  }
`;
