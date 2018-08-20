import React from "react";
import validator from "validator";
import { Redirect } from "react-router-dom";
import * as qs from "query-string";
import Api from "../../lib/api";
import resetPassword from "../../utils/resetPassword";
import { LoginContainer } from './styled';
import { ForgotPasswordWrap } from '../../components/ForgotPasswordForm/styled';

export default class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newPassword: { value: "", isValid: false, message: "" },
      retypePassword: { value: "", isValid: false, message: "" },
      errorMsg: "",
      redirect: false
    };
  }
  onResetPassword = e => {
    e.preventDefault();
    if (this.checkPassword) {
      if (this.state.newPassword.isValid && this.state.retypePassword.isValid) {
        const parsedQuery = qs.parse(this.props.location.search);
        resetPassword(Api.resetPassword, {
          password: this.state.newPassword.value,
          reset_id: parsedQuery.reset_id
        })
          .then(response => {
            if (response.status === 200) {
              this.setState({ redirect: true });
              this.props.toggleLogin(true);
            }
          })
          .catch(exception => {
            this.setState({ errorMsg: exception.response.data.error.message });
          });
      } else {
        this.checkPassword();
      }
    }
  };
  checkPassword = () => {
    const pattern = /^(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/; // Accepts values with min 8 characters, atleast one number and atleast one symbol
    if (validator.isEmpty(this.state.newPassword.value)) {
      this.setState({
        newPassword: { ...this.state.newPassword, message: "Enter a  password" }
      });
      return false;
    }
    if (!pattern.test(this.state.newPassword.value)) {
      this.setState({
        newPassword: {
          ...this.state.newPassword,
          message: "Enter a valid password must contain atleast one symbol"
        }
      });
      return false;
    }
    this.setState({
      newPassword: { ...this.state.newPassword, message: "", isValid: true }
    });
    this.checkConfirmPassword();
    return true;
  };
  saveFormEntries = (event, type) => {
    this.setState({
      [type]: { ...this.state[type], value: event.target.value }
    });
  };
  checkConfirmPassword = () => {
    if (
      this.state.newPassword.value !== "" &&
      this.state.newPassword.value === this.state.retypePassword.value
    ) {
      this.setState({
        retypePassword: {
          ...this.state.retypePassword,
          message: "",
          isValid: true
        }
      });
    } else {
      this.setState({
        retypePassword: {
          ...this.state.retypePassword,
          message: "The passwords entered do not match!",
          isValid: false
        }
      });
    }
  };
  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <LoginContainer.SocialMediaSignup>
        <LoginContainer.Container>
          <LoginContainer.Heading>Reset Your Password</LoginContainer.Heading>

          <LoginContainer.InputFieldsWrapper>
            <LoginContainer.InputContainer>
              <LoginContainer.InputWrapper>
                <LoginContainer.WrapsInput>
                  <LoginContainer.PasswordWrapper>
                    <LoginContainer.Input
                      placeholder="Choose new password"
                      type="password"
                      name="newPassword"
                      value={this.state.newPassword.value}
                      onChange={event =>
                        this.saveFormEntries(event, "newPassword")
                      }
                      onBlur={this.checkPassword}
                    />
                  </LoginContainer.PasswordWrapper>
                  <LoginContainer.ErrorMsg>
                    {this.state.newPassword.message}
                  </LoginContainer.ErrorMsg>
                </LoginContainer.WrapsInput>
              </LoginContainer.InputWrapper>
              <LoginContainer.InputWrapper>
                <LoginContainer.WrapsInput>
                  <LoginContainer.PasswordWrapper>
                    <LoginContainer.Input
                      placeholder="Retype password"
                      type="password"
                      name="retypePassword"
                      value={this.state.retypePassword.value}
                      onChange={event =>
                        this.saveFormEntries(event, "retypePassword")
                      }
                      onBlur={this.checkConfirmPassword}
                    />
                  </LoginContainer.PasswordWrapper>
                  <LoginContainer.ErrorMsg>
                    {this.state.retypePassword.message}
                  </LoginContainer.ErrorMsg>
                </LoginContainer.WrapsInput>
              </LoginContainer.InputWrapper>
              <ForgotPasswordWrap>
                <LoginContainer.ButtonWrapper>
                  <LoginContainer.SignIn
                    onClick={this.onResetPassword}
                    disabled={this.props.loading}
                    value="Reset Password"
                    type="submit"
                  />
                </LoginContainer.ButtonWrapper>
                <LoginContainer.ErrorMsg>
                  {this.state.errorMsg}
                </LoginContainer.ErrorMsg>
              </ForgotPasswordWrap>
            </LoginContainer.InputContainer>
          </LoginContainer.InputFieldsWrapper>
          <LoginContainer.WrapsInput />
        </LoginContainer.Container>
      </LoginContainer.SocialMediaSignup>
    );
  }
}
