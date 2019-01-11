import React from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import validator from 'validator';
import 'react-phone-number-input/style.css';
import Popup from '../../Popup';
import { generateOtp, validateOtp } from '../../../services/otpGenerate';
import { addRepresentative, updateRepresentative, deleteRepresentative } from '../../../services/userRegistration';
import GroupStyled from '../styled';
import Loader from '../../Loader';

export default class StarNotifications extends React.Component {
  state = {
    emailCheckedBox: true,
    phoneCheckedBox: false,
    value: '',
    addEmailFlag: false,
    email: { value: '', isValid: false, message: '' },
    representatives: [],
    anotherRepButton: true,
    phoneNumberVerify: 'Verify',
    country: '',
    otpEnterPopup: false,
    otpValue: '',
    phoneNumberOriginal: '',
    countryCode: '',
    otpErrorMessage: '',
    loading: false,
  }

  getOtp = () => {
    if (this.state.phoneNumberVerify === 'Verify') {
      const codeNumber = this.phone.props.metadata.countries[this.state.country][0];
      const originalNumber = this.state.value.substring(codeNumber.length + 1, this.state.value.length);
      this.setState({
        phoneNumberOriginal: originalNumber,
        countryCode: codeNumber,
      });
      generateOtp(originalNumber, codeNumber)
        .then((resp) => {
          if (resp.success) {
            this.setState({
              otpEnterPopup: true,
            });
          }
        });
    }
  }

  setRepPhone = (index, value) => {
    const { representatives } = this.state;
    const currentRep = { ...representatives[index] };
    currentRep.phone = value;
    if (value !== '') {
      currentRep.phoneError = '';
      currentRep.phoneCheck = false;
    }
    representatives[index] = currentRep;
    this.setState({ representatives });
  }

  addRepForm = () => {
    const { representatives } = this.state;
    const repCount = representatives.length;
    let prevRepValid = true;
    if (repCount) {
      const firstNameValid = this.checkRepName(repCount - 1, 'firstName');
      const lastNameValid = this.checkRepName(repCount - 1, 'lastName');
      const emailValid = this.checkRepEmail(repCount - 1, 'email');
      let phoneValid = true;
      if (representatives[repCount - 1].phoneCheck) {
        phoneValid = isValidPhoneNumber(representatives[repCount - 1].phone);
      }
      prevRepValid = firstNameValid && lastNameValid && emailValid && phoneValid;
    }
    if (repCount + 1 < 3 && prevRepValid) {
      representatives.push({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        firstNameError: '',
        lastNameError: '',
        emailError: '',
        emailInvite: false,
        phoneInvite: false,
        phoneCheck: false,
      });
    }
    this.setState({
      representatives,
    });
  }

  handleFieldChange = (event, status) => {
    this.setState({
      emailCheckedBox: !status,
    });
  }

  handlePhoneFieldChange = (event, status) => {
    this.setState({
      phoneCheckedBox: !status,
    });
  }

  handleEmailPhoneInvite = (index, key) => {
    const { representatives } = this.state;
    const currentRep = { ...representatives[index] };
    currentRep[key] = !currentRep[key];
    if (key === 'phoneInvite' && currentRep.phone === '' && currentRep.phoneInvite) {
      currentRep.phoneCheck = true;
    } else if (key === 'phoneInvite') {
      currentRep.phoneCheck = false;
    }
    representatives[index] = currentRep;
    this.setState({ representatives });
  }

  addEmailAddress = () => {
    this.setState({
      addEmailFlag: true,
    });
  }

  closeInput = () => {
    this.setState({
      addEmailFlag: false,
      email: { value: '', message: '', isValid: false },
    });
  }

  checkEmail = () => {
    const emailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/; // To check email validity
    if (validator.isEmpty(this.state.email.value)) {
      this.setState({
        email: { ...this.state.email, isValid: false, message: 'Enter an email address' },
      });
      return false;
    }
    if (!emailRegex.test(this.state.email.value)) {
      this.setState({
        email: { ...this.state.email, isValid: false, message: 'Enter a valid email address' },
      });
      return false;
    }
    this.setState({
      email: { ...this.state.email, message: '', isValid: true },
    });
    return true;
  };

