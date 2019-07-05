import styled from 'styled-components';
import { FlexCenter } from 'styles/CommonStyled';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  width: 100%;
  height: calc(100% - 15px);
  max-width: calc(100% - 80px);
  margin: 0 auto;
  padding-top: 10px;
  ${media.mobileScreen} {
    max-width: 100%;
    height: 100%;
  }
  .contentPadding {
    ${media.mobileScreen} {
      height: calc(100% - 178px) !important;
    }
  }
  .termsWrapper {
    display: flex;
    font-family: Gilroy;
    font-size: 16px;
    color: #797979;
    padding-bottom: 20px;
    ${media.mobileScreen} {
      padding: 0 20px 20px;
      height: calc(100% - 88px) !important;
      overflow: auto;
    }
    ${media.webView} {
      height: calc(100% - 115px) !important;
      overflow: auto;
    }
    .terms-text {
      p {
        font-size: 12px;
        line-height: 16px;

        &:not(:last-child) {
          margin-bottom: 5px;
        }
      }
    }
    .custom-font {
      p {
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
  #terms-scroll > div {
    padding-right: 15px;
    ${media.mobileScreen} {
      padding-right: 15px;
      padding-left: 15px;
    }
  }
  .continue-btn {
    height: 60px;
    margin-bottom: 10px;
    align-self: flex-end;
    ${media.webView} {
      margin-bottom: 40px;
    }
  }
  &.content-wrapper {
    display: flex;
    flex-direction: column;
  }

  &.content-wrapper > *:not(.button-wrapper) {
    flex: 0 0 auto;
    width: 100%;
  }

  &.content-wrapper > .button-wrapper {
    flex: 1 0 auto;
    display: flex;
    margin: 0;
    ${media.mobileScreen} {
      padding-top: 10px;
    }
  }

  &.content-wrapper > .button-wrapper .continue-button {
    align-self: flex-end;
  }
`;

export const FlexBox = styled(FlexCenter)`
  margin-top: 40px;
  margin-bottom: 60px;
`;
