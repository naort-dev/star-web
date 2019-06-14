import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RequestFlowPopup from '../RequestFlowPopup';
import OrderDetails from '../OrderDetails';
import StarView from './components/StarView';
import Loader from '../Loader';
import { getRequestDetails } from '../../services/request';
import { toggleBookingModal } from '../../store/shared/actions/toggleModals';
import BookingStyled from './styled';

const BookingCard = (props) => {

  const [showDetails, toggleDetails] = useState(false);
  const [requestData, setRequestData] = useState(null);

  const closeModal = () => {
    props.toggleBookingModal(false)
  }

  const setDetails = (state) => () => {
    // if (state) {
    //   document.getElementById('booking-modal').setAttribute('style', 'transition: 1s ease; transform: rotateY(180deg);');
    // }
    toggleDetails(state);
  }

  useEffect(() => {
    if (props.bookingModal.requestId) {
      getRequestDetails(props.bookingModal.requestId)
        .then((requestDetails) => {
          if (requestDetails.success) {
            setRequestData(requestDetails.data.stargramz_response);
          }
        })
    }
  }, [props.bookingModal.requestId]);

  const { starMode } = props.bookingModal;

  return (
    <RequestFlowPopup
      disableClose
      paperProps={{
        id: 'booking-modal',
      }}
      closePopUp={closeModal}
    >
      {
        !requestData ?
          <Loader />
        :
          <BookingStyled>
            {
              !showDetails && starMode &&
                <StarView
                  bookingData={requestData}
                  toggleDetails={setDetails}
                  closeModal={closeModal}
                />
            }
            {
              showDetails &&
                <OrderDetails
                  closeModal={closeModal}
                  onPrimaryClick={setDetails(false)}
                  bookingData={requestData}
                />
            }
          </BookingStyled>
      }
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
