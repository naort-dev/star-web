import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import MoreActions from '../MoreActions';
import PrimaryButton from '../PrimaryButton';
import StarRating from '../StarRating';
import { getTime } from '../../utils/dataToStringFormatter';
import { toggleActivityVisibility } from '../../store/shared/actions/getActivities';
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

  const onSelectAction = (optionItem) => {
    if (optionItem.value === 'toggleVisiblity') {
      props.toggleActivityVisibility(props.activityId);
    }
  }

  return (
    <CommentStyled>
      <CommentStyled.Container receive={props.receive}>
        <CommentStyled.ProfileImage profileImage={getUserImage()} />
        <CommentStyled.Comment
          visible={props.type === 'tip' || props.type === 'rating' || props.visible}
          className={props.classes.comment}
          receive={props.receive}
        >
          { props.type !== 'tip' && props.type !== 'rating' && !props.visible && <span className='hidden-header'>HIDDEN</span> }
          { renderComment() }
          <span className='comment-footer'>
            <span className='time'>{getTime(props.time)}</span>
            {
              !props.disableAction && (props.type === 'reactions' || props.type === 'comment') &&
                <MoreActions
                  classes={{ root: 'more-action-root', icon: 'more-action-icon' }}
                  options={[{
                    label: `${props.visible ? 'Hide from public' : 'Show on public site'}`,
                    value: 'toggleVisiblity',
                  }]}
                  onSelectOption={onSelectAction}
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
  time: '',
  disableAction: false,
  onReactionClick: () => {},
  commentDetails: {},
  activityId: '',
  visible: true,
}

CommentItem.propTypes = {
  type: PropTypes.string,
  receive: PropTypes.bool,
  classes: PropTypes.object,
  user: PropTypes.string,
  time: PropTypes.string,
  activityId: PropTypes.string,
  disableAction: PropTypes.bool,
  visible: PropTypes.bool,
  commentDetails: PropTypes.object,
  onReactionClick: PropTypes.func,
  toggleActivityVisibility: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  toggleActivityVisibility: activityId => dispatch(toggleActivityVisibility(activityId)),
})

export default connect(null, mapDispatchToProps)(CommentItem);
