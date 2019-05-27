import styled from 'styled-components';
import { FlexCenter } from 'styles/CommonStyled';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  max-width: 330px;
  margin: 0 auto;
  padding-top: 10px;
  .termsWrapper {
    display: flex;
    font-family: Gilroy;
    font-size: 16px;
    color: #797979;
  }
  .continue-btn {
    ${media.webView} {
      margin-left: 37px;
    }
  }
`;

export const FlexBox = styled(FlexCenter)`
  margin-top: 40px;
  margin-bottom: 60px;
`;
