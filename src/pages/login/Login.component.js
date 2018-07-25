import React from 'react';
import { LoginContainer } from './styled';
import HeaderLogin from '../../components/HeaderSection';
import MainLoader from '../../components/MainLoader';
import LoginForm from '../../components/LoginForm';
import ForgotPassword from '../../components/ForgotPasswordForm';
import ResetPassword from '../../components/ResetPasswordForm';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
 
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
                  <HeaderLogin RightContent="SIGNUP" />
                  <LoginContainer.CoverImage />
                  {path === '/forgotpassword' ?
                    <ForgotPassword {...this.props} />
                    :
                    null
                  }
                  {path === '/login' ?
                    <LoginForm {...this.props} />
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
