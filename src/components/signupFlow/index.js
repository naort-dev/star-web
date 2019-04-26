import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronLeft } from '@fortawesome/pro-light-svg-icons';
import { registerUser } from '../../store/shared/actions/register';
import { socialMediaLogin } from '../../store/shared/actions/socialMediaLogin';
import { followCelebrity } from '../../store/shared/actions/followCelebrity';
import RequestFlowPopup from '../RequestFlowPopup';
import SignUpForm from '../SignupForm';
import SignupMethod from '../SignupMethod';
import SignUpImageUpload from './components/SignUpImageUpload';
import RegistrationSuccess from './components/RegistrationSuccess';
import { LoginContainer } from './styled';
import { GroupRegistration, StarRegistration } from '../UserRegistration';
import { LoginTypeSelector } from '../../components/LoginTypeSelector';
import { setSocialMediaData, resetSocialMediaData } from '../../store/shared/actions/storeSocialMedia';
import { fetchUserDetails } from '../../store/shared/actions/getUserDetails';
import { toggleLogin, toggleSignup } from '../../store/shared/actions/toggleModals';
import { TermsAndConditions } from '../SignupForm/components/TermsAndConditions';
import { updateCategory } from '../../pages/landing/actions/updateFilters'
import SetPrice from './components/SetPrice'
import { FAN_REG_SUCCESS,
  SET_PRICE } from './constants'

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
    this.setState({ selectedType: role, stepCount: 0 });
    if (role === 'star') {
      this.setState({ stepCount: this.starRegistrationSteps });
    } else if (role === 'group') {
      this.setState({ stepCount: this.groupRegistrationSteps });
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
   goToBrowseStars = () => {
    this.props.updateCategory('Featured', 0, []);
    if (this.props.location.pathname !== '/browse-stars') {
      this.props.history.push('/browse-stars');
    }
    this.closeSignUp();
  };

   gotToHome = () => {
    if (this.props.location.pathname !== '/') {
      this.props.history.push('/');
    }
    this.closeSignUp();
  };
  renderSteps = () => {
    if (this.state.selectedType === 'fan') {
      switch (this.state.currentStep) {
        case 1: return (<SignUpForm
          {...this.props}
          registerUser={this.props.registerUser}
          changeStep={this.changeStep}
          currentStep={this.state.currentStep}
          signupRole={this.state.selectedType}
          data={this.state.socialData}
          closeSignupFlow={this.closeSignUp}
        />
        );
        case 2: return (
          <RegistrationSuccess
            closeSignupFlow={this.closeSignUp} 
            description={FAN_REG_SUCCESS.DESCRIPTION}
            icon={FAN_REG_SUCCESS.ICON}
            image_url={FAN_REG_SUCCESS.IMAGE_URL}
            message={FAN_REG_SUCCESS.MESSAGE}
            primary_button={FAN_REG_SUCCESS.PRIMARY_BUTTON}
            primaryButtonClick={this.goToBrowseStars}
            secondary_button={FAN_REG_SUCCESS.SECONDARY_BUTTON}
            secondaryButtonClick={this.gotToHome}
            title={FAN_REG_SUCCESS.TITLE}/>
        );
        default: return null;
      }
    } else if (this.state.selectedType === 'star') {
      switch (this.state.currentStep) {
        case 4: return (<SignUpForm
          {...this.props}
          registerUser={this.props.registerUser}
          changeStep={this.changeStep}
          currentStep={this.state.currentStep}
          signupRole={this.state.selectedType}
          data={this.state.socialData}
          closeSignupFlow={this.closeSignUp}
        />);
        case 2: return (<SignUpImageUpload
          {...this.props}
          changeStep={this.changeStep}
          currentStep={this.state.currentStep}
          signupRole={this.state.selectedType}
          closeSignupFlow={this.closeSignUp}
        />);
        case 3: return (<StarRegistration
          currentStep={this.state.currentStep}
          changeStep={this.changeStep}
          closeSignupFlow={this.closeSignUp}
        />);
        case 1: return (<SetPrice
          action={SET_PRICE.ACTION}
          confirmationTitle={SET_PRICE.CONFIRMATION_TITLE}
          confirmDescription={SET_PRICE.CONFIRMATION_DESCRIPTION}
          confirmPrimaryButton={SET_PRICE.CONFIRM_PRIMARY_BUTTON}
          description={SET_PRICE.DESCRIPTION}
          image_url={SET_PRICE.IMAGE_URL}
          message={SET_PRICE.MESSAGE}
          primary_button={SET_PRICE.PRIMARY_BUTTON}
          primaryButtonClick={this.goToBrowseStars}
          title={SET_PRICE.TITLE}
          help_text={SET_PRICE.HELP_TEXT}
          link={SET_PRICE.LINK}
        />)
        default: return null;
      }
    } else if (this.state.selectedType === 'group') {
      switch (this.state.currentStep) {
        case 1: return (<SignUpForm
          {...this.props}
          registerUser={this.props.registerUser}
          currentStep={this.state.currentStep}
          closeSignupFlow={this.closeSignUp}
          changeStep={this.changeStep}
          signupRole={this.state.selectedType}
          data={this.state.socialData}
        />);
        case 2:
        case 3:
        case 4:
        case 5: return (<GroupRegistration
          currentStep={this.state.currentStep}
          closeSignupFlow={() => this.closeSignUp()}
          changeStep={this.changeStep}
        />);
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
          modalView={this.state.currentStep > 3 && !this.state.enableClose}
          smallPopup
        >
          <LoginContainer>
            {this.state.currentStep > 0 &&
              !(this.state.currentStep == 2 &&
                this.state.selectedType === 'fan') &&
              <LoginContainer.BackButton onClick={() => this.changeStep(this.state.currentStep - 1)}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </LoginContainer.BackButton>}
            <LoginContainer.LeftSection>
              {
                !this.state.selectedType ?
                  <LoginTypeSelector
                    {...this.props}
                    isSignUp
                    changeSignUpRole={this.changeSignUpRole}
                    changeStep={this.changeStep}
                    currentStep={this.state.currentStep}
                  />
                  :
                  <LoginContainer.SignupFlow currentStep={this.state.currentStep}>
                    {
                      this.state.currentStep === 0 ?
                        <SignupMethod
                          {...this.props}
                          changeStep={this.changeStep}
                          currentStep={this.state.currentStep}
                          signupRole={this.state.selectedType}
                          data={this.state.socialData}
                          closeSignupFlow={this.closeSignUp}
                        />
                        : this.renderSteps()
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
  socialMediaLogin: socialObject =>
    dispatch(socialMediaLogin(socialObject)),
  followCelebrity: (celebId, celebProfessions, follow, cancelUpdate) => dispatch(followCelebrity(celebId, celebProfessions, follow, cancelUpdate)),
  toggleLogin: state => dispatch(toggleLogin(state)),
  toggleSignup: state => dispatch(toggleSignup(state)),
  setSocialMediaData: data => dispatch(setSocialMediaData(data)),
  resetSocialMediaData: () => dispatch(resetSocialMediaData()),
  updateCategory: (label, value, subCategories) => dispatch(updateCategory(label, value, subCategories)),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupFlow));
