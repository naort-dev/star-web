import styled from 'styled-components';

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
    color: #8174aa;
    text-align: center;
    background-color: transparent;
    margin: 0px auto;
    height: 32px;
    outline: none !important;
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
    font-family: Gilroy;
    font-size: 18px;
    background: transparent;
    color: #aaa;
    margin: 0px auto;
    cursor: text;
    transition: all 0.15s ease-in-out;
  }
  input:hover,
  input:focus {
    border-color: ${props => props.theme.flatBlue};
  }
  input:focus {
    background-position: left bottom;
    background-size: 100% 1px;
  }

  .react-phone-number-input--focus {
    border-bottom: ${props =>
      !props.error && `2px solid #2f839d !important`};
    outline: none !important;
    background-color: transparent;
    background: -webkit-linear-gradient(top, #2f839d 50%, #2f839d 50%);
    background: linear-gradient(to top, #2f839d 50%, #2f839d 50%);
    background-position: left bottom;
    background-size: 0 1px;
    background-repeat: no-repeat;
    transition: all 0.3s ease-in-out;
  }

  .react-phone-number-input--focus + label {
    line-height: 15px;
    font-size: 13px;
    margin-top: -5px;
  }
  ${props =>
    props.valid &&
    `label {
      line-height: 15px;
      font-size: 13px;
      margin-top: -5px; 
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

export const Error = styled.span`
  color: #990000;
  font-family: Gilroy;
  font-size: 12px;
  line-height: 25px;
`;

export const Wrapper = styled.section`
  .react-phone-number-input {
    margin-bottom: 10px;
    ${props =>
      props.error
        ? `border-bottom: 2px solid #980100`
        : `border-bottom: 1px solid #c5d2e0`};
  }
`;
