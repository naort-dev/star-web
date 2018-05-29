import React from 'react';
import LoginContainer from './styled';
import { LoginHeader } from '../../components/LoginHeader';
import { LoginTypeSelector } from '../../components/LoginTypeSelector';
import { ImageStack } from '../../components/ImageStack';

export default class SignupType extends React.Component {
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
            <LoginContainer.BannerImage />
            <LoginTypeSelector />
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
