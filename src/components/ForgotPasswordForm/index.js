import React from 'react';
import validator from 'validator';
import Api from '../../lib/api';
import forgotPassword from '../../utils/forgotPassword';
import Loader from '../Loader';
import { LoginContainer } from '../../components/LoginForm/styled';
import { ForgotPasswordWrap } from './styled';
import { TextInput } from '../TextField';
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
  onForgotPassword = (e) => {
    e.preventDefault();
    this.setState({ loader: true });
    if (this.checkEmail){
    forgotPassword(Api.forgotPassword, { email: this.state.email.value }).then((response) => {
      this.setState({ message: response.data.data, successCondition: true, errorCondition: false, loader: false });
    }).catch((exception) => {
      this.setState({ message: exception.response.data.error.message, successCondition: false, errorCondition: true, loader: false });
    });
  }
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
                    A password reset link has been sent to your email address. Please tap the link
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
                        <TextInput
                          fullWidth={true}
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
                          value="Continue"
                          type="submit"
                        />
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
