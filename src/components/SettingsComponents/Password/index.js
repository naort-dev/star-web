import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { TextInput } from 'components/TextField';
import { FlexCenter } from 'styles/CommonStyled';
import Button from 'components/PrimaryButton';
import { Container } from '../styled';
import { FormContainer, Wrap } from './styled';

const Password = props => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, updateFormData] = useState({
    password: '',
    confirmPasswd: '',
  });

  const [errorObject, updateErrorObj] = useState({
    passwordErr: false,
    confirmPasswdErr: false,
    formValid: false,
    passwordSame: false,
  });

  const showPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = value => {
    const regX = /^(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    if (regX.test(value)) {
      return true;
    }
    return false;
  };

  const validateFields = (event, errorState) => {
    const { value } = event.target;
    const state = errorState === 'passwordErr' ? 'confirmPasswd' : 'password';
    updateErrorObj({
      ...errorObject,
      [errorState]: !validatePassword(value),
      passwordSame: formData[state] !== value && !isEmpty(formData[state]),
    });
  };

  const inputChange = ({ state }) => event => {
    updateFormData({
      ...formData,
      [state]: event.target.value,
    });
  };

  const handleBlur = ({ errorState }) => event => {
    validateFields(event, errorState);
  };

  const saveChanges = () => {
    props.passwordUpdate({ new_password: formData.password });
  };

  const validateForm = () => {
    const formValid = [
      validatePassword(formData.password),
      validatePassword(formData.confirmPasswd),
      formData.password === formData.confirmPasswd,
    ].every(condition => condition);
    updateErrorObj({ ...errorObject, formValid });
  };

  useEffect(() => {
    validateForm();
  }, [errorObject, formData]);

  const getInput = ({
    placeholder,
    state,
    value,
    error,
    errorState,
    isShow,
  }) => {
    return (
      <section className="inputWrapper">
        <TextInput
          type={isShow && showPassword ? 'text' : 'password'}
          error={error}
          placeholder={placeholder}
          onChange={inputChange({ state, errorState })}
          onBlur={handleBlur({ state, errorState })}
          value={value}
          InputProps={{
            classes: { error: 'error-field', input: 'input-field' },
          }}
          InputLabelProps={{ classes: { root: 'float-label' } }}
          nativeProps={{}}
        />
        {isShow && (
          <span
            className="show-password"
            onClick={showPasswordClick}
            role="presentation"
          >
            {showPassword ? 'Hide Password' : 'Show Password'}
          </span>
        )}
        {errorObject[errorState] && (
          <span className="error-msg">Please enter a valid password</span>
        )}
      </section>
    );
  };

  return (
    <Container className="popstyle-wrap">
      <Wrap className="popstyle-inner password-update">
        <h2 className="sub-head">{props.webHead}</h2>
        <FormContainer autoComplete="off">
          {getInput({
            placeholder: props.labels.password,
            state: 'password',
            value: formData.password,
            error: errorObject.passwordErr,
            errorState: 'passwordErr',
            isShow: props.showPasswd,
          })}

          {getInput({
            placeholder: props.labels.confirmPasswd,
            state: 'confirmPasswd',
            value: formData.confirmPasswd,
            error: errorObject.confirmPasswdErr,
            errorState: 'confirmPasswdErr',
          })}
        </FormContainer>
        {errorObject.passwordSame &&
          !errorObject.passwordErr &&
          !errorObject.confirmPasswdErr && (
            <span className="error-msg">
              Password and confirm password should be same
            </span>
          )}
        <p className="note">{props.labels.hint}</p>
        <FlexCenter>
          <Button
            className="button"
            disabled={!errorObject.formValid}
            isDisabled={!errorObject.formValid}
            onClick={saveChanges}
          >
            {props.labels.buttonLbl}
          </Button>
        </FlexCenter>
      </Wrap>
    </Container>
  );
};

Password.propTypes = {
  passwordUpdate: PropTypes.func.isRequired,
  webHead: PropTypes.string,
  labels: PropTypes.object.isRequired,
  showPasswd: PropTypes.bool,
};
Password.defaultProps = {
  webHead: '',
  showPasswd: false,
};

export default Password;
