import React from 'react';
import FooterDiv from './styled';


export const RequestController = () => (
  <FooterDiv>
    <FooterDiv.BookingLeft>
      <strong>100</strong> Left
    </FooterDiv.BookingLeft>
    <FooterDiv.BookingPrice>
      <strong>$250</strong>
    </FooterDiv.BookingPrice>
    <FooterDiv.Button>Request a Video</FooterDiv.Button>
  </FooterDiv>
);
