import React from 'react';
import { Link } from 'react-router-dom';
import { LoginContainer  } from './styled';
import { HeaderSection } from '../login/styled';
import { LoginTypeSelector } from '../../components/LoginTypeSelector';

export default class SignupType extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  render() {
    return (
      <div>
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
                <HeaderSection.RightDiv>LOGIN</HeaderSection.RightDiv>
              </Link>
            </HeaderSection>
            <LoginTypeSelector isSignUp />
          </LoginContainer.LeftSection>
          <LoginContainer.RightSection />
        </LoginContainer>
      </div>
    );
  }
}
