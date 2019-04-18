import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import { media } from '../../styles/mediaQueries';
import { FlexBoxSB } from '../../styles/CommonStyled';

export const DialogStyled = styled(Dialog)`
  .body {
    width: 700px;
    height: 700px;
    max-width: 100%;
    font-family: Gilroy-Light;
    ${media.mobileScreen} {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: 0;
    }
  }
  .paperScroll {
    ${media.mobileScreen} {
      max-height: 100%;
    }
  }
`;

export const Content = styled.section`
  position: relative;
  padding-top: 30px;
  height: calc(100% - 157px);
  ${media.mobileScreen} {
    padding-top: 70px;
    height: calc(100% - 200px);
  }
`;

export const ModalContainer = styled.section`
  overflow: hidden;
  height: 100%;
  .customScroll {
    height: calc(100% - 80px) !important;
  }
`;

export const FlexBoxSBC = styled(FlexBoxSB)`
  align-items: center;
`;

export const FlexCenter = styled.section`
  display: flex;
  justify-content: center;
`;

export const FormContent = styled.section`
  height: calc(100% - 150px);
`;


