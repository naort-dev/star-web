import React from 'react';
import PropTypes from 'prop-types';
import PrimaryButton from '../PrimaryButton';
import StarRating from '../StarRating';
import CommentStyled from './styled';

const CommentItem = (props) => {

  const renderComment = () => {
    const { type } = props;
    if (type === 'reaction')  {
      return (
        <span className='comment reaction'>
          <span>
            <span className='text-description'>Reaction recorded:</span>
            <span className="text-bold">March 24th</span>
          </span>
          <PrimaryButton className='action-button'>Play Now</PrimaryButton>
        </span>
      )
    } else if (type === 'tip') {
      return (
        <span className='comment tip'>
          <span className='title'>Susan tipped you</span>
          <span className="text-bold">$100</span>
        </span>
      )
    } else if (type === 'rate') {
      return (
        <span className='comment tip'>
          <span className='title'>Susan rated you</span>
          <span className='rating'>
            <StarRating rating="4" readOnly />
          </span>
        </span>
      )
    }
    return (
      <span className='comment'>
        <span className="text-bold user-name">Susan</span>
        This is amazing ... I adore PG. How did you get this done??
      </span>
    )
  }

  return (
    <CommentStyled>
      <CommentStyled.Container>
        <CommentStyled.ProfileImage />
        <CommentStyled.Comment receive={props.receive}>
          { renderComment() }
          <span className='comment-footer'>
            <span className='time'>7 hours</span>
            <span className='action'>action</span>
          </span>
        </CommentStyled.Comment>
      </CommentStyled.Container>
    </CommentStyled>
  )
}

CommentItem.defaultProps = {
  type: '',
  receive: '',
}

CommentItem.propTypes = {
  type: PropTypes.string,
  receive: PropTypes.bool,
}

export default CommentItem;
