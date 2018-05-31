import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { LoginContainer, HeaderSection, FooterSection } from './styled';
import { ImageStack } from '../../components/ImageStack';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false,
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      role: 'R1001',
      referral_code: ''

    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      this.setState({
        redirectToReferrer: nextProps.isLoggedIn,
      });
    }
  }
  onRegister = () => {
    this.props.registerUser(this.state);
  }
  firstNameHandler = (e) => {
    this.setState({ firstName: e.target.value });
  }
  lastNameHandler = (e) => {
    this.setState({ lastName: e.target.value });
  }
  passwordHandler = (e) => {
    this.setState({ password: e.target.value });
  }
  emailHandler = (e) => {
    this.setState({ email: e.target.value });
  }
  roleHandler = () => {

  }


  render() {
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <HeaderSection>
          <Link to="/">
            <HeaderSection.HeaderNavigation />
          </Link>
          <HeaderSection.MiddleDiv> I'm a Fan</HeaderSection.MiddleDiv>
          <Link to="/login">
            <HeaderSection.RightDiv>Sign In</HeaderSection.RightDiv>
          </Link>
        </HeaderSection>
        <LoginContainer>
          <LoginContainer.LeftSection>
            <form>
              <LoginContainer.SocialMediaSignup>
                <LoginContainer.Heading>Make it quick and easy!</LoginContainer.Heading>
                <LoginContainer.ButtonDiv>
                  <LoginContainer.Button>
                    <LoginContainer.FacebookContent>Continue with Facebook
                    </LoginContainer.FacebookContent>
                  </LoginContainer.Button>
                </LoginContainer.ButtonDiv>
                <LoginContainer.ButtonDiv>
                  <LoginContainer.Button>
                    <LoginContainer.GoogleContent>Continue with Google</LoginContainer.GoogleContent>
                  </LoginContainer.Button>
                </LoginContainer.ButtonDiv>
                <LoginContainer.ButtonDiv>
                  <LoginContainer.Button>
                    <LoginContainer.InstagramContent>Continue with Instagram
                    </LoginContainer.InstagramContent>
                  </LoginContainer.Button>
                </LoginContainer.ButtonDiv>
                <LoginContainer.Line />
                <LoginContainer.InputFieldsWrapper>
                  <LoginContainer.SectionHeading>Use your email</LoginContainer.SectionHeading>
                  <LoginContainer.InputWrapper>
                    <LoginContainer.Label>First Name</LoginContainer.Label>
                    <LoginContainer.Input
                      placeholder="Enter your first name"
                      type="text"
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.firstNameHandler}
                    />
                  </LoginContainer.InputWrapper>
                  <LoginContainer.InputWrapper>
                    <LoginContainer.Label>Second Name</LoginContainer.Label>
                    <LoginContainer.Input
                      placeholder="Enter your last name"
                      type="text"
                      name="lastName"
                      value={this.state.lastName}
                      onChange={this.lastNameHandler}
                    />
                  </LoginContainer.InputWrapper>
                  <LoginContainer.InputWrapper>
                    <LoginContainer.Label>Email</LoginContainer.Label>
                    <LoginContainer.Input
                      placeholder="Enter your email"
                      type="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.emailHandler}
                    />
                  </LoginContainer.InputWrapper>
                  <LoginContainer.InputWrapper>
                    <LoginContainer.Label>Password</LoginContainer.Label>
                    <LoginContainer.Input
                      placeholder="Enter your password"
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.passwordHandler}
                    />
                  </LoginContainer.InputWrapper>
                  <LoginContainer.PrivacyContent>
                  By creating an account you agree to Starsona’s
                    <strong>Privacy Policy</strong>
                  and <strong>Terms of Service</strong>
                  </LoginContainer.PrivacyContent>
                </LoginContainer.InputFieldsWrapper>
              </LoginContainer.SocialMediaSignup>
              <LoginContainer.FooterLayout>
                <div>
                  <FooterSection>
                    <FooterSection.LeftSection>
                      <FooterSection.Agreement>
                        By creating an account you agree to Starsona’s
                        Privacy Policy and Terms of Service
                      </FooterSection.Agreement>
                    </FooterSection.LeftSection>
                    <FooterSection.RightSection>
                      <FooterSection.Button onClick={this.onRegister} disabled={this.props.loading}>Join Free</FooterSection.Button>
                    </FooterSection.RightSection>
                  </FooterSection>
                </div>
              </LoginContainer.FooterLayout>
            </form>
          </LoginContainer.LeftSection>
          <LoginContainer.RightSection>
            <LoginContainer.ImageStackLayout>
              <ImageStack />
            </LoginContainer.ImageStackLayout>
          </LoginContainer.RightSection>
        </LoginContainer>
      </div>
    );
  }
}
