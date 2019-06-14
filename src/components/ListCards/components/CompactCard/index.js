import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { TickText } from 'styles/CommonStyled';
import { requestTypes } from '../../../../constants/requestTypes';
import { BoldTextM } from '../../styled';
import { getTime } from '../../../../utils/dataToStringFormatter';
import CompactStyled from './styled';

const CompactCard = props => {
  const { bookData } = props;

  const renderTitle = () => {
    if (requestTypes[bookData.request_type] === 'Q&A') {
      return <BoldTextM>Question from</BoldTextM>;
    } else if (requestTypes[bookData.request_type] === 'Shout-out') {
      return <BoldTextM>{bookData.occasion} shoutout for</BoldTextM>;
    }
    return <BoldTextM>{bookData.occasion} announcement for</BoldTextM>;
  };

  const renderTime = time => {
    const actualTimeObject = moment();
    const currentTimeObject = moment
      .utc(time)
      .add(parseInt(props.expiration, 0), 'days');
    const timeDifference = currentTimeObject.diff(actualTimeObject, 'hours');
    if (timeDifference > 48) {
      // does not expires in 48 hours
      return <span className="time">{getTime(time)}</span>;
    }
    return <span className="time expiring">Expiring soon</span>;
  };

  return (
    <CompactStyled
      selected={props.selected}
      onClick={props.onClick}
      key={props.keyValue}
      initialSelected={props.initialSelected}
    >
      {renderTitle()}
      <CompactStyled.UserName>{bookData.fan}</CompactStyled.UserName>
      <CompactStyled.DetailsWrapper>
        <TickText className="tick-text">To Do</TickText>
        <span className="time-text">{renderTime(bookData.created_date)}</span>
      </CompactStyled.DetailsWrapper>
    </CompactStyled>
  );
};

CompactCard.propTypes = {
  bookdata: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  expiration: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  initialSelected: PropTypes.bool.isRequired,
};

export { CompactCard };
