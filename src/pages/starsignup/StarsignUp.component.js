import React from 'react';
import { Link } from 'react-router-dom';
import { LoginContainer, HeaderSection } from './styled';
import { ImageStack } from '../../components/ImageStack';

export default class StarsignUp extends React.Component {
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
              <HeaderSection.HeaderNavigation
                onClick={() => this.props.history.goBack()}
              />
              <HeaderSection.MiddleDiv> I'm a Star</HeaderSection.MiddleDiv>
              <Link to="/login">
                <HeaderSection.RightDiv>Log In</HeaderSection.RightDiv>
              </Link>
            </HeaderSection>
            <LoginContainer.Heading>Please Download the Application</LoginContainer.Heading>   
            <LoginContainer.AppIconWrapper>
              <LoginContainer.Link target="_blank" rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=com.starsona.app">
                <LoginContainer.StoreIcon alt="playsore icon" src="assets/images/playstore-download.svg" />
              </LoginContainer.Link>
              <LoginContainer.Link target="_blank" rel="noopener noreferrer" href="https://itunes.apple.com/us/app/starsona/id1294478616?ls=1&mt=8">
                <LoginContainer.StoreIcon alt="playsore icon" src="assets/images/appstore-download.svg" />
              </LoginContainer.Link>
            </LoginContainer.AppIconWrapper>
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
