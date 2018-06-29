import React from 'react';
import { Request } from './styled';

export const RequestVideoOption = props => (
  <Request>
    <Request.HeaderText>
      What kind of video would you like to request?
    </Request.HeaderText>
    <Request.ButtonWrapper>
      <Request.Button onClick={() => props.optionSelector('ask')}>Ask a Question</Request.Button>
      <Request.Button onClick={() => props.optionSelector('personalized')}>Personalized Shout-Out</Request.Button>
      <Request.Button onClick={() => props.optionSelector('event')}>Event Announcement</Request.Button>
    </Request.ButtonWrapper>    
  </Request>
);
