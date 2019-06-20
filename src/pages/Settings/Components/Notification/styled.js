import styled from 'styled-components';
import { media } from 'styles/mediaQueries';
import { Form, Wrapper } from '../../styled';

export const FormContainer = styled(Form)``;

export const Wrap = styled(Wrapper)`
  width: 278px;
  ${media.webView} {
    width: 398px;
  }

  .termsWrapper {
    display: flex;
    font-family: Gilroy;
    font-size: 16px;
    color: #797979;
    padding-bottom: 20px;
    p {
      p:not(:last-child) {
        margin-bottom: 8px;
        font-size: 12px;
        line-height: 2;
      }
    }
  }
  .head-text {
    font-family: Gilroy;
    font-size: 18px;
    line-height: 21px;
    color: #555;
    margin-bottom: 20px;
    display: block;
  }
  .sub-text {
    font-family: Gilroy;
    font-size: 18px;
    line-height: 21px;
    color: #555;
  }
  .main-text {
    font-family: Gilroy-Light;
    font-size: 14px;
    line-height: 21px;
    color: #555;
    padding-left: 2px;
  }
`;
