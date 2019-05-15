import styled from 'styled-components';
import { FlexCenter } from 'styles/CommonStyled';

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
    margin-left: 37px;
  }
`;

export const FlexBox = styled(FlexCenter)`
  position: absolute;
  bottom: 61px;
`;
