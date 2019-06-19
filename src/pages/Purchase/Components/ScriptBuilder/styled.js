import styled from 'styled-components';
import { FlexCenter } from 'styles/CommonStyled';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  height: 97%;
  padding: 0;
  margin: 0 auto;
  p {
    font-size: 12px;
    text-align: center;
    font-family: Gilroy;
    color: #4b4b4b;
    .bluetext {
      color: #2f839d;
      font-weight: 700;
      cursor: pointer;
    }
  }
  button {
    margin-top: 5px;
    margin-bottom: 25px;
  }
  .script {
    color:#2f839d;
  }

  &.content-wrapper {
    display: flex;
    flex-direction: column;

    & > section:first-child {
      max-width: 100%;
      width: 100%;
      padding: 0 20px;
      margin: 0 auto 15px;
      & > section:nth-child(2) {
        width: 100%;
        max-width: 100%;
        margin: 0;
        padding: 18px 20px;
        min-width: inherit;

        ${media.webView} {
          margin: 0 20px;
        }

        p {
          max-width: 100%;
        }
      }
    }
    & > section:nth-child(2) {
      padding: 0 20px;
      ${media.webView} {
        padding: 0 40px;
      }
    }
  }

  &.content-wrapper > *:not(.button-wrapper) {
    flex: 0 0 auto;
  }

  &.content-wrapper > .button-wrapper {
    flex: 1 0 auto;
  }


  &.content-wrapper > .button-wrapper .continue-button {
    align-self: flex-end
  }
`;

export const FlexBoxCenter = styled(FlexCenter)`
  padding: 15px 90px;
  ${media.realMobile} {
    max-width: 100%;
    width: 100%;
    padding: 0 30px;
    margin: 0;

    p {
      text-align: left;
      max-width: 100%;
    }
  }
  &.private-checkbox{
    padding: 15px 90px 5px;

    ${media.mobileScreen} {
      padding: 15px 70px 5px
    }

    label {
      font-family: Gilroy;
      ${media.mobileScreen} {
        margin-bottom: 0;
      }
    }
  } 
`;

export const TextAreaWrapper = styled.section`
  display: flex;
  justify-content: center;
  height: 90px;
  padding: 0 50px;
  ${media.realMobile} {
    padding: 0;
  }
  margin: 10px 0;
  ${media.realMobile} {
    margin: 10px 20px 0;
  }
  textarea {
    width: 100%;
    border-radius: 10px;
    border: solid 1px #e0e0e0;
    resize: none;
    padding: 15px;
    max-width: 425px;
    font-family: Gilroy;
    font-size: 14px;
    color: #b7b7b7;
    line-height: 18px;
    @media (max-width: 831px) {
      padding: 10px;
    }
    :focus {
      outline: none;
    }
    ::placeholder {
      color: #b7b7b7;
      white-space:pre-line;
    }
    :-ms-input-placeholder {
      color: #b7b7b7;
      white-space:pre-line;
    }
    ::-ms-input-placeholder {
      color: #b7b7b7;
      white-space:pre-line;
    }
  }
`;
