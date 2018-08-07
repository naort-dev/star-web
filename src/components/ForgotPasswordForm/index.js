import React from 'react';
import { Redirect } from 'react-router-dom';
import validator from 'validator';
import Api from '../../lib/api';
import forgotPassword from '../../utils/forgotPassword';
import Loader from '../Loader';
import { LoginContainer } from '../../components/LoginForm/styled';
import { ForgotPasswordWrap } from './styled';

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: { value: '', isValid: false, message: '' },
      message: '',
      loader: false,
      errorCondition: false,
      successCondition: false,
    };
  }
  onForgotPassword = () => {
    this.setState({ loader: true });
    forgotPassword(Api.forgotPassword, { email: this.state.email.value }).then((response) => {
      this.setState({ message: response.data.data, successCondition: true, errorCondition: false, loader: false });
    }).catch((exception) => {
      this.setState({ message: exception.response.data.error.message, successCondition: false, errorCondition: true, loader: false });
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
          {this.state.loader ?
            <ForgotPasswordWrap.loaderWrapper>
              <Loader />
            </ForgotPasswordWrap.loaderWrapper>
            :
            null
          }
          <React.Fragment>
            {this.state.successCondition ?
              <ForgotPasswordWrap>
                <ForgotPasswordWrap.Message>
                  <ForgotPasswordWrap.Logo
                    src="assets/images/mailSent.png"
                    alt=""
                  />
                  <ForgotPasswordWrap.MailContent>
                    A password reset link has been sent to your email address.Please tap the link
                      in that message to reset your password.
                  </ForgotPasswordWrap.MailContent>
                </ForgotPasswordWrap.Message>
              </ForgotPasswordWrap>
              :
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
                          placeholder="Please enter your registered email address"
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
                      <LoginContainer.ErrorMsg>{this.state.errorCondition ? this.state.message : null}</LoginContainer.ErrorMsg>
                    </ForgotPasswordWrap>
                  </LoginContainer.InputContainer>
                </LoginContainer.InputFieldsWrapper>
              </React.Fragment>
            }


          </React.Fragment>
        </LoginContainer.Container>
      </LoginContainer.SocialMediaSignup>
    );
  }
}