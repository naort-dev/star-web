import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginFlow from './components/loginFlow';
// import ReferStar from './components/ReferStar';
import SignupFlow from './components/signupFlow';
import { Requestvideo } from './pages/requestvideo';

const Modals = (props) => {
  if (props.loginModal) {
    return <LoginFlow />;
  } else if (props.signUpModal) {
    return <SignupFlow />;
  } else if (props.requestFlow) {
    return <Requestvideo />;
  } else if (props.referModal) {
    // return <ReferStar />;
  }
  return null;
};

Modals.propTypes = {
  loginModal: PropTypes.bool.isRequired,
  signUpModal: PropTypes.bool.isRequired,
  requestFlow: PropTypes.bool.isRequired,
  referModal: PropTypes.bool.isRequired,
};


const mapState = state => ({
  loginModal: state.modals.loginModal,
  signUpModal: state.modals.signUpModal,
  requestFlow: state.modals.requestFlow,
  referModal: state.modals.referModal,
});

export default connect(mapState)(Modals);
