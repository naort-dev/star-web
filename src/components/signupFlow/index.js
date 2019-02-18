import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../store/shared/actions/register';
import { socialMediaLogin } from '../../store/shared/actions/socialMediaLogin';
import { resetRedirectUrls } from '../../store/shared/actions/setRedirectReferrer';
import { followCelebrity } from '../../store/shared/actions/followCelebrity';
import RequestFlowPopup from '../RequestFlowPopup';
import SignUpForm from '../SignupForm';
import { LoginContainer, HeaderSection } from './styled';
// import { HeaderSection } from '../loginFlow/styled';
import { GroupRegistration, StarRegistration } from '../UserRegistration';
import { LoginTypeSelector } from '../../components/LoginTypeSelector';
import { setSocialMediaData, resetSocialMediaData } from '../../store/shared/actions/storeSocialMedia';
import { fetchUserDetails } from '../../store/shared/actions/getUserDetails';
import { toggleLogin, toggleSignup } from '../../store/shared/actions/toggleModals';

class SignupFlow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: props.signUpDetails.type ? props.signUpDetails.type : null,
      stepCount: 0,
      socialData: {},
      currentStep: props.signUpDetails.step ? props.signUpDetails.step : 0,
      enableClose: props.signUpDetails.enableClose ? props.signUpDetails.enableClose : false,
    };
    this.starRegistrationSteps = 6;
    this.groupRegistrationSteps = 5;
  }
  getBioDetails = (bioDetails) => {
    this.setState({ bioDetails });
  }
  changeSignUpRole = (role) => {
    this.setState({ selectedType: role, currentStep: 1, stepCount: 0 });
    if (role === 'star') {
      this.setState({ stepCount: this.starRegistrationSteps, currentStep: 1 });
    } else if (role === 'group') {
      this.setState({ stepCount: this.groupRegistrationSteps, currentStep: 1 });
    }
  }
  saveData = data => this.setState({ socialData: { ...this.state.socialData, ...data } });

  changeStep = (step) => {
    this.setState({ currentStep: step, enableClose: false });
  }

  closeSignUp = () => {
    this.props.fetchUserDetails(this.props.userDetails.settings_userDetails.id);
    this.props.toggleSignup(false);
    if (this.state.selectedType === 'group' && this.state.currentStep === 5) {
      this.props.history.push('user/star-supporters');
    }
  }
  
  renderSteps = () => {
    if (this.state.selectedType === 'fan') {
      return <SignUpForm {...this.props} changeStep={this.changeStep} currentStep={this.state.currentStep} signupRole={this.state.selectedType} data={this.state.socialData} closeSignupFlow={this.closeSignUp} />;
    } else if (this.state.selectedType === 'star') {
      switch (this.state.currentStep) {
        case 1: return <SignUpForm {...this.props} currentStep={this.state.currentStep} closeSignupFlow={() => this.closeSignUp()} changeStep={this.changeStep} signupRole={this.state.selectedType} closeSignupFlow={this.closeSignUp} data={this.state.socialData} />;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8: return <StarRegistration currentStep={this.state.currentStep} changeStep={this.changeStep} closeSignupFlow={this.closeSignUp} />;
        default: return null;
      }
    } else if (this.state.selectedType === 'group') {
      switch (this.state.currentStep) {
        case 1: return <SignUpForm {...this.props} currentStep={this.state.currentStep} closeSignupFlow={this.closeSignUp} changeStep={this.changeStep} signupRole={this.state.selectedType} data={this.state.socialData} />;
        case 2:
        case 3:
        case 4:
        case 5: return <GroupRegistration currentStep={this.state.currentStep} closeSignupFlow={() => this.closeSignUp()} changeStep={this.changeStep} />;
        default: return null;
      }
    }
    return null;
  }

  render() {
    return (
      <div>
        <RequestFlowPopup
          dotsCount={0}
          closePopUp={this.closeSignUp}
          modalView={this.state.currentStep > 1 && !this.state.enableClose}
          smallPopup
        >
          <LoginContainer>
            <LoginContainer.LeftSection>
              {
                this.state.currentStep === 1 || this.state.currentStep === 0 ?
                  <HeaderSection>
                    <Link to="/">
                      <HeaderSection.LogoImage
                        src="assets/images/logo_starsona.png"
                        alt=""
                      />
                    </Link>
                  </HeaderSection>
                : null
              }
              {
                !this.state.selectedType || this.state.currentStep === 0 ?
                  <LoginTypeSelector {...this.props} isSignUp changeSignUpRole={this.changeSignUpRole} />
                :
                  <LoginContainer.SignupFlow currentStep={this.state.currentStep}>
                    {
                      this.renderSteps()
                    }
                  </LoginContainer.SignupFlow>
              }
            </LoginContainer.LeftSection>
          </LoginContainer>
        </RequestFlowPopup>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  userDetails: state.userDetails,
  loading: state.session.loading,
  error: state.session.incorrectError,
  statusCode: state.session.statusCode,
  signUpDetails: state.modals.signUpDetails,
  redirectUrls: state.redirectReferrer,
  followCelebData: state.followCelebrityStatus,
  socialMediaStore: state.socialMediaData,
});

const mapDispatchToProps = dispatch => ({
  fetchUserDetails: id => dispatch(fetchUserDetails(id)),
  registerUser: (firstName, lastName, email, password, role, referral) =>
    dispatch(registerUser(firstName, lastName, email, password, role, referral)),
  socialMediaLogin: (socialObject) =>
    dispatch(socialMediaLogin(socialObject)),
  resetRedirectUrls: () => dispatch(resetRedirectUrls()),
  followCelebrity: (celebId, celebProfessions, follow, cancelUpdate) => dispatch(followCelebrity(celebId, celebProfessions, follow, cancelUpdate)),
  toggleLogin: state => dispatch(toggleLogin(state)),
  toggleSignup: state => dispatch(toggleSignup(state)),
  setSocialMediaData: data => dispatch(setSocialMediaData(data)),
  resetSocialMediaData: () => dispatch(resetSocialMediaData()),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupFlow));
