import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RequestFlowPopup from '../RequestFlowPopup';
import { toggleBookingModal } from '../../store/shared/actions/toggleModals';
import BookingStyled from './styled';

const BookingCard = (props) => {
  return (
    <RequestFlowPopup
      disableClose
      closePopUp={() => props.toggleBookingModal(false)}
    >
      <BookingStyled>
        asdasdasd
      </BookingStyled>
    </RequestFlowPopup>
  )
}

BookingCard.propTypes = {
  toggleBookingModal: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  bookingModal: state.bookingModal,
})

const mapDispatchToProps = dispatch => ({
  toggleBookingModal: (state, bookingData, starMode) => dispatch(toggleBookingModal(state, bookingData, starMode)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BookingCard);
