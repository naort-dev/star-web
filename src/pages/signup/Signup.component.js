import React from 'react';
import LoginContainer from './styled';
import { LoginHeader } from '../../components/LoginHeader';
import { LoginFooter } from '../../components/LoginFooter';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  render() {
    return (
      <div>
        <LoginHeader />
        <LoginContainer>
          <LoginContainer.LeftSection>
            
            <LoginContainer.SocialMediaSignup>
              <LoginContainer.Heading>Make it quick and easy!</LoginContainer.Heading>
              <LoginContainer.Button>
                <LoginContainer.FacebookContent>Continue with Facebook
                </LoginContainer.FacebookContent>
              </LoginContainer.Button>
              <LoginContainer.Button>
                <LoginContainer.GoogleContent>Continue with Google</LoginContainer.GoogleContent>
              </LoginContainer.Button>
              <LoginContainer.Button>
                <LoginContainer.InstagramContent>Continue with Instagram
                </LoginContainer.InstagramContent>
              </LoginContainer.Button>
              <LoginContainer.Line />
              <LoginContainer.InputFieldsWrapper>
                <LoginContainer.SectionHeading>Use your email</LoginContainer.SectionHeading>
                <LoginContainer.InputWrapper>
                  <LoginContainer.Label>First Name</LoginContainer.Label>
                  <LoginContainer.Input placeholder="Enter your first name" />
                </LoginContainer.InputWrapper>
                <LoginContainer.InputWrapper>
                  <LoginContainer.Label>Second Name</LoginContainer.Label>
                  <LoginContainer.Input placeholder="Enter your last name" />
                </LoginContainer.InputWrapper>
                <LoginContainer.InputWrapper>
                  <LoginContainer.Label>Email</LoginContainer.Label>
                  <LoginContainer.Input placeholder="Enter your email" />
                </LoginContainer.InputWrapper>
                <LoginContainer.InputWrapper>
                  <LoginContainer.Label>Password</LoginContainer.Label>
                  <LoginContainer.Input placeholder="Enter your password" />
                </LoginContainer.InputWrapper>
                <LoginContainer.PrivacyContent>
                By creating an account you agree to Starsona’s <strong>Privacy Policy</strong> and <strong>Terms of Service</strong>
                </LoginContainer.PrivacyContent>
              </LoginContainer.InputFieldsWrapper>
            </LoginContainer.SocialMediaSignup>
            
            <LoginFooter />
          </LoginContainer.LeftSection>
          <LoginContainer.RightSection>
            Image card layout updated Soon
          </LoginContainer.RightSection>
        </LoginContainer>
      </div>
    );
  }
}
