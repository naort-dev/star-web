import React from 'react';
import { Link } from 'react-router-dom';
import { LoginContainer, HeaderSection } from './styled';
import HeaderLogin from '../../components/HeaderSection';
import MainLoader from '../../components/MainLoader';
import LoginForm from '../../components/LoginForm';
import ForgotPassword from '../../components/ForgotPasswordForm';
import ResetPassword from '../../components/ResetPasswordForm';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socialData: {},
    };
    if (!this.props.isLoggedIn) {    
      this.props.resetSessionError();
    }
  }

  saveData = data => this.setState({ socialData: { ...this.state.socialData, ...data } });

  render() {
    const path = this.props.location.pathname;
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
                  {path === '/forgotpassword' ?
                    <ForgotPassword {...this.props} />
                    :
                    null
                  }
                  {path === '/login' ?
                    <LoginForm {...this.props} data={this.state.socialData} saveData={this.saveData} />
                    :
                    null
                  }
                  {path === '/resetpassword' ?
                    <ResetPassword {...this.props} />
                    :
                    null
                  }


                </LoginContainer.LeftSection>
                <LoginContainer.RightSection />
              </LoginContainer>
            </LoginContainer.wrapper>
        }
      </React.Fragment>
    );
  }
}
