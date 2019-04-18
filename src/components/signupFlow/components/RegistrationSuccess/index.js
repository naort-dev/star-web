import React from 'react';
import PropTypes from 'prop-types';
import RegSuccessWrapper from './styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export const RegistrationSuccess = props => (
  <RegSuccessWrapper>
    <RegSuccessWrapper.ComponentWrapper>
      <RegSuccessWrapper.OptionWrapper>
        <RegSuccessWrapper.Type>
          <RegSuccessWrapper.Image
            imageUrl={props.image_url}>
          </RegSuccessWrapper.Image>
          <RegSuccessWrapper.HeaderText>
            {props.title}
          </RegSuccessWrapper.HeaderText>
          <RegSuccessWrapper.Label>
            {props.message}
          </RegSuccessWrapper.Label>
          <RegSuccessWrapper.Description>
            {props.description}
          </RegSuccessWrapper.Description>
        </RegSuccessWrapper.Type>
      </RegSuccessWrapper.OptionWrapper>
      <RegSuccessWrapper.ButtonWrapper>
        <RegSuccessWrapper.Button onClick={props.primaryButtonClick}>
          {props.primary_button}
        </RegSuccessWrapper.Button>
        <RegSuccessWrapper.Button onClick={props.secondaryButtonClick}>
          {props.icon ? <FontAwesomeIcon icon={props.icon} /> : null}
          {props.secondary_button}
        </RegSuccessWrapper.Button>
      </RegSuccessWrapper.ButtonWrapper>
    </RegSuccessWrapper.ComponentWrapper>
  </RegSuccessWrapper>
);

RegistrationSuccess.propTypes = {
  description: PropTypes.string,
  highlight_text: PropTypes.string,
  icon: PropTypes.string,
  image_url: PropTypes.string,
  message: PropTypes.string,
  primary_button: PropTypes.string,
  primaryButtonClick: PropTypes.func,
  secondary_button: PropTypes.string,
  secondaryButtonClick: PropTypes.func,
  title: PropTypes.string,
};
RegistrationSuccess.defaultProps = {
  description: '',
  highlight_text: '',
  icon: '',
  image_url: '',
  message: '',
  primary_button: '',
  primaryButtonClick: () => { },
  secondary_button: '',
  secondaryButtonClick: () => { },
  title: '',
};
