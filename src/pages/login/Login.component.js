import React from 'react';
import {
  Redirect,
  Link,
} from 'react-router-dom';
import { LoginContainer, HeaderSection } from './styled';
import { ImageStack } from '../../components/ImageStack';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false,
      email: '',
      password: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      this.setState({
        redirectToReferrer: nextProps.isLoggedIn,
      });
    }
  }
  onLogin = () => {
    this.props.loginUser(this.state);

  }
  acceptEmailHandler = (e) => {
    this.setState({ email: e.target.value });
  }
  acceptPasswordHandler =(e) => {
    this.setState({ password: e.target.value });
  }
  render() {
    const loginToContinue = this.props.location.state && this.props.location.state.from;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        {
          loginToContinue &&
          <p>You must login before accessing!</p>
        }
        <div>
          <HeaderSection>
            <Link to="/">
              <HeaderSection.HeaderNavigation />
            </Link>
            <HeaderSection.MiddleDiv> Sign In</HeaderSection.MiddleDiv>
            <Link to="/signuptype">
              <HeaderSection.RightDiv>Join free</HeaderSection.RightDiv>
            </Link>
          </HeaderSection>
          <LoginContainer>
            <LoginContainer.LeftSection>
              <form>
                <LoginContainer.CoverImage />
                <LoginContainer.SocialMediaSignup>
                  <LoginContainer.Heading>Welcome back to Starsona!</LoginContainer.Heading>
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
                      <LoginContainer.Label>Email</LoginContainer.Label>
                      <LoginContainer.Input
                        type="email"
                        name="email"
                        value={this.state.email}
                        placeholder="Enter your email"
                        onChange={this.acceptEmailHandler}
                      />
                    </LoginContainer.InputWrapper>
                    <LoginContainer.InputWrapper>
                      <LoginContainer.Label>Password</LoginContainer.Label>
                      <LoginContainer.Input
                        type="password"
                        name="password"
                        value={this.state.password}
                        placeholder="Enter your password"
                        onChange={this.acceptPasswordHandler}
                      />
                    </LoginContainer.InputWrapper>
                  </LoginContainer.InputFieldsWrapper>
                </LoginContainer.SocialMediaSignup>
                <LoginContainer.FooterSection>
                  <LoginContainer.Footer>
                    <LoginContainer.Footerleft>
                      <LoginContainer.ForgotButton>
                        Forgot your password?
                      </LoginContainer.ForgotButton>
                    </LoginContainer.Footerleft>
                    <LoginContainer.FooterRight>
                      <LoginContainer.SignIn onClick={this.onLogin} disabled={this.props.loading} >Sign In </LoginContainer.SignIn>
                    </LoginContainer.FooterRight>
                  </LoginContainer.Footer>
                </LoginContainer.FooterSection>
              </form>
            </LoginContainer.LeftSection>
            <LoginContainer.RightSection>
              <LoginContainer.ImageStackLayout>
                <ImageStack />
              </LoginContainer.ImageStackLayout>
            </LoginContainer.RightSection>
          </LoginContainer>
        </div>
      </div>
    );
  }
}
