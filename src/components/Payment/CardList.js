import React, { useState } from 'react';
import { Ul, Li } from './CardList.styles';

const CardList = ({ CardList, getCardSelected }) => {
  const [selected, getSelected] = useState('');
  const cardSelected = (card) => {
    getSelected(card);
    getCardSelected(card);
  };

  return (
    <Ul>
      {CardList.map((card) => {
        return (
          <Li
            icon="default-icon"
            className={selected.number === card.number && 'selected'}
            key={card.number}
            onClick={() => cardSelected(card)}
          >
            <span className="brand">Use</span>
            <span className="cardNo">{card.number}</span>
          </Li>
        );
      })}
    </Ul>
  );
};

export default CardList;
