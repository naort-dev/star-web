import React from 'react';
import { Link } from 'react-router-dom';
import FooterDiv from './styled';


export const RequestController = props => (
  <FooterDiv>
    <FooterDiv.BookingLeft>
      <strong>100</strong> Left
    </FooterDiv.BookingLeft>
    <FooterDiv.BookingPrice>
      <strong>${props.rate}</strong>
    </FooterDiv.BookingPrice>
   
    <FooterDiv.Button onClick={() => props.showPopup()}>Request a Video</FooterDiv.Button>
   
  </FooterDiv>
);
