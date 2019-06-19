import styled from 'styled-components';
import { media } from 'styles/mediaQueries';
import { Form, Wrapper } from '../../styled';

export const FormContainer = styled(Form)``;

export const Wrap = styled(Wrapper)`
  width: 497px;
  .note {
    font-size: 16px;
    font-family: Gilroy-Light;
    color: #707070;
    width: 256px;
    margin: 0 auto;
    text-align: center;
    ${media.webView}{
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
    cursor: pointer;
    ${media.webView}{
      width: 400px;
    }
  }
`;
