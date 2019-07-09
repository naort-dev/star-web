import styled from 'styled-components';
import { media } from 'styles/mediaQueries';
import { Form } from '../styled';

export const FormContainer = styled(Form)`
  .row-wrap {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-bottom: 54px;

    ${media.mobileScreen} {
      width: 232px;
      margin: 0 auto;
    }
    ${media.webView} {
      justify-content: space-between;
      flex-direction: row;
      padding-bottom: 30px;
      padding-left: 0;
      padding-right: 0;
    }
    .inputWrapper {
      padding-bottom: 13px;
      width: 100%;
      ${media.webView} {
        width: 48%;
      }
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

export const PhoneWrap = styled.section`
  padding-top: 32px;
  .react-phone-number-input {
    ${props =>
      props.error
        ? `border-bottom: 2px solid #980100`
        : `border-bottom: 1px solid rgba(0, 0, 0, 0.42)`};
    margin-bottom: 0;
    input {
      color: #615195 !important;
    }
  }
  .ph-label {
    padding-bottom: 0;
  }
`;
