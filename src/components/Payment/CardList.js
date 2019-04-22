import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Ul, Li } from './CardList.styles';

const CardList = ({ Cards, getCardSelected }) => {
  const [selected, getSelected] = useState('');
  const cardSelected = (card) => {
    getSelected(card);
    getCardSelected(card);
  };

  return (
    <Ul>
      {Object.keys(Cards).map((cardIndex) => {
        return (
          <Li
            icon="default-icon"
            className={
              selected.last4 === Cards[cardIndex].last4 && 'selected'
            }
            key={Cards[cardIndex].last4 + cardIndex}
            onClick={() => cardSelected(Cards[cardIndex])}
          >
            <span className="brand">Use</span>
            <span className="cardNo">
              **** **** **** {Cards[cardIndex].last4}
            </span>
          </Li>
        );
      })}
    </Ul>
  );
};

CardList.propTypes = {
  getCardSelected: PropTypes.func.isRequired,
  Cards: PropTypes.object.isRequired,
};
CardList.defaultProps = {};

export default CardList;
