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
    position: absolute;
  }
  .dots-container {
    @media (max-width: 831px) {
      display: ${props => (props.compSwitch ? 'none' : 'block')};
    }
  }
`;
export const Heading = styled.div`
  text-align: center;
  color: #ff6c58;
  font-size: 24px;
  font-family: 'Gilroy-Medium';
  padding-top: 72px;
  ${media.webView} {
    padding-top: 38px;
  }
`;

export const Wrapper = styled.section`
  width: 100%;
  height: calc(100% - 146px) !important;
`;
