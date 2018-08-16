import React from 'react';
import DollarStyled from './styled';

const Dollar = props => (
  <DollarStyled {...props}>
    <DollarStyled.Symbol>$</DollarStyled.Symbol>
    <DollarStyled.Amount>{props.amount && props.amount.toLocaleString('en-US', { maximumFractionDigits: 2 })}</DollarStyled.Amount>
  </DollarStyled>
);

export default Dollar;
