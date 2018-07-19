import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';
import { LoginContainer, HeaderSection, FooterSection } from './styled';
import { ImageStack } from '../../components/ImageStack';
import SignUpForm from '../../components/SignupForm'

export default class SignUp extends React.Component {
  componentWillUnmount() {
    if (this.props.location.state && this.props.location.state.type === "fan" && this.props.isLoggedIn) {
      this.props.resetRedirectUrls();
    }
  }
  render() {
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
                <HeaderSection.RightDiv>LOG IN</HeaderSection.RightDiv>
              </Link>
            </HeaderSection>
            <SignUpForm {...this.props} />
          </LoginContainer.LeftSection>
          <LoginContainer.RightSection />
        </LoginContainer>
      </LoginContainer.wrapper>

    );
  }
}
