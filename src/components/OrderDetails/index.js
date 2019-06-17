import React from 'react';
import {connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { CloseButton } from 'styles/CommonStyled';
import Script from '../Script';
import PrimaryButton from '../PrimaryButton';
import { toggleUpdateBooking } from '../../store/shared/actions/toggleModals';
import { requestTypes } from '../../constants/requestTypes';
import OrderStyled from './styled';

const OrderDetails = (props) => {

  const { bookingData } = props;

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

  return (
    <OrderStyled>
      {
        !props.disableHeader &&
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
      <OrderStyled.Details>
        <OrderStyled.DetailList>
          <li className='detail-item'>
            <span className='detail-title'>Purchased:</span>
            <span className='detail-value'>{moment.utc(bookingData.created_date).format('MMM Do YYYY')}</span>
          </li>
          <li className='detail-item'>
            <span className='detail-title'>Paid:</span>
            <span className='detail-value'>${bookingData.order_details.amount}</span>
          </li>
          <li className='detail-item'>
            <span className='detail-title'>Recorded:</span>
            <span className='detail-value'>March 22, 2019</span>
          </li>
          <li className='detail-item'>
            <span className='detail-title'>Order #:</span>
            <span className='detail-value'>{bookingData.order_details.order}</span>
          </li>
        </OrderStyled.DetailList>
        <PrimaryButton className="star-action-btn" onClick={props.onPrimaryClick}>Back to Video</PrimaryButton>
      </OrderStyled.Details>
    </OrderStyled>
  )
}

OrderDetails.defaultProps = {
  disableHeader: true,
}

OrderDetails.propTypes = {
  bookingData: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  onPrimaryClick: PropTypes.func.isRequired,
  disableHeader: PropTypes.bool,
  toggleUpdateBooking: PropTypes.func.isRequired,
  starMode: PropTypes.bool.isRequired,
}

const mapDispatchToProps = dispatch => ({
  toggleUpdateBooking: (state, requestId, mode) => dispatch(toggleUpdateBooking(state, requestId, mode))
})

export default connect(null, mapDispatchToProps)(OrderDetails);
