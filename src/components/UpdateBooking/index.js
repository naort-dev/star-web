import React, { useState, useEffect } from 'react';
import {connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PopupHeading } from 'styles/CommonStyled';
import RequestFlowPopup from '../RequestFlowPopup';
import PrimaryButton from '../PrimaryButton';
import Dropdown from '../Dropdown';
import { toggleUpdateBooking } from '../../store/shared/actions/toggleModals';
import { changeBookingStatus } from '../../pages/Bookings/actions/handleRequests';
import UpdateStyled from './styled';

const UpdateBooking = (props) => {

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
    }
  }

  return (
    <RequestFlowPopup
      classes={{ root: 'alternate-modal-root' }}
      closePopUp={props.toggleUpdateBooking(false)}
    >
      <UpdateStyled>
        <PopupHeading>
          Why would you like to 
          decline this booking?
        </PopupHeading>
        <Dropdown
          rootClass="drop-down"
          selected={reason}
          secondary
          options={declineReasons}
          labelKey="label"
          valueKey="value"
          onChange={updateReason}
        />
        <PrimaryButton onClick={onReasonSubmit}>Submit</PrimaryButton>
      </UpdateStyled>
    </RequestFlowPopup>
  )
}

UpdateBooking.propTypes = {
  toggleUpdateBooking: PropTypes.func.isRequired,
  changeBookingStatus: PropTypes.func.isRequired,
  updateBooking: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  config: state.config.data,
  updateBooking: state.modals.updateBookingModal,
})

const mapDispatchToProps = dispatch => ({
  toggleUpdateBooking: (state, requestId) => () => dispatch(toggleUpdateBooking(state, requestId)),
  changeBookingStatus: (requestId, requestStatus, comment) => dispatch(changeBookingStatus(requestId, requestStatus, comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBooking);

