import React from 'react';
import OrderStyled from './styled';

const OrderDetailsItem = props => (
  <React.Fragment>
    {
      props.value && props.value !== '' ?
        <OrderStyled.DetailsItem>
          <OrderStyled.DetailsTitle>{props.title} :</OrderStyled.DetailsTitle>
          <OrderStyled.DetailsValue>{props.value}</OrderStyled.DetailsValue>
        </OrderStyled.DetailsItem>
      : null
    }
  </React.Fragment>
);

export default OrderDetailsItem;
