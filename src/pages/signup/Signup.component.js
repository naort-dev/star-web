import React from 'react';
import { Link } from 'react-router-dom';
import { LoginContainer } from './styled';
import { HeaderSection } from '../login/styled';
import SignUpForm from '../../components/SignupForm'

export default class SignUp extends React.Component {
  
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
