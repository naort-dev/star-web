import React from 'react';
import OrderStyled from './styled';

const OrderDetailsItem = props => (
  <React.Fragment>
    {
      props.value && props.value !== '' ?
        <OrderStyled.DetailsItem overlay={props.overlay} bold={props.bold}>
          <OrderStyled.DetailsTitle overlay={props.overlay} bold={props.bold}>{props.title}</OrderStyled.DetailsTitle>
          <OrderStyled.DetailsValue overlay={props.overlay} bold={props.bold}>{props.value}</OrderStyled.DetailsValue>
        </OrderStyled.DetailsItem>
      : null
    }
  </React.Fragment>
);

export default OrderDetailsItem;
