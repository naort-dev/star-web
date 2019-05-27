/************************************ React Files ************************************/
import React from 'react';
import { connect } from 'react-redux';
/************************************ Components *************************************/
import validator from 'validator';
import ActionLoader from '../ActionLoader';
import Checkbox from '../../components/Checkbox';
import { TextInput } from '../TextField';
import { TermsAndConditions } from './components/TermsAndConditions';
import PrimaryButton from '../PrimaryButton';
/************************************   Actions  *************************************/
import { updateLoginStatus } from '../../store/shared/actions/login';
import { fetchUserDetails } from '../../store/shared/actions/getUserDetails';
import DotsContainer from '../../components/Dots';
/********************************  Helper functions  *********************************/
import { formatSignUpByUserType } from './helper';
/***********************************  Constants  *************************************/
import { ROLES } from '../../constants/usertype';
import { ROLE_FAN, ROLE_STAR } from './constants';
/************************************  Styles  ***************************************/
import { LoginContainer } from './styled';
import { BackArrow, CloseButton } from '../../styles/CommonStyled';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: { value: props.signupDetails.firstName? props.signupDetails.firstName : '', isValid: false, message: '' },
      lastName: { value: props.signupDetails.lastName? props.signupDetails.lastName : '', isValid: true, message: '' },
      nickName: { value: props.signupDetails.nickName? props.signupDetails.nickName: '', isValid: true, message: '' },
      password: { value: '', isValid: false, message: '' },
      confirmPassword: { value: '', isValid: false, message: '' },
      email: { value: props.signupDetails.email? props.signupDetails.email: '', isValid: false, message: '' },
      termsAndConditions: { value: this.props.signupRole === ROLE_FAN, isValid: false, message: '' },
      role: ROLES[props.signupRole],
      loading: false,
      acceptTerms: props.switched ? props.switched :false,
    };
  }
  componentWillMount() {
    const params =
      window.location.search && window.location.search.split('?')[1];
    const finalParams = params && params.split('&');
    if (finalParams) {
      finalParams.forEach(data => {
        if (data.split('=')[0] === 'referral') {
          this.setState({
            referral: data.split('=')[1],
          });
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      const followData = this.props.followCelebData;
      if (followData.celebId) {
        this.props.followCelebrity(
          this.props.followCelebData.celebId,
          this.props.followCelebData.celebProfessions,
          this.props.followCelebData.follow,
          true,
        );
      }
    }
    if (this.props.loading !== nextProps.loading) {
      this.setState({
        loading: nextProps.loading,
      });
    }
    if(this.props.switched !== nextProps.switched) {
      this.setState({
        acceptTerms: nextProps.switched, 
      });
    }
  }

  onSocialMediaLogin = () => {
    const {
      source,
      fbId,
      gpId,
      instId,
      twId,
      role,
    } = this.props.signupDetails;
      const socialObject = {
        userName: this.state.email.value,
        firstName: this.state.firstName.value,
        lastName: this.state.lastName.value,
        nickName: '',
        source,
        profilePhoto: '',
        role: ROLES[role],
        fbId,
        gpId,
        instId,
        twId,
      };
      this.props.socialMediaLogin(socialObject)
        .then(response => {
          if (response !== undefined) {
            this.props.setSignupFlow({
              firstName: socialObject.firstName,
              lastName: socialObject.lastName,
              nickName: socialObject.nickName,
              email: socialObject.userName,
              fbId: socialObject.fb_id,
              gpId: socialObject.gp_id,
              instId: socialObject.in_id,
              twId: socialObject.tw_id,
            });
            this.props.changeStep(this.props.currentStep + 1);
          }
        }); 
    }

  onRegister = e => {
    e.preventDefault();
    if (
      this.checkFirstRequired() &
      this.checkLastRequired() &
      this.checkEmail()
    ) {
      if (this.props.signupDetails.role === ROLE_FAN && this.props.signupDetails.isSocial) {
        this.onSocialMediaLogin();
      } else if ((this.props.signupRole === ROLE_FAN
        ? this.checkPassword()
        : this.checkTermsAndConditionsRequired())) {
        this.props.registerUser(
          this.state.firstName.value,
          this.state.lastName.value,
          this.state.email.value,
          this.state.password.value,
          this.state.nickName.value,
          this.state.role,
        )
        .then(response => {
          if (response !== undefined) {
            this.props.setSignupFlow({
              firstName: this.state.firstName.value,
              lastName: this.state.lastName.value,
              nickName: this.state.nickName.value,
              email: this.state.email.value,
            })
            this.props.changeStep(this.props.currentStep + 1);
          }
        });        
      }
    }
  };

  saveFormEntries = (event, type) => {
    this.setState({
      [type]: { ...this.state[type], value: event.target.value },
    });
  };

  toggleTermsAndConditions = (checkValue) => {
    this.setState({
      termsAndConditions: {
        ...this.state.termsAndConditions,
        value: checkValue,
      },
    });
  };
  agreeTermsConditions = () => {
    this.setState(
      {
        acceptTerms: false,
        termsAndConditions: {
          ...this.state.termsAndConditions,
          value: true,
        },
      },
      () => this.checkTermsAndConditionsRequired(),
    );
    this.props.disableClose(false);
  };
  checkEmail = () => {
    const emailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/; // Regex to check if email is valid
    if (validator.isEmpty(this.state.email.value)) {
      this.setState({
        email: { ...this.state.email, message: 'Enter an email address' },
      });
      return false;
    }
    if (!emailRegex.test(this.state.email.value)) {
      this.setState({
        email: { ...this.state.email, message: 'Enter a valid email address' },
      });
      return false;
    }
    this.setState({
      email: { ...this.state.email, message: '', isValid: true },
    });
    return true;
  };

  checkFirstRequired = () => {
    const firstNameEmpty = !this.state.firstName.value;
    if (firstNameEmpty) {
      const firstNameMsg = 'Enter a first name';
      this.setState({
        firstName: { ...this.state.firstName, message: firstNameMsg },
      });
      return false;
    }
    this.setState({
      firstName: { ...this.state.firstName, message: '', isValid: true },
    });
    return true;
  };

  checkLastRequired = () => {
    const lastNameEmpty = validator.isEmpty(this.state.lastName.value);
    if (lastNameEmpty) {
      const lastNameMsg = 'Enter a last name';
      this.setState({
        lastName: {
          ...this.state.lastName,
          message: lastNameMsg,
        },
      });
      return false;
    }
    this.setState({
      lastName: { ...this.state.lastName, message: '', isValid: true },
    });
    return true;
  };

  checkPassword = () => {
    const pattern = /^(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/; // Accepts values with min 8 characters, atleast one number and atleast one symbol
    if (validator.isEmpty(this.state.password.value)) {
      this.setState({
        password: { ...this.state.password, message: 'Enter a  password' },
      });
      return false;
    }
    if (!pattern.test(this.state.password.value)) {
      this.setState({
        password: {
          ...this.state.password,
          message:
            'Enter a valid 8 character password with at least one symbol',
        },
      });
      return false;
    }
    if (this.state.confirmPassword.value !== this.state.password.value) {
      this.setState({
        password: {
          ...this.state.password,
          message: 'The passwords entered do not match!',
        },
      });
      return false;
    }
    this.setState({
      password: { ...this.state.password, message: '', isValid: true },
    });
    return true;
  };

  checkTermsAndConditionsRequired = () => {
    const termsAndConditionsEmpty = !this.state.termsAndConditions.value;
    if (termsAndConditionsEmpty) {
      const termsAndConditionsMsg = 'Terms and conditions not accepted';
      this.setState({
        termsAndConditions: {
          ...this.state.termsAndConditions,
          message: termsAndConditionsMsg,
        },
      });
      return false;
    }
    this.setState({
      termsAndConditions: {
        ...this.state.termsAndConditions,
        message: '',
        isValid: true,
      },
    });
    return true;
  };

  agreeTerms = () => {
    this.setState({
      acceptTerms: true,
    });
    this.props.scrollRef.scrollTop = 0;
    this.props.disableClose(true);
  };

  backArrowClick = () => {
    if (this.state.acceptTerms) {
      this.setState({acceptTerms: false});
    } else {
      this.props.onBack(false);
    }
  };
  closeSignUpForm = () => {
    this.props.closeSignupFlow(this.state.acceptTerms)
    this.setState({acceptTerms: false});
  }

  render() {
    const signUp = formatSignUpByUserType(this.props.signupRole);
    return (
      <React.Fragment>
      <BackArrow className="leftArrow" onClick={this.backArrowClick} />
      <CloseButton className="close" onClick={this.closeSignUpForm} />
      { this.state.acceptTerms ? (
      <TermsAndConditions agreeTermsConditions={this.agreeTermsConditions} />
    ) : (
      <LoginContainer.SocialMediaSignup>
        {this.state.loading && <ActionLoader />}
        <LoginContainer.Container className="popup-container">
          <LoginContainer.Heading>{signUp.title}</LoginContainer.Heading>
          {this.props.signupRole === 'star' && (
            <DotsContainer dotsCount={3} selectedDot={1} />
          )}
          <LoginContainer.InputFieldsWrapper>
            <LoginContainer.InputContainer>
              {this.props.statusCode === '410' ? (
                <LoginContainer.EmptyDiv />
              ) : (
                <div>
                  <LoginContainer.Label error={this.state.firstName.message}>
                    {this.state.firstName.message || this.state.lastName.message
                      ? 'Enter valid full name'
                      : signUp.item_1}
                  </LoginContainer.Label>
                  <LoginContainer.InputWrapper>
                    <LoginContainer.WrapsInput>
                      <TextInput
                        error={!!this.state.firstName.message}
                        placeholder={signUp.item_1_placeholder_1}
                        type="text"
                        name="firstName"
                        value={this.state.firstName.value}
                        onBlur={this.checkFirstRequired}
                        onChange={event =>
                          this.saveFormEntries(event, 'firstName')
                        }
                        InputProps={{
                            classes: {
                              error:'error-field',
                              input: 'input-label-first-name'
                            },
                          }}
                      />
                    </LoginContainer.WrapsInput>
                    <LoginContainer.WrapsInput>
                      <TextInput
                        error={!!this.state.lastName.message}
                        placeholder={signUp.item_1_placeholder_2}
                        type="text"
                        name="lastName"
                        value={this.state.lastName.value}
                        onBlur={this.checkLastRequired}
                        onChange={event =>
                          this.saveFormEntries(event, 'lastName')
                        }
                        InputProps={{
                          classes: {
                            error:'error-field',
                            input: 'input-label-last-name'
                          },
                        }}
                      />
                    </LoginContainer.WrapsInput>
                  </LoginContainer.InputWrapper>
                </div>
              )}
              <LoginContainer.Label className="optional-text" error={!!this.state[signUp.key_2].message}>
                {this.state[signUp.key_2].message
                  ? this.state[signUp.key_2].message
                  : signUp.item_2}
              </LoginContainer.Label>
              <LoginContainer.InputWrapper>
                <LoginContainer.WrapsInput>
                  <TextInput
                    error={!!this.state[signUp.key_2].message}
                    placeholder={signUp.item_2_placeholder}
                    type="text"
                    name={signUp.key_2}
                    fullWidth={true}
                    value={this.state[signUp.key_2].value}
                    onBlur={this[signUp.func_name_2]}
                    onChange={event =>
                      this.saveFormEntries(event, signUp.key_2)
                    }
                    InputProps={{
                      classes: {
                        error:'error-field',
                        input: 'input-label-stage-name'
                      },
                    }}
                  />
                </LoginContainer.WrapsInput>
              </LoginContainer.InputWrapper>
              {
                (this.props.signupRole === ROLE_STAR || !this.props.signupDetails.isSocial) &&
                  <React.Fragment>
                    <LoginContainer.Label
                      error={!!this.state[signUp.key_3_1].message}
                    >
                      {this.state[signUp.key_3_1].message
                        ? this.state[signUp.key_3_1].message
                        : signUp.item_3}
                    </LoginContainer.Label>
                    <LoginContainer.InputWrapper>
                      <LoginContainer.WrapsInput>
                        <TextInput
                          error={!!this.state[signUp.key_3_1].message}
                          placeholder={signUp.item_3_placeholder_1}
                          type={
                            this.props.signupRole === ROLE_FAN ? 'password' : 'text'
                          }
                          name={signUp.key_3_1}
                          fullWidth={
                            this.props.signupRole === ROLE_STAR ? true : false
                          }
                          value={this.state[signUp.key_3_1].value}
                          onBlur={this[signUp.func_name_3]}
                          onChange={event =>
                            this.saveFormEntries(event, signUp.key_3_1)
                          }
                          InputProps={{
                            classes: {
                              error:'error-field',
                              input: 'input-label-email'
                            },
                          }}
                        />
                      </LoginContainer.WrapsInput>
                      {this.props.signupRole === ROLE_FAN ? (
                        <LoginContainer.WrapsInput>
                          <TextInput
                            error={!!this.state[signUp.key_3_1].message}
                            placeholder={signUp.item_3_placeholder_2}
                            type={
                              this.props.signupRole === ROLE_FAN ? 'password' : 'text'
                            }
                            name={signUp.key_3_2}
                            value={this.state[signUp.key_3_2].value}
                            onChange={event =>
                              this.saveFormEntries(event, signUp.key_3_2)
                            }
                            InputProps={{
                              classes: {
                                error:'error-field',
                              },
                            }}
                          />
                        </LoginContainer.WrapsInput>
                      ) : null}
                    </LoginContainer.InputWrapper>
                    <LoginContainer.WrapsInput classname="no-space">
                      {this.props.statusCode === undefined ? (
                        <LoginContainer.ErrorMsg>
                          {this.props.error}
                        </LoginContainer.ErrorMsg>
                      ) : (
                        <LoginContainer.EmptyDiv />
                      )}
                    </LoginContainer.WrapsInput>
                  </React.Fragment>
              }
              {this.props.signupRole === ROLE_FAN ? null : (
                <div>
                  <LoginContainer.PrivacyContent className="privacy-check">
                    <Checkbox
                      onChange={this.toggleTermsAndConditions}
                      checked={this.state.termsAndConditions.value}
                    />
                    <span>
                      I have read and agree to
                      <LoginContainer.Anchor onClick={this.agreeTerms}>
                        Starsona’s Terms and Conditions and Privacy Policy
                      </LoginContainer.Anchor>
                    </span>
                  </LoginContainer.PrivacyContent>

                  <LoginContainer.ErrorMsg>
                    {this.state.termsAndConditions.message}
                  </LoginContainer.ErrorMsg>
                </div>
              )}
              <LoginContainer.ButtonWrapper className="align-center">
                <PrimaryButton
                  type="submit"
                  onClick={this.onRegister}
                  isDisabled={!this.state.termsAndConditions.value}
                >
                  {signUp.button_label}
                </PrimaryButton>
              </LoginContainer.ButtonWrapper>
            </LoginContainer.InputContainer>
          </LoginContainer.InputFieldsWrapper>
        </LoginContainer.Container>
      </LoginContainer.SocialMediaSignup>
    )
      }
      </ React.Fragment>
    );
  }
}

  

const mapStateToProps = state => ({
  loading: state.session.loading,
  signupDetails: state.signupDetails,
});

const mapProps = dispatch => ({
  updateLoginStatus: sessionDetails =>
    dispatch(updateLoginStatus(sessionDetails)),
  fetchUserDetails: id => dispatch(fetchUserDetails(id)),
});

export default connect(
  mapStateToProps,
  mapProps,
)(SignUpForm);
