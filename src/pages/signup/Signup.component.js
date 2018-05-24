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
                <LoginContainer.ButtonIcon
                  src="assets/images/fb-icon.svg"
                  alt=""
                />
                Continue with Facebook
              </LoginContainer.Button>
            </LoginContainer.SocialMediaSignup>
          </LoginContainer.LeftSection>
          <LoginContainer.RightSection>
            Image card layout updated Soon
          </LoginContainer.RightSection>
        </LoginContainer>
      </div>
    );
  }
}
