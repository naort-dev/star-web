import React from 'react';
import { Redirect } from 'react-router-dom';
import validator from 'validator';
import Api from '../../lib/api';
import forgotPassword from '../../utils/forgotPassword';
import { LoginContainer } from '../../components/LoginForm/styled';
import { ForgotPasswordWrap } from './styled';

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: { value: '', isValid: false, message: '' },
      forgotPassword: false,
      message: '',
    };
  }
  onForgotPassword = () => {
    forgotPassword(Api.forgotPassword, { email: this.state.email.value }).then((response) => {
      this.setState({ message: response.data.data, forgotPassword: true });
    }).catch((exception) => {
      this.setState({ message: exception.response.data.error.message, forgotPassword: true });
    });
  }
  acceptEmailHandler = (e) => {
    this.setState({ email: { ...this.state.email, value: e.target.value } });
  }
  checkEmail = () => {
    const emailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/; // To check email validity

    if (validator.isEmpty(this.state.email.value)) {
      this.setState({ email: { ...this.state.email, message: 'Enter an email address ' } });
      return false;
    }
    if (!emailRegex.test(this.state.email.value)) {
      this.setState({ email: { ...this.state.email, message: 'Enter a valid email address' } });
      return false;
    }
    this.setState({ email: { ...this.state.email, message: '', isValid: true } });
    return true;
  }
  render() {
    const { email } = this.state;
    const to = this.props.redirectUrls.to || '/';
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return <Redirect to={to} />;
    }
    return (
      <LoginContainer.SocialMediaSignup>
        <LoginContainer.Container>
          <React.Fragment>
            <LoginContainer.Heading>Forgot Password or Username?</LoginContainer.Heading>

            <LoginContainer.InputFieldsWrapper>
              <LoginContainer.InputContainer>
                <LoginContainer.InputWrapper>
                  <LoginContainer.WrapsInput>
                    <LoginContainer.Input
                      type="text"
                      name="email"
                      value={email.value}
                      placeholder="Email"
                      onChange={this.acceptEmailHandler}
                      onBlur={this.checkEmail}
                    />
                    <LoginContainer.ErrorMsg>{email.message}</LoginContainer.ErrorMsg>
                  </LoginContainer.WrapsInput>
                </LoginContainer.InputWrapper>
                <ForgotPasswordWrap>
                  <LoginContainer.ButtonWrapper >
                    <LoginContainer.SignIn
                      onClick={this.onForgotPassword}
                      disabled={this.props.loading}
                    >Continue
                    </LoginContainer.SignIn>
                  </LoginContainer.ButtonWrapper>
                </ForgotPasswordWrap>

              </LoginContainer.InputContainer>

            </LoginContainer.InputFieldsWrapper>
            <LoginContainer.WrapsInput>
              <LoginContainer.ErrorMsg>{this.state.message}</LoginContainer.ErrorMsg>
            </LoginContainer.WrapsInput>

          </React.Fragment>
        </LoginContainer.Container>
      </LoginContainer.SocialMediaSignup>
    );
  }
}
