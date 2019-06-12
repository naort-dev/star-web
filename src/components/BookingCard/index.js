import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RequestFlowPopup from '../RequestFlowPopup';
import StarView from './components/StarView';
import { toggleBookingModal } from '../../store/shared/actions/toggleModals';
import BookingStyled from './styled';

const BookingCard = (props) => {

  const closeModal = () => {
    props.toggleBookingModal(false)
  }

  const { starMode, active, data: bookingData } = props.bookingModal;

  return (
    <RequestFlowPopup
      disableClose
      closePopUp={closeModal}
    >
      <BookingStyled>
        {
          starMode &&
            <StarView
              bookingData={bookingData}
              closeModal={closeModal}
            />
        }
      </BookingStyled>
    </RequestFlowPopup>
  )
}

BookingCard.propTypes = {
  toggleBookingModal: PropTypes.func.isRequired,
  bookingModal: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  bookingModal: state.modals.bookingModal,
})

const mapDispatchToProps = dispatch => ({
  toggleBookingModal: (state, bookingData, starMode) => dispatch(toggleBookingModal(state, bookingData, starMode)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BookingCard);
