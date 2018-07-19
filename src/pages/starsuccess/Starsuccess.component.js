import React from 'react'
import { LoginContainer, HeaderSection, FooterSection } from './styled';
import { Scrollbars } from 'react-custom-scrollbars';
import { ImageStack } from '../../components/ImageStack';
import { Link } from 'react-router-dom'


export default class Starsuccess extends React.Component {

    onContinueClick(){
      this.props.history.push('/')
    }
    render() {
        console.log("this.props", this.props)
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
                            <Link to="/login">
                                <HeaderSection.RightDiv>{this.props.session.auth_token.first_name}</HeaderSection.RightDiv>
                            </Link>
                        </HeaderSection>

                        <LoginContainer.SuccessContainer>
                            <LoginContainer.Heading> Your Star profile has been created </LoginContainer.Heading>
                            <LoginContainer.SuccessText>
                                Congratulations, you just created your Star profile. Someone from our team will review your video to verify your identity. As soon as you are verified you can start accepting requests.</LoginContainer.SuccessText>
                            <LoginContainer.SuccessText>-    Starsona Team</LoginContainer.SuccessText>
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
                    <LoginContainer.RightSection />
                </LoginContainer>
            </LoginContainer.wrapper>
        )
    }
}
