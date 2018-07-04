import React from 'react';
import { Link } from 'react-router-dom';
import FooterDiv from './styled';


export const PaymentFooterController = props => (
  <FooterDiv>
    <FooterDiv.BookingLeft>
      <strong>{props.remainingBookings}</strong> Left
    </FooterDiv.BookingLeft>
    <FooterDiv.BookingPrice>
      <strong>${props.rate}</strong>
    </FooterDiv.BookingPrice>
    <Link to="/request">
      <FooterDiv.Button>Purchase</FooterDiv.Button>
    </Link> 
  </FooterDiv>
);
