/************************************ React Files ************************************/
import React from 'react';
import { connect } from 'react-redux';
/************************************ Components *************************************/
import validator from 'validator';
import ActionLoader from '../ActionLoader';
import Checkbox from '@material-ui/core/Checkbox';
import { TextInput } from '../TextField';
import { TermsAndConditions } from './components/TermsAndConditions'
import SignUpImageUpload from '../signupFlow/components/SignUpImageUpload';
/************************************   Actions  *************************************/
import { updateLoginStatus } from '../../store/shared/actions/login';
import { fetchUserDetails } from '../../store/shared/actions/getUserDetails';
/********************************  Helper functions  *********************************/
import { formatSignUpByUserType } from './helper';
/***********************************  Constants  *************************************/
import { ROLES } from '../../constants/usertype';
import { ROLE_FAN, ROLE_STAR } from './constants'
/************************************  Styles  ***************************************/
import { LoginContainer } from './styled';
import { debug } from 'util';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: { value: '', isValid: false, message: '' },
      lastName: { value: '', isValid: true, message: '' },
      nickName: { value: '', isValid: true, message: '' },
      password: { value: '', isValid: false, message: '' },
      confirmPassword: { value: '', isValid: false, message: '' },
      email: { value: '', isValid: false, message: '' },
      termsAndConditions: { value: true, isValid: false, message: '' },
      role: ROLES[props.signupRole],
      loading: false,
      acceptTerms: false,
    };
  }
  componentWillMount() {
    if (this.props.isLoggedIn) {
      this.props.toggleSignup(false);
    }
    const params = window.location.search && window.location.search.split('?')[1];
    const finalParams = params && params.split('&');
    if (finalParams) {
      finalParams.forEach((data) => {
        if (data.split('=')[0] === 'referral') {
          this.setState({ referral: data.split('=')[1] });
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      if (this.props.signupRole === "fan") {
        this.props.toggleSignup(false);
      }
      if (this.props.signupRole === "fan") {
        const followData = this.props.followCelebData;
        if (followData.celebId) {
          this.props.followCelebrity(
            this.props.followCelebData.celebId,
            this.props.followCelebData.celebProfessions,
            this.props.followCelebData.follow,
            true
          );
        }
      }
    }
    if (this.props.loading !== nextProps.loading) {
      this.setState({ loading: nextProps.loading });
    }
  }

  onRegister = async (e) => {
    e.preventDefault();
    if (this.props.signupRole === ROLE_FAN) {
      if (
        this.checkFirstRequired() &
        this.checkLastRequired() &
        this.checkEmail() &
        this.checkPassword()
      ) {
        this.props.registerUser(
          this.state.firstName.value,
          this.state.lastName.value,
          this.state.email.value,
          this.state.password.value,
          this.state.role,
        )
          .then((response) => {
            if (response != undefined) {
              if (this.props.signupRole === "star" || this.props.signupRole === 'group') {
                this.props.changeStep(this.props.currentStep + 1);
              }
            }
          });
      }
    } else {
      if (
        this.checkFirstRequired() &
        this.checkLastRequired() &
        this.checkEmail() &
        this.checkNickNameRequired()
      ) {
        this.props.registerUser(
          this.state.firstName.value,
          this.state.lastName.value,
          this.state.email.value,
          this.state.nickName.value,
          this.state.role,
        )
          .then((response) => {
            if (response != undefined) {
              if (this.props.signupRole === "star" || this.props.signupRole === 'group') {
                this.props.changeStep(this.props.currentStep + 1);
              }
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

  toggleTermsAndConditions = name => event => {
    this.setState({
      termsAndConditions: {
        ...this.state.termsAndConditions,
        value: event.target.checked
      }
    });
  }
  agreeTermsConditions = () => {
    this.setState({
      acceptTerms: false,
      termsAndConditions: {
        ...this.state.termsAndConditions,
        value: true
      }
    })
  }
  checkEmail = () => {
    const emailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/; // Regex to check if email is valid
    if (validator.isEmpty(this.state.email.value)) {
      this.setState({
        email: { ...this.state.email, message: 'Enter an email address ' },
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
    const firstNameEmpty = !this.state.firstName.value
    if (firstNameEmpty) {
      const firstNameMsg = 'Enter a first name';
      this.setState({ firstName: { ...this.state.firstName, message: firstNameMsg } });
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
          ...this.state.lastName, message:
            lastNameMsg
        }
      })
      return false;
    }
    this.setState({
      lastName: { ...this.state.lastName, message: '', isValid: true },
    });
    return true;
  }
  checkNickNameRequired = () => {
    const nickNameEmpty = validator.isEmpty(this.state.nickName.value);
    if (nickNameEmpty) {
      const nickNameMsg = 'Enter a stage name';
      this.setState({ nickName: { ...this.state.nickName, message: nickNameMsg } });
      return false;
    }
    this.setState({
      nickName: { ...this.state.nickName, message: '', isValid: true },
    });
    return true;
  }
  checkPassword = () => {
    const pattern = /^(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/; // Accepts values with min 8 characters, atleast one number and atleast one symbol

    if (validator.isEmpty(this.state.password.value)) {
      this.setState({
        password: { ...this.state.password, message: 'Enter a  password' },
      });
      return false;
    }
    if (!pattern.test(this.state.password.value)) {
      this.setState({ password: { ...this.state.password, message: 'Enter a valid password with at least one symbol' } });
      return false;
    }
    if (this.state.confirmPassword.value !== this.state.password.value) {
      this.setState({ password: { ...this.state.password, message: 'The passwords entered do not match!' } });
      return false;
    }
    this.setState({
      password: { ...this.state.password, message: '', isValid: true },
    });
  }

  checkTermsAndConditionsRequired = () => {
    const termsAndConditionsEmpty = !(this.state.termsAndConditions.value)
    if (termsAndConditionsEmpty) {
      const termsAndConditionsMsg = 'Terms and conditions not accepted';
      this.setState({ termsAndConditions: { ...this.state.termsAndConditions, message: termsAndConditionsMsg } });
      return false;
    }
    this.setState({
      termsAndConditions: { ...this.state.termsAndConditions, message: '', isValid: true },
    });
    return true;
  }
  agreeTerms = () => {
    this.setState({
      acceptTerms: true
    })
  }
  render() {
    const signUp = formatSignUpByUserType(this.props.signupRole)
    return (
      this.state.acceptTerms ?
        <TermsAndConditions
          agreeTermsConditions={this.agreeTermsConditions} /> :
        <LoginContainer.SocialMediaSignup>
          {
            this.state.loading &&
            <ActionLoader />
          }
          {
            <LoginContainer.BackButton
              onClick={() => this.props.changeStep(this.props.currentStep - 1)} />
          }
          <LoginContainer.Container>
            <LoginContainer.Heading>
              {signUp.title}
            </LoginContainer.Heading>
            <LoginContainer.InputFieldsWrapper>
              <LoginContainer.InputContainer>
                {
                  this.props.statusCode === '410' ?
                    <LoginContainer.EmptyDiv />
                    :
                    <div>
                      <LoginContainer.Label>
                        {signUp.item_1}
                      </LoginContainer.Label>
                      <LoginContainer.InputWrapper>
                        <LoginContainer.WrapsInput>
                          <TextInput
                            placeholder={signUp.item_1_placeholder_1}
                            type="text"
                            name="firstName"
                            value={this.state.firstName.value}
                            onChange={(event) => this.saveFormEntries(event, "firstName")}
                          />
                          <LoginContainer.ErrorMsg>
                            {this.state.firstName.message}
                          </LoginContainer.ErrorMsg>
                        </LoginContainer.WrapsInput>
                        <LoginContainer.WrapsInput>
                          <TextInput
                            placeholder={signUp.item_1_placeholder_2}
                            type="text"
                            name="lastName"
                            value={this.state.lastName.value}
                            onChange={(event) => this.saveFormEntries(event, "lastName")}
                          />
                          <LoginContainer.ErrorMsg>
                            {this.state.lastName.message}
                          </LoginContainer.ErrorMsg>
                        </LoginContainer.WrapsInput>
                      </LoginContainer.InputWrapper>
                    </div>
                }
                <LoginContainer.Label>
                  {signUp.item_2}
                </LoginContainer.Label>
                <LoginContainer.InputWrapper>
                  <LoginContainer.WrapsInput>
                    <TextInput
                      placeholder={signUp.item_2_placeholder}
                      type="text"
                      name={signUp.key_2}
                      fullWidth={true}
                      value={this.state[signUp.key_2].value}
                      onChange={(event) => this.saveFormEntries(event, signUp.key_2)}
                    />
                    <LoginContainer.ErrorMsg>
                      {this.state[signUp.key_2].message}
                    </LoginContainer.ErrorMsg>
                  </LoginContainer.WrapsInput>
                </LoginContainer.InputWrapper>
                <LoginContainer.Label>
                  {signUp.item_3}
                </LoginContainer.Label>
                <LoginContainer.InputWrapper>
                  <LoginContainer.WrapsInput>
                    <TextInput
                      placeholder={signUp.item_3_placeholder_1}
                      type={this.props.signupRole === ROLE_FAN ? 'password' : 'text'}
                      name={signUp.key_3_1}
                      fullWidth={this.props.signupRole === ROLE_STAR ? true : false}
                      value={this.state[signUp.key_3_1].value}
                      onChange={(event) => this.saveFormEntries(event, signUp.key_3_1)}
                    />
                    <LoginContainer.ErrorMsg>
                      {this.state[signUp.key_3_1].message}
                    </LoginContainer.ErrorMsg>
                  </LoginContainer.WrapsInput>
                  {this.props.signupRole === ROLE_FAN ?
                    <LoginContainer.WrapsInput>
                      <TextInput
                        placeholder={signUp.item_3_placeholder_2}
                        type={this.props.signupRole === ROLE_FAN ? 'password' : 'text'}
                        name={signUp.key_3_2}
                        value={this.state[signUp.key_3_2].value}
                        onChange={(event) => this.saveFormEntries(event, signUp.key_3_2)}
                      />
                    </LoginContainer.WrapsInput>
                    : null}
                </LoginContainer.InputWrapper>
                <LoginContainer.WrapsInput>
                  {this.props.statusCode === undefined ?
                    <LoginContainer.ErrorMsg>
                      {this.props.error}
                    </LoginContainer.ErrorMsg>
                    :
                    <LoginContainer.EmptyDiv />
                  }
                </LoginContainer.WrapsInput>
                {this.props.signupRole === ROLE_FAN ? null :
                  <div>
                    <LoginContainer.PrivacyContent>
                      <Checkbox
                        checked={this.state.termsAndConditions.value}
                        onChange={this.toggleTermsAndConditions('termsAndConditions')}
                        value="termsAndConditions"
                      />
                      I have read and agree to
                  <LoginContainer.Anchor
                        onClick={this.agreeTerms}>
                        Starsona’s Terms and Conditions and Privacy Policy
                  </LoginContainer.Anchor>
                    </LoginContainer.PrivacyContent>

                    <LoginContainer.ErrorMsg>
                      {this.state.termsAndConditions.message}
                    </LoginContainer.ErrorMsg>
                  </div>
                }
                <LoginContainer.ButtonWrapper>
                  <LoginContainer.ContinueButton
                    type="submit"
                    onClick={this.onRegister}>
                    {signUp.button_label}
                  </LoginContainer.ContinueButton>
                </LoginContainer.ButtonWrapper>
              </LoginContainer.InputContainer>
            </LoginContainer.InputFieldsWrapper>
          </LoginContainer.Container>
          {/* <LoginContainer.Container visible={this.props.currentStep === 2}>
            <SignUpImageUpload />
          </LoginContainer.Container> */}
        </LoginContainer.SocialMediaSignup>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.session.loading,
});

const mapProps = dispatch => ({
  updateLoginStatus: sessionDetails => dispatch(updateLoginStatus(sessionDetails)),
  fetchUserDetails: id => dispatch(fetchUserDetails(id)),
});

export default connect(mapStateToProps, mapProps)(SignUpForm);
