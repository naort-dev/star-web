import styled from 'styled-components';
import { media } from 'styles/mediaQueries';
import { Form, Wrapper } from '../styled';

export const FormContainer = styled(Form)``;

export const Wrap = styled(Wrapper)`
  width: 497px;
  .note-payment {
    font-size: 16px;
    font-family: Gilroy-Light;
    color: #707070;
    width: 256px;
    margin: 0 auto;
    text-align: center;
    line-height: 22px;
    &:before {
      content: attr(data-mob);
      ${media.webView} {
        content: attr(data-web);
      }
    }
    ${media.webView} {
      width: 100%;
      text-align: left;
    }
  }
  .button {
    margin-top: 22px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 10px;
    width: 298px;
    font-size: 16px;
    border: 1px #707070 dashed;
    color: #2f839d;
    height: 54px;
    display: flex;
    align-items: center;
    &:before {
      content: attr(data-mob);
      ${media.webView} {
        content: attr(data-web);
      }
    }
    cursor: pointer;
    ${media.webView} {
      width: 400px;
    }
  }
`;
