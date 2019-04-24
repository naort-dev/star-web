import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { Ul, Li } from './CardList.styles';
import fetchEphemeralKey from '../../services/generateEmphemeralKey';

const CardList = (props) => {
  const [selected, getSelected] = useState('');
  const cardSelected = (card, cardIndex) => {
    getSelected(cardIndex);
    props.getCardSelected(card);
  };

  const deleteCardAction = (sourceId, customerId) => {
    props.deleteCard(sourceId, customerId, false);
  };

  const getEphemeralKey = (sourceId) => {
    props.loaderAction(true);
    fetchEphemeralKey()
      .then((resp) => {
        if (resp.success) {
          const customerId =
            resp.data.ephemeralKey.associated_objects &&
            resp.data.ephemeralKey.associated_objects[0]
              ? resp.data.ephemeralKey.associated_objects[0].id
              : null;
          props.updateCustomerId(customerId);
          deleteCardAction(sourceId, customerId);
        }
      })
      .catch((error) => {
        props.loaderAction(false);
      });
  };

  const removeCard = (card, event) => {
    event.stopPropagation();
    if (props.customerId !== null) {
      deleteCardAction(card.id, props.customerId);
    } else {
      getEphemeralKey(card.id);
    }
  };

  return (
    <Ul>
      {Object.keys(props.Cards).map((cardIndex) => {
        return (
          <Li
            icon="default-icon"
            className={selected === cardIndex && 'selected'}
            key={props.Cards[cardIndex].last4 + cardIndex}
            onClick={() => cardSelected(props.Cards[cardIndex], cardIndex)}
          >
            <span className="brand">Use</span>
            <span className="cardNo">
              **** **** **** {props.Cards[cardIndex].last4}
            </span>
            <FontAwesomeIcon
              icon={faTimes}
              onClick={(event) => removeCard(props.Cards[cardIndex], event)}
              className="closeBtn"
            />
          </Li>
        );
      })}
    </Ul>
  );
};

CardList.propTypes = {
  getCardSelected: PropTypes.func.isRequired,
  Cards: PropTypes.object.isRequired,
  deleteCard: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateCustomerId: PropTypes.func.isRequired,
  customerId: PropTypes.string,
};
CardList.defaultProps = {
  customerId: null,
};

export default connect(
  (state) => ({
    customerId: state.commonReducer.customerId,
  }),
  null,
)(CardList);

// "plugin": ["prettier"],
