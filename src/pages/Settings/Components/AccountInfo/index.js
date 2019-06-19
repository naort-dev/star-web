import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'components/TextField';
import { Layout, Wrapper, Form, InputLabel } from './styled';

const AccountInfo = props => {
  const [formData, updateFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [errorObject, updateErrorObj] = useState({
    firstNameErr: false,
    lastNameErr: false,
    emailErr: false,
    formValid: false,
  });

  const inputChange = state => event => {
    updateFormData({
      ...formData,
      [state]: event.target.value,
    });
  };

  const getTextInput = ({ placeholder, state, value, error, errorMsg }) => {
    return (
      <TextInput
        placeholder={placeholder}
        onChange={inputChange(state)}
        value={value}
        InputProps={{
          classes: { input: 'input-field' },
        }}
        InputLabelProps={{ classes: { root: 'float-label' } }}
        nativeProps={{}}
      />
    );
  };
  return (
    <Layout>
      <Wrapper>
        <h2 className="sub-head">Account Information</h2>
        <Form>
          <InputLabel>Use your real name so we can pay you</InputLabel>
          <section className="row-wrap">
            {getTextInput({
              placeholder: 'First Name',
              state: 'firstName',
              value: formData.firstName,
              error: errorObject.firstNameErr,
              errorMsg: 'Enter valid full name',
            })}
            {getTextInput({
              placeholder: 'Last Name',
              state: 'lastName',
              value: formData.lastName,
              error: errorObject.lastNameErr,
              errorMsg: 'Enter valid full name',
            })}
          </section>
          <InputLabel>Email address</InputLabel>
          {getTextInput({
            placeholder: 'Email',
            state: 'email',
            value: formData.email,
            error: errorObject.emailErr,
            errorMsg: 'Enter valid full name',
          })}
        </Form>
      </Wrapper>
    </Layout>
  );
};

AccountInfo.propTypes = {};

export default AccountInfo;
