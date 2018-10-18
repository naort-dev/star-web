import React from 'react';
import OrderStyled from './styled';

const OrderDetailsItem = props => (
  <React.Fragment>
    {
      props.value && props.value !== '' ?
        <OrderStyled.DetailsItem overlay={props.overlay}>
          <OrderStyled.DetailsTitle overlay={props.overlay}>{props.title}</OrderStyled.DetailsTitle>
          <OrderStyled.DetailsValue overlay={props.overlay}>{props.value}</OrderStyled.DetailsValue>
        </OrderStyled.DetailsItem>
      : null
    }
  </React.Fragment>
);

export default OrderDetailsItem;
