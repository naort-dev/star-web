import React from 'react';
import { Ul, Li } from './CardList.styles';

const CardList = ({ CardList }) => {
  return (
    <Ul>
      {CardList.map((card) => {
        return (
          <Li icon="default-icon" key={card.number}>
            <span className="brand">Use</span>
            <span className="cardNo">{card.number}</span>
          </Li>
        );
      })}
    </Ul>
  );
};

export default CardList;
