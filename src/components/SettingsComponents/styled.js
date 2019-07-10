import styled from 'styled-components';
import { media } from 'styles/mediaQueries';
import { Card } from 'styles/CommonStyled';

export const Container = styled(Card)`
  height: 100vh;
  width: 100%;
  border-radius: 0;
  background: #f6f6f6;
  box-shadow: none !important;
  ${media.webView} {
    width: 700px;
    height: auto;
    border-radius: 15px;
    background: #fff;
    min-height: 550px;
  }
  ${media.mobileScreen} {
    height: 100%;
  }
  display: flex;
  justify-content: center;

  .sub-head {
    &:before {
      content: attr(data-mob);
      ${media.webView} {
        content: attr(data-web);
      }
    }
    font-size: 24px;
    font-family: Gilroy-Medium;
    font-weight: normal;
    color: #ff6c58;
    text-align: center;
    padding-bottom: 35px;
    padding-top: 35px;
    ${media.webView} {
      font-size: 24px;
      padding-top: 0;
    }
  }
`;

export const Wrapper = styled.section`
  width: 400px;
  ${media.webView} {
    padding-top: 59px;
  }
  .button {
    margin-top: 38px;
    width: 322px;
  }
`;

export const Form = styled.form`
  padding-left: 20px;
  padding-right: 20px;
  ${media.webView} {
    padding-left: 0;
    padding-right: 0;
  }
  .input-field {
    text-align: center;
    font-size: 24px;
    font-family: Gilroy-Medium;
  }
  .MuiFormControl {
    width: 100%;
  }
  .error-msg {
    font-size: 14px;
    color: #990000;
    font-family: Gilroy-Medium;
  }
  .error-field {
    &:after {
      border-bottom-color: #980100 !important;
    }
  }
  input {
    &::-webkit-input-placeholder {
      color: #aaa;
      font-size: 18px;
    }
    &:-moz-placeholder {
      color: #aaa;
      font-size: 18px;
    }
    &::-moz-placeholder {
      color: #aaa;
      font-size: 18px;
    }
    &:-ms-input-placeholder {
      color: #aaa;
      font-size: 18px;
    }
  }
`;
