import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import MoreActions from '../MoreActions';
import PrimaryButton from '../PrimaryButton';
import StarRating from '../StarRating';
import { getTime } from '../../utils/dataToStringFormatter';
import CommentStyled from './styled';

const CommentItem = (props) => {

  const onReactionClick = () => {
    props.onReactionClick(props.commentDetails.reaction_file_url, props.commentDetails.reaction_thumbnail_url,  props.commentDetails.file_type);
  }

  const renderComment = () => {
    const { type } = props;
    if (type === 'reaction')  {
      return (
        <span className='comment reaction'>
          <span>
            <span className='text-description'>Reaction recorded:</span>
            <span className="text-bold">{moment.utc(props.commentDetails.created_date).format('MMM Do YYYY')}</span>
          </span>
          <PrimaryButton className='action-button' onClick={onReactionClick}>Play</PrimaryButton>
        </span>
      )
    } else if (type === 'tip') {
      return (
        <span className='comment tip'>
          <span className='title'>{props.user} tipped you</span>
          <span className="text-bold">${props.commentDetails.amount}</span>
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
        {props.commentDetails.comments}
      </span>
    )
  }

  const getUserImage = () => {
    if (props.type === 'comment') {
      return props.commentDetails.user && props.commentDetails.user.image_url
    }
    return props.commentDetails.user_image_url;
  }

  return (
    <CommentStyled>
      <CommentStyled.Container>
        <CommentStyled.ProfileImage profileImage={getUserImage()} />
        <CommentStyled.Comment className={props.classes.comment} receive={props.receive}>
          { renderComment() }
          <span className='comment-footer'>
            <span className='time'>{getTime(props.time)}</span>
            {
              !props.disableAction &&
                <MoreActions
                  classes={{ root: 'more-action-root', icon: 'more-action-icon' }}
                  options={[{
                    label: 'Hide from profile',
                    value: 'hide',
                  }]}
                  // onSelectOption={onSelectAction}
                />
            }
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
  disableAction: false,
  onReactionClick: () => {},
  commentDetails: {},
}

CommentItem.propTypes = {
  type: PropTypes.string,
  receive: PropTypes.bool,
  classes: PropTypes.object,
  user: PropTypes.string,
  time: PropTypes.Date,
  disableAction: PropTypes.bool,
  commentDetails: PropTypes.object,
  onReactionClick: PropTypes.func,
}

export default CommentItem;
