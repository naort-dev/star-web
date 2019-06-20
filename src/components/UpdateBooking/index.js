import React, { useState, useEffect } from 'react';
import {connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PopupHeading } from 'styles/CommonStyled';
import RequestFlowPopup from '../RequestFlowPopup';
import PrimaryButton from '../PrimaryButton';
import Dropdown from '../Dropdown';
import ModalHeader from '../ModalHeader';
import BookingTitle from '../BookingTitle';
import { toggleUpdateBooking } from '../../store/shared/actions/toggleModals';
import { changeRequestStatus } from '../../pages/myVideos/actions/handleRequests';
import { changeBookingStatus } from '../../pages/Bookings/actions/handleRequests';
import UpdateStyled from './styled';

const UpdateBooking = (props) => {

  const { starMode, requestData } = props.updateBooking;

  const [declineReasons, setReasonList] = useState([]);
  const [reason, setReason] = useState({});

  useEffect(() => {
    setReasonList(props.config.declineComments.map((reasonItem, index) => {
      return ({
        label: reasonItem,
        value: index,
      })
    }))
  }, [])

  const updateReason = (option) => {
    setReason(option);
  }

  const onReasonSubmit = () => {
    if (props.updateBooking.starMode) {
      props.changeBookingStatus(props.updateBooking.requestId, 5, reason.label) // decline a booking
        .then(() => {
          props.toggleUpdateBooking(false)();
        })
    } else {
      props.changeRequestStatus(props.updateBooking.requestId, 5, reason.label) // cancel a booking
        .then(() => {
          props.toggleUpdateBooking(false)();
        })
    }
  }

  return (
    <RequestFlowPopup
      disableClose={!starMode}
      noPadding={!starMode}
      classes={{ root: 'alternate-modal-root' }}
      closePopUp={props.toggleUpdateBooking(false)}
    >
      {
        !starMode &&
          <ModalHeader
            starImage={requestData.avatar_photo && requestData.avatar_photo.thumbnail_url}
            closeHandler={props.toggleUpdateBooking(false)}
            customHeading={<BookingTitle secondary requestData={requestData} />}
          />
      }
      <UpdateStyled starMode={starMode}>
        <PopupHeading>
          {
            starMode ?
              `Why would you like to 
              decline this booking?`
            : `Are you sure you want to cancel this booking?`
          }
        </PopupHeading>
        <Dropdown
          rootClass="drop-down"
          selected={reason}
          secondary
          options={declineReasons}
          labelKey="label"
          valueKey="value"
          placeHolder={!starMode && 'Select reason'}
          onChange={updateReason}
        />
        <PrimaryButton onClick={onReasonSubmit}>{ starMode ? 'Submit' : 'Cancel Booking' }</PrimaryButton>
        {
          !starMode &&
            <PrimaryButton className='secondary-btn' secondary onClick={onReasonSubmit}>Continue with booking</PrimaryButton>        
        }
      </UpdateStyled>
    </RequestFlowPopup>
  )
}

UpdateBooking.propTypes = {
  toggleUpdateBooking: PropTypes.func.isRequired,
  changeBookingStatus: PropTypes.func.isRequired,
  changeRequestStatus: PropTypes.func.isRequired,
  updateBooking: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  config: state.config.data,
  updateBooking: state.modals.updateBookingModal,
})

const mapDispatchToProps = dispatch => ({
  toggleUpdateBooking: (state, requestId) => () => dispatch(toggleUpdateBooking(state, requestId)),
  changeBookingStatus: (requestId, requestStatus, comment) => dispatch(changeBookingStatus(requestId, requestStatus, comment)),
  changeRequestStatus: (requestId, requestStatus, comment) => dispatch(changeRequestStatus(requestId, requestStatus, comment)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBooking);

