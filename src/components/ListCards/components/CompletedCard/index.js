import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartLight } from '@fortawesome/pro-light-svg-icons';
import { numberToCommaFormatter } from '../../../../utils/dataformatter';
import { requestTypes } from '../../../../constants/requestTypes';
import { HeadingBold } from '../../styled';
import ToolTip from '../../../ToolTip';
import StarRating from '../../../StarRating';
import CompletedStyled from './styled';

const CompletedCard = (props) => {

  const [requestVideo, setRequestVideo] = useState({});

  const renderDescription = () => {
    if (requestTypes[props.data.request_type] === 'Q&A') {
      return (
        <React.Fragment>
            <HeadingBold>Question</HeadingBold>&nbsp;
            from&nbsp;
            <HeadingBold>
              {
                props.data.fan
              }
            </HeadingBold>
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        <HeadingBold>Birthday</HeadingBold>&nbsp;
          {requestTypes[props.data.request_type] === 'Shout-out' ? 'shoutout' : 'announcement'} for&nbsp; 
          <HeadingBold>
            { props.data.request_details && !props.data.request_details.isMyself ? props.data.request_details.stargramto : props.data.fan }
          </HeadingBold>
          {
            props.data.request_details && !props.data.request_details.isMyself ?
              <React.Fragment>
                &nbsp;from <HeadingBold>{props.data.request_details.stargramto}</HeadingBold>
              </React.Fragment>
            : null
          }
      </React.Fragment>
    )
  }

  useEffect(() => {
    if (props.data.booking_id) {
      setRequestVideo(props.data.request_video.find(videoItem => videoItem.video_status === 1)) // get completed video
    }
  }, [props.data.booking_id])

  return (
    <CompletedStyled className={props.classes.root} onClick={props.onClick}>
      <span className='favorite-icon'>
        <FontAwesomeIcon icon={faHeartLight} />
      </span>
      <CompletedStyled.Container>
        <CompletedStyled.ProfilePic imageUrl={requestVideo.s3_thumbnail_url} />
        <CompletedStyled.DetailsWrapper>
          <div className='details-header'>
            <span className='date'>
              { moment.utc(props.data.created_date).format('MMM Do YYYY') }
            </span>
            {
              props.data.fan_rating &&
                <StarRating readOnly ratingClass='rating' rating={props.data.fan_rating.fan_rate} />
            }
          </div>
          <span className='description'>
            {
              renderDescription()
            }
          </span>
          <div className='action-section'>
            <ToolTip title={`This video has ${props.data.comments} comments.`}>
              <CompletedStyled.IconWrapper className='comment' visible={props.data.comments > 0}>
                <FontAwesomeIcon className='comment-icon' icon={faComment} />
              </CompletedStyled.IconWrapper>
            </ToolTip>
            <ToolTip title={`This booking has $${numberToCommaFormatter(props.data.tip_amount)} in tips.`}>            
              <CompletedStyled.IconWrapper className='tip' visible={props.data.tip_amount > 0} >
                $ TIP
              </CompletedStyled.IconWrapper>
            </ToolTip>
            <ToolTip title={`This video has ${props.data.reaction_count} reaction videos.`}>
              <CompletedStyled.IconWrapper className='reaction' visible={props.data.reaction_count > 0}>
                <span className='reaction-icon'>
                  <FontAwesomeIcon icon={faHeart} />
                </span>
                Reaction
              </CompletedStyled.IconWrapper>
            </ToolTip>
          </div>
        </CompletedStyled.DetailsWrapper>
      </CompletedStyled.Container>
    </CompletedStyled>
  )
}

CompletedCard.defaultProps = {
  data: {},
  onClick: () => {},
}

CompletedCard.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object,
  onClick: PropTypes.func,
}

export { CompletedCard };
