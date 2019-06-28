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
  }
  .termsWrapper {
    display: flex;
    font-family: Gilroy;
    font-size: 16px;
    color: #797979;
    padding-bottom: 20px;
    ${media.mobileScreen} {
      padding: 0 20px 20px;
      height: calc(100% - 65px);
      overflow: auto;
    }
    p {
      p {
        font-size: 12px;
        line-height: 16px;

        &:not(:last-child) {
          margin-bottom: 5px;
        }
      }
    }
  }
  .continue-btn {
    height: 60px;
    margin-bottom: 25px;
    align-self: flex-end;
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
      padding-top: 20px;
    }
  }


  &.content-wrapper > .button-wrapper .continue-button {
    align-self: flex-end
  }
`;

export const FlexBox = styled(FlexCenter)`
  margin-top: 40px;
  margin-bottom: 60px;
`;
