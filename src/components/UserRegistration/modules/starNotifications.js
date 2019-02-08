import React from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import validator from 'validator';
import 'react-phone-number-input/style.css';
import Popup from '../../Popup';
import { generateOtp, validateOtp } from '../../../services/otpGenerate';
import GroupStyled from '../styled';
import Loader from '../../Loader';

export default class StarNotifications extends React.Component {
  state = {
    value: '',
    phoneNumberVerify: 'Verify',
    country: 'US',
    otpEnterPopup: false,
    otpValue: '',
    phoneNumberOriginal: '',
    countryCode: '',
    otpErrorMessage: '',
    loading: false,
    phNo1: '',
    phNo2: '',
    phNo3: '',
    phNo4: '',
    resentConfirmation: false,
    errors: {
      phNo: false,
    },
  }

  acceptOTP = (e) => {
    if (validator.isNumeric(e.target.value, { no_symbols: true }) || e.target.value === '') {
      this.setState({ otpValue: e.target.value });
    }
  }

  checkAllValidity = () => {
    const { value } = this.state;
    let phoneValid = true;
    if (!isValidPhoneNumber(value)) {
      phoneValid = false;
    }
    return phoneValid;
  }

  submitNotification = (type) => {
    const {
      value,
      country,
      countryCode,
    } = this.state;
    const codeNumber = this.phone.props.metadata.countries[country][0];
    const originalNumber = value.substring(codeNumber.length + 1, value.length);
    if (type === 'reSent') {
      generateOtp(originalNumber, codeNumber)
        .then((resp) => {
          if (resp.success) {
            this.setState({
              resentConfirmation: true,
            });
          }
        });
    } else if (this.checkAllValidity() && this.state.phoneNumberVerify === 'Verify') {
      this.setState({
        phoneNumberOriginal: originalNumber,
        countryCode: codeNumber,
      });
      generateOtp(originalNumber, codeNumber)
        .then((resp) => {
          if (resp.success) {
            this.setState({
              otpEnterPopup: true,
              resentConfirmation: false,
            });
          }
        });
    } else if (this.state.phoneNumberVerify === 'Verified') {
      this.props.onComplete();
    }
  }

  closeOtpPopup = () => {
    this.setState({
      otpEnterPopup: false,
      phoneNumberVerify: 'Verify',
    });
  }

  validateFields = () => {
    let { phone } = this.state.errors;

    if (!validator.isNumeric(this.state.phNo1, { no_symbols: true })
      || !validator.isNumeric(this.state.phNo2, { no_symbols: true })
      || !validator.isNumeric(this.state.phNo3, { no_symbols: true })
      || !validator.isNumeric(this.state.phNo4, { no_symbols: true })
      || this.state.phNo1.length + this.state.phNo2.length + this.state.phNo3.length + this.state.phNo4.length !== 4) {
      phone = true;
    } else {
      phone = false;
    }
    this.setState({ errors: { ...this.state.errors, phone } });
    return !phone;
  }

  submitOTPForm = () => {
    if (this.validateFields()) {
      const accountDetails = {
        phone: `${this.state.phNo1}${this.state.phNo2}${this.state.phNo3}${this.state.phNo4}`,
      };
      validateOtp(this.state.phoneNumberOriginal, this.state.countryCode, accountDetails.phone)
        .then((resp) => {
          if (resp.success) {
            this.setState({
              loading: false,
              phoneNumberVerify: 'Verified',
              otpEnterPopup: false,
              otpErrorMessage: '',
              phNo1: '',
              phNo2: '',
              phNo3: '',
              phNo4: '',
            });
            this.props.onComplete();
          } else if (resp.status == '400' && resp.response.data.error.code === 1006) {
            this.setState({
              otpErrorMessage: resp.response.data.error.message,
            });
          } else if (resp.status == '400' && resp.response.data.error.code === 1009) {
            this.setState({
              otpErrorMessage: resp.response.data.error.message.verification_code[0],
            });
          }
        });
    } else {
      this.setState({
        otpErrorMessage: 'Please enter the code',
      });
    }
  }

  handleFieldChange = (fieldType, fieldValue) => {
    if (fieldType === 'searchTags') {
      this.setState({ searchTags: fieldValue });
    } else {
      this.setState({
        [fieldType]: fieldValue,
        errors: { ...this.state.errors, [fieldType]: false },
      });
      if (fieldType === 'phNo1' && fieldValue.length === 1) {
        this.phNo2.focus();
      } else if (fieldType === 'phNo2' && fieldValue.length === 1) {
        this.phNo3.focus();
      } else if (fieldType === 'phNo3' && fieldValue.length === 1) {
        this.phNo4.focus();
      }
    }
  };

  validateOnBlur = (key, value) => {
    const { errors } = this.state;
    if (key === 'phNo1' || key === 'phNo2' || key === 'phNo3') {
      errors.phone = !validator.isNumeric(this.state.phNo1, { no_symbols: true })
        || !validator.isNumeric(this.state.phNo2, { no_symbols: true })
        || !validator.isNumeric(this.state.phNo3, { no_symbols: true })
        || this.state.phNo1.length + this.state.phNo2.length + this.state.phNo3.length !== 10;
    }
    this.setState({ errors });
  }

