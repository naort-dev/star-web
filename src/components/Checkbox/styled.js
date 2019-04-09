import styled from 'styled-components';

export const CheckboxWrapper = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-family: Gilroy;
  font-size: 16px;
  padding-top: 5px;
  color: #797979;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #fff;
    border: 1px solid #d5d5d5;
  }

  :hover input ~ .checkmark {
    background-color: #ccc;
  }

  input:checked ~ .checkmark {
    background-color: #fff;
  }

  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  input:checked ~ .checkmark:after {
    display: block;
  }

  .checkmark:after {
    left: 8px;
    top: 3px;
    width: 5px;
    height: 11px;
    border: solid #ff6c58;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;
