import React from 'react';
import { CloseButton } from 'styles/CommonStyled';
import Script from '../Script';
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
      {
        bookingData.request_details.booking_statement &&
          <Script script={bookingData.request_details.booking_statement} />
      }
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
      </OrderStyled.Details>
    </OrderStyled>
  )
}

export default OrderDetails;
