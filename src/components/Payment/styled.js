import styled from 'styled-components';
import { media } from '../../styles/mediaQueries';

export const Layout = styled.section`
  max-width: 320px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 40px;
  ${media.webView} {
    max-width: 400px;
  }
`;
