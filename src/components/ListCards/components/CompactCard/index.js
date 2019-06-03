import React from 'react';
import { BoldTextM } from '../../styled';
import { TickText } from 'styles/CommonStyled';
import CompactStyled from './styled';

const CompactCard = (props) => {
  return (
    <CompactStyled selected={props.selected}>
      <BoldTextM>Birthday shoutout for</BoldTextM>
      <CompactStyled.UserName>Sarah</CompactStyled.UserName>
      <CompactStyled.DetailsWrapper>
        <TickText className='tick-text'>To Do</TickText>
        <span className='time-text'>Requested 4 days ago</span>
      </CompactStyled.DetailsWrapper>
    </CompactStyled>
  )
}

export { CompactCard };
