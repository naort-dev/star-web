import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card } from 'styles/CommonStyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import QuickComment from '../../../QuickComment';
import { requestTypes } from '../../../../constants/requestTypes';
import { findCompletedVideo } from '../../../../utils/dataformatter'
import { toggleBookingModal } from '../../../../store/shared/actions/toggleModals';
import { MediumText, HeadingBold, FlexColumn, LightHeading } from '../../styled';
import CommentItem from '../../../CommentItem';
import StarStyled from './styled';

const LatestCard = (props) => {

  const { activity } = props;
  const { request = {} } = activity;
  
  const renderHeading = () => {
    switch(props.type) {
      case 'comment':
          return (
            <React.Fragment>
              <FontAwesomeIcon icon={faComment} className="icons icon-comment" />
              <span className='activity desktop'>
                New comment about:
              </span>
              <span className='activity mobile'>
                New comment:
              </span>
            </React.Fragment>
          );
      case 'reaction':
        return (
          <React.Fragment>
            <FontAwesomeIcon icon={faHeart} className="icons icon-heart" />
            <span className='activity desktop'>
              New reaction video about
            </span>
            <span className='activity mobile'>
              New reaction video
            </span>
          </React.Fragment>
        );
      case 'tip':
        return (
          <React.Fragment>
            <span className="icons icon-tip">$</span>
            <span className='activity desktop'>
              New tip for
            </span>
            <span className='activity mobile'>
              New tip
            </span>
          </React.Fragment>
        );
      case 'rating':
        return (
          <React.Fragment>
            <span className="icons icon-rating">★</span>
            <span className='activity desktop'>
              New rating for
              </span>
            <span className='activity mobile'>
              New rating
            </span>
          </React.Fragment>
        );
      default : return null
    }
  }

  const renderDescription = () => {
    if (requestTypes[request.request_type] === 'Q&A') {
      return (
        <MediumText className='card-description'>
          <HeadingBold>Question</HeadingBold> requested
          from <HeadingBold>{request.fan}</HeadingBold>
        </MediumText>
      )
    } else if (requestTypes[request.request_type] === 'Shout-out') {
      return (
        <MediumText className='card-description'>
          <HeadingBold>{request.occasion}</HeadingBold> shoutout
           for <HeadingBold>{request.fan}</HeadingBold>
        </MediumText>
      )
    }
    return (
      <MediumText>
        <HeadingBold>{request.occasion}</HeadingBold> announcement <br />
        for <HeadingBold>{request.fan}</HeadingBold>
      </MediumText>
    )
  }

  const onReactionClick = (reactionUrl, reactionThumbnail, reactionType) => {
    props.toggleBookingModal(true, {...request, id:request.id, reactionUrl, reactionThumbnail, reactionType}, true);
  }
  
  const onViewDetails = () => {
    props.toggleBookingModal(true, {...request, id:request.id}, true);
  }

  const videoId = useMemo(() => findCompletedVideo(request).video_id, [activity.id])

  return (
    <Card>
      <StarStyled className='star-container'>
        <StarStyled.LeftWrapper>
          <StarStyled.UserImage imageUrl={request.fan_photo && request.fan_photo.thumbnail_url} starMode={props.starMode} />
          <FlexColumn className='description-wrapper'>
            <LightHeading className='heading'>{renderHeading()}</LightHeading>
            {
              renderDescription()
            }
          </FlexColumn>
        </StarStyled.LeftWrapper>
        <StarStyled.CommentContainer>
          <CommentItem
            type={props.type}
            user={activity.activity_from_user}
            time={activity.created_date}
            commentDetails={activity.activity_details}
            onReactionClick={onReactionClick}
            classes={{ comment: 'comment-section' }}
            receive
          />
          <span className='divider'>
            <QuickComment fanName={activity.activity_from_user} once videoId={videoId} classes={{root: 'quick-comment-root'}} />
          </span>
          <span className='action-text' onClick={onViewDetails}>
            View details
          </span>
        </StarStyled.CommentContainer>
      </StarStyled>
    </Card>
  )
}

LatestCard.defaultProps = {
  starMode: false,
  activity: {},
}

LatestCard.propTypes = {
  type: PropTypes.string.isRequired,
  starMode: PropTypes.bool,
  activity: PropTypes.object,
  toggleBookingModal: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  toggleBookingModal: (state, bookingData, starMode) =>
  dispatch(toggleBookingModal(state, bookingData, starMode)),
})

const LatestCardComponent = connect(null, mapDispatchToProps)(LatestCard)

export { LatestCardComponent as LatestCard };
