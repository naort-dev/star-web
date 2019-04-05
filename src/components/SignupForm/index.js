import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import ActionLoader from '../ActionLoader';

import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import { LoginContainer, FooterSection } from './styled';
import { updateLoginStatus } from '../../store/shared/actions/login';
import { fetchUserDetails } from '../../store/shared/actions/getUserDetails';
import { TermsAndConditions } from './components/TermsAndConditions'

import { ROLES } from '../../constants/usertype';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: { value: "", isValid: false, message: "" },
      lastName: { value: "", isValid: true, message: "" },
      nickName: { value: "", isValid: true, message: "" },
      email: { value: "", isValid: false, message: '' },
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
    if (
      this.checkTermsAndConditionsRequired() &&
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
    return (
      this.state.acceptTerms ?
        <TermsAndConditions agreeTermsConditions={this.agreeTermsConditions}/> :
      <LoginContainer.SocialMediaSignup>
        {
          this.state.loading &&
          <ActionLoader />
        }
        {
          <LoginContainer.BackButton onClick={() => this.props.changeStep(this.props.currentStep - 1)} />
        }
        <LoginContainer.Container>
          <LoginContainer.Heading>Tell us about yourself</LoginContainer.Heading>

          <LoginContainer.InputFieldsWrapper>

            <LoginContainer.InputContainer>

              {
                this.props.statusCode === '410' ?
                  <LoginContainer.EmptyDiv />
                  :
                  <div>
                    <LoginContainer.Label>Use your real name so we can pay you</LoginContainer.Label>
                    <LoginContainer.InputWrapper>
                      <LoginContainer.WrapsInput>
                        <TextField
                          placeholder={'First name'}
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
                        <TextField
                          placeholder="Last name"
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
              <LoginContainer.Label>Optional, only if different than your real name</LoginContainer.Label>
              <LoginContainer.InputWrapper>
                <LoginContainer.WrapsInput>
                  <TextField
                    placeholder={this.props.signupRole === 'star' ?
                      'What is your stage name?' : 'What name does everyone know you as?'}
                    type="text"
                    name="nickName"
                    fullWidth={true}
                    value={this.state.nickName.value}
                    onChange={(event) => this.saveFormEntries(event, "nickName")}
                  />
                  <LoginContainer.ErrorMsg>{this.state.nickName.message}</LoginContainer.ErrorMsg>
                </LoginContainer.WrapsInput>
              </LoginContainer.InputWrapper>
              <LoginContainer.Label>Email address</LoginContainer.Label>
              <LoginContainer.InputWrapper>
                <LoginContainer.WrapsInput>
                  <TextField
                    placeholder={this.props.signupRole === 'star' ?
                      'Where do you want your bookings to go?' : 'Whats your email?'}
                    type="email"
                    name="email"
                    fullWidth={true}
                    value={this.state.email.value}
                    onChange={(event) => this.saveFormEntries(event, "email")}
                  />
                  <LoginContainer.ErrorMsg>{this.state.email.message}</LoginContainer.ErrorMsg>
                </LoginContainer.WrapsInput>
              </LoginContainer.InputWrapper>
              <LoginContainer.WrapsInput>
                {this.props.statusCode === undefined ?
                  <LoginContainer.ErrorMsg>{this.props.error}</LoginContainer.ErrorMsg>
                  :
                  <LoginContainer.EmptyDiv />
                }
              </LoginContainer.WrapsInput>
              <LoginContainer.PrivacyContent>
                <Checkbox
                  checked={this.state.termsAndConditions.value}
                  onChange={this.toggleTermsAndConditions('termsAndConditions')}
                  value="termsAndConditions"
                />
                I have read and agree to
                <LoginContainer.Anchor onClick={this.agreeTerms}> Starsona’s Terms and Conditions and Privacy Policy </LoginContainer.Anchor>
              </LoginContainer.PrivacyContent>

              <LoginContainer.ErrorMsg>{this.state.termsAndConditions.message}</LoginContainer.ErrorMsg>
              <LoginContainer.ButtonWrapper>
                <LoginContainer.ContinueButton type="submit" onClick={this.onRegister}>Continue</LoginContainer.ContinueButton>
              </LoginContainer.ButtonWrapper>
            </LoginContainer.InputContainer>
          </LoginContainer.InputFieldsWrapper>
          
        </LoginContainer.Container>
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

export default connect(mapStateToProps, mapProps)(SignUp);
