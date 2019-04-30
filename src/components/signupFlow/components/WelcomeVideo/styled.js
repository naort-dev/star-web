import styled from 'styled-components';
import { media } from '../../../../styles/mediaQueries';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  .leftArrow {
    left: 30px;
    top: 10px;
    position: absolute;
  }
`;
export const Heading = styled.div`
  text-align: center;
  color: #ff6c58;
  font-size: 24px;
  font-family: 'Gilroy-Medium';
  padding-top: 72px;
  ${media.webView} {
    padding-top: 16px;
  }
`;

export const Wrapper = styled.section`
  width: 100%;
  height: calc(100% - 146px) !important;
  ${media.webView} {
    height: calc(100% - 80px) !important;
  }
`;
