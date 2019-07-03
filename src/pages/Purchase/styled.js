import styled from 'styled-components';
import { media } from '../../styles/mediaQueries';
import { FlexBoxSB } from '../../styles/CommonStyled';


export const Content = styled.section`
  position: relative;
  height: calc(100% - 205px);
  ${media.mobileScreen} {
    height: calc(100% - 198px);
  }
  &.custom-video{
    ${media.mobileScreen} {
      height: calc(100% - 158px);
    }
  }
  &.custom-terms {
    ${media.mobileScreen} {
      height: calc(100% - 178px);
    }
  }
  .scrollRenderView {
    overflow: auto !important;
    height: 100%;
  }
  .audio-wrap:last-child{
    .pronounce-wrap  {
      @media (max-width: 831px) {
        margin-bottom: -25px;
        margin-top: -20px;
      }
    }
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
