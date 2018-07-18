import React from 'react';
import {
  Redirect,
  Link,
} from 'react-router-dom';
import { LoginContainer, HeaderSection } from './styled';
import MainLoader from '../../components/MainLoader';
import LoginForm from '../../components/LoginForm';

export default class Login extends React.Component {
  render() {
    return (
      <React.Fragment>
        {
          this.props.loading ?
            <MainLoader />
            :
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
                    <Link to="/signuptype">
                      <HeaderSection.RightDiv>SIGNUP</HeaderSection.RightDiv>
                    </Link>
                  </HeaderSection>
                  <LoginContainer.CoverImage />
                  <LoginForm {...this.props} />
                </LoginContainer.LeftSection>
                <LoginContainer.RightSection />
              </LoginContainer>
            </LoginContainer.wrapper>
        }
      </React.Fragment>
    );
  }
}
