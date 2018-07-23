import React from 'react'
import { LoginContainer, HeaderSection, FooterSection } from './styled';
import { Scrollbars } from 'react-custom-scrollbars';
import { ImageStack } from '../../components/ImageStack';
import { Link, Redirect } from 'react-router-dom'


export default class Starsuccess extends React.Component {



    onContinueClick() {
        if (localStorage) {
            localStorage.removeItem("bioDetails")
        }
        this.props.history.push('/')
    }









    render() {
        console.log("propssss", this.props)
        if (!this.props.session.isLoggedIn) {
            return <Redirect to="/signuptype" />
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
                                <HeaderSection.RightDiv>{this.props.session.auth_token.first_name}</HeaderSection.RightDiv>
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
                            <LoginContainer.FeaturedImage>
                            <LoginContainer.FullScreenImageWrapper >
                                <LoginContainer.Image src={this.props.imageViewer.featuredImage.imageURL} style={{transform: this.props.imageViewer.featuredImage.rotations}} />
                                </LoginContainer.FullScreenImageWrapper >
                            </LoginContainer.FeaturedImage>
                            <LoginContainer.FirstImage>
                            <LoginContainer.FullScreenImageWrapper >
                                <LoginContainer.Image src={this.props.imageViewer.firstImage.imageURL}  style={{transform: this.props.imageViewer.firstImage.rotations}} />
                                </LoginContainer.FullScreenImageWrapper >
                            </LoginContainer.FirstImage>
                            <LoginContainer.SecondImage>
                            <LoginContainer.FullScreenImageWrapper >
                                <LoginContainer.Image src={this.props.imageViewer.secondImage.imageURL}  style={{transform: this.props.imageViewer.secondImage.rotations}} />
                                </LoginContainer.FullScreenImageWrapper >
                            </LoginContainer.SecondImage>
                        </LoginContainer.ImageWrapper>
                    </LoginContainer.RightSection>
                </LoginContainer>
            </LoginContainer.wrapper>
        )
    }
}