  checkRepEmail = (index, key) => {
    const { representatives } = this.state;
    const currentRep = { ...representatives[index] };
    const emailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/; // To check email validity
    if (validator.isEmpty(currentRep[key])) {
      currentRep[`${key}Error`] = 'Enter an email address';
      representatives[index] = currentRep;
      this.setState({ representatives });
      return false;
    } else if (!emailRegex.test(currentRep[key])) {
      currentRep[`${key}Error`] = 'Enter a valid email address';
      representatives[index] = currentRep;
      this.setState({ representatives });
      return false;
    }
    currentRep[`${key}Error`] = '';
    representatives[index] = currentRep;
    this.setState({ representatives });
    return true;
  };

  acceptRepEmailHandler = (index, key, email) => {
    const { representatives } = this.state;
    const currentRep = { ...representatives[index] };
    currentRep[key] = email;
    representatives[index] = currentRep;
    this.setState({ representatives });
  };

  checkRepName = (index, key) => {
    const { representatives } = this.state;
    const currentRep = { ...representatives[index] };
    if (validator.isEmpty(currentRep[key])) {
      currentRep[`${key}Error`] = key === 'firstName' ? 'Enter first name' : 'Enter last name';
      representatives[index] = currentRep;
      this.setState({ representatives });
      return false;
    }
    return true;
  }

  acceptNameHandler = (index, key, value) => {
    const { representatives } = this.state;
    const currentRep = { ...representatives[index] };
    currentRep[key] = value;
    if (value !== '') {
      currentRep[`${key}Error`] = '';
    }
    representatives[index] = currentRep;
    this.setState({ representatives });
  }

  acceptEmailHandler = (e) => {
    this.setState({ email: { ...this.state.email, value: e.target.value } });
  };

  acceptOTP = (e) => {
    if (validator.isNumeric(e.target.value, { no_symbols: true }) || e.target.value === '') {
      this.setState({ otpValue: e.target.value });
    }
  }

  checkAllValidity = () => {
    const { emailCheckedBox, addEmailFlag, phoneCheckedBox, value, representatives, phoneNumberVerify } = this.state;
    let emailValid = true;
    let phoneValid = true;
    let repValid = true;
    if (emailCheckedBox && addEmailFlag) {
      emailValid = this.checkEmail();
    }
    if (phoneCheckedBox && (!isValidPhoneNumber(value) || phoneNumberVerify !== 'Verified')) {
      phoneValid = false;
    }
    representatives.forEach((rep, index) => {
      const firstName = this.checkRepName(index, 'firstName');
      const lastName = this.checkRepName(index, 'lastName');
      const email = this.checkRepEmail(index, 'email');
      let repPhoneValid = true;
      if (rep.phoneCheck) {
        repPhoneValid = isValidPhoneNumber(rep.phone);
      }
      if (repValid) {
        repValid = firstName && lastName && email && repPhoneValid;
      }
    });
    return emailValid && phoneValid && repValid;
  }

  submitNotification = () => {
    if (this.checkAllValidity()) {
      this.setState({
        loading: true,
      });
      const {
        emailCheckedBox,
        email,
        phoneCheckedBox,
        value,
        representatives,
        country,
        countryCode,
      } = this.state;
      let originalNumber;
      if (phoneCheckedBox) {
        const codeNumber = this.phone.props.metadata.countries[country][0];
        originalNumber = this.state.value.substring(codeNumber.length + 1, value.length);
      } else {
        originalNumber = '';
      }
      const notifications = {
        email_notification: emailCheckedBox,
        secondary_email: emailCheckedBox ? email.value : '',
        mobile_notification: phoneCheckedBox,
        mobile_number: phoneCheckedBox ? originalNumber : '',
        mobile_country_code: countryCode,
      };      
      const repUpdateStatus = representatives.map((rep, index) => {
        const currentRep = { ...rep };
        if (rep.repId) {
          return (
            updateRepresentative(rep.repId, rep.firstName, rep.lastName, rep.email, rep.phone, rep.emailInvite, rep.phoneInvite)
          );
        }
        return (
          addRepresentative(rep.firstName, rep.lastName, rep.email, rep.phone, rep.emailInvite, rep.phoneInvite)
            .then((resp) => {
              currentRep.repId = resp.data.representative_id;
              representatives[index] = currentRep;
              this.setState({
                representatives,
              });
              return resp;
            })
        );
      });
      Promise.all(repUpdateStatus)
        .then(() => {
          this.props.onComplete(notifications)
            .then(() => {
              this.setState({
                loading: false,
              });
            })
        });
    }
  }

