import React, { useState, useEffect } from 'react';
import {connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { CloseButton } from 'styles/CommonStyled';
import Script from '../Script';
import RequestFlowPopup from '../RequestFlowPopup';
import Checkbox from '../Checkbox';
import PrimaryButton from '../PrimaryButton';
import ModalHeader from '../ModalHeader';
import { openStatusList, completedStatusList } from '../../constants/requestStatusList';
import { hideVideoFromProfile } from '../../services/request';
import { findCompletedVideo } from '../../utils/dataformatter';
import BookingTitle from '../BookingTitle';
import { toggleUpdateBooking } from '../../store/shared/actions/toggleModals';
import { requestTypes } from '../../constants/requestTypes';
import OrderStyled from './styled';

const OrderDetails = (props) => {

  const { bookingData, starMode } = props;

  const setIntitialCheckBox = () => {
    if (starMode) {
      return bookingData.video_visibility
    }
    return false;
  }
  const [requestType, updateRequestType] = useState('');
  const [checkBox, setCheckBox] = useState(setIntitialCheckBox());

  const renderHeading = () => {
    const requestDetails = bookingData.request_details;
    if (requestTypes[bookingData.request_type] === 'Q&A') {
      return (
        <React.Fragment>
            <strong>Question</strong>&nbsp;
            from&nbsp;
            <strong>
              {
                bookingData.fan
              }
            </strong>
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        <strong>{bookingData.occasion}</strong>&nbsp;
          {requestTypes[bookingData.request_type] === 'Shout-out' ? 'shoutout' : 'announcement'} for&nbsp; 
          <strong>
            { requestDetails && !requestDetails.is_myself ? requestDetails.stargramto : bookingData.fan }
          </strong>
          {
            requestDetails && !requestDetails.is_myself ?
              <React.Fragment>
                &nbsp;from <strong>{requestDetails.stargramto}</strong>
              </React.Fragment>
            : null
          }
      </React.Fragment>
    )
  }

  useEffect(() => {
    if (openStatusList.indexOf(bookingData.request_status) >= 0) {
      updateRequestType('open');
    } else if (completedStatusList.indexOf(bookingData.request_status) >= 0) {
      updateRequestType('completed');
    } else {
      updateRequestType('cancelled');
    }
  }, [])

  const onCheckBoxChange = async (check) => {
    const completedVideo = findCompletedVideo(bookingData);
    const hideResponse = await hideVideoFromProfile(completedVideo.video_id);
    console.log(hideResponse)
    setCheckBox(check);
  }

  const WrapperComponent = props.isModal ? 
    RequestFlowPopup : React.Fragment

  return (
    <WrapperComponent disableClose={!starMode} noPadding={!starMode} closePopUp={props.closeModal}>
      {
        !starMode && props.isModal &&
          <ModalHeader
            starImage={bookingData.avatar_photo && bookingData.avatar_photo.thumbnail_url}
            closeHandler={props.closeModal}
            customHeading={<BookingTitle secondary requestData={bookingData} />}
          />
      }
      <OrderStyled>
        {
          !props.disableHeader && starMode &&
            <React.Fragment>
              <CloseButton onClick={props.closeModal} />
              <OrderStyled.HeaderText>
                {renderHeading()}
              </OrderStyled.HeaderText>
              <OrderStyled.Heading>
                Order Details
              </OrderStyled.Heading>
            </React.Fragment>
        }
        <OrderStyled.ScriptWrapper>
          {
            bookingData.request_details.booking_statement &&
              <Script script={bookingData.request_details.booking_statement} />
          }
          <span className='additional-info'>
            <span className='info-item title'>Additional information:</span>
            <span className='info-item value'>
              {
                bookingData.request_details.important_info || 'None'
              }
            </span>
          </span>
        </OrderStyled.ScriptWrapper>
        {
          requestType === 'completed' &&
            <OrderStyled.ColumnCenter>
              <Checkbox checked={checkBox} onChange={onCheckBoxChange} />
              <span className="check-text ">{ starMode ? 'Hide from profile' : 'Make my video private!' }</span>
            </OrderStyled.ColumnCenter>
        }
        <OrderStyled.Details>
          <OrderStyled.DetailList>
            <li className='detail-item'>
              <span className='detail-title'>Purchased:</span>
              <span className='detail-value'>{moment.utc(bookingData.created_date).format('MMM Do YYYY')}</span>
            </li>
            <li className='detail-item'>
              <span className='detail-title'>Paid:</span>
              <span className='detail-value'>{ requestType === 'cancelled' ? '$0.00' : `$${bookingData.order_details.amount}`}</span>
            </li>
            <li className='detail-item'>
              <span className='detail-title'>Recorded:</span>
              <span className='detail-value'>
                {
                  requestType === 'open' &&
                    'The star has 7 days to complete your booking.'
                }
                { requestType === 'cancelled' && 'CANCELLED'}
                { requestType === 'completed' && moment.utc(bookingData.video_created_date).format('MMM Do YYYY')}
                {
                  requestType === 'cancelled' &&
                    <span className='detail-comment'>{bookingData.comment}</span>
                }
              </span>
            </li>
            <li className='detail-item'>
              <span className='detail-title'>Order #:</span>
              <span className='detail-value'>{bookingData.order_details.order}</span>
            </li>
          </OrderStyled.DetailList>
          {
            !props.disableFooter &&
              <React.Fragment>
                {
                  requestType === 'completed' &&
                    <PrimaryButton className="star-action-btn" onClick={props.onPrimaryClick}>Back to Video</PrimaryButton>
                }
                {
                  requestType === 'open' &&
                    <OrderStyled.TextButton>Make changes</OrderStyled.TextButton>
                }
              </React.Fragment>
          }
        </OrderStyled.Details>
      </OrderStyled>
    </WrapperComponent>
  )
}

OrderDetails.defaultProps = {
  disableHeader: false,
  disableFooter: false,
  isModal: false,
  onPrimaryClick: () => {},
}

OrderDetails.propTypes = {
  bookingData: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  onPrimaryClick: PropTypes.func,
  disableHeader: PropTypes.bool,
  toggleUpdateBooking: PropTypes.func.isRequired,
  starMode: PropTypes.bool.isRequired,
  disableFooter: PropTypes.bool,
  isModal: PropTypes.bool,
}

const mapDispatchToProps = dispatch => ({
  toggleUpdateBooking: (state, requestId, mode) => dispatch(toggleUpdateBooking(state, requestId, mode))
})

export default connect(null, mapDispatchToProps)(OrderDetails);
