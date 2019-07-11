import React from 'react';
import PropTypes from 'prop-types';
import TypeSelectorWrapper from './styled';
import { LOGIN_TYPE } from './constants';

export const LoginTypeSelector = props => (
  <TypeSelectorWrapper>
    <TypeSelectorWrapper.ComponentWrapper>
      <TypeSelectorWrapper.OptionWrapper>
        <TypeSelectorWrapper.HeaderText>
          {LOGIN_TYPE.SIGN_UP_TEXT}
        </TypeSelectorWrapper.HeaderText>
        <TypeSelectorWrapper.Type onClick={() => props.changeSignUpRole('fan')}>
          <TypeSelectorWrapper.Image imageUrl="assets/images/art_fan.svg"></TypeSelectorWrapper.Image>
          <TypeSelectorWrapper.Label>{LOGIN_TYPE.ROLE_FAN}</TypeSelectorWrapper.Label>
          <TypeSelectorWrapper.Description>{LOGIN_TYPE.FAN_DESCRIPTION}
          </TypeSelectorWrapper.Description>
        </TypeSelectorWrapper.Type>
        <TypeSelectorWrapper.Type onClick={() => props.changeSignUpRole('star')}>
          <TypeSelectorWrapper.Image imageUrl="assets/images/art_star.svg"></TypeSelectorWrapper.Image>
          <TypeSelectorWrapper.Label>{LOGIN_TYPE.ROLE_STAR}</TypeSelectorWrapper.Label>
          <TypeSelectorWrapper.Description>{LOGIN_TYPE.STAR_DESCRIPTION}
          </TypeSelectorWrapper.Description>
        </TypeSelectorWrapper.Type>
      </TypeSelectorWrapper.OptionWrapper>
    </TypeSelectorWrapper.ComponentWrapper>
  </TypeSelectorWrapper>
);

LoginTypeSelector.propTypes = {
  changeSignUpRole: PropTypes.func,
};
LoginTypeSelector.defaultProps = {
  changeSignUpRole: () => {},
};
