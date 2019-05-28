import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser, clearRegisterErrors } from '../../store/shared/actions/register';
import { socialMediaLogin } from '../../store/shared/actions/socialMediaLogin';
import { followCelebrity } from '../../store/shared/actions/followCelebrity';
import RequestFlowPopup from '../RequestFlowPopup';
import SignUpForm from '../SignupForm';
import SignupMethod from '../SignupMethod';
import SignUpImageUpload from './components/SignUpImageUpload';
import RegistrationSuccess from './components/RegistrationSuccess';
import { LoginContainer } from './styled';
import { GroupRegistration } from '../UserRegistration';
import { LoginTypeSelector } from '../../components/LoginTypeSelector';
import {
  setSocialMediaData,
  resetSocialMediaData,
} from '../../store/shared/actions/storeSocialMedia';
import { fetchUserDetails } from '../../store/shared/actions/getUserDetails';
import {
  toggleLogin,
  toggleSignup,
} from '../../store/shared/actions/toggleModals';
import { setSignupFlow } from '../../store/shared/actions/setSignupFlow';
import { loaderAction } from '../../store/shared/actions/commonActions';
import { updateCategory } from '../../pages/landing/actions/updateFilters'
import SetPrice from './components/SetPrice'
import {
  FAN_REG_SUCCESS,
  STAR_REG_SUCCESS,
  STAR_GET_PHONE_NO,
  SET_PRICE
} from './constants'
import { BackArrow } from '../../styles/CommonStyled';
import WelcomeVideo from './components/WelcomeVideo';
import Skip from './components/WelcomeVideo/Skip';
import { awsKeys } from '../../constants';
import fetchAWSVideo from '../../services/getAwsVideo';
import { celebritySignupProfile } from '../../services/userRegistration'
import GetPhoneNumber from '../../components/GetPhoneNumber';
import { updateProfilePhoto, resetProfilePhoto, setProfilePicToState } from '../../store/shared/actions/updateProfilePhoto';


