import React from 'react';
import { Link } from 'react-router-dom';
import { LoginContainer, HeaderSection, FooterSection } from './styled';
import VideoRecorder from '../../components/WebRTCVideoRecorder'

export default class StarsignUpVideo extends React.Component {
    render() {
        return (
            <LoginContainer>
                <LoginContainer.LeftSection>
                    <HeaderSection>
                        <HeaderSection.HeaderNavigation
                            onClick={() => this.props.history.goBack()}
                        />
                        <HeaderSection.MiddleDiv> I'm a Star</HeaderSection.MiddleDiv>
                    </HeaderSection>
                    <LoginContainer.SocialMediaSignup>

                        <LoginContainer.Container>
                            <LoginContainer.Heading>Verify your identity!</LoginContainer.Heading>
                            {/* <LoginContainer.Heading>Make it quick and easy!</LoginContainer.Heading> */}
                            <p>Please record a short video saying the following </p>
                        </LoginContainer.Container>

                        <LoginContainer.Container>
                            <LoginContainer.Heading>Hi Starsona team, this is a quick video to verify that i am "the real" </LoginContainer.Heading>

                        </LoginContainer.Container>
                    </LoginContainer.SocialMediaSignup>
                    <LoginContainer.FooterLayout>
                        <div>
                            <FooterSection>
                                <FooterSection.LeftSection>
                                </FooterSection.LeftSection>
                                <FooterSection.RightSection>
                                    {/* <FooterSection.Button onClick={this.onRegister} disabled={this.props.loading}>Next</FooterSection.Button> */}
                                    <FooterSection.Button onClick={() => { }} disabled={false}>Submit</FooterSection.Button>
                                </FooterSection.RightSection>
                            </FooterSection>
                        </div>
                    </LoginContainer.FooterLayout>
                </LoginContainer.LeftSection>
                <LoginContainer.RightSection>
                    <LoginContainer.ImageStackLayout>
                        <VideoRecorder {...this.props} />
                    </LoginContainer.ImageStackLayout>
                </LoginContainer.RightSection>
            </LoginContainer>
        );
    }
}
