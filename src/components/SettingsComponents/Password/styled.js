import styled from 'styled-components';
import { media } from 'styles/mediaQueries';
import { Form, Wrapper } from '../styled';

export const FormContainer = styled(Form)`
  .inputWrapper {
    position: relative;
    margin-bottom: 52px;
    :last-of-type {
      margin-bottom: 0;
    }
    .show-password {
      position: absolute;
      right: 0;
      width: 70px;
      text-align: center;
      font-size: 14px;
      color: #2f839d;
      font-family: Gilroy;
      top: 0;
    }
    .input-field {
      margin-right: 72px;
      padding-left: 70px;
    }
  }
`;

export const InputLabel = styled.span`
  width: 100%;
  display: inline-block;
  font-size: 14px;
  ${media.webView} {
    font-size: 12px;
  }
  color: ${props => (props.error ? '#980100' : '#555555')};
  font-family: Gilroy;
  text-align: center;
  padding-bottom: 10px;
`;

export const Wrap = styled(Wrapper)`
  .note {
    font-size: 14px;
    font-family: Gilroy;
    color: #999;
    text-align: center;
    padding-top: 8px;
    max-width: 330px;
    margin: 0 auto;
    ${media.webView} {
      max-width: 100%;
    }
  }
  .button {
    margin-top: 30px;
  }
  .error-msg {
    font-size: 14px;
    font-family: Gilroy;
    color: #980100;
  }
`;