class SignupFlow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: props.signupDetails.role ? props.signupDetails.role : null,
      stepCount: 0,
      socialData: {},
      currentStep: props.signupDetails.currentStep ? props.signupDetails.currentStep : 0,
      enableClose: props.signUpDetails.enableClose
        ? props.signUpDetails.enableClose
        : false,
      profession: [],
      scrollRef: null,
      profile_video: 'sample.mp4',
      disableClose: false,
      skipVideo: false,
      audioVideoSupport:true,
    };
    this.starRegistrationSteps = 6;
    this.groupRegistrationSteps = 5;
  }

  componentWillUnmount() {
    this.props.clearRegisterErrors();
  }

  onBack = flag => {
    this.setState(state => ({
      currentStep: state.currentStep - 1,
      switched: flag,
    }));
  };

  onPhoneNumBack = flag => {
    this.setState(state => ({
      currentStep: state.currentStep - 1,
      phoneNumswitched: flag,
    }));
  };
  onSetPriceBack = flag => {
    this.setState(state => ({
      currentStep: flag? state.currentStep - 1 : state.currentStep - 2,
      switchedSetPrice: flag, 
      switched: this.state.audioVideoSupport ,
    }));
  };

  setAudioVideoSupport = support => {
    this.props.setSignupFlow({ audioVideoSupport: support });
    this.setState({
      audioVideoSupport: support,
    });
  }

  setSkippedVideo = () => {
    this.props.setSignupFlow({
      welcomeVideoSkip: true,
      welcomeVideo: '',
      welcomeVideoFile: '',
      welcomeVideoLength: '',
      videoUploaded: false,
    });
    this.setState({
      skipVideo: true,
    });
  }
  getBioDetails = bioDetails => {
    this.setState({ bioDetails });
  };
 
  setProfileVideo = (fileName) => {
    fetchAWSVideo(awsKeys.accountVideo, fileName)
      .then((resp => {
        this.props.setSignupFlow({
          welcomeVideo: resp,
          welcomeVideoFile: fileName,
          welcomeVideoSkip: false,
          audioVideoSupport: true,
          videoUploaded: true,
          welcomeVideoLength: this.props.commonReducer.recordedTime,
        });
      }));
    this.setState({ profile_video: fileName });
  }

  saveData = data =>
    this.setState({ socialData: { ...this.state.socialData, ...data } });

  changeStep = step => {
    this.state.scrollRef.scrollTop = 0;
    this.props.setSignupFlow({ currentStep: step });
    this.setState({ currentStep: step, enableClose: false });
  };
  closeSignUp = () => {
    this.props.toggleSignup(false);
    if (this.state.selectedType === 'group' && this.state.currentStep === 5) {
      this.props.history.push('user/star-supporters');
    }
  }
  closeSignUpForm =(isTermsAndCondition) => {
    if(isTermsAndCondition) {
      // this.onBack(isTermsAndCondition);
      this.setState({
        switched: false,
        disableClose: false
      });
    } else {
      this.closeSignUp();
    }
  }

  closeSetPrice =(isReferred) => {
    if(isReferred) {
      // this.onBack(isTermsAndCondition);
      this.setState({
        switchedSetPrice: false,
        disableClose: false
      });
    } else {
      this.closeSignUp();
    }
  }

  closePhoneNum =(isOtpScreen) => {
    if(isOtpScreen) {
      // this.onBack(isTermsAndCondition);
      this.setState({
        phoneNumswitched: false,
        disableClose: false
      });
    } else {
      this.closeSignUp();
    }
  }
  
  changeSignUpRole = role => {
    this.setState({ selectedType: role, stepCount: 0 });
    this.props.setSignupFlow({ role });
    this.state.scrollRef.scrollTop = 0;
    if (role === 'star') {
      this.setState({ stepCount: this.starRegistrationSteps });
    } else if (role === 'group') {
      this.setState({ stepCount: this.groupRegistrationSteps });
    }
  };

  disableClose = (flag) => {
    this.setState({disableClose: flag});
  }
  submitCelebrityDetails(priceDetails) {
    const celebrityProfileData = {
      ...priceDetails,
      weekly_limits: 5,
      profession: this.state.profession,
      availability: true,
      profile_video: this.state.profile_video,
      description: '',
    }
    this.props.loaderAction(true)
    celebritySignupProfile(celebrityProfileData)
      .then((success) => {
        this.props.loaderAction(false)
        if (success) {
          this.changeStep(this.state.skipVideo ? this.state.currentStep + 1  : this.state.currentStep + 2)
          // this.changeStep(this.state.currentStep + 1);
        }
      })
      .catch(() => {
        this.props.loaderAction(false)
      });
  }

  goToBrowseStars = () => {
    this.props.updateCategory('Featured', 0, []);
    if (this.props.location.pathname !== '/browse-stars') {
      this.props.history.push('/browse-stars');
    }
    this.closeSignUp();
  };
  continueClickHandler = (professions, fileImage, cropImage) => {
    if(professions.length > 0 && (fileImage || cropImage)) {
      this.props.setSignupFlow({ 
        currentStep: this.state.currentStep + 1,
        categoryList: professions,
      })
      this.setState(state => ({
        currentStep: state.currentStep + 1,
        profession: professions.map(profession => profession.id)
      }));
    }
  };

  gotToHome = () => {
    if (this.props.location.pathname !== '/') {
      this.props.history.push('/');
    }
    this.closeSignUp();
  };
  submitOTPForm = () => {
    this.changeStep(this.state.currentStep + 1);
  }

  setScrollRef = (scrollNode) => {
    this.setState({ scrollRef: scrollNode })
  }

  renderSteps = () => {
    if (this.state.selectedType === 'fan') {
      switch (this.state.currentStep) {
        case 1:
          return (
            <SignUpForm
              {...this.props}
              registerUser={this.props.registerUser}
              changeStep={this.changeStep}
              currentStep={this.state.currentStep}
              signupRole={this.state.selectedType}
              data={this.state.socialData}
              onBack={this.onBack}
              switched={this.state.switched}
              disableClose={this.disableClose}
              socialMediaStore={this.props.socialMediaStore}
              closeSignupFlow={this.closeSignUp}
            />
          );
        case 2:
          return (
            <RegistrationSuccess
              closeSignupFlow={this.closeSignUp}
              audioVideoSupport={this.state.audioVideoSupport}
              signupRole={this.state.selectedType}
              skipVideo={this.state.skipVideo}
              description={FAN_REG_SUCCESS.DESCRIPTION}
              icon={FAN_REG_SUCCESS.ICON}
              image_url={FAN_REG_SUCCESS.IMAGE_URL}
              message={FAN_REG_SUCCESS.MESSAGE}
              primary_button={FAN_REG_SUCCESS.PRIMARY_BUTTON}
              primaryButtonClick={this.goToBrowseStars}
              secondary_button={FAN_REG_SUCCESS.SECONDARY_BUTTON}
              secondaryButtonClick={this.gotToHome}
              title={FAN_REG_SUCCESS.TITLE} />
          );
        default:
          return null;
      }
    } else if (this.state.selectedType === 'star') {
      switch (this.state.currentStep) {
        case 1:
          return (
            <SignUpForm
              {...this.props}
              registerUser={this.props.registerUser}
              changeStep={this.changeStep}
              setSignupFlow={this.props.setSignupFlow}
              scrollRef={this.state.scrollRef}
              currentStep={this.state.currentStep}
              signupRole={this.state.selectedType}
              data={this.state.socialData}
              closeSignupFlow={this.closeSignUpForm}
              onBack={this.onBack}
              switched={this.state.switched}
              disableClose={this.disableClose}
            />
          );
        case 2:
          return (
            <SignUpImageUpload
              {...this.props}
              changeStep={this.changeStep}
              scrollRef={this.state.scrollRef}
              currentStep={this.state.currentStep}
              setSignupFlow={this.props.setSignupFlow}
              signupRole={this.state.selectedType}
              closeSignupFlow={this.closeSignUp}
              continueClickCallback={this.continueClickHandler}
              updateProfilePhoto={this.props.updateProfilePhoto}
              setProfilePicToState={this.props.setProfilePicToState}
              profilePic={this.props.profilePic}
            />
          );
        case 3:
          return (
            <WelcomeVideo
              onBack={this.onBack}
              changeStep={this.changeStep}
              currentStep={this.state.currentStep}
              signupDetails={this.props.signupDetails}
              setSignupFlow={this.props.setSignupFlow}
              switched={this.state.switched}
              setProfileVideo={this.setProfileVideo}
              audioVideoSupport={this.setAudioVideoSupport}
              skipCallback={flag => {
                this.setState(state => ({
                  currentStep: state.currentStep + 1,
                  switched: flag,
                }));
              }}
            />
          );

        case 4:
          return <Skip
            onBack={this.onBack}
            changeStep={this.changeStep}
            currentStep={this.state.currentStep}
            switched={this.state.switched}
            skipVideo={this.setSkippedVideo} />;

        case 5:
          return (<SetPrice
            onBack={this.onSetPriceBack}
            changeStep={this.changeStep}
            currentStep={this.state.currentStep}
            setSignupFlow={this.props.setSignupFlow}
            signupDetails={this.props.signupDetails}
            switched={this.state.switchedSetPrice}
            closeSignupFlow={this.closeSetPrice}
            disableClose={this.disableClose}
            action={SET_PRICE.ACTION}
            scrollRef={this.state.scrollRef}
            confirmationTitle={SET_PRICE.CONFIRMATION_TITLE}
            confirmDescription={SET_PRICE.CONFIRMATION_DESCRIPTION}
            confirmPrimaryButton={SET_PRICE.CONFIRM_PRIMARY_BUTTON}
            description={SET_PRICE.DESCRIPTION}
            inAppPriceList={this.props.inAppPriceList}
            image_url={SET_PRICE.IMAGE_URL}
            message={SET_PRICE.MESSAGE}
            primary_button={SET_PRICE.PRIMARY_BUTTON}
            primaryButtonClick={(priceDetails) => this.submitCelebrityDetails(priceDetails)}
            title={SET_PRICE.TITLE}
            link={SET_PRICE.LINK}
          />);
          case 6:
            return(
              <GetPhoneNumber
                description={STAR_GET_PHONE_NO.DESCRIPTION}
                title1={STAR_GET_PHONE_NO.TITLE1}
                image_url={STAR_GET_PHONE_NO.IMAGE_URL}
                otptitle={STAR_GET_PHONE_NO.OTP_TITLE}
                otp_sub_title={STAR_GET_PHONE_NO.OTP_SUBTITLE}
                otp_receive_code={STAR_GET_PHONE_NO.OTP_RECEIVE_CODE}
                onComplete={this.submitOTPForm}
                onBack={this.onPhoneNumBack}
                switched={this.state.phoneNumswitched}
                disableClose={this.disableClose}
                closePhoneNum={this.closePhoneNum}
              />
            )
          case 7:
            return (
              <RegistrationSuccess
                closeSignupFlow={this.closeSignUp}
                audioVideoSupport={this.state.audioVideoSupport}
                skipVideo={this.state.skipVideo}
                description={STAR_REG_SUCCESS.DESCRIPTION}
                skipvideo_description= {STAR_REG_SUCCESS.SKIP_VIDEO_DESCRIPTION}
                icon={FAN_REG_SUCCESS.ICON}
                image_url={FAN_REG_SUCCESS.IMAGE_URL}
                message={FAN_REG_SUCCESS.MESSAGE}
                highlight_text={STAR_REG_SUCCESS.HIGHLIGHT_TEXT}
                nodevice_description={STAR_REG_SUCCESS.NO_DEVICE_DESCRIPTION}
                primary_button={STAR_REG_SUCCESS.PRIMARY_BUTTON}
                primaryButtonClick={this.goToBrowseStars}
                secondary_button={STAR_REG_SUCCESS.SECONDARY_BUTTON}
                secondaryButtonClick={this.gotToHome}
                title={FAN_REG_SUCCESS.TITLE} />
            );

        default:
          return null;
      }
    } else if (this.state.selectedType === 'group') {
      switch (this.state.currentStep) {
        case 1:
          return (
            <SignUpForm
              {...this.props}
              registerUser={this.props.registerUser}
              currentStep={this.state.currentStep}
              closeSignupFlow={this.closeSignUp}
              changeStep={this.changeStep}
              signupRole={this.state.selectedType}
              data={this.state.socialData}
            />
          );
        case 2:
        case 3:
        case 4:
        case 5:
          return (
            <GroupRegistration
              currentStep={this.state.currentStep}
              closeSignupFlow={() => this.closeSignUp()}
              changeStep={this.changeStep}
            />
          );
        default:
          return null;
      }
    }
    return null;
  };

  render() {
    return (
      <div>
        <RequestFlowPopup
          dotsCount={0}
          closePopUp={this.closeSignUp}
          modalView
          smallPopup
          setScrollRef={this.setScrollRef}
          disableClose={this.state.disableClose}
        >
          <LoginContainer>
            {this.state.currentStep > 0 &&
              !(
                this.state.currentStep === 5 || (this.state.currentStep === 1 && this.state.selectedType === 'star') || this.state.currentStep === 7
              ) && (
                <BackArrow
                  className="backArrow"
                  onClick={() => this.changeStep(this.state.currentStep === 5 ? this.state.currentStep - 2 : this.state.currentStep - 1)}
                />
              )}
            <LoginContainer.LeftSection>
              {!this.state.selectedType ? (
                <LoginTypeSelector
                  {...this.props}
                  isSignUp
                  changeSignUpRole={this.changeSignUpRole}
                  changeStep={this.changeStep}
                  currentStep={this.state.currentStep}
                />
              ) : (
                  <LoginContainer.SignupFlow currentStep={this.state.currentStep}>
                    {this.state.currentStep === 0 ? (
                      <SignupMethod
                        {...this.props}
                        changeStep={this.changeStep}
                        currentStep={this.state.currentStep}
                        setSignupFlow={this.props.setSignupFlow}
                        signupRole={this.state.selectedType}
                        data={this.state.socialData}
                        closeSignupFlow={this.closeSignUp}
                      />
                    ) : (
                        this.renderSteps()
                      )}
                  </LoginContainer.SignupFlow>
                )}
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
  signupDetails: state.signupDetails,
  signUpDetails: state.modals.signUpDetails,
  redirectUrls: state.redirectReferrer,
  followCelebData: state.followCelebrityStatus,
  socialMediaStore: state.socialMediaData,
  commonReducer: state.commonReducer,
  inAppPriceList: state.config.data.in_app_pricing,
  profilePic: state.photoUpload.profilePic,
});

