import React, { useState, useRef } from 'react';
import validator from "validator";
import PropTypes from 'prop-types';

import { TextInput } from '../TextField'
import  PrimaryButton from '../PrimaryButton'
import { CloseButton, FlexCenter } from '../../styles/CommonStyled';
import { Layout, Content } from './styled';
import { parseQueryString } from '../../utils/dataformatter';

const ConfirmPassword = props => {
  const [passwordDetails, setPasswordDetails] = useState({
    password: { value: "", isValid: false, message: "" },
    confirmPassword: { value: "", isValid: false, message: "" },
    errorMsg: "",
    redirect: false
  });

  const handleFieldChange = (value, type) => {
    setPasswordDetails({
      ...passwordDetails,
      [type]: { ...passwordDetails[type], value },
    });
  };

  const checkPassword = () => {
    const pattern = /^(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/; // Accepts values with min 8 characters, atleast one number and atleast one symbol
    if (validator.isEmpty(passwordDetails.password.value)) {
      setPasswordDetails({
        ...passwordDetails,
        password: { ...passwordDetails.password, message: "Enter a  password" }
      });
      return false;
    }
    if (!pattern.test(passwordDetails.password.value)) {
      setPasswordDetails({
        ...passwordDetails,
        password: {
          ...passwordDetails.password,
          message: "Enter a valid password must contain atleast one symbol"
        }
      });
      return false;
    }
    setPasswordDetails({
      ...passwordDetails,
      password: { ...passwordDetails.password, message: "", isValid: true }
    });
    checkConfirmPassword();
    return true;
  };

  const checkConfirmPassword = () => {
    if (
      passwordDetails.password.value !== "" &&
      passwordDetails.password.value === passwordDetails.confirmPassword.value
    ) {
      setPasswordDetails({
        ...passwordDetails,
        confirmPassword: {
          ...passwordDetails.confirmPassword,
          message: "",
          isValid: true
        }
      });
    } else {
      setPasswordDetails({
        ...passwordDetails,
        confirmPassword: {
          ...passwordDetails.confirmPassword,
          message: "The passwords entered do not match!",
          isValid: false
        }
      });
    }
  };

  const submitPassword = (e) => {
    e.preventDefault();
    if (checkPassword()) {
      if ( !passwordDetails.password.isValid && passwordDetails.confirmPassword.isValid && window.location.search) {
        const queryString = window.location ? parseQueryString(window.location.search): ''; 
        props.onResetPassword(passwordDetails.password.value, queryString.reset_id, queryString.user_id);
      } else {
        checkPassword();
      }
    }
  };

  return(
    <Layout>
      <CloseButton className="close" />
      <Content>
        <h1 className="firstTitle">{props.title1}</h1>
        {props.title2 && <h1 className="orderSuccess">{props.title2}</h1>}
        <FlexCenter className="alignPassword">
          <Content.WrapsInput>
            <TextInput
              placeholder={props.input_txt_1}
              type="password"
              name="password"
              value={passwordDetails.password.value}
              fullWidth= "true"
              error={passwordDetails.password.message}
              onChange={event => {  
                handleFieldChange(event.target.value, 'password');
              }}
              onBlur={checkPassword}
              InputProps={{
                classes: {
                  error:'error-field',
                },
              }}
            />
          </Content.WrapsInput>
          <Layout.ErrorMsg>
            {passwordDetails.password.message }
          </Layout.ErrorMsg>
          <Content.WrapsInput>
            <TextInput
              placeholder={props.input_txt_2}
              type="password"
              name="confirmPassword"
              fullWidth= "true"
              error={passwordDetails.confirmPassword.message}
              value={passwordDetails.confirmPassword.value}
              onChange={event => {
                handleFieldChange(event.target.value, 'confirmPassword');
              }}
              onBlur={checkConfirmPassword}
              InputProps={{
                classes: {
                  error:'error-field',
                },
              }}
            />
          </Content.WrapsInput>
          <Layout.ErrorMsg>
            {passwordDetails.confirmPassword.message}
          </Layout.ErrorMsg>
        </FlexCenter>
          <Content.SubTitle>
            {props.sub_title}
          </Content.SubTitle>
          <Layout.ErrorMsg>
            {passwordDetails.errorMsg }
          </Layout.ErrorMsg>
          <Layout.ButtonWrapper className="align-center">
            <PrimaryButton
              className="SubmitPhoneNoBtn"
              onClick={(event) => submitPassword(event)}
            >
              {props.button_txt}
            </PrimaryButton>
          </Layout.ButtonWrapper>
        </Content>
      </Layout>
  );
}

export default ConfirmPassword;