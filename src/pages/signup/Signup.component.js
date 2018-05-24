import React from 'react';
import LoginContainer from './styled';
import { LoginHeader } from '../../components/LoginHeader';

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
            </LoginContainer.SocialMediaSignup>
            <LoginContainer.InputFieldsWrapper>
              <LoginContainer.Label>Name</LoginContainer.Label>
              <LoginContainer.Input placeholder="Enter your first name" />
            </LoginContainer.InputFieldsWrapper>
          </LoginContainer.LeftSection>
          <LoginContainer.RightSection>
            Image card layout updated Soon
          </LoginContainer.RightSection>
        </LoginContainer>
      </div>
    );
  }
}
