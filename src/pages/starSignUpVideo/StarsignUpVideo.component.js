import React from 'react';
import { SignupContainer, HeaderSection, FooterSection } from './styled';
import VideoRecorder from '../../components/WebRTCVideoRecorder'
import axios from 'axios'
import getAWSCredentials from '../../utils/AWSUpload'
import { locations } from '../../constants/locations'
import { Link, Redirect } from 'react-router-dom';
import { fetch } from '../../services/fetch'
import Loader from '../../components/Loader'

export default class StarsignUpVideo extends React.Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = { upload: false }
  }

  onSubmit() {
    this.setState({ upload: true })
    const signupVideo = new File([this.props.videoRecorder.recordedBuffer], 'signupVideo.mp4');
    getAWSCredentials(locations.getAwsVideoCredentials, this.props.session.auth_token.authentication_token, signupVideo)
      .then(response => {
        axios.post(response.url, response.formData)
          .then(() => fetch.post('https://app.staging.starsona.com/api/v1/user/celebrity_profile/', {
            ...this.props.location.state.bioDetails, profile_video: response.filename, availability: true
          },
            {
              "headers": {
                'Authorization': `token ${this.props.session.auth_token.authentication_token}`
              }
            }
          )
          )
      })
      .then(() => {
        this.setState({ upload: false })
        this.props.history.push({ pathname: "/starsuccess", state: { images: this.props.location.state.images } })
      }
      )
  }

  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to={locations.signupType} />
    }
    return (
      <SignupContainer>
        {this.state.upload ?
          <SignupContainer.loaderWrapper>
            <Loader />
          </SignupContainer.loaderWrapper>
          : null}
        <SignupContainer.LeftSection>
          <HeaderSection>
            <Link to="/">
              <HeaderSection.LogoImage
                src="assets/images/logo_starsona_large.svg"
                alt=""
              />
            </Link>

            <Link to="#">
              <HeaderSection.RightDiv>I'M A STAR</HeaderSection.RightDiv>
            </Link>

          </HeaderSection>
          <SignupContainer.SocialMediaSignup>
            <SignupContainer.Container>
              <SignupContainer.Heading>Verify your identity!</SignupContainer.Heading>
              <p>Please record a short video saying the following </p>
            </SignupContainer.Container>
            <SignupContainer.Container>
              <SignupContainer.VerificationText>Hi Starsona team, this is a quick video to verify that i am <SignupContainer.Username>{this.props.session.auth_token.first_name} </SignupContainer.Username>  </SignupContainer.VerificationText>
            </SignupContainer.Container>
          </SignupContainer.SocialMediaSignup>
          <SignupContainer.FooterLayout>
            <FooterSection>
              <FooterSection.LeftSection>
              </FooterSection.LeftSection>
              <FooterSection.RightSection>
                {this.props.videoRecorder.stop ?
                  <FooterSection.Button onClick={this.onSubmit}>{this.state.upload ? "Saving..." : "Submit"}</FooterSection.Button>
                  : <FooterSection.DisabledButton onClick={this.onSubmit}>Submit</FooterSection.DisabledButton>}
              </FooterSection.RightSection>
            </FooterSection>
          </SignupContainer.FooterLayout>
        </SignupContainer.LeftSection>
        <SignupContainer.RightSection>
          <SignupContainer.ImageStackLayout>
            <VideoRecorder {...this.props} />
          </SignupContainer.ImageStackLayout>
        </SignupContainer.RightSection>
      </SignupContainer>
    );
  }
}
