import React from 'react';
import { SignupContainer, HeaderSection, FooterSection } from './styled';
import Api from '../../lib/api';
import VideoRecorder from '../../components/WebRTCVideoRecorder';
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios'
import getAWSCredentials from '../../utils/AWSUpload'
import { locations } from '../../constants/locations'
import { Link, Redirect } from 'react-router-dom';
import { recorder } from '../../constants/videoRecorder';
import { fetch } from '../../services/fetch'
import Loader from '../../components/Loader'

export default class StarsignUpVideo extends React.Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = { upload: false }
  }
  componentWillUnmount() {
    this.props.onClearStreams();
  }

  onSubmit() {
    this.setState({ upload: true })
    let signupVideo
    if (this.props.videoUploader.savedFile != null) {
      signupVideo = this.props.videoUploader.savedFile;
    } else {
      signupVideo = new File([this.props.videoRecorder.recordedBuffer], `signupVideo.${this.props.videoUploader.extension}`);
    }
    getAWSCredentials(locations.getAwsVideoCredentials, this.props.session.auth_token.authentication_token, signupVideo)
      .then(response => {
        axios.post(response.url, response.formData)
          .then(() => fetch.post(Api.celebrityProfile, {
            ...this.props.bioDetails, profile_video: response.filename, availability: true
          },
            {
              "headers": {
                'Authorization': `token ${this.props.session.auth_token.authentication_token}`
              }
            }
          )
          ).then(() => {
            this.props.fetchUserDetails(this.props.session.auth_token.id);
            this.setState({ upload: false })
            this.props.changeStep(this.props.currentStep + 1);
            // this.props.history.push({ pathname: "/starsuccess", state: { images: this.props.location.state.images } })
          })
      })

  }

  render() {
    // if (!this.props.isLoggedIn) {
    //   return <Redirect to={locations.signupType} />
    // }
    return (
      <SignupContainer.wrapper>
        <Scrollbars>
          <SignupContainer>
            {this.state.upload ?
              <SignupContainer.loaderWrapper>
                <Loader />
              </SignupContainer.loaderWrapper>
              : null}
            <SignupContainer.LeftSection>
              <SignupContainer.SocialMediaSignup>
                <SignupContainer.Container>
                  <SignupContainer.Heading>Verify your identity!</SignupContainer.Heading>
                  <SignupContainer.paragraph>Please record a short video saying the following </SignupContainer.paragraph>
                </SignupContainer.Container>
                <SignupContainer.Container>
                  <SignupContainer.VerificationText>Hi Starsona team, this is a quick video to verify that I am "the real" <SignupContainer.Username>{this.props.session.auth_token.first_name} </SignupContainer.Username>  </SignupContainer.VerificationText>
                </SignupContainer.Container>
                <SignupContainer.recorderWrapper>
                  <VideoRecorder {...this.props} duration={recorder.signUpTimeOut} />
                </SignupContainer.recorderWrapper>
              </SignupContainer.SocialMediaSignup>
            </SignupContainer.LeftSection>
          </SignupContainer>
        </Scrollbars>
        <SignupContainer.FooterLayout>
          <FooterSection>
            {this.props.videoRecorder.stop || this.props.videoUploader.savedFile != null ?
              <FooterSection.Button onClick={this.onSubmit}>{this.state.upload ? "Saving..." : "Submit"}</FooterSection.Button>
              : <FooterSection.DisabledButton onClick={this.onSubmit}>Submit</FooterSection.DisabledButton>}
          </FooterSection>
        </SignupContainer.FooterLayout>
      </SignupContainer.wrapper>
    );
  }
}
