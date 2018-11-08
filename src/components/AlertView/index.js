import React from 'react';
import AlertStyled from './styled';

const AlertPopup = props => (
  <AlertStyled.PopupWrapper>
    <AlertStyled.PopupHeader>{props.title}</AlertStyled.PopupHeader>
    <AlertStyled.ReasonsWrapper>
      {props.message}
    </AlertStyled.ReasonsWrapper>
    <AlertStyled.ConfirmButtonWrapper>
      <AlertStyled.ConfirmButton onClick={() => props.closePopup()}>OK</AlertStyled.ConfirmButton>
    </AlertStyled.ConfirmButtonWrapper>
  </AlertStyled.PopupWrapper>
);

export default AlertPopup;
