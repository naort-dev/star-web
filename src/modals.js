import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginFlow from './components/loginFlow';
import QuickViewModal from './components/QuickViewModal';
import SignupFlow from './components/signupFlow';
import BookingCard from './components/BookingCard';
import Purchase from './pages/Purchase/Purchase.Container';

const Modals = (props) => {
  if (props.loginModal) {
    return <LoginFlow />;
  } else if (props.signUpModal) {
    return <SignupFlow />;
  } else if (props.requestFlow) {
    return <Purchase />;
  } else if (props.quickViewModal.active) {
    return <QuickViewModal />;
  } else if (props.bookingModal.active) {
    return <BookingCard />
  }
  return null;
};

Modals.propTypes = {
  loginModal: PropTypes.bool.isRequired,
  signUpModal: PropTypes.bool.isRequired,
  requestFlow: PropTypes.bool.isRequired,
  quickViewModal: PropTypes.object.isRequired,
  bookingModal: PropTypes.object.isRequired,
};


const mapState = state => ({
  loginModal: state.modals.loginModal,
  signUpModal: state.modals.signUpModal,
  requestFlow: state.modals.requestFlow,
  quickViewModal: state.modals.quickViewModal,
  bookingModal: state.modals.bookingModal,
});

export default connect(mapState)(Modals);
