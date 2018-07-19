import React from 'react';
import { Redirect } from 'react-router-dom';
import validator from 'validator';
import { LoginContainer } from '../../components/LoginForm/styled';
import { ForgotPasswordWrap } from '../../components/ForgotPasswordForm/styled';

export default class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: { value: '', isValid: false, message: '' },
    };
  }
  render() {
    return (
      <LoginContainer.SocialMediaSignup>
        <LoginContainer.Container>

          <LoginContainer.Heading>Reset Your Password</LoginContainer.Heading>

          <LoginContainer.InputFieldsWrapper>
            <LoginContainer.InputContainer>
             
              <ForgotPasswordWrap>
                <LoginContainer.ButtonWrapper >
                  <LoginContainer.SignIn
                    onClick={this.onForgotPassword}
                    disabled={this.props.loading}
                  >Reset Password
                      </LoginContainer.SignIn>
                </LoginContainer.ButtonWrapper>
              </ForgotPasswordWrap>

            </LoginContainer.InputContainer>

          </LoginContainer.InputFieldsWrapper>
        </LoginContainer.Container>
      </LoginContainer.SocialMediaSignup>
    );
  }
}
