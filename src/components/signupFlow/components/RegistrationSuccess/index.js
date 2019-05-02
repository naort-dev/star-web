import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';
import { updateCategory } from '../../../../pages/landing/actions/updateFilters';
import RegSuccessWrapper from './styled';

const RegistrationSuccess = (props) => {
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
          <RegSuccessWrapper.Button primary onClick={goToBrowseStars}>
            {props.primary_button}
          </RegSuccessWrapper.Button>
          <RegSuccessWrapper.Button onClick={gotToHome}>
            {props.icon ? <FontAwesomeIcon icon={props.icon} /> : null}
            <span>{props.secondary_button}</span>
          </RegSuccessWrapper.Button>
        </RegSuccessWrapper.ButtonWrapper>
      </RegSuccessWrapper.ComponentWrapper>
    </RegSuccessWrapper>
  );
};

RegistrationSuccess.propTypes = {
  description: PropTypes.string,
  closeSignupFlow: PropTypes.func,
  highlight_text: PropTypes.string,
  icon: PropTypes.string,
  image_url: PropTypes.string,
  message: PropTypes.string,
  primary_button: PropTypes.string,
  primaryButtonClick: PropTypes.func,
  secondary_button: PropTypes.string,
  secondaryButtonClick: PropTypes.func,
  title: PropTypes.string,
  history: PropTypes.object.isRequired,
  updateCategory: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
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
  closeSignupFlow: () => { },
};

const mapDispatchToProps = dispatch => ({
  updateCategory: (label, value, subCategories) => dispatch(updateCategory(label, value, subCategories)),
});

export default withRouter(connect(null, mapDispatchToProps)(RegistrationSuccess));
