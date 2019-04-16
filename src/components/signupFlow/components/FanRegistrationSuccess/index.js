import React from 'react';
import PropTypes from 'prop-types';
import FanRegSuccessWrapper from './styled';
import { FAN_REG_SUCCESS } from './constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFireAlt } from '@fortawesome/pro-regular-svg-icons';

export const FanRegistrationSuccess = props => (
  <FanRegSuccessWrapper>
    <FanRegSuccessWrapper.ComponentWrapper>
      <FanRegSuccessWrapper.OptionWrapper>
        <FanRegSuccessWrapper.Type>
          <FanRegSuccessWrapper.Image imageUrl="assets/images/art_highfive.svg"></FanRegSuccessWrapper.Image>
          <FanRegSuccessWrapper.HeaderText>
            {FAN_REG_SUCCESS.TITLE}
          </FanRegSuccessWrapper.HeaderText>
          <FanRegSuccessWrapper.Label>{FAN_REG_SUCCESS.MESSAGE}</FanRegSuccessWrapper.Label>
          <FanRegSuccessWrapper.Description>{FAN_REG_SUCCESS.DESCRIPTION}
          </FanRegSuccessWrapper.Description>
        </FanRegSuccessWrapper.Type>
      </FanRegSuccessWrapper.OptionWrapper>
      <FanRegSuccessWrapper.ButtonWrapper>
        <FanRegSuccessWrapper.Button primary>{FAN_REG_SUCCESS.PRIMARY_BUTTON}</FanRegSuccessWrapper.Button>
        <FanRegSuccessWrapper.Button> <FontAwesomeIcon icon={faFireAlt} />{FAN_REG_SUCCESS.SECONDARY_BUTTON}</FanRegSuccessWrapper.Button>
      </FanRegSuccessWrapper.ButtonWrapper>
    </FanRegSuccessWrapper.ComponentWrapper>
  </FanRegSuccessWrapper>
);

FanRegistrationSuccess.propTypes = {
  changeSignUpRole: PropTypes.func,
};
FanRegistrationSuccess.defaultProps = {
  changeSignUpRole: () => { },
};
