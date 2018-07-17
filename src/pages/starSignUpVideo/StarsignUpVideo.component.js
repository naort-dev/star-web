import React from 'react';
import { SignupContainer, HeaderSection, FooterSection } from './styled';
import VideoRecorder from '../../components/WebRTCVideoRecorder'
import axios from 'axios'
import getAWSCredentials from '../../utils/AWSUpload'

export default class StarsignUpVideo extends React.Component {
    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit() {
        const signupVideo = new File([this.props.videoRecorder.recordedBuffer], 'signupVideo.mp4');
        getAWSCredentials('user/signed_url/?extension=mp4&key=authentication_videos&file_type=video', this.props.session.auth_token.authentication_token, signupVideo)
            .then(response => axios.post(response.url, response.formData))
    }

    render() {
        return (
            <SignupContainer>
                <SignupContainer.LeftSection>
                    <HeaderSection>
                        <HeaderSection.MiddleDiv> I'm a Star</HeaderSection.MiddleDiv>
                    </HeaderSection>
                    <SignupContainer.SocialMediaSignup>
                        <SignupContainer.Container>
                            <SignupContainer.Heading>Verify your identity!</SignupContainer.Heading>
                            <p>Please record a short video saying the following </p>
                        </SignupContainer.Container>
                        <SignupContainer.Container>
                            <SignupContainer.VerificationText>Hi Starsona team, this is a quick video to verify that i am "the real" </SignupContainer.VerificationText>
                        </SignupContainer.Container>
                    </SignupContainer.SocialMediaSignup>
                    <SignupContainer.FooterLayout>
                        <FooterSection>
                            <FooterSection.LeftSection>
                            </FooterSection.LeftSection>
                            <FooterSection.RightSection>
                                {this.props.videoRecorder.stop ?
                                    <FooterSection.Button onClick={this.onSubmit}>Submit</FooterSection.Button>
                                    : null}
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
