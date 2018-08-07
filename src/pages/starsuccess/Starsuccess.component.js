import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { LoginContainer, HeaderSection, FooterSection } from './styled';
import { ImageStack } from '../../components/ImageStack';

export default class Starsuccess extends React.Component {

  onContinueClick() {
    if (localStorage) {
      localStorage.removeItem('bioDetails');
    }
    this.props.history.push('/');
  }

  render() {
    if (!this.props.session.isLoggedIn) {
      return <Redirect to="/signuptype" />;
    }
    return (
      <LoginContainer.wrapper>
        <LoginContainer>
          <LoginContainer.LeftSection>
            <HeaderSection>
              <Link to="/">
                <HeaderSection.LogoImage
                  src="assets/images/logo_starsona_large.svg"
                  alt=""
                />
              </Link>
              <Link to="#">
                <HeaderSection.RightDiv>{this.props.session.auth_token.first_name} {this.props.session.auth_token.last_name}</HeaderSection.RightDiv>
              </Link>
            </HeaderSection>

            <LoginContainer.SuccessContainer>
              <LoginContainer.Heading> Your Star profile has been created </LoginContainer.Heading>
              <LoginContainer.SuccessText>
                Congratulations, you just created your Star profile. Someone from our team will review your video to verify your identity. As soon as you are verified you can start accepting requests.</LoginContainer.SuccessText>
              <LoginContainer.SuccessTextBold>-    Starsona Team</LoginContainer.SuccessTextBold>
            </LoginContainer.SuccessContainer>
            <LoginContainer.FooterLayout>
              <FooterSection>
                <FooterSection.LeftSection>
                </FooterSection.LeftSection>
                <FooterSection.RightSection>
                  <FooterSection.Button onClick={() => { this.onContinueClick() }}>Continue</FooterSection.Button>
                </FooterSection.RightSection>
              </FooterSection>
            </LoginContainer.FooterLayout>
          </LoginContainer.LeftSection>
          <LoginContainer.RightSection>
            <LoginContainer.ImageWrapper>
              <ImageStack
                featureImage={this.props.imageViewer.featuredImage.imageURL}
                imageList={[this.props.imageViewer.firstImage.imageURL, this.props.imageViewer.secondImage.imageURL]}
              />
            </LoginContainer.ImageWrapper>
          </LoginContainer.RightSection>
        </LoginContainer>
      </LoginContainer.wrapper>
    )
  }
}