import React from 'react';
import { Request } from './styled';

export const RequestVideoOption = () => (
  <Request>
    <Request.HeaderText>
      What kind of video would you like to request?
    </Request.HeaderText>
    <Request.ButtonWrapper>
      <Request.Button>Ask a Question</Request.Button>
      <Request.Button>Personalized Shout-Out</Request.Button>
      <Request.Button>Event Announcement</Request.Button>
    </Request.ButtonWrapper>    
  </Request>
);
