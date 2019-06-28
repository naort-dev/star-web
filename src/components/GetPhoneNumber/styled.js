import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  height: 100%;
  width: 100%;
  .closeBtn {
    position: absolute;
    right: 40px;
    top: 34px;
    font-size: 50px;
    z-index: 1;
    ${media.webView} {
      top: 49px;
    }
  }
  .PhoneNoImg {
    background: url(assets/images/art_highfive.svg) no-repeat;
    display: inline-block;
    background-size: contain;
    width: 196px;
    height: 202px;
    ${media.webView} {
      width: 260px;
      height: 267px;
    }
  }
  .successScroll {
    margin-top: 87px;
    height: calc(100% - 87px) !important;
    display: inline-block;
    ${media.webView} {
      margin-top: 39px;
      height: calc(100% - 39px) !important;
    }
  }
`;
export const Content = styled.section`
  max-width: 319px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-family: Gilroy;
  padding-bottom: 10px;
  ${media.webView} {
    max-width: 400px;
  }
  .firstTitle {
    color: #ff6c58;
    padding-bottom: 3px;
    padding-top: 15px;
    font-size: 20px;
    padding-top: 0;
    ${media.webView} {
      padding-top: 33px;
      padding-bottom: 10px;
    }
  }
  .otpTitle {
    color: #ff6c58;
    padding-bottom: 8px;
    font-size: 26px;
    padding-top: 30px;
    ${media.webView} {
      padding-top: 160px;
    }
  }
  .orderSuccess {
    color: #ff6c58;
    font-size: 40px;
    line-height: 39px;
    width: 220px;
    margin: 0 auto;
    padding-bottom: 29px;
    ${media.webView} {
      width: 100%;
      font-size: 34px;
    }
  }
  .note {
    font-family: Gilroy;
    font-size: 16px;
    line-height: 21px;
    text-align: center;
    color: #7c7c7c;
    width: 100%;
    margin: 0px auto;
  }
  .browseBtn {
    width: 300px;
    height: 60px;
  }
  .skip {
    display: inline-block;
    width: 100%;
    text-align: center;
    padding-top: 12px;
    color: #615195;
    cursor: pointer;
    font-family: Gilroy;
    font-size: 14px;
  }
`;

Layout.Phonenumber = styled.div`
  padding-bottom: 38px;
  padding-top: 39px;
  @media (max-width: 831px) {
    padding-bottom: 10px;
    padding-top: 10px;
  }
  .react-phone-number-input {
    border-bottom: 1px solid #c5d2e0;
    margin-bottom: 10px;
  }
  .react-phone-number-input__icon {
    width: 32px;
    height: 22px;
    border: none;
  }
  .errorElement {
    color: #990000;
    /* margin-left: 45px; */
    margin-top: -4px;
    font-family: Gilroy;
    font-size: 14px;
    line-height: 25px;
  }
`;
Layout.Image = styled.div`
  display: block;
  background-color: #d3e7ef;
  background: ${props => props.imageUrl && `url(${props.imageUrl})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  height: 228px;
  width: 200px;
  margin-bottom: 0;
`;
Layout.ButtonWrapper = styled.div``;
Content.OtpSubTitle = styled.div`
  font-family: Gilroy;
  font-size: 15px;
  text-align: center;
  max-width: 410px;
  line-height: 22px;
  color: #7c7c7c;
`;
Content.Resend = styled.div`
  font-family: Gilroy;
  font-size: 15px;
  text-align: center;
  max-width: 410px;
  color: #615195;
  line-height: 22px;
  cursor: pointer;
`;
Content.OTPWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  & .errorElement {
    color: red;
    margin-top: 7px;
    margin-bottom: 2px;
    font-size: 12px;
  }
`;

Content.WrapsInput = styled.div`
  width: 40px;
  padding-right: 8px;
  input {
    font-family: Gilroy;
    font-size: 22px;
    text-align: center;
    color: #8174aa;
    padding: 8px 0 0;
    -moz-appearance: textfield;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;
Content.OtpSubTitleWrapper = styled.div`
  margin-bottom: 25px;
  margin-top: 25px;
  display: flex;
  justify-content: center;
`;
Content.Error = styled.p`
  color: #990000;
  margin-top: 7px;
  margin-bottom: 2px;
  font-size: 14px;
  line-height: 25px;
`;

export const FloatLabel = styled.section`
  position: relative;
  .react-phone-number-input {
    padding-top: 18px;
  }
  input {
    position: relative;
    display: block;
    width: 100%;
    border: none;
    padding-right: 40px;
    font-family: Gilroy-Medium;
    font-size: 22px;
    color: #8174aa !important;
    text-align: center;
    background-color: transparent;
    margin: 0px auto;
    height: 32px;
    outline: none !important;
    color: rgba(0, 0, 0, 0.8);
  }
  ::-webkit-input-placeholder {
    text-align: right;
    color: #ddd;
    font-size: 13px;
    font-weight: 200;
  }
  :-moz-placeholder {
    text-align: right;
    color: #ddd;
    font-size: 13px;
    font-weight: 200;
  }
  ::-moz-placeholder {
    text-align: right;
    color: #ddd;
    font-size: 13px;
    font-weight: 200;
  }
  :-ms-input-placeholder {
    text-align: right;
    color: #ddd;
    font-size: 13px;
    font-weight: 200;
  }

  label {
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    display: block;
    width: 100%;
    height: 52px;
    line-height: 72px;
    font-family: Gilroy-Medium;
    font-size: 18px;
    font-weight: 200;
    background: transparent;
    color: rgba(0, 0, 0, 0.6);
    margin: 0px auto;
    cursor: text;
    transition: all 0.15s ease-in-out;
  }
  input:hover,
  input:focus {
    border-color: #8174aa;
  }
  input:focus {
    background-position: left bottom;
    background-size: 100% 1px;
  }

  .react-phone-number-input--focus {
    border-color: #8174aa !important;
    border-width: 2px;
    outline: none !important;
    background-color: transparent;
    background: -webkit-linear-gradient(bottom, #8174aa 50%, #8174aa 50%);
    background: linear-gradient(to top, #8174aa 50%, #8174aa 50%);
    background-position: left bottom;
    background-size: 0 1px;
    background-repeat: no-repeat;
    transition: all 0.3s ease-in-out;
  }

  .react-phone-number-input--focus + label {
    height: 20px;
    line-height: 20px;
    font-size: 11px;
  }
  ${props =>
    props.valid &&
    `label {
    height: 20px;
    line-height: 20px;
    font-size: 11px;
  }`}

  input:focus ::-webkit-input-placeholder {
    color: transparent;
    font-size: 0;
  }
  input:focus :-moz-placeholder {
    color: transparent;
    font-size: 0;
  }
  input:focus ::-moz-placeholder {
    color: transparent;
    font-size: 0;
  }
  input:focus :-ms-input-placeholder {
    color: transparent;
    font-size: 0;
  }
`;
