import styled from 'styled-components';
import { Card } from 'styles/CommonStyled';
import { media } from 'styles/mediaQueries';

export const Layout = styled(Card)`
  width: 700px;
  height: 717px;
  .sub-head {
    font-size: 24px;
    font-family: Gilroy;
    color: #ff6c58;
    text-align: center;
  }
  display: flex;
  justify-content: center;
`;

export const Wrapper = styled.section`
  width: 422px;
  ${media.webView} {
    padding-top: 59px;
  }
`;

export const Form = styled.section`
  .input-field {
    text-align: center;
    width: 100%;
  }
  .row-wrap {
    .MuiFormControl {
      width: 48%;
    }
  }
`;
export const InputLabel = styled.span`
  width: 100%;
  display: inline-block;
  font-size: 12px;
  color: #555555;
  font-family: Gilroy;
  text-align: center;
`;
