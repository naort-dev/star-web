import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFireAlt } from '@fortawesome/pro-regular-svg-icons';
import { updateCategory } from '../../../../pages/landing/actions/updateFilters';
import FanRegSuccessWrapper from './styled';
import { FAN_REG_SUCCESS } from './constants';

const FanRegistrationSuccess = (props) => {

  const goToBrowseStars = () => {
    props.updateCategory('Featured', 0, []);
    if (props.location.pathname !== '/browse-stars') {
      props.history.push('/browse-stars');
    }
    props.closeSignupFlow();
  };

  const gotToHome = () => {
    if (props.location.pathname !== '/') {
      props.history.push('/');
    }
    props.closeSignupFlow();
  };

  return (
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
          <FanRegSuccessWrapper.Button onClick={goToBrowseStars} primary>{FAN_REG_SUCCESS.PRIMARY_BUTTON}</FanRegSuccessWrapper.Button>
          <FanRegSuccessWrapper.Button onClick={gotToHome}> <FontAwesomeIcon icon={faFireAlt} />{FAN_REG_SUCCESS.SECONDARY_BUTTON}</FanRegSuccessWrapper.Button>
        </FanRegSuccessWrapper.ButtonWrapper>
      </FanRegSuccessWrapper.ComponentWrapper>
    </FanRegSuccessWrapper>
  );
};

FanRegistrationSuccess.propTypes = {
  closeSignupFlow: PropTypes.func,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  updateCategory: PropTypes.func.isRequired,
};
FanRegistrationSuccess.defaultProps = {
  closeSignupFlow: () => { },
};

const mapDispatchToProps = dispatch => ({
  updateCategory: (label, value, subCategories) => dispatch(updateCategory(label, value, subCategories)),
});

export default withRouter(connect(null, mapDispatchToProps)(FanRegistrationSuccess));
