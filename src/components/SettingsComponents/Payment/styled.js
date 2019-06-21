import styled from 'styled-components';
import { media } from 'styles/mediaQueries';
import { Form, Wrapper } from '../styled';

export const FormContainer = styled(Form)``;

export const Wrap = styled(Wrapper)`
  .note {
    font-size: 16px;
    font-family: Gilroy-Light;
    color: #707070;
    width: 256px;
    margin: 0 auto;
    text-align: center;
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
    margin-top: 30px;
    padding-left: 30px;
    border-radius: 10px;
    width: 298px;
    border: 1px #2f839d dashed;
    height: 55px;
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
