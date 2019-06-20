import styled from 'styled-components';
import { media } from '../../styles/mediaQueries';
import { FlexBoxSB } from '../../styles/CommonStyled';


export const Content = styled.section`
  position: relative;
  height: calc(100% - 197px);
  ${media.mobileScreen} {
    height: calc(100% - 218px);
  }
  .scrollRenderView {
    overflow: auto !important;
    margin: 0 !important;
  }
`;

export const ModalContainer = styled.section`
  overflow: hidden;
  height: 100%;
  .customScroll {
    height: calc(100% - 80px) !important;

    & > div {
      overflow: auto !important;
    }
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
