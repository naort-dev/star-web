import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginFlow from './components/loginFlow';
import QuickViewModal from './components/QuickViewModal';
import SignupFlow from './components/signupFlow';
import BookingCard from './components/BookingCard';
import UpdateBooking from './components/UpdateBooking';
import SupportModal from './components/SupportModal';
import Purchase from './pages/Purchase/Purchase.Container';

const Modals = (props) => {
  if (props.supportModal) {
    return <SupportModal />
  } else if (props.loginModal.active) {
    return <LoginFlow />;
  } else if (props.signUpModal) {
    return <SignupFlow />;
  } else if (props.requestFlow) {
    return <Purchase />;
  } else if (props.quickViewModal.active) {
    return <QuickViewModal />;
  } else if (props.updateBookingModal.active) {
    return <UpdateBooking />;
  } else if (props.bookingModal.active) {
    return <BookingCard />;
  }
  return null;
};

Modals.propTypes = {
  loginModal: PropTypes.object.isRequired,
  signUpModal: PropTypes.bool.isRequired,
  requestFlow: PropTypes.bool.isRequired,
  quickViewModal: PropTypes.object.isRequired,
  bookingModal: PropTypes.object.isRequired,
  updateBookingModal: PropTypes.object.isRequired,
  supportModal: PropTypes.bool.isRequired,
};


const mapState = state => ({
  loginModal: state.modals.loginModal,
  signUpModal: state.modals.signUpModal,
  requestFlow: state.modals.requestFlow,
  quickViewModal: state.modals.quickViewModal,
  updateBooking: state.modals.updateBooking,
  bookingModal: state.modals.bookingModal,
  updateBookingModal: state.modals.updateBookingModal,
  supportModal: state.modals.supportModal,
});

export default connect(mapState)(Modals);
