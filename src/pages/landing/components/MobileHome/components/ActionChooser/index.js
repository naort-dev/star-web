import React from 'react';
import PropTypes from 'prop-types';
import PrimaryButton from '../../../../../../components/PrimaryButton';
import { Heading, ButtonWrapper } from './styled';

const ActionChooser = props => (
  <React.Fragment>
    <Heading>Personalized Videos From The Stars</Heading>
    <ButtonWrapper>
      <PrimaryButton onClick={props.goToNextStep}>Browse Stars</PrimaryButton>
    </ButtonWrapper>
    <ButtonWrapper>
      <PrimaryButton onClick={props.toggleLogin}>Log In</PrimaryButton>
    </ButtonWrapper>
    <ButtonWrapper>
      <PrimaryButton onClick={props.toggleSignup}>Sign Up</PrimaryButton>
    </ButtonWrapper>
  </React.Fragment>
);

ActionChooser.propTypes = {
  goToNextStep: PropTypes.func.isRequired,
};

export default ActionChooser;
