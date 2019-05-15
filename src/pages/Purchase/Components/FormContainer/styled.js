import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  height: 100%;
  max-width: 318px;
  margin: 0 auto;
  ${media.webView} {
    max-width: 423px;
  }
  .custom {
    border-radius: 5px;
    ul {
      min-height: 50px;
      max-height: 260px;
    }
    .customPlaceholder {
      text-align: center;
    }
  }
  .continue-button {
    height: 60px;
  }
  .cus-drop {
    width: 100%;
  }
`;
Layout.EventStep2 = styled.div`
  padding-top: 40px;
  min-height: 240px;
`;