const mapDispatchToProps = dispatch => ({
  fetchUserDetails: id => dispatch(fetchUserDetails(id)),
  registerUser: (firstName, lastName, email, password, role, referral) =>
    dispatch(
      registerUser(firstName, lastName, email, password, role, referral),
    ),
  loaderAction: state => dispatch(loaderAction(state)),
  socialMediaLogin: socialObject => dispatch(socialMediaLogin(socialObject)),
  clearRegisterErrors: () => dispatch(clearRegisterErrors()),
  setSignupFlow: signupDetails => dispatch(setSignupFlow(signupDetails)),
  followCelebrity: (celebId, celebProfessions, follow, cancelUpdate) =>
    dispatch(followCelebrity(celebId, celebProfessions, follow, cancelUpdate)),
  toggleLogin: state => dispatch(toggleLogin(state)),
  toggleSignup: state => dispatch(toggleSignup(state)),
  setSocialMediaData: data => dispatch(setSocialMediaData(data)),
  resetSocialMediaData: () => dispatch(resetSocialMediaData()),
  updateCategory: (label, value, subCategories) => dispatch(updateCategory(label, value, subCategories)),
  updateProfilePhoto: obj => dispatch(updateProfilePhoto(obj)),
  setProfilePhoto: () => dispatch(resetProfilePhoto()),
  setProfilePicToState: (obj) => dispatch(setProfilePicToState(obj)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SignupFlow),
);
