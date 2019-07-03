import React from 'react';
import PropTypes from 'prop-types';
import PrimaryButton from '../../../../../../components/PrimaryButton';
import { Heading, ButtonWrapper } from './styled';

const ActionChooser = props => (
  <React.Fragment>
    <Heading>Personalized Videos From The Stars</Heading>
    <ButtonWrapper>
      <PrimaryButton className="button" onClick={props.goToNextStep}>Browse Stars</PrimaryButton>
    </ButtonWrapper>
    {
      !props.isLoggedIn &&
        <React.Fragment>
          <ButtonWrapper>
            <PrimaryButton className="button" onClick={props.toggleLogin}>Log In</PrimaryButton>
          </ButtonWrapper>
          <ButtonWrapper>
            <PrimaryButton className="button" onClick={props.toggleSignup}>Sign Up</PrimaryButton>
          </ButtonWrapper>
        </React.Fragment>
    }
  </React.Fragment>
);

ActionChooser.propTypes = {
  goToNextStep: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default ActionChooser;
