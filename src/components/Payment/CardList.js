import React from 'react';
import { Ul, Li } from './CardList.styles';

const CardList = () => {
  return (
    <Ul>
      <Li icon="default-icon">
        <span className="brand">Use</span>
        <span className="cardNo">**** **** **** 4242</span>
      </Li>
    </Ul>
  );
};

export default CardList;
