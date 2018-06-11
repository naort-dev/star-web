import React from 'react';
import FooterDiv from './styled';


export const RequestController = props => (
  <FooterDiv>
    <FooterDiv.BookingLeft>
      <strong>100</strong> Left
    </FooterDiv.BookingLeft>
    <FooterDiv.BookingPrice>
      <strong>${props.rate}</strong>
    </FooterDiv.BookingPrice>
    <FooterDiv.Button>Request a Video</FooterDiv.Button>
  </FooterDiv>
);
