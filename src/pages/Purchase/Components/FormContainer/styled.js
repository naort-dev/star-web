import styled from 'styled-components';
import { media } from '../../../../styles/mediaQueries';

export const Layout = styled.section`
  height: 100%;
  .custom {
    width: 422px;
    border-radius: 5px;
    ${media.mobileScreen} {
      width: 300px;
    }
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
`;
Layout.EventStep2 = styled.div`

`;
