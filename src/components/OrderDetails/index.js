import React from 'react';
import PropTypes from 'prop-types';
import { CloseButton } from 'styles/CommonStyled';
import Script from '../Script';
import PrimaryButton from '../PrimaryButton';
import { requestTypes } from '../../constants/requestTypes';
import OrderStyled from './styled';

const OrderDetails = (props) => {

  const { bookingData } = props;

  const renderHeading = () => {
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
        <strong>Birthday</strong>&nbsp;
          {requestTypes[bookingData.request_type] === 'Shout-out' ? 'shoutout' : 'announcement'} for&nbsp; 
          <strong>
            { bookingData.request_details && bookingData.request_details.stargramto !== 'Myself' ? bookingData.request_details.stargramto : bookingData.fan }
          </strong>
          {
            bookingData.request_details && bookingData.request_details.stargramto !== 'Myself' ?
              <React.Fragment>
                &nbsp;from <strong>{bookingData.request_details.stargramto}</strong>
              </React.Fragment>
            : null
          }
      </React.Fragment>
    )
  }

  return (
    <OrderStyled>
      <CloseButton onClick={props.closeModal} />
      <OrderStyled.HeaderText>
        {renderHeading()}
      </OrderStyled.HeaderText>
      <OrderStyled.Heading>
        Order Details
      </OrderStyled.Heading>
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
            <span className='detail-value'>March 22, 2019</span>
          </li>
          <li className='detail-item'>
            <span className='detail-title'>Paid:</span>
            <span className='detail-value'>$150.00</span>
          </li>
          <li className='detail-item'>
            <span className='detail-title'>Recorded:</span>
            <span className='detail-value'>March 22, 2019</span>
          </li>
        </OrderStyled.DetailList>
        <PrimaryButton onClick={props.onPrimaryClick}>Back to Video</PrimaryButton>
      </OrderStyled.Details>
    </OrderStyled>
  )
}

OrderDetails.propTypes = {
  bookingData: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  onPrimaryClick: PropTypes.func.isRequired,
}

export default OrderDetails;
