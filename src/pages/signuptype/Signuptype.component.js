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
        
        <LoginContainer>
          <LoginContainer.LeftSection>
            <HeaderSection>
              <Link to="/">
                <HeaderSection.HeaderNavigation />
              </Link>
              <HeaderSection.MiddleDiv> Join Free</HeaderSection.MiddleDiv>
              <Link to="/login">
                <HeaderSection.RightDiv>Sign In</HeaderSection.RightDiv>
              </Link>
            </HeaderSection>
            <LoginContainer.BannerImage />
            <LoginTypeSelector />
          </LoginContainer.LeftSection>
          <LoginContainer.RightSection>
            <LoginContainer.ImageStackLayout>
              <ImageStack
                featureImage="assets/images/Stadium_800x376.jpg"
                imageList={['assets/images/Stage_396x376.jpg', 'assets/images/Star_396x376.jpg']}
              />
            </LoginContainer.ImageStackLayout>
          </LoginContainer.RightSection>
        </LoginContainer>
      </div>
    );
  }
}
