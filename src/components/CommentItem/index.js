import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PrimaryButton from '../PrimaryButton';
import StarRating from '../StarRating';
import { getTime } from '../../utils/dataToStringFormatter';
import CommentStyled from './styled';

const CommentItem = (props) => {

  const renderComment = () => {
    const { type } = props;
    if (type === 'reaction')  {
      return (
        <span className='comment reaction'>
          <span>
            <span className='text-description'>Reaction recorded:</span>
            <span className="text-bold">{moment.utc(props.commentDetails.created_date).format('MMM Do YYYY')}</span>
          </span>
          <PrimaryButton className='action-button'>Play Now</PrimaryButton>
        </span>
      )
    } else if (type === 'tip') {
      return (
        <span className='comment tip'>
          <span className='title'>{props.user} tipped you</span>
          <span className="text-bold">$100</span>
        </span>
      )
    } else if (type === 'rating') {
      return (
        <span className='comment tip'>
          <span className='title'>{props.user} rated you</span>
          <span className='rating'>
            <StarRating rating={props.commentDetails.fan_rate} readOnly />
          </span>
        </span>
      )
    }
    return (
      <span className='comment'>
        <span className="text-bold user-name">{props.user}</span>
        This is amazing ... I adore PG. How did you get this done??
      </span>
    )
  }

  return (
    <CommentStyled>
      <CommentStyled.Container>
        <CommentStyled.ProfileImage profileImage={props.commentDetails.user_image_url} />
        <CommentStyled.Comment className={props.classes.comment} receive={props.receive}>
          { renderComment() }
          <span className='comment-footer'>
            <span className='time'>{getTime(props.time)}</span>
            {/* <span className='action'>action</span> */}
          </span>
        </CommentStyled.Comment>
      </CommentStyled.Container>
    </CommentStyled>
  )
}

CommentItem.defaultProps = {
  type: '',
  receive: '',
  classes: {},
  user: '',
  time: new Date(),
  commentDetails: {},
}

CommentItem.propTypes = {
  type: PropTypes.string,
  receive: PropTypes.bool,
  classes: PropTypes.object,
  user: PropTypes.string,
  time: PropTypes.Date,
  commentDetails: PropTypes.object,
}

export default CommentItem;
