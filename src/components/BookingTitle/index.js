import React from 'react';
import PropTypes from 'prop-types';
import { requestTypes } from '../../constants/requestTypes';
import { MediumText, HeadingBold } from './styled';

const BookingTitle = ({ requestData, secondary }) => {
  if (requestTypes[requestData.request_type] === 'Q&A') {
    return (
      <MediumText secondary={secondary}>
        <HeadingBold>Answer</HeadingBold> to question for <HeadingBold>{requestData.fan}</HeadingBold>
      </MediumText>
    )
  } else if (requestTypes[requestData.request_type] === 'Shout-out') {
    return (
      <MediumText secondary={secondary}>
        <HeadingBold>{requestData.occasion}</HeadingBold> shoutout for <HeadingBold>{requestData.fan}</HeadingBold>
      </MediumText>
    )
  }
  return (
    <MediumText secondary={secondary}>
      <HeadingBold>{requestData.occasion}</HeadingBold> announcement for <HeadingBold>{requestData.fan}</HeadingBold>
    </MediumText>
  )
}

BookingTitle.defaultProps = {
  requestData: {},
  secondary: false,
}

BookingTitle.propTypes = {
  requestData: PropTypes.object,
  secondary: PropTypes.bool,
}

export default BookingTitle;