  deleteRepForm = (index) => {
    const { representatives } = this.state;
    if (representatives[index].repId) {
      deleteRepresentative(representatives[index].repId)
        .then((resp) => {
          if (resp.success) {
            representatives.splice(index, 1);
            this.setState({
              representatives,
            });
          }
        });
    } else {
      representatives.splice(index, 1);
      this.setState({
        representatives,
      });
    }
  }

  closeOtpPopup = () => {
    this.setState({
      otpEnterPopup: false,
      phoneNumberVerify: 'Verify',
    });
  }

  submitOTPForm = () => {
    if (this.state.otpValue !== '') {
      validateOtp(this.state.phoneNumberOriginal, this.state.countryCode, this.state.otpValue)
        .then((resp) => {
          if (resp.success) {
            this.setState({
              phoneNumberVerify: 'Verified',
              otpEnterPopup: false,
              otpErrorMessage: '',
            });
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
        otpErrorMessage: 'Enter code',
      });
    }
  }

  renderRepresentatives = () => {
    const { representatives } = this.state;
    return representatives.map((rep, index) => (
      <GroupStyled.AddRepForm key={index}>
        <div className="RepDetailText">
          <p>Representative #{index + 1}</p>
          <GroupStyled.CloseRepForm onClick={() => this.deleteRepForm(index)}>X</GroupStyled.CloseRepForm>
        </div>
        <div className="representativeForm1">
          <div className="repFormElement">
            <GroupStyled.Rep1FirstName
              type="text"
              name={`rep${index}FirstName`}
              value={rep.firstName}
              onChange={event => this.acceptNameHandler(index, 'firstName', event.target.value)}
              onBlur={() => this.checkRepName(index, 'firstName')}
              placeholder="First name"
            />
            <div className="errorElement">{rep.firstNameError}</div>
          </div>
          <div className="repFormElement">
            <GroupStyled.Rep1LastName
              type="text"
              name={`rep${index}LastName`}
              value={rep.lastName}
              onChange={event => this.acceptNameHandler(index, 'lastName', event.target.value)}
              onBlur={() => this.checkRepName(index, 'lastName')}
              placeholder="Last name"
            />
            <div className="errorElement">{rep.lastNameError}</div>
          </div>
          <div className="repFormElement">
            <GroupStyled.Rep1Email
              type="email"
              name={`rep${index}Email`}
              value={rep.email}
              onChange={event => this.acceptRepEmailHandler(index, 'email', event.target.value)}
              onBlur={() => this.checkRepEmail(index, 'email')}
              placeholder="Email"
            />
            <div className="errorElement">{rep.emailError}</div>
          </div>
          <div className="repFormElement">
            <PhoneInput
              placeholder="Mobile phone(optional)"
              value={rep.phone}
              onChange={value => this.setRepPhone(index, value)}
            />
            <div className="errorElement">
              {
                !rep.phoneCheck && rep.phone !== '' && rep.phone !== undefined && !isValidPhoneNumber(rep.phone) ? 'Invalid phone number' : undefined
              }
              {
                rep.phoneCheck && 'Phone number required'
              }
            </div>
          </div>
          <div className="notifyRepresentative">
            <p>
            Your representative will receive an invitation they will need to confirm.
            </p>
            <p>How should we send the invitation?</p>
            <GroupStyled.WrapsInput className="checkboxWrapper">
              <GroupStyled.Label className="checkbox_container">
                <span className="checkBoxHeading">Send an invite via email address.</span>
                <GroupStyled.CheckBox
                  id={`rep${index}EmailUpdates`}
                  type="checkbox"
                  checked={rep.emailInvite}
                  onChange={event => this.handleEmailPhoneInvite(index, 'emailInvite', event.target.value)}
                />
                <GroupStyled.Span htmlFor={`rep${index}EmailUpdates`} className="checkmark" />
              </GroupStyled.Label>
            </GroupStyled.WrapsInput>
            <GroupStyled.WrapsInput className="checkboxWrapper">
              <GroupStyled.Label className="checkbox_container">
                <span className="checkBoxHeading">Send an invite via text message.</span>
                <GroupStyled.CheckBox
                  id={`rep${index}PhoneUpdates`}
                  type="checkbox"
                  checked={rep.phoneInvite}
                  onChange={event => this.handleEmailPhoneInvite(index, 'phoneInvite', event.target.value)}
                />
                <GroupStyled.Span htmlFor={`rep${index}PhoneUpdates`} className="checkmark" />
              </GroupStyled.Label>
            </GroupStyled.WrapsInput>
          </div>
        </div>
      </GroupStyled.AddRepForm>
    ))
  }

  render() {
    const {
      value,
      email,
      loading,
    } = this.state;
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
                Enter code
              </GroupStyled.HeaderText>
              <GroupStyled.SocialMediaMessage>
                Please enter the code that has been sent to your phone number.
              </GroupStyled.SocialMediaMessage>
              <GroupStyled.OTPWrapper>
                <GroupStyled.OTPInput
                  type="text"
                  maxLength="4"
                  name="otpInput"
                  value={this.state.otpValue}
                  placeholder="Enter code"
                  onChange={this.acceptOTP}
                />
                <p className="errorElement">{this.state.otpErrorMessage}</p>
                <GroupStyled.OTPSubmit
                  onClick={() => this.submitOTPForm()}
                >
                  Submit
                </GroupStyled.OTPSubmit>
              </GroupStyled.OTPWrapper>
            </Popup>
        }
        <GroupStyled.HeadingWrapper>
          <GroupStyled.HeaderText>
            Would you like to get notifications?
          </GroupStyled.HeaderText>
          <GroupStyled.SocialMediaMessage>
            We need to notify you when you get video bookings.
          </GroupStyled.SocialMediaMessage>
        </GroupStyled.HeadingWrapper>
        <GroupStyled.SubHeading>
            Notify me:
        </GroupStyled.SubHeading>
        <GroupStyled.WrapsInput className="checkboxWrapper notificationWrapper">
          <GroupStyled.Label className="checkbox_container">
            <span className="checkBoxHeading">Text (mobile phone)</span>
            <p>Add tel. number</p>
            <GroupStyled.CheckBox
              id="phoneUpdates"
              type="checkbox"
              checked={this.state.phoneCheckedBox}
              onChange={(event) => { this.handlePhoneFieldChange(event.target.value, this.state.phoneCheckedBox); }}
            />
            <GroupStyled.Span htmlFor="phoneUpdates" className="checkmark" />
            { this.state.phoneCheckedBox &&
              <GroupStyled.PhoneInput>
                <div>
                  <PhoneInput
                    placeholder="Phone number"
                    ref={(node) => { this.phone = node; }}
                    value={value}
                    onCountryChange={value1 => this.setState({ country: value1 })}
                    onChange={number => this.setState({ value: number })}
                    // error={value ? (isValidPhoneNumber(value) ? undefined : 'Invalid phone number') : 'Phone number required'}
                  />
                  <div className="errorElement">
                    {
                      value !== '' && value !== undefined && !isValidPhoneNumber(value) ? 'Invalid phone number' : undefined
                    }
                    {
                      (value === '' || value === undefined) && 'Phone number required'
                    }
                  </div>
                </div>
                {
                  value !== '' && value !== undefined && isValidPhoneNumber(value) &&
                  <GroupStyled.numberVerification colorText={this.state.phoneNumberVerify} onClick={() => this.getOtp()}>
                    {this.state.phoneNumberVerify}
                  </GroupStyled.numberVerification>
                }
              </GroupStyled.PhoneInput>
            }
            <GroupStyled.NoteText>
              Note: we will only use your number to tell you about bookings.
            </GroupStyled.NoteText>
          </GroupStyled.Label>
        </GroupStyled.WrapsInput>
        <GroupStyled.RepresentativeWrapper>
          {
            this.state.representatives.length < 2 &&
            <GroupStyled.addRepWrapper onClick={() => this.addRepForm()}>
              <GroupStyled.AddRepresentative />
              <div className="addRepText">Add Representative
                <p>Add another person to help you manage your bookings.  They will be cc'd on all messages you receive.
                </p>
              </div>
            </GroupStyled.addRepWrapper>
          }
          {
            this.state.representatives.length !== 0 &&
            <GroupStyled.RepFormWrapper>
              {
                this.renderRepresentatives()
              }
              {
                this.state.representatives.length === 1 &&
                  <GroupStyled.AnotherRepButton
                    buttonDisplay={this.state.anotherRepButton}
                    onClick={() => this.addRepForm()}
                  >
                    Add another representative
                  </GroupStyled.AnotherRepButton>
              }
            </GroupStyled.RepFormWrapper>
          }
        </GroupStyled.RepresentativeWrapper>
        <GroupStyled.ControlWrapper>
          <GroupStyled.ControlButton
            onClick={this.submitNotification}
          >
            Submit
          </GroupStyled.ControlButton>
        </GroupStyled.ControlWrapper>
      </GroupStyled.DetailsWrapper>
    );
  }
}
