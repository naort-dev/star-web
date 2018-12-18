import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { LoginContainer, HeaderSection, FooterSection } from './styled';
import { ImageStack } from '../../components/ImageStack';

export default class Starsuccess extends React.Component {

  onContinueClick() {
    this.props.closeSignupFlow();
  }

  render() {
    // if (!this.props.session.isLoggedIn) {
    //   return <Redirect to="/signuptype" />;
    // }
    return (
      <LoginContainer.wrapper>
        <Scrollbars>
          <LoginContainer>
            <LoginContainer.LeftSection>
              <LoginContainer.SuccessContainer>
                <LoginContainer.Heading> Your Star profile has been created </LoginContainer.Heading>
                <LoginContainer.SuccessText>
                  Congratulations, you just created your Star profile. Someone from our team will review your video to verify your identity. As soon as you are verified you can start accepting requests.</LoginContainer.SuccessText>
                <LoginContainer.SuccessTextBold>-    Starsona Team</LoginContainer.SuccessTextBold>
                {/* <LoginContainer.ImageWrapper>
                  <ImageStack
                    featureImage={this.props.imageViewer.featuredImage.imageURL}
                    imageList={[this.props.imageViewer.firstImage.imageURL, this.props.imageViewer.secondImage.imageURL]}
                  />
                </LoginContainer.ImageWrapper> */}
              </LoginContainer.SuccessContainer>
              <LoginContainer.FooterLayout>
                <FooterSection>
                  <FooterSection.Button onClick={() => { this.onContinueClick() }}>Done</FooterSection.Button>
                </FooterSection>
              </LoginContainer.FooterLayout>
            </LoginContainer.LeftSection>
          </LoginContainer>
        </Scrollbars>
      </LoginContainer.wrapper>
    )
  }
}
