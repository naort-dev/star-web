import React from 'react';
import { Link } from 'react-router-dom';
import { LoginContainer, HeaderSection } from './styled';
import { LoginFooter } from '../../components/LoginFooter';
import { ImageStack } from '../../components/ImageStack';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  render() {
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
                By creating an account you agree to Starsona’s
                  <strong>Privacy Policy</strong>
                and <strong>Terms of Service</strong>
                </LoginContainer.PrivacyContent>
              </LoginContainer.InputFieldsWrapper>
            </LoginContainer.SocialMediaSignup>
            <LoginContainer.FooterLayout>
              <LoginFooter />
            </LoginContainer.FooterLayout>
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
