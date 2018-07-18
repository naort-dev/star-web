import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';
import { LoginContainer, HeaderSection, FooterSection } from './styled';
<<<<<<< 71a1f5c3f26a55bb651874f5caa443813456946c
=======
import { ImageStack } from '../../components/ImageStack';
import SignUpForm from '../../components/SignupForm'
>>>>>>> cleaned the code

export default class SignUp extends React.Component {
  render() {

    return (
      <LoginContainer.wrapper>
        <LoginContainer>
          <LoginContainer.LeftSection>
            <HeaderSection>
              <Link to="/">
                <HeaderSection.LogoImage
                  src="assets/images/logo_starsona_large.svg"
                  alt=""
                />
              </Link>
              <Link to="/login">
                <HeaderSection.RightDiv>LOG IN</HeaderSection.RightDiv>
              </Link>
            </HeaderSection>
<<<<<<< 71a1f5c3f26a55bb651874f5caa443813456946c
            <LoginContainer.SocialMediaSignup>
              <LoginContainer.Container>
                <LoginContainer.Heading>Make it quick and easy!</LoginContainer.Heading>
                <LoginContainer.SocialMediaMessage>Already have an account?
                  <Link to="/login">
                    <LoginContainer.LoginDiv>Log In</LoginContainer.LoginDiv>
                  </Link>
                </LoginContainer.SocialMediaMessage>
                <LoginContainer.SignupLine>
                  <span>Signup using social</span>
                </LoginContainer.SignupLine>
                <LoginContainer.ButtonDiv>
                  <LoginContainer.Button onClick={() => this.OnFBlogin()}>
                    <LoginContainer.FacebookContent> Facebook
                    </LoginContainer.FacebookContent>
                  </LoginContainer.Button>

                  <LoginContainer.GoogleWrapper id="g-sign-in" />
                  <LoginContainer.Button onClick={() => this.onGmail()}>
                    <LoginContainer.GoogleContent> Google</LoginContainer.GoogleContent>
                  </LoginContainer.Button>

                  <LoginContainer.Button onClick={() => this.onInstagramLogin()}>
                    <LoginContainer.InstagramContent>Instagram
                    </LoginContainer.InstagramContent>
                  </LoginContainer.Button>
                </LoginContainer.ButtonDiv>
                <LoginContainer.SignupLine>
                  <span>or signup with email</span>
                </LoginContainer.SignupLine>
                <LoginContainer.InputFieldsWrapper>

                  <LoginContainer.InputContainer>
                    <LoginContainer.FirstLastNameWrapper>
                      {
                        this.props.statusCode === '410' ?
                          <LoginContainer.EmptyDiv />

                          :
                          <LoginContainer.FirstNameWrapper >
                            <LoginContainer.InputWrapper>

                              <LoginContainer.WrapsInput>
                                <LoginContainer.Input
                                  placeholder="First name"
                                  type="text"
                                  name="firstName"
                                  value={this.state.firstName.value}
                                  onChange={this.firstNameHandler}
                                  onBlur={this.checkRequired}
                                />
                                <LoginContainer.ErrorMsg>
                                  {this.state.firstName.message}
                                </LoginContainer.ErrorMsg>
                              </LoginContainer.WrapsInput>
                            </LoginContainer.InputWrapper>
                          </LoginContainer.FirstNameWrapper>
                      }
                      {
                        this.props.statusCode === '410' ?
                          <LoginContainer.EmptyDiv />

                          :
                          <LoginContainer.LastNameWrapper>
                            <LoginContainer.InputWrapper>

                              <LoginContainer.WrapsInput>
                                <LoginContainer.Input
                                  placeholder="Last name"
                                  type="text"
                                  name="lastName"
                                  value={this.state.lastName.value}
                                  onChange={this.lastNameHandler}
                                />
                                <LoginContainer.ErrorMsg>
                                  {this.state.lastName.message}
                                </LoginContainer.ErrorMsg>
                              </LoginContainer.WrapsInput>
                            </LoginContainer.InputWrapper>
                          </LoginContainer.LastNameWrapper>
                      }
                    </LoginContainer.FirstLastNameWrapper>
                    <LoginContainer.InputWrapper>

                      <LoginContainer.WrapsInput>
                        <LoginContainer.Input
                          placeholder="Email"
                          type="email"
                          name="email"
                          value={this.state.email.value}
                          onChange={this.emailHandler}
                          onBlur={this.checkEmail}
                        />
                        <LoginContainer.ErrorMsg>{this.state.email.message}</LoginContainer.ErrorMsg>
                      </LoginContainer.WrapsInput>
                    </LoginContainer.InputWrapper>
                    {
                      this.props.statusCode === '410' ?
                        <LoginContainer.EmptyDiv />
                        :
                        <LoginContainer.InputWrapper>

                          <LoginContainer.WrapsInput>
                            <LoginContainer.PasswordWrapper>
                              <LoginContainer.Input
                                placeholder="Password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                name="password"
                                value={this.state.password.value}
                                onChange={this.passwordHandler}
                                onBlur={this.checkPassword}
                              />
                              <LoginContainer.ShowPassword onClick={this.ShowPassword} />
                            </LoginContainer.PasswordWrapper>
                            <LoginContainer.ErrorMsg>
                              {this.state.password.message}
                            </LoginContainer.ErrorMsg>

                          </LoginContainer.WrapsInput>
                        </LoginContainer.InputWrapper>
                    }

                   
                    <LoginContainer.ButtonWrapper>
                      <FooterSection.Button onClick={this.onRegister} disabled={this.props.loading}>SIGNUP</FooterSection.Button>
                    </LoginContainer.ButtonWrapper>
                    <LoginContainer.PrivacyContent>
                      By creating an account you agree to Starsona’s
                      <strong> Privacy Policy </strong>
                      and <strong> Terms of Service</strong>
                    </LoginContainer.PrivacyContent>
                  </LoginContainer.InputContainer>
                </LoginContainer.InputFieldsWrapper>
                <LoginContainer.WrapsInput>
                  {this.props.statusCode === undefined ?
                    <LoginContainer.ErrorMsg>{this.props.error}</LoginContainer.ErrorMsg>
                    :
                    <LoginContainer.EmptyDiv />
                  }
                </LoginContainer.WrapsInput>
              </LoginContainer.Container>
            </LoginContainer.SocialMediaSignup>
=======
            <React.Fragment>
              <SignUpForm {...this.props} />
            </React.Fragment>
>>>>>>> cleaned the code
          </LoginContainer.LeftSection>
          <LoginContainer.RightSection />
        </LoginContainer>
      </LoginContainer.wrapper>

    );
  }
}
