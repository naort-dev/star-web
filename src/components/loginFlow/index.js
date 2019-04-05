import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import RequestFlowPopup from '../RequestFlowPopup';
import { LoginContainer, HeaderSection } from './styled';
import { loginUser, resetSessionError, updateLoginStatus } from '../../store/shared/actions/login';
import { socialMediaLogin } from '../../store/shared/actions/socialMediaLogin';
import { followCelebrity } from '../../store/shared/actions/followCelebrity';
import { setSocialMediaData, resetSocialMediaData } from '../../store/shared/actions/storeSocialMedia';
import Loader from '../../components/Loader';
import LoginForm from '../../components/LoginForm';
import ForgotPassword from '../../components/ForgotPasswordForm';
import ResetPassword from '../../components/ResetPasswordForm';
import { toggleLogin, toggleSignup } from '../../store/shared/actions/toggleModals';
import { fetchUserDetails } from '../../store/shared/actions/getUserDetails';

class LoginFlow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socialData: {},
      selectedView: 'login',
    };
    if (!this.props.isLoggedIn) {
      this.props.resetSessionError();
    }
  }

  changeView = (view) => {
    this.setState({ selectedView: view })
  }

  saveData = data => this.setState({ socialData: { ...this.state.socialData, ...data } });

  render() {
    const path = this.props.location.pathname;
    return (
      <React.Fragment>
        <RequestFlowPopup
          dotsCount={0}
          selectedDot={1}
          closePopUp={() => this.props.toggleLogin(false)}
          smallPopup
        >
          {
            this.props.loading ?
              <LoginContainer.LoaderWrapper>
                <Loader />
              </LoginContainer.LoaderWrapper>
              :
              <LoginContainer.wrapper>

                <LoginContainer>
                  <LoginContainer.LeftSection>
                    <HeaderSection>
                      <Link to="/" onClick={() => this.props.toggleLogin(false)}>
                        <HeaderSection.LogoImage
                          src="assets/images/logo_starsona.png"
                          alt=""
                        />
                      </Link>
                    </HeaderSection>
                    {this.state.selectedView === 'forgotpassword' ?
                      <ForgotPassword {...this.props} />
                      :
                      null
                    }
                    {this.state.selectedView === 'login' ?
                      <LoginForm {...this.props} onLoginComplete={() => this.props.toggleLogin(false)} changeView={this.changeView} data={this.state.socialData} saveData={this.saveData} />
                      :
                      null
                    }
                  </LoginContainer.LeftSection>
                </LoginContainer>
              </LoginContainer.wrapper>
          }
        </RequestFlowPopup>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  loading: state.session.loading,
  error: state.session.incorrectError,
  statusCode: state.session.statusCode,
  redirectUrls: state.redirectReferrer,
  followCelebData: state.followCelebrityStatus,
  socialMediaStore: state.socialMediaData,
});

const mapDispatchToProps = dispatch => ({
  loginUser: (email, password) => dispatch(loginUser(email, password)),
  socialMediaLogin: socialObject =>
    dispatch(socialMediaLogin(socialObject)),
  updateLoginStatus: sessionDetails => dispatch(updateLoginStatus(sessionDetails)),
  fetchUserDetails: id => dispatch(fetchUserDetails(id)),
  setSocialMediaData: data => dispatch(setSocialMediaData(data)),
  resetSocialMediaData: () => dispatch(resetSocialMediaData()),
  followCelebrity: (celebId, celebProfessions, follow, cancelUpdate) => dispatch(followCelebrity(celebId, celebProfessions, follow, cancelUpdate)),
  resetSessionError: () => dispatch(resetSessionError()),
  toggleLogin: state => dispatch(toggleLogin(state)),
  toggleSignup: state => dispatch(toggleSignup(state)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginFlow));
