import React from 'react';
import OrderStyled from './styled';

const AlertPopup = props => (
  <OrderStyled.PopupWrapper>
    <OrderStyled.PopupHeader>{props.title}</OrderStyled.PopupHeader>
    <OrderStyled.ReasonsWrapper>
      {props.message}
    </OrderStyled.ReasonsWrapper>
    <OrderStyled.ConfirmButtonWrapper>
      <OrderStyled.ConfirmButton onClick={() => props.closePopup()}>OK</OrderStyled.ConfirmButton>
    </OrderStyled.ConfirmButtonWrapper>
  </OrderStyled.PopupWrapper>
);

export default AlertPopup;
