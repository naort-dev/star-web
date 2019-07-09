import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { FloatLabel, Error, Wrapper } from './styled';

const PhoneNumber = ({ numProps }) => {
  return (
    <Wrapper>
      <FloatLabel valid={!isEmpty(numProps.value)}>
        <PhoneInput
          id="for-phno"
          country={numProps.country}
          placeholder={numProps.placeholder}
          value={numProps.value}
          onCountryChange={numProps.countryChange}
          onChange={numProps.onChange}
          onBlur={numProps.onBlur}
        />
        <label htmlFor="for-phno">{numProps.label}</label>
        <Error>{numProps.error}</Error>
      </FloatLabel>
    </Wrapper>
  );
};

PhoneNumber.propTypes = {
  numProps: PropTypes.object.isRequired,
};

export default PhoneNumber;
