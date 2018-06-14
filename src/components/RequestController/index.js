import React from 'react';
import { Link } from 'react-router-dom';
import FooterDiv from './styled';


export const RequestController = props => (
  <FooterDiv>
    <FooterDiv.BookingLeft>
      <strong>${props.remainingBookings}</strong> Left
    </FooterDiv.BookingLeft>
    <FooterDiv.BookingPrice>
      <strong>${props.rate}</strong>
    </FooterDiv.BookingPrice>
    <Link to="/starsignup">
      <FooterDiv.Button>Request a Video</FooterDiv.Button>
    </Link>
  </FooterDiv>
);
