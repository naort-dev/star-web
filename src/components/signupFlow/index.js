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
      selectedType: null,
      stepCount: 0,
      socialData: {},
      currentStep: 1,
    };
    this.starRegistrationSteps = 6;
    this.groupRegistrationSteps = 5;
  }
  getBioDetails = (bioDetails) => {
    this.setState({ bioDetails });
  }
  changeSignUpRole = (role) => {
    this.setState({ selectedType: role });
    if (role === 'star') {
      this.setState({ stepCount: this.starRegistrationSteps });
    } else if (role === 'group') {
      this.setState({ stepCount: this.groupRegistrationSteps });
    }
  }
  saveData = data => this.setState({ socialData: { ...this.state.socialData, ...data } });

  changeStep = (step) => {
    this.setState({ currentStep: step });
  }

  closeSignUp = () => {
    this.props.fetchUserDetails(this.props.userDetails.settings_userDetails.id);
    this.props.toggleSignup(false);
  }
  
  renderSteps = () => {
    if (this.state.selectedType === 'fan') {
      return <SignUpForm {...this.props} signupRole={this.state.selectedType} data={this.state.socialData} />;
    } else if (this.state.selectedType === 'star') {
      // switch (this.state.currentStep) {
      //   case 1: return <SignUpForm {...this.props} currentStep={this.state.currentStep} closeSignupFlow={() => this.props.toggleSignup(false)} changeStep={this.changeStep} signupRole={this.state.selectedType} data={this.state.socialData} />;
      //   case 2: return <StarbioPopup currentStep={this.state.currentStep} changeStep={this.changeStep} getBioDetails={this.getBioDetails} />;
      //   case 3: return <StarsignUpVideo currentStep={this.state.currentStep} changeStep={this.changeStep} bioDetails={this.state.bioDetails} />;
      //   case 4: return <Starsuccess closeSignupFlow={() => this.props.toggleSignup(false)} />;
      //   default: return null;
      // }
      switch (this.state.currentStep) {
        case 1: return <SignUpForm {...this.props} currentStep={this.state.currentStep} closeSignupFlow={() => this.closeSignUp()} changeStep={this.changeStep} signupRole={this.state.selectedType} data={this.state.socialData} />;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6: return <StarRegistration currentStep={this.state.currentStep} changeStep={this.changeStep} closeSignupFlow={() => this.closeSignUp()} />;
        default: return null;
      }
    } else if (this.state.selectedType === 'group') {
      switch (this.state.currentStep) {
        case 1: return <SignUpForm {...this.props} currentStep={this.state.currentStep} closeSignupFlow={() => this.closeSignUp()} changeStep={this.changeStep} signupRole={this.state.selectedType} data={this.state.socialData} />;
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
          dotsCount={this.state.stepCount}
          selectedDot={this.state.currentStep}
          closePopUp={() => this.closeSignUp()}
          smallPopup
        >
          <LoginContainer>
            <LoginContainer.LeftSection>
              {
                this.state.currentStep === 1 ?
                  <HeaderSection>
                    {/* {
                      this.state.currentStep > 1 ?
                        <HeaderSection.HeaderNavigation onClick={() => this.goBack()} />
                      : null
                    } */}
                    <Link to="/">
                      <HeaderSection.LogoImage
                        src="assets/images/logo_starsona_large.svg"
                        alt=""
                      />
                    </Link>
                  </HeaderSection>
                : null
              }
              {
                !this.state.selectedType ?
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
  redirectUrls: state.redirectReferrer,
  followCelebData: state.followCelebrityStatus,
  socialMediaStore: state.socialMediaData,
});

const mapDispatchToProps = dispatch => ({
  fetchUserDetails: id => dispatch(fetchUserDetails(id)),
  registerUser: (firstName, lastName, email, password, role) =>
    dispatch(registerUser(firstName, lastName, email, password, role)),
  socialMediaLogin: (userName, firstName, lastName, signUpSource, profilePhoto, fbId) =>
    dispatch(socialMediaLogin(userName, firstName, lastName, signUpSource, profilePhoto, fbId)),
  resetRedirectUrls: () => dispatch(resetRedirectUrls()),
  followCelebrity: (celebId, celebProfessions, follow, cancelUpdate) => dispatch(followCelebrity(celebId, celebProfessions, follow, cancelUpdate)),
  toggleLogin: state => dispatch(toggleLogin(state)),
  toggleSignup: state => dispatch(toggleSignup(state)),
  setSocialMediaData: data => dispatch(setSocialMediaData(data)),
  resetSocialMediaData: () => dispatch(resetSocialMediaData()),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupFlow));
