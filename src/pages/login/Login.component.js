import React from 'react';
import {
  Redirect,
} from 'react-router-dom';
import LoginContainer from './styled';
import { LoginHeader } from '../../components/LoginHeader';
import { ImageStack } from '../../components/ImageStack';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && this.props.loading) {
      this.setState({
        redirectToReferrer: nextProps.isLoggedIn
      });
    }
  }


  render() {
    const loginToContinue = this.props.location.state && this.props.location.state.from;
    const { from } = this.props.location.state || { from: { pathname: '/dashboard' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    
    return (
      <div>
        {
          loginToContinue &&
          <p>You must login before accessing!</p>
        }
        <div>
          <LoginHeader />
          <LoginContainer>
            <LoginContainer.LeftSection>
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
                    <LoginContainer.Input placeholder="Enter your email" />
                  </LoginContainer.InputWrapper>
                  <LoginContainer.InputWrapper>
                    <LoginContainer.Label>Password</LoginContainer.Label>
                    <LoginContainer.Input placeholder="Enter your password" />
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
                    <LoginContainer.SignIn>Sign In</LoginContainer.SignIn>
                  </LoginContainer.FooterRight>
                </LoginContainer.Footer>
              </LoginContainer.FooterSection>
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
