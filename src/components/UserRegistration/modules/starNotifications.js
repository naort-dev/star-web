import React from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import validator from 'validator';
import 'react-phone-number-input/style.css';
import Popup from '../../Popup';
import { generateOtp, validateOtp } from '../../../services/otpGenerate';
import GroupStyled from '../styled';

export default class StarNotifications extends React.Component {
  state = {
    emailCheckedBox: true,
    phoneCheckedBox: false,
    value: '',
    addEmailFlag: false,
    email: { value: '', isValid: false, message: '' },
    addForm: false,
    rep1FirstName: { value: '', isValid: false, message: '' },
    rep1LastName: { value: '', isValid: false, message: '' },
    rep1Phone: '',
    rep1Email: { value: '', isValid: false, message: '' },
    anotherRepButton: true,
    rep2Form: false,
    rep2FirstName: { value: '', isValid: false, message: '' },
    rep2LastName: { value: '', isValid: false, message: '' },
    rep2Phone: '',
    rep2Email: { value: '', isValid: false, message: '' },
    rep1EmailInvite: false,
    rep1PhoneInvite: false,
    rep2EmailInvite: false,
    rep2PhoneInvite: false,
    rep1phoneCheck: false,
    rep2phoneCheck: false,
    phoneNumberVerify: 'Verify',
    country: '',
    otpEnterPopup: false,
    otpValue: '',
    phoneNumberOriginal: '',
    countryCode: '',
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

  getRepresentativeForm = () => {
    if (!this.state.rep2Form) {
      this.setState({
        addForm: true,
        anotherRepButton: true,
        rep1FirstName: { value: '', isValid: false, message: '' },
        rep1LastName: { value: '', isValid: false, message: '' },
        rep1Phone: '',
        rep1Email: { value: '', isValid: false, message: '' },
      });
    }
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

  handleEmailPhoneInvite = (event, status, checkedBox) => {
    if (checkedBox === 'rep1EmailInvite') {
      this.setState({
        rep1EmailInvite: !status,
      });
    } else if (checkedBox === 'rep1PhoneInvite') {
      this.setState({
        rep1PhoneInvite: !status,
      }, () => {
        if (this.state.rep1Phone === '' && this.state.rep1PhoneInvite) {
          this.setState({
            rep1phoneCheck: true,
          });
        } else {
          this.setState({
            rep1phoneCheck: false,
          });
        }
      });
    } else if (checkedBox === 'rep2EmailInvite') {
      this.setState({
        rep2EmailInvite: !status,
      });
    } else if (checkedBox === 'rep2PhoneInvite') {
      this.setState({
        rep2PhoneInvite: !status,
      }, () => {
        if (this.state.rep2Phone === '' && this.state.rep2PhoneInvite) {
          this.setState({
            rep2phoneCheck: true,
          });
        } else {
          this.setState({
            rep2phoneCheck: false,
          });
        }
      });
    }
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

  checkRepEmail = (email) => {
    const emailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/; // To check email validity
    if (email === 'rep1Email') {
      if (validator.isEmpty(this.state.rep1Email.value)) {
        this.setState({
          rep1Email: { ...this.state.rep1Email, isValid: false, message: 'Enter an email address' },
        });
        return false;
      }
      if (!emailRegex.test(this.state.rep1Email.value)) {
        this.setState({
          rep1Email: { ...this.state.rep1Email, isValid: false, message: 'Enter a valid email address' },
        });
        return false;
      }
      this.setState({
        rep1Email: { ...this.state.rep1Email, message: '', isValid: true },
      });
      return true;
    } else if (email === 'rep2Email') {
      if (validator.isEmpty(this.state.rep2Email.value)) {
        this.setState({
          rep2Email: { ...this.state.rep2Email, isValid: false, message: 'Enter an email address' },
        });
        return false;
      }
      if (!emailRegex.test(this.state.rep2Email.value)) {
        this.setState({
          rep2Email: { ...this.state.rep2Email, isValid: false, message: 'Enter a valid email address' },
        });
        return false;
      }
      this.setState({
        rep2Email: { ...this.state.rep2Email, message: '', isValid: true },
      });
      return true;
    }
  };

  acceptRepEmailHandler = (email, emailText) => {
    if (email === 'rep1Email') {
      this.setState({ rep1Email: { ...this.state.rep1Email, value: emailText } });
    } else if (email === 'rep2Email') {
      this.setState({ rep2Email: { ...this.state.rep2Email, value: emailText } });
    }
  };

  checkRepName = (nameText) => {
    if (nameText === 'rep1FirstName') {
      if (validator.isEmpty(this.state.rep1FirstName.value)) {
        this.setState({
          rep1FirstName: { ...this.state.rep1FirstName, message: 'Enter first name' },
        });
        return false;
      }
      this.setState({
        rep1FirstName: { ...this.state.rep1FirstName, message: '', isValid: true },
      });
      return true;
    } else if (nameText === 'rep1LastName') {
      if (validator.isEmpty(this.state.rep1LastName.value)) {
        this.setState({
          rep1LastName: { ...this.state.rep1LastName, message: 'Enter last name' },
        });
        return false;
      }
      this.setState({
        rep1LastName: { ...this.state.rep1LastName, message: '', isValid: true },
      });
      return true;
    } else if (nameText === 'rep2FirstName') {
      if (validator.isEmpty(this.state.rep2FirstName.value)) {
        this.setState({
          rep2FirstName: { ...this.state.rep2FirstName, message: 'Enter first name' },
        });
        return false;
      }
      this.setState({
        rep2FirstName: { ...this.state.rep2FirstName, message: '', isValid: true },
      });
      return true;
    } else if (nameText === 'rep2LastName') {
      if (validator.isEmpty(this.state.rep2LastName.value)) {
        this.setState({
          rep2LastName: { ...this.state.rep2LastName, message: 'Enter last name' },
        });
        return false;
      }
      this.setState({
        rep2LastName: { ...this.state.rep2LastName, message: '', isValid: true },
      });
      return true;
    }
    return true;
  }

  acceptNameHandler = (value, nameText) => {
    if (nameText === 'rep1FirstName') {
      this.setState({
        rep1FirstName: { ...this.state.rep1FirstName, value },
      });
    } else if (nameText === 'rep1LastName') {
      this.setState({
        rep1LastName: { ...this.state.rep1LastName, value },
      });
    } else if (nameText === 'rep2FirstName') {
      this.setState({
        rep2FirstName: { ...this.state.rep2FirstName, value },
      });
    } else if (nameText === 'rep2LastName') {
      this.setState({
        rep2LastName: { ...this.state.rep2LastName, value },
      });
    }
  }

  acceptEmailHandler = (e) => {
    this.setState({ email: { ...this.state.email, value: e.target.value } });
  };

  acceptOTP = (e) => {
    this.setState({ otpValue: e.target.value });
  }
  submitNotification = () => {
    if (!this.state.email.isValid && this.state.emailCheckedBox && this.state.addEmailFlag) {
      this.checkEmail();
    } else if (this.state.phoneCheckedBox && !isValidPhoneNumber(this.state.value)) {
      return false;
    } else if (this.state.addForm && (!this.state.rep1FirstName.isValid || !this.state.rep1LastName.isValid || !this.state.rep1Email.isValid)) {
      this.checkRepName('rep1FirstName');
      this.checkRepName('rep1LastName');
      this.checkRepEmail('rep1Email');
      return false;
    } else if (this.state.rep2Form && (!this.state.rep2FirstName.isValid || !this.state.rep2LastName.isValid || !this.state.rep2Email.isValid)) {
      this.checkRepName('rep2FirstName');
      this.checkRepName('rep2LastName');
      this.checkRepEmail('rep2Email');
      return false;
    }
    console.log('success');
    return true;
  }

  closePopup = (form) => {
    if (form === 'form1') {
      this.setState({
        addForm: false,
      });
    } else if (form === 'form2') {
      this.setState({
        rep2Form: false,
        anotherRepButton: true,
      });
    }
  }

  addAnotherRepForm = () => {
    if (this.state.rep1FirstName.isValid && this.state.rep1LastName.isValid && this.state.rep1Email.isValid) {
      this.setState({
        anotherRepButton: false,
        rep2Form: true,
        rep2FirstName: { value: '', isValid: false, message: '' },
        rep2LastName: { value: '', isValid: false, message: '' },
        rep2Phone: '',
        rep2Email: { value: '', isValid: false, message: '' },
      });
    } else {
      this.checkRepName('rep1FirstName');
      this.checkRepName('rep1LastName');
      this.checkRepEmail('rep1Email');
    }
  }

  closeOtpPopup = () => {
    this.setState({
      otpEnterPopup: false,
    });
  }

  submitOTPForm = () => {
    validateOtp(this.state.phoneNumberOriginal, this.state.countryCode, this.state.otpValue)
      .then((resp) => {
        if (resp.success) {
          this.setState({
            phoneNumberVerify: 'Verified',
            otpEnterPopup: false,
          });
        }
      });
  }

  render() {
    const {
      value, email, rep1FirstName,
      rep1LastName,
      rep1Phone,
      rep1Email,
      rep2Phone,
      rep2FirstName,
      rep2LastName,
      rep2Email,
    } = this.state;
    return (
      <GroupStyled.DetailsWrapper>
        {
          this.state.otpEnterPopup &&
            <Popup
              smallPopup
              closePopUp={this.closeOtpPopup}
            >
              <GroupStyled.HeaderText>
                Enter the OTP
              </GroupStyled.HeaderText>
              <GroupStyled.SocialMediaMessage>
                Please enter the OTP that has been sent to your phone number.
              </GroupStyled.SocialMediaMessage>
              <GroupStyled.OTPWrapper>
                <GroupStyled.OTPInput
                  type="number"
                  name="otpInput"
                  value={this.state.otpValue}
                  placeholder="OTP"
                  onChange={this.acceptOTP}
                />
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
            We need to notify you when requests for video messages are booked, and communicate with you
            from time to time (we promise not to spam).
          </GroupStyled.SocialMediaMessage>
        </GroupStyled.HeadingWrapper>
        <GroupStyled.SubHeading>
            Get notifications via:
        </GroupStyled.SubHeading>
        <GroupStyled.WrapsInput className="checkboxWrapper">
          <GroupStyled.Label className="checkbox_container">
            <span className="checkBoxHeading">Email</span>
            <p>We will use the email you gave us.</p>
            <GroupStyled.CheckBox
              id="emailUpdates"
              type="checkbox"
              checked={this.state.emailCheckedBox}
              onChange={(event) => { this.handleFieldChange(event.target.value, this.state.emailCheckedBox); }}
            />
            <GroupStyled.Span htmlFor="emailUpdates" className="checkmark" />
            {
              !this.state.addEmailFlag &&
              <GroupStyled.AddEmailText onClick={() => this.addEmailAddress()} >
                Add email
              </GroupStyled.AddEmailText>
            }
            {
              this.state.addEmailFlag &&
              <GroupStyled.EmailWrapper>
                <GroupStyled.AddEmail 
                  email={this.state.addEmailFlag} 
                  type="email"
                  name="email"
                  value={email.value}
                  onChange={this.acceptEmailHandler}
                  onBlur={this.checkEmail}
                />
                <GroupStyled.CloseInput onClick={() => this.closeInput()}>X</GroupStyled.CloseInput>
                <div className="errorElement">{email.message}</div>
              </GroupStyled.EmailWrapper>
            }
          </GroupStyled.Label>
        </GroupStyled.WrapsInput>
        <GroupStyled.WrapsInput className="checkboxWrapper">
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
              Note: we will use your number only to send notifications.
            </GroupStyled.NoteText>
          </GroupStyled.Label>
        </GroupStyled.WrapsInput>
        <GroupStyled.RepresentativeWrapper>
          <GroupStyled.addRepWrapper>
            <GroupStyled.AddRepresentative
              onClick={() => this.getRepresentativeForm()}
            />
            <div className="addRepText">Add Representative
              <p>Add another person to help you manage your account. They will be cc'd on all messages you receive.
                <span>Learn more</span>
              </p>
            </div>
          </GroupStyled.addRepWrapper>
          {
            this.state.addForm &&
            <GroupStyled.RepFormWrapper>
              <GroupStyled.AddRepForm>
                <div className="RepDetailText">
                  <p>Representative #1</p>
                  <GroupStyled.CloseRepForm onClick={() => this.closePopup('form1')}>X</GroupStyled.CloseRepForm>
                </div>
                <div className="representativeForm1">
                  <div className="repFormElement">
                    <GroupStyled.Rep1FirstName
                      type="text"
                      name="rep1FirstName"
                      value={rep1FirstName.value}
                      onChange={event => this.acceptNameHandler(event.target.value, 'rep1FirstName')}
                      onBlur={() => this.checkRepName('rep1FirstName')}
                      placeholder="First name"
                    />
                    <div className="errorElement">{rep1FirstName.message}</div>
                  </div>
                  <div className="repFormElement">
                    <GroupStyled.Rep1LastName
                      type="text"
                      name="rep1LastName"
                      value={rep1LastName.value}
                      onChange={event => this.acceptNameHandler(event.target.value, 'rep1LastName')}
                      onBlur={() => this.checkRepName('rep1LastName')}
                      placeholder="Last name"
                    />
                    <div className="errorElement">{rep1LastName.message}</div>
                  </div>
                  <div className="repFormElement">
                    <GroupStyled.Rep1Email
                      type="email"
                      name="rep1Email"
                      value={rep1Email.value}
                      onChange={event => this.acceptRepEmailHandler('rep1Email', event.target.value)}
                      onBlur={() => this.checkRepEmail('rep1Email')}
                      placeholder="Email"
                    />
                    <div className="errorElement">{rep1Email.message}</div>
                  </div>
                  <div className="repFormElement">
                    <PhoneInput
                      placeholder="Mobile phone(optional)"
                      value={rep1Phone.value}
                      onChange={value1 => this.setState({ rep1Phone: { value: value1 } })}
                    />
                    <div className="errorElement">
                      {
                        !this.state.rep1phoneCheck && rep1Phone.value !== '' && rep1Phone.value !== undefined && !isValidPhoneNumber(rep1Phone.value) ? 'Invalid phone number' : undefined
                      }
                      {
                        this.state.rep1phoneCheck && 'Phone number required'
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
                          id="rep1EmailUpdates"
                          type="checkbox"
                          checked={this.state.rep1EmailInvite}
                          onChange={(event) => { this.handleEmailPhoneInvite(event.target.value, this.state.rep1EmailInvite, 'rep1EmailInvite'); }}
                        />
                        <GroupStyled.Span htmlFor="rep1EmailUpdates" className="checkmark" />
                      </GroupStyled.Label>
                    </GroupStyled.WrapsInput>
                    <GroupStyled.WrapsInput className="checkboxWrapper">
                      <GroupStyled.Label className="checkbox_container">
                        <span className="checkBoxHeading">Send an invite via text message.</span>
                        <GroupStyled.CheckBox
                          id="rep1PhoneUpdates"
                          type="checkbox"
                          checked={this.state.rep1PhoneInvite}
                          onChange={(event) => { this.handleEmailPhoneInvite(event.target.value, this.state.rep1PhoneInvite, 'rep1PhoneInvite'); }}
                        />
                        <GroupStyled.Span htmlFor="rep1PhoneUpdates" className="checkmark" />
                      </GroupStyled.Label>
                    </GroupStyled.WrapsInput>
                  </div>
                </div>
              </GroupStyled.AddRepForm>
              <GroupStyled.AnotherRepButton
                buttonDisplay={this.state.anotherRepButton}
                onClick={() => this.addAnotherRepForm()}
              >
                Add another representative
              </GroupStyled.AnotherRepButton>
            </GroupStyled.RepFormWrapper>
          }
          {
            this.state.rep2Form &&
            <GroupStyled.AddRepForm>
              <div className="RepDetailText">
                <p>Representative #2</p>
                <GroupStyled.CloseRepForm onClick={() => this.closePopup('form2')}>X</GroupStyled.CloseRepForm>
              </div>
              <div className="representativeForm1">
                <div className="repFormElement">
                  <GroupStyled.Rep1FirstName
                    type="text"
                    name="rep2FirstName"
                    value={rep2FirstName.value}
                    onChange={event => this.acceptNameHandler(event.target.value, 'rep2FirstName')}
                    onBlur={() => this.checkRepName('rep2FirstName')}
                    placeholder="First name"
                  />
                  <div className="errorElement">{rep2FirstName.message}</div>
                </div>
                <div className="repFormElement">
                  <GroupStyled.Rep1LastName
                    type="text"
                    name="rep2LastName"
                    value={rep2LastName.value}
                    onChange={event => this.acceptNameHandler(event.target.value, 'rep2LastName')}
                    onBlur={() => this.checkRepName('rep2LastName')}
                    placeholder="Last name"
                  />
                  <div className="errorElement">{rep2LastName.message}</div>
                </div>
                <div className="repFormElement">
                  <GroupStyled.Rep1Email
                    type="email"
                    name="rep2Email"
                    value={rep2Email.value}
                    onChange={event => this.acceptRepEmailHandler('rep2Email', event.target.value)}
                    onBlur={() => this.checkRepEmail('rep2Email')}
                    placeholder="Email"
                  />
                  <div className="errorElement">{rep2Email.message}</div>
                </div>
                <div className="repFormElement">
                  <PhoneInput
                    placeholder="Mobile phone(optional)"
                    value={rep2Phone.value}
                    onChange={value1 => this.setState({ rep2Phone: { value: value1 } })}
                  />
                  <div className="errorElement">
                    {
                      !this.state.rep2phoneCheck && rep2Phone.value !== '' && rep2Phone.value !== undefined && !isValidPhoneNumber(rep2Phone.value) ? 'Invalid phone number' : undefined
                    }
                    {
                      this.state.rep2phoneCheck && 'Phone number required'
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
                        id="rep2EmailUpdates"
                        type="checkbox"
                        checked={this.state.rep2EmailInvite}
                        onChange={(event) => { this.handleEmailPhoneInvite(event.target.value, this.state.rep2EmailInvite, 'rep2EmailInvite'); }}
                      />
                      <GroupStyled.Span htmlFor="rep2EmailUpdates" className="checkmark" />
                    </GroupStyled.Label>
                  </GroupStyled.WrapsInput>
                  <GroupStyled.WrapsInput className="checkboxWrapper">
                    <GroupStyled.Label className="checkbox_container">
                      <span className="checkBoxHeading">Send an invite via text message.</span>
                      <GroupStyled.CheckBox
                        id="rep2PhoneUpdates"
                        type="checkbox"
                        checked={this.state.rep2PhoneInvite}
                        onChange={(event) => { this.handleEmailPhoneInvite(event.target.value, this.state.rep2PhoneInvite, 'rep2PhoneInvite'); }}
                      />
                      <GroupStyled.Span htmlFor="rep2PhoneUpdates" className="checkmark" />
                    </GroupStyled.Label>
                  </GroupStyled.WrapsInput>
                </div>
              </div>
            </GroupStyled.AddRepForm>
          }
        </GroupStyled.RepresentativeWrapper>
        <GroupStyled.ButtonWrapper
          onClick={() => this.submitNotification()}
        >
          Submit
        </GroupStyled.ButtonWrapper>
      </GroupStyled.DetailsWrapper>
    )
  }
}
