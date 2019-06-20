import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { numberToCommaFormatter } from '../../../../utils/dataformatter';
import CommentBox from '../../../CommentBox';
import QuickComment from '../../../QuickComment';
import VideoRender from '../../../VideoRender';
import { findCompletedVideo } from '../../../../utils/dataformatter';
import Share from '../../../Share';
import BookingStyled from '../../styled';
import StarViewStyled from './styled';

const StarView = (props) => {

  const [videoId, updateVideoId] = useState('');

  const { bookingData } = props;
  const video = bookingData.request_video.find(videoItem => videoItem.video_status === 1) // get completed video

  useEffect(() => {
    updateVideoId(findCompletedVideo(bookingData).video_id);
  }, [props.bookingData.id])

  return (
    <StarViewStyled>
      <BookingStyled.Layout>
        <BookingStyled.LeftSection>
          <StarViewStyled.VideoWrapper>
            <VideoRender
              classes={{
                container: 'video-container'
              }}
              variableWidth
              variableHeight
              noBorder
              videoSrc={video.s3_video_url}
              cover={video.s3_thumbnail_url}
            />
          </StarViewStyled.VideoWrapper>
          <BookingStyled.OrderText onClick={props.toggleDetails(true)}>Order Details</BookingStyled.OrderText>
        </BookingStyled.LeftSection>
        <BookingStyled.RightSection starMode>
          <StarViewStyled.DetailWrapper>
            <span>
              <BookingStyled.title className='title'>Recorded:</BookingStyled.title>
              <BookingStyled.Description>{ moment.utc(bookingData.created_date).format('MMM Do, YYYY') }</BookingStyled.Description>
            </span>
            <Share
              className='action-btn'
              shareUrl={video.video_url}
            />
          </StarViewStyled.DetailWrapper>
          <StarViewStyled.DetailWrapper>
              <span>
                <BookingStyled.title className='title'>Paid:</BookingStyled.title>
                <BookingStyled.Description>${ numberToCommaFormatter(bookingData.order_details.amount)} on {moment.utc(bookingData.created_date).format('MMM Do, YYYY') }</BookingStyled.Description>
              </span>
          </StarViewStyled.DetailWrapper>
          <BookingStyled.CommentList>
            Comments come here... pending
          </BookingStyled.CommentList>
          <StarViewStyled.CommentWrapper>
            <CommentBox classes={{root: 'comment-box'}} />
            <QuickComment fanName={bookingData.fan} videoId={videoId} classes={{root: 'quick-comment'}} />
          </StarViewStyled.CommentWrapper>
          <BookingStyled.OrderText starMode onClick={props.toggleDetails(true)}>Order Details</BookingStyled.OrderText>
        </BookingStyled.RightSection>
      </BookingStyled.Layout>
    </StarViewStyled>
  )
}

StarView.propTypes = {
  closeModal: PropTypes.func.isRequired,
  bookingData: PropTypes.object.isRequired,
  toggleDetails: PropTypes.func.isRequired,
}

export default StarView;
