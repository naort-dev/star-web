import React from 'react';
import { Link } from 'react-router-dom';
import { LoginContainer, HeaderSection } from './styled';
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
        <HeaderSection>
          <Link to="/">
            <HeaderSection.HeaderNavigation />
          </Link>
          <HeaderSection.MiddleDiv> Join Free</HeaderSection.MiddleDiv>
          <Link to="/login">
            <HeaderSection.RightDiv>Sign In</HeaderSection.RightDiv>
          </Link>
        </HeaderSection>
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
