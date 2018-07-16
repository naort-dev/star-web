import React from 'react';
import { SignupContainer, HeaderSection, FooterSection } from './styled';
import VideoRecorder from '../../components/WebRTCVideoRecorder'
import { fetch } from '../../services/fetch'

export default class StarsignUpVideo extends React.Component {

    goBack() {
        this.props.onClearStreams()
        this.props.history.goBack()
    }

    onSubmit() {
        const signupVideo = new File([this.props.videoRecorder.recordedBuffer], 'signupVideo.mp4');
    }
    
    render() {
        return (
            <SignupContainer>
                <SignupContainer.LeftSection>
                    <HeaderSection>
                        <HeaderSection.HeaderNavigation
                            onClick={this.goBack.bind(this)}
                        />
                        <HeaderSection.MiddleDiv> I'm a Star</HeaderSection.MiddleDiv>
                    </HeaderSection>
                    <SignupContainer.SocialMediaSignup>

                        <SignupContainer.Container>
                            <SignupContainer.Heading>Verify your identity!</SignupContainer.Heading>
                            {/* <SignupContainer.Heading>Make it quick and easy!</SignupContainer.Heading> */}
                            <p>Please record a short video saying the following </p>
                        </SignupContainer.Container>

                        <SignupContainer.Container>
                            <SignupContainer.VerificationText>Hi Starsona team, this is a quick video to verify that i am "the real" </SignupContainer.VerificationText>

                        </SignupContainer.Container>
                    </SignupContainer.SocialMediaSignup>
                    <SignupContainer.FooterLayout>
                        <div>
                            <FooterSection>
                                <FooterSection.LeftSection>
                                </FooterSection.LeftSection>
                                <FooterSection.RightSection>
                                    {/* <FooterSection.Button onClick={this.onRegister} disabled={this.props.loading}>Next</FooterSection.Button> */}
                                    <FooterSection.Button onClick={this.onSubmit.bind(this)}>Submit</FooterSection.Button>
                                </FooterSection.RightSection>
                            </FooterSection>
                        </div>
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
