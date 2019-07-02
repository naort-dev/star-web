import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
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
  const [showSuccess, toggleSuccess] = useState(false);
  const [declineReasons, setReasonList] = useState([]);
  const [reason, setReason] = useState({});

  useEffect(() => {
    if (props.updateBooking.starMode) {
      setReasonList(props.config.requestFeedback.map((reasonItem, index) => {
        return ({
          label: reasonItem,
          value: index,
        })
      }))
    } else {
      setReasonList(props.config.cancelReasons)
    }
  }, [])

  const updateReason = (option) => {
    setReason(option);
  }

  const onReasonSubmit = () => {
    if (props.updateBooking.starMode) {
      props.changeBookingStatus(props.updateBooking.requestId, 5, `Star cancellation: ${reason.label}` || 'Star cancellation: Other') // decline a booking
        .then(() => {
          props.toggleUpdateBooking(false)();
        })
    } else {
      props.changeRequestStatus(props.updateBooking.requestId, 5, reason.label || 'Other') // cancel a booking
        .then(() => {
          toggleSuccess(true);
        })
    }
  }

  const onBrowseStars = () => {
    props.history.push('/browse-stars');
    props.toggleUpdateBooking(false)();
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
        {
          !showSuccess ?
            <React.Fragment>
              <PopupHeading className='heading'>
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
                  <PrimaryButton className='secondary-btn' secondary onClick={props.toggleUpdateBooking(false)}>Continue with booking</PrimaryButton>        
              }
            </React.Fragment>
          :
            <React.Fragment>
              <PopupHeading className='heading'>
                Your booking has been cancelled
              </PopupHeading>
              <PrimaryButton onClick={onBrowseStars}>Browse Stars</PrimaryButton>
              <PrimaryButton className='secondary-btn' secondary onClick={props.toggleUpdateBooking(false)}>View open orders</PrimaryButton>        
            </React.Fragment>
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
  history: PropTypes.object.isRequired,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateBooking));

