/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isEqual } from 'lodash';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { TextInput } from 'components/TextField';
import { FlexCenter } from 'styles/CommonStyled';
import Button from 'components/PrimaryButton';
import PhoneNumber from 'components/PhoneNumber';
import Tooltip from 'components/ToolTip';
import { FormContainer, InputLabel, PhoneWrap } from './styled';
import { Container, Wrapper } from '../styled';

const AccountInfo = props => {
  const phoneRef = useRef(null);
  const [country, setCountry] = useState('US');
  const {
    mobile_country_code,
    mobile_number,
  } = props.userDetails.notification_settings;
  const [formData, updateFormData] = useState({
    firstName: props.userDetails.first_name,
    lastName: props.userDetails.last_name,
    email: props.userDetails.email,
    phoneNumber: `+${mobile_country_code}${mobile_number}`,
  });
  const [errorObject, updateErrorObj] = useState({
    firstNameErr: false,
    lastNameErr: false,
    emailErr: false,
    formValid: false,
    phoneNumberErr: false,
  });

  const validateEmail = email => {
    const regX = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (regX.test(email)) {
      return false;
    }
    return true;
  };

  const validateFields = (state, event, errorState) => {
    let isValid = false;
    const { value } = event.target;
    if (state === 'email') {
      isValid = validateEmail(value);
    }
    if (state === 'phoneNumber') {
      if (!isEmpty(value)) isValid = !isValidPhoneNumber(value);
    } else {
      isValid = isEmpty(value);
    }
    updateErrorObj({
      ...errorObject,
      [errorState]: isValid,
    });
  };

  const inputChange = ({ state }) => event => {
    updateFormData({
      ...formData,
      [state]: event.target.value,
    });
  };

  const handleBlur = ({ state, errorState }) => event => {
    validateFields(state, event, errorState);
  };

  const validateForm = () => {
    let phoneValid = true;
    if (!isEmpty(formData.phoneNumber)) {
      phoneValid = isValidPhoneNumber(formData.phoneNumber);
    }
    const formValid = [
      !isEmpty(formData.firstName),
      !isEmpty(formData.lastName),
      !validateEmail(formData.email),
      phoneValid,
    ].every(condition => condition);

    updateErrorObj({ ...errorObject, formValid });
  };

  const countryChange = value => {
    setCountry(value);
  };

  const numberChange = number => {
    updateFormData({
      ...formData,
      phoneNumber: number,
    });
  };

  const saveChanges = () => {
    if (
      !isEqual(
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        },
        {
          firstName: props.userDetails.first_name,
          lastName: props.userDetails.last_name,
          email: props.userDetails.email,
        },
      )
    ) {
      props.handleAccountSave({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
      });
    }

    const {
      mobile_country_code,
      mobile_number,
    } = props.userDetails.notification_settings;
    const oldMon = `+${mobile_country_code}${mobile_number}`;

    if (!isEmpty(formData.phoneNumber) && formData.phoneNumber !== oldMon) {
      const codeNumber = phoneRef.current.props.metadata.countries[country][0];
      const phoneNumber = formData.phoneNumber.substring(
        codeNumber.length + 1,
        formData.phoneNumber.length,
      );

      props.generateOTP(phoneNumber, codeNumber, country);
    }
  };

  const tooltipWrapper = (text, isTooltip, fun) => {
    if (isTooltip) {
      return <Tooltip title={text}>{fun()}</Tooltip>;
    }
    return fun();
  };

  useEffect(() => {
    validateForm();
  }, [
    errorObject.firstNameErr,
    errorObject.lastNameErr,
    errorObject.emailErr,
    errorObject.formValid,
    errorObject.phoneNumberErr,
    formData.firstName,
    formData.lastName,
    formData.email,
    formData.phoneNumber,
  ]);

  useEffect(() => {
    const {
      mobile_country_code,
      mobile_number,
    } = props.userDetails.notification_settings;
    updateFormData({
      ...formData,
      phoneNumber: `+${mobile_country_code}${mobile_number}`,
    });
  }, [
    props.userDetails.notification_settings.mobile_country_code,
    props.userDetails.notification_settings.mobile_number,
  ]);

  const getTextInput = ({
    placeholder,
    state,
    value,
    error,
    errorState,
    nativeProps,
  }) => {
    return (
      <section className="inputWrapper">
        <TextInput
          error={error}
          placeholder={placeholder}
          onChange={inputChange({ state, errorState })}
          onBlur={handleBlur({ state, errorState })}
          value={value}
          InputProps={{
            classes: { error: 'error-field', input: 'input-field' },
          }}
          InputLabelProps={{ classes: { root: 'float-label' } }}
          nativeProps={nativeProps}
        />
      </section>
    );
  };

  const getTooltipInput = () => {
    return getTextInput({
      placeholder: props.labels.emailLbl,
      state: 'email',
      value: formData.email,
      error: errorObject.emailErr,
      errorState: 'emailErr',
      nativeProps: { readOnly: true },
    });
  };

  return (
    <Container className="popstyle-wrap">
      <Wrapper className="popstyle-inner">
        <h2
          className="sub-head"
          data-web={props.webHead}
          data-mob={props.mobHead}
        >
          {''}
        </h2>
        <FormContainer>
          {errorObject.firstNameErr || errorObject.lastNameErr ? (
            <InputLabel
              error={errorObject.firstNameErr || errorObject.lastNameErr}
            >
              Enter valid full name
            </InputLabel>
          ) : (
            <InputLabel className="labelHead">
              {props.labels.nameHead}
            </InputLabel>
          )}
          <section className="row-wrap">
            {getTextInput({
              placeholder: props.labels.firstNameLbl,
              state: 'firstName',
              value: formData.firstName,
              error: errorObject.firstNameErr,
              errorState: 'firstNameErr',
              nativeProps: {},
            })}
            {getTextInput({
              placeholder: props.labels.lastNameLbl,
              state: 'lastName',
              value: formData.lastName,
              error: errorObject.lastNameErr,
              errorState: 'lastNameErr',
              nativeProps: {},
            })}
          </section>
          <InputLabel error={errorObject.emailErr}>
            {props.labels.emailHead}
          </InputLabel>
          {tooltipWrapper(
            props.tooltip.emailTooltipText,
            props.tooltip.emailTooltip,
            getTooltipInput,
          )}

          {props.allowPhone && (
            <PhoneWrap
              error={errorObject.phoneNumberErr}
              valid={!isEmpty(formData.phoneNumber)}
            >
              <PhoneNumber
                numProps={{
                  phoneRef,
                  label: props.labels.phoneLabel,
                  placeholder: '',
                  value: formData.phoneNumber,
                  countryChange,
                  onChange: numberChange,
                  notValid: errorObject.phoneNumberErr,
                  onBlur: handleBlur({
                    state: 'phoneNumber',
                    errorState: 'phoneNumberErr',
                  }),
                  error:
                    errorObject.phoneNumberErr && !isEmpty(formData.phoneNumber)
                      ? 'Invalid phone number'
                      : '',
                  country,
                }}
              ></PhoneNumber>
            </PhoneWrap>
          )}
        </FormContainer>
        <FlexCenter>
          <Button
            className="button"
            disabled={!errorObject.formValid}
            isDisabled={!errorObject.formValid}
            onClick={saveChanges}
          >
            {props.labels.buttonLbl}
          </Button>
        </FlexCenter>
      </Wrapper>
    </Container>
  );
};

AccountInfo.propTypes = {
  userDetails: PropTypes.object.isRequired,
  handleAccountSave: PropTypes.func.isRequired,
  webHead: PropTypes.string,
  mobHead: PropTypes.string,
  labels: PropTypes.object.isRequired,
  tooltip: PropTypes.object,
  allowPhone: PropTypes.bool,
  generateOTP: PropTypes.func.isRequired,
};

AccountInfo.defaultProps = {
  webHead: '',
  mobHead: '',
  tooltip: {},
  allowPhone: false,
};

export default AccountInfo;
