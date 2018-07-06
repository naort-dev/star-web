import React from 'react';
import { Link } from 'react-router-dom';
import FooterDiv from './styled';


export const PaymentFooterController = props => (
  <FooterDiv>
    <FooterDiv.BookingLeft>
      <strong>{props.remainingBookings}</strong> {props.remainingBookings === '1' ? 'Booking Left' : 'Bookings Left'}
    </FooterDiv.BookingLeft>
    <FooterDiv.BookingPrice>
      <strong>${props.rate}</strong>
    </FooterDiv.BookingPrice>
    <FooterDiv.Button onClick={props.handleBooking}>{props.buttonName}</FooterDiv.Button>
  </FooterDiv>
);
