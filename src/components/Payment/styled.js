import styled from 'styled-components';
import { media } from '../../styles/mediaQueries';

import { injectGlobal } from 'styled-components';
injectGlobal`
  .headerGlobal {
    background: #fff;
    height:120px;
    padding: 48px 40px 0;
    :after{
      display:none;
    }
  }
  .contentPadding{
    padding-top:0;
    height: calc(100% - 100px);
  }
  .svg-inline--fa {
    color: #707070 !important;
  }
`;

export const Layout = styled.section`
  max-width: 320px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 40px;
  ${media.webView} {
    max-width: 400px;
  }
`;
