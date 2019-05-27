import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import Button from '../PrimaryButton';
import { TextInput } from '../TextField';
import { FlexCenter, BackArrow, CloseButton} from '../../styles/CommonStyled';
import { Layout, Content } from './styled';
import { generateOtp, validateOtp } from '../../services/otpGenerate';

const GetPhoneNumber = props => {
  const [phoneNoState, setPhoneNoState] = useState({
    countryCode: '',
    value: '',
    phoneNumberVerify: 'Verify',
    resentConfirmation: false,
    phoneNumberOriginal: '',
    otpEnterPopup: props.switched ? props.switched : false,
    otpErrorMessage: '',
    phNo1: '',
    phNo2: '',
    phNo3: '',
    phNo4: '',
  });
  const [errors, setErrors] = useState({
    phone: false,
  });
  const [country, setCountry] = useState('US');
  const phoneRef = useRef(null);
  const phNum1 = useRef(null);
  const phNum2 = useRef(null);
  const phNum3 = useRef(null);
  const phNum4 = useRef(null);

  const backArrowClick = () => {
    if (phoneNoState.otpEnterPopup) {
      setPhoneNoState({
        ...phoneNoState,
        otpEnterPopup: false,
      });
      props.disableClose(false);
    } else {
      props.onBack(false);
    }
  }
  const closePhoneNum = () => {
    if (phoneNoState.otpEnterPopup) {
      setPhoneNoState({
        ...phoneNoState,
        otpEnterPopup: false,
      });
      props.disableClose(false);
    } else {
      this.props.closeSignupFlow(phoneNoState.otpEnterPopup)
    }
  }
  const checkAllValidity = () => {
    const { value } = phoneNoState;
    let phoneValid = true;
    if (!isValidPhoneNumber(value)) {
      phoneValid = false;
    }
    return phoneValid;
  }

  const countryChange = value1 =>setCountry(value1);
  
  const submitNotification = (type) => {
    const codeNumber = phoneNoState.countryCode ? phoneNoState.countryCode : phoneRef.current.props.metadata.countries[country][0];
    const originalNumber = phoneNoState.value.substring(codeNumber.length + 1, phoneNoState.value.length);
    if (type === 'reSent') {
      generateOtp(originalNumber, phoneNoState.countryCode)
        .then((resp) => {
          if (resp.success) {
            setPhoneNoState({
              ...phoneNoState,
              resentConfirmation: true,
            });
          }
        });
    } else if (checkAllValidity() && phoneNoState.phoneNumberVerify === 'Verify') {
      generateOtp(originalNumber, codeNumber)
        .then((resp) => {
          if (resp.success) {
            setPhoneNoState({
              ...phoneNoState,
              otpEnterPopup: true,
              resentConfirmation: false,
              phoneNumberOriginal: originalNumber,
              countryCode: codeNumber,
            });
            props.disableClose(true);
          }
        }).catch((error)=> {
        });
    } else if (phoneNoState.phoneNumberVerify === 'Verified') {
      props.onComplete();
    }
  }

  const validateOnBlur = (key) => () => {
    const errors = {};
    if (key === 'phNo1' || key === 'phNo2' || key === 'phNo3') {
      errors.phone = !validator.isNumeric(phoneNoState.phNo1, { no_symbols: true })
        || !validator.isNumeric(phoneNoState.phNo2, { no_symbols: true })
        || !validator.isNumeric(phoneNoState.phNo3, { no_symbols: true })
        || phoneNoState.phNo1.length + phoneNoState.phNo2.length + phoneNoState.phNo3.length !== 10;
    }
    setErrors(errors);
  }

  const handleFieldChange = (fieldType, fieldValue) => {
    setPhoneNoState({
        ...phoneNoState,
        [fieldType]: fieldValue,
      });
      setErrors({ ...errors, [fieldType]: false });
      if (fieldType === 'phNo1' && fieldValue.length === 1) {
        phNum2.current.focus();
      } else if (fieldType === 'phNo2' && fieldValue.length === 1) {
        phNum3.current.focus();
      } else if (fieldType === 'phNo3' && fieldValue.length === 1) {
        phNum4.current.focus();
      }
  };

  const validateFields = () => {
    let { phone } = errors;

    if (!validator.isNumeric(phoneNoState.phNo1, { no_symbols: true })
      || !validator.isNumeric(phoneNoState.phNo2, { no_symbols: true })
      || !validator.isNumeric(phoneNoState.phNo3, { no_symbols: true })
      || !validator.isNumeric(phoneNoState.phNo4, { no_symbols: true })
      || phoneNoState.phNo1.length + phoneNoState.phNo2.length + phoneNoState.phNo3.length + phoneNoState.phNo4.length !== 4) {
      phone = true;
    } else {
      phone = false;
    }
    setPhoneNoState({
      ...phoneNoState,
     });
    setErrors({ ...phoneNoState.errors, phone });
    return !phone;
  }

  const submitOTPForm = () => {
    if (validateFields()) {
      const accountDetails = {
        phone: `${phoneNoState.phNo1}${phoneNoState.phNo2}${phoneNoState.phNo3}${phoneNoState.phNo4}`,
      };
      validateOtp(phoneNoState.phoneNumberOriginal, phoneNoState.countryCode, accountDetails.phone)
        .then((resp) => {
          if (resp.success) {
            setPhoneNoState({
              ...phoneNoState,
              loading: false,
              phoneNumberVerify: 'Verified',
              otpEnterPopup: false,
              otpErrorMessage: '',
              phNo1: '',
              phNo2: '',
              phNo3: '',
              phNo4: '',
            });
            props.onComplete();
          } else if (resp.status === '400' && resp.response.data.error.code === 1006) {
            setPhoneNoState({
              ...phoneNoState,
              otpErrorMessage: resp.response.data.error.message,
            });
          } else if (resp.status === '400' && resp.response.data.error.code === 1009) {
            setPhoneNoState({
              ...phoneNoState,
              otpErrorMessage: resp.response.data.error.message.verification_code[0],
            });
          }
        });
    } else {
      setPhoneNoState({
        ...phoneNoState,
        otpErrorMessage: 'Please enter the code',
      });
    }
  }

  const phoneLast4digits = phoneNoState.phoneNumberOriginal.substring(phoneNoState.phoneNumberOriginal.length - 4);
  return (
    <Layout>
      <BackArrow className="leftArrow" onClick={backArrowClick}  />
      <CloseButton className="close" onClick={closePhoneNum} />
      {phoneNoState.otpEnterPopup ?  
        (<Content>
          <h1 className="otpTitle">{props.otptitle}</h1>
          <Content.OtpSubTitle>{props.otp_sub_title}{phoneLast4digits}.</Content.OtpSubTitle>
          <Content.OTPWrapper>
            <Content.WrapsInput> 
              <TextInput
                  type="text"
                  name="phNo1"
                  inputRef={phNum1}
                  value={phoneNoState.phNo1}
                  onChange={(event) => {
                    handleFieldChange('phNo1', event.target.value);
                  }}
                  onBlur ={ validateOnBlur('phNo1')}
                />
            </Content.WrapsInput> 
            <Content.WrapsInput> 
              <TextInput
                type="text"
                name="phNo2"
                inputRef={phNum2}
                value={phoneNoState.phNo2}
                onChange={(event) => {
                  handleFieldChange('phNo2', event.target.value);
                }}
                onBlur={validateOnBlur('phNo2')}
              />
            </Content.WrapsInput> 
            <Content.WrapsInput> 
              <TextInput
                type="text"
                name="phNo3"
                inputRef={phNum3}
                value={phoneNoState.phNo3}
                onChange={(event) => {
                  handleFieldChange('phNo3', event.target.value);
                }}
                onBlur={validateOnBlur('phNo3')}
              />
            </Content.WrapsInput>
            <Content.WrapsInput> 
              <TextInput
                type="text"
                name="phNo4"
                inputRef={phNum4}
                value={phoneNoState.phNo4}
                onChange={(event) => {
                  handleFieldChange('phNo4', event.target.value);
                }}
                onBlur={validateOnBlur('phNo4')}
              />
            </Content.WrapsInput> 
          </Content.OTPWrapper>
          <Content.OtpSubTitleWrapper>
            <Content.OtpSubTitle>{props.otp_receive_code}</Content.OtpSubTitle><Content.Resend onClick={() => submitNotification('reSent')}>Resend</Content.Resend>
          </Content.OtpSubTitleWrapper>
          <Button className="SubmitPhoneNoBtn" onClick={() => submitOTPForm()}>
            Verify
          </Button>
        </Content>
        ) : (
          <React.Fragment>
        <FlexCenter>
          <Layout.Image
              imageUrl={props.image_url}>
          </Layout.Image>
        </FlexCenter>
        <Content>
          <h1 className="firstTitle">{props.title1}</h1>
          { props.title2 &&
          <h1 className="orderSuccess">{props.title2}</h1>
          }
          <p className="note">
            {props.description}
          </p>
          <Layout.Phonenumber>
            <PhoneInput
              country="US"
              placeholder="Phone Number"
              ref={phoneRef}
              value={phoneNoState.value}
              onCountryChange={countryChange}
              onChange={number => setPhoneNoState({
                                  ...phoneNoState,
                                  value: number,
                                  phoneNumberVerify: 'Verify',
                               })}
            />
            <div className="errorElement">
                  {
                    phoneNoState.value !== '' && phoneNoState.value !== undefined && !isValidPhoneNumber(phoneNoState.value) ? 'Invalid phone number' : undefined
                  }
                  {
                    (phoneNoState.value === undefined) && 'Phone number required'
                  }
                </div>
          </Layout.Phonenumber>
          <Button className="SubmitPhoneNoBtn" onClick={submitNotification}>
            Continue
          </Button>
          <span
          className="skip"
          onClick={props.onComplete}
          role="presentation"
        >
          Skip
        </span>
        </Content>
        </React.Fragment>
        )}
    </Layout>
  );
};

GetPhoneNumber.propTypes = {
  
};

export default GetPhoneNumber;
