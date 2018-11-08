import React from 'react';
import AlertStyled from './styled';

const AlertPopup = props => (
  <AlertStyled>
    <AlertStyled.Header>{props.title}</AlertStyled.Header>
    <AlertStyled.ReasonsWrapper>
      {props.message}
    </AlertStyled.ReasonsWrapper>
    <AlertStyled.ConfirmButtonWrapper>
      <AlertStyled.ConfirmButton onClick={() => props.closePopup()}>OK</AlertStyled.ConfirmButton>
    </AlertStyled.ConfirmButtonWrapper>
  </AlertStyled>
);

export default AlertPopup;
