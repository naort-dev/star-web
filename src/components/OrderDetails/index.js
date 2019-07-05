import React, { useState, useEffect } from 'react';
import {connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { CloseButton } from 'styles/CommonStyled';
import Script from '../Script';
import ToolTip from '../ToolTip';
import RequestFlowPopup from '../RequestFlowPopup';
import Checkbox from '../Checkbox';
import PrimaryButton from '../PrimaryButton';
import ModalHeader from '../ModalHeader';
import MoreActions from '../MoreActions';
import { moreOptions } from './constants';
import { updateToast } from '../../store/shared/actions/commonActions';
import { openStatusList, completedStatusList } from '../../constants/requestStatusList';
import { hideVideoFromProfile, makeVideoPrivate } from '../../services/request';
import { findCompletedVideo } from '../../utils/dataformatter';
import BookingTitle from '../BookingTitle';
import { toggleUpdateBooking, toggleContactSupport } from '../../store/shared/actions/toggleModals';
import { requestTypes } from '../../constants/requestTypes';
import OrderStyled from './styled';

const OrderDetails = (props) => {

  const { bookingData, starMode } = props;

  const setIntitialCheckBox = () => {
    if (starMode) {
      return bookingData.video_visibility
    }
    return !bookingData.public_request;
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
                bookingData.fan_first_name
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
            { requestDetails && requestDetails.is_myself !== undefined && !requestDetails.is_myself ? requestDetails.stargramto : bookingData.fan_first_name }
          </strong>
          {
            requestDetails && requestDetails.is_myself !== undefined && !requestDetails.is_myself ?
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

  const onSelectAction = (option) => {
    if (option.value === 'cancel') {
      props.toggleUpdateBooking(true, bookingData.booking_id, false, bookingData);
    } else if(option.value === 'contact') {
      props.toggleContactSupport(true);
    }
  }

  const onCheckBoxChange = async (check) => {
    let hideResponse;
    const prevCheck = checkBox;
    setCheckBox(check);
    try {
      if (starMode) {
        const completedVideo = findCompletedVideo(bookingData);
        hideResponse = await hideVideoFromProfile(completedVideo.video_id);
      } else {
        hideResponse = await makeVideoPrivate(bookingData.booking_id, check);
        props.onCheckboxChange(!check)
      }
    }
    catch(e) {
      setCheckBox(prevCheck);
      props.updateToast({
        value: true,
        message: 'Something went wrong',
        variant: 'error',
      })
    }
  }

  const modalProps = props.isModal ? {
    disableClose: !starMode,
    noPadding: !starMode,
    closePopUp: props.closeModal,
  } : {}

  const WrapperComponent = props.isModal ? 
    RequestFlowPopup : React.Fragment
  return (
    <WrapperComponent {...modalProps}>
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
              <OrderStyled.Heading starMode={starMode}>
                Order Details
              </OrderStyled.Heading>
            </React.Fragment>
        }
        <OrderStyled.ScriptWrapper isMoreActions={!starMode && (requestType === 'open' || requestType === 'cancelled')}>
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
          {
            !starMode && (requestType === 'open' || requestType === 'cancelled') &&
              <MoreActions
                classes={{ root: 'more-action-root', icon: 'more-action-icon' }}
                options={moreOptions[requestType]}
                onSelectOption={onSelectAction}
              />
          }
        </OrderStyled.ScriptWrapper>
        {
          requestType !== 'cancelled' &&
            <OrderStyled.ColumnCenter>
              <Checkbox checked={checkBox} onChange={onCheckBoxChange} />
              <span className="check-text ">
                {
                  starMode ?
                    'Hide from profile'
                  :
                    <ToolTip title='This restricts the Star and Starsona from sharing this video with other fans, however you can still share it as much as you like. '>
                      <span>Make my video private!</span>
                    </ToolTip>
                }
              </span>
            </OrderStyled.ColumnCenter>
        }
        <OrderStyled.Details starMode={props.starMode}>
          <OrderStyled.DetailList>
            <li className='detail-item'>
              <span className='detail-title'>Purchased:</span>
              <span className='detail-value'>{moment.utc(bookingData.created_date).format('MMM Do YYYY')}</span>
            </li>
            <li className='detail-item'>
              <span className='detail-title'>Paid:</span>
              <ToolTip title={requestType === 'open' ? 'This amount was reserved on your card but will not be charged until your video is completed.' : ''}>
                <span className='detail-value'>{ requestType === 'cancelled' ? '$0.00' : `$${bookingData.order_details.amount}`}</span>
              </ToolTip>
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
                    <ToolTip title='Please note that your credit card was not charged for this cancelled request.'>
                      <span className='detail-comment'>{bookingData.comment}</span>
                    </ToolTip>
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
                  requestType === 'completed' && props.starMode &&
                    <PrimaryButton className="star-action-btn" onClick={props.onPrimaryClick}>Back to Video</PrimaryButton>
                }
                {/* {
                  requestType === 'open' &&
                    <OrderStyled.TextButton>Make changes</OrderStyled.TextButton>
                } */}
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
  starMode: false,
  onCheckboxChange: () => {},
  onPrimaryClick: () => {},
}

OrderDetails.propTypes = {
  bookingData: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  onPrimaryClick: PropTypes.func,
  disableHeader: PropTypes.bool,
  toggleUpdateBooking: PropTypes.func.isRequired,
  toggleContactSupport: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  starMode: PropTypes.bool,
  disableFooter: PropTypes.bool,
  onCheckboxChange: PropTypes.func,
  isModal: PropTypes.bool,
}

const mapDispatchToProps = dispatch => ({
  toggleUpdateBooking: (state, requestId, mode, requestData) => dispatch(toggleUpdateBooking(state, requestId, mode, requestData)),
  toggleContactSupport: state => dispatch(toggleContactSupport(state)),
  updateToast: errorObject => dispatch(updateToast(errorObject)),
})

export default connect(null, mapDispatchToProps)(OrderDetails);