  render() {
    const {
      value,
      email,
      loading,
    } = this.state;
    const phoneLast4digits = this.state.phoneNumberOriginal.substring(this.state.phoneNumberOriginal.length - 4);
    if (loading) {
      return <Loader />
    }
    return (
      <GroupStyled.DetailsWrapper>
        {
          this.state.otpEnterPopup &&
            <Popup
              smallPopup
              closePopUp={this.closeOtpPopup}
            >
              <GroupStyled.HeaderText>
                Enter the verification code
              </GroupStyled.HeaderText>
              <GroupStyled.SocialMediaMessage>
                Let's make sure it's really you. A 4-digit code has been sent to the phone ending in ******{phoneLast4digits}.
              </GroupStyled.SocialMediaMessage>
              <GroupStyled.OTPWrapper>
                <GroupStyled.PhoneNoInput
                  small
                  type="tel"
                  innerRef={(node) => { this.phNo1 = node; }}
                  maxLength="1"
                  placeholder=""
                  value={this.state.phNo1}
                  onBlur={event => this.validateOnBlur('phNo1', event.target.value)}
                  onChange={(event) => {
                    this.handleFieldChange('phNo1', event.target.value);
                  }}
                />
                <GroupStyled.PhoneNoInput
                  small
                  type="tel"
                  maxLength="1"
                  placeholder=""
                  innerRef={(node) => { this.phNo2 = node; }}
                  value={this.state.phNo2}
                  onBlur={event => this.validateOnBlur('phNo2', event.target.value)}
                  onChange={(event) => {
                    this.handleFieldChange('phNo2', event.target.value);
                  }}
                />
                <GroupStyled.PhoneNoInput
                  small
                  lastDigit
                  type="tel"
                  maxLength="1"
                  innerRef={(node) => { this.phNo3 = node; }}
                  placeholder=""
                  value={this.state.phNo3}
                  onBlur={event => this.validateOnBlur('phNo3', event.target.value)}
                  onChange={(event) => {
                    this.handleFieldChange('phNo3', event.target.value);
                  }}
                />
                <GroupStyled.PhoneNoInput
                  small
                  type="tel"
                  innerRef={(node) => { this.phNo4 = node; }}
                  maxLength="1"
                  placeholder=""
                  value={this.state.phNo4}
                  onBlur={event => this.validateOnBlur('phNo4', event.target.value)}
                  onChange={(event) => {
                    this.handleFieldChange('phNo4', event.target.value);
                  }}
                />
                <p className="errorElement">{this.state.otpErrorMessage}</p>
                <GroupStyled.SocialMediaMessage>
                Didn't receive a code? <GroupStyled.ResendOTP onClick={() => this.submitNotification('reSent')}>Resend</GroupStyled.ResendOTP>
                </GroupStyled.SocialMediaMessage>
                {
                  this.state.resentConfirmation &&
                  <p className="errorElement resentConfirmation">Resent verification code</p>
                }
                <GroupStyled.OTPSubmit
                  onClick={() => this.submitOTPForm()}
                >
                  Verify
                </GroupStyled.OTPSubmit>
              </GroupStyled.OTPWrapper>
            </Popup>
        }
        <GroupStyled.HeadingWrapper>
          <GroupStyled.HeaderText>
            Would you like to receive notifications?
          </GroupStyled.HeaderText>
          <GroupStyled.SocialMediaMessage>
            We’ll only use your number to notify when you have booking requests
          </GroupStyled.SocialMediaMessage>
        </GroupStyled.HeadingWrapper>
        <GroupStyled.WrapsInput className="checkboxWrapper notificationWrapper">
          <GroupStyled.Label className="checkbox_container">
            <span className="checkBoxHeading">Enter your mobile number</span>
            <GroupStyled.PhoneInput>
              <div>
                <PhoneInput
                  country="US"
                  placeholder="Phone number"
                  ref={(node) => { this.phone = node; }}
                  value={value}
                  onCountryChange={value1 => this.setState({ country: value1 })}
                  onChange={number => this.setState({ value: number, phoneNumberVerify: 'Verify' })}
                  // error={value ? (isValidPhoneNumber(value) ? undefined : 'Invalid phone number') : 'Phone number required'}
                />
                <div className="errorElement">
                  {
                    value !== '' && value !== undefined && !isValidPhoneNumber(value) ? 'Invalid phone number' : undefined
                  }
                  {
                    (value === undefined) && 'Phone number required'
                  }
                </div>
              </div>

            </GroupStyled.PhoneInput>
          </GroupStyled.Label>
        </GroupStyled.WrapsInput>
        <GroupStyled.ControlWrapper className="registrationSubmit">
          <GroupStyled.ControlButton
            onClick={this.submitNotification}
          >
            Submit number
          </GroupStyled.ControlButton>
        </GroupStyled.ControlWrapper>
        <GroupStyled.SocialMediaMessage onClick={this.props.onComplete} className="skipText">
            No thanks. I'll manage without.
        </GroupStyled.SocialMediaMessage>
      </GroupStyled.DetailsWrapper>
    );
  }
}
