import React from 'react';
import { Link } from 'react-router-dom';
import FooterDiv from './styled';


export const PaymentFooterController = props => (
  <FooterDiv singleButton={!props.modifyButtonName}>
    {
      props.buttonMode ?
        props.modifyButtonName && <FooterDiv.Button onClick={props.modifyBooking}>{props.modifyButtonName}</FooterDiv.Button>
      :
        <React.Fragment>
          <FooterDiv.BookingLeft>
            <strong>{props.remainingBookings}</strong> {props.remainingBookings === '1' ? 'Booking Left' : 'Bookings Left'}
          </FooterDiv.BookingLeft>
          <FooterDiv.BookingPrice>
            <strong>${props.rate}</strong>
          </FooterDiv.BookingPrice>
        </React.Fragment>
    }
    <FooterDiv.Button disabled={props.disabled} onClick={props.handleBooking}>{props.buttonName}</FooterDiv.Button>
  </FooterDiv>
);
