import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CloseButton } from 'styles/CommonStyled';
import RequestFlowPopup from '../RequestFlowPopup';
import OrderDetails from '../OrderDetails';
import { requestTypes } from '../../constants/requestTypes';
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


  const renderHeading = () => {
    if (requestTypes[requestData.request_type] === 'Q&A') {
      return (
        <React.Fragment>
            <strong>Question</strong>&nbsp;
            from&nbsp;
            <strong>
              {
                requestData.fan
              }
            </strong>
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        <strong>{requestData.occasion}</strong>&nbsp;
          {requestTypes[requestData.request_type] === 'Shout-out' ? 'shoutout' : 'announcement'} for&nbsp; 
          <strong>
            { requestData.request_details && !requestData.request_details.is_myself ? requestData.request_details.stargramto : requestData.fan }
          </strong>
          {
            requestData.request_details && !requestData.request_details.is_myself ?
              <React.Fragment>
                &nbsp;from <strong>{requestData.request_details.stargramto}</strong>
              </React.Fragment>
            : null
          }
      </React.Fragment>
    )
  }

  const { starMode } = props.bookingModal;

  return (
    <RequestFlowPopup
      disableClose
      closePopUp={closeModal}
    >
      {
        !requestData ?
          <Loader />
        :
          <BookingStyled.Wrapper>
            <CloseButton className="close-btn" onClick={closeModal} />
            <BookingStyled.HeaderText>
              {renderHeading()}
            </BookingStyled.HeaderText>
            <BookingStyled showDetails={showDetails}>
              <BookingStyled.Booking>
                {
                  starMode &&
                    <StarView
                      bookingData={requestData}
                      toggleDetails={setDetails}
                      closeModal={closeModal}
                    />
                }              
              </BookingStyled.Booking>
              <BookingStyled.OrderWrapper>
                <BookingStyled.Heading>
                  Order Details
                </BookingStyled.Heading>
                <OrderDetails
                  closeModal={closeModal}
                  disableHeader
                  onPrimaryClick={setDetails(false)}
                  bookingData={requestData}
                />
              </BookingStyled.OrderWrapper>
            </BookingStyled>
          </BookingStyled.Wrapper>
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
