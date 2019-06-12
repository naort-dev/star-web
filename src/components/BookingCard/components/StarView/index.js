import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { CloseButton } from 'styles/CommonStyled';
import { requestTypes } from '../../../../constants/requestTypes';
import CommentBox from '../../../CommentBox';
import QuickComment from '../../../QuickComment';
import VideoRender from '../../../VideoRender';
import PrimaryButton from '../../../PrimaryButton';
import BookingStyled from '../../styled';
import StarViewStyled from './styled';

const StarView = (props) => {
  const { bookingData } = props;
  const video = bookingData.request_video.find(videoItem => videoItem.video_status === 1) // get completed video

  const renderHeading = () => {
    if (requestTypes[bookingData.request_type] === 'Q&A') {
      return (
        <React.Fragment>
            <strong>Question</strong>&nbsp;
            from&nbsp;
            <strong>
              {
                bookingData.fan
              }
            </strong>
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        <strong>Birthday</strong>&nbsp;
          {requestTypes[bookingData.request_type] === 'Shout-out' ? 'shoutout' : 'announcement'} for&nbsp; 
          <strong>
            { bookingData.request_details && bookingData.request_details.stargramto !== 'Myself' ? bookingData.request_details.stargramto : bookingData.fan }
          </strong>
          {
            bookingData.request_details && bookingData.request_details.stargramto !== 'Myself' ?
              <React.Fragment>
                &nbsp;from <strong>{bookingData.request_details.stargramto}</strong>
              </React.Fragment>
            : null
          }
      </React.Fragment>
    )
  }

  return (
    <StarViewStyled>
      <CloseButton onClick={props.closeModal} />
      <StarViewStyled.HeaderText>
        {renderHeading()}
      </StarViewStyled.HeaderText>
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
        </BookingStyled.LeftSection>
        <BookingStyled.RightSection>
          <StarViewStyled.DetailWrapper>
            <span>
              <BookingStyled.title className='title'>Recorded:</BookingStyled.title>
              <BookingStyled.Description>{ moment.utc(bookingData.created_date).format('MMM Do, YYYY') }</BookingStyled.Description>
            </span>
            <PrimaryButton className='action-btn'>Share This</PrimaryButton>
          </StarViewStyled.DetailWrapper>
          <StarViewStyled.DetailWrapper>
              <span>
                <BookingStyled.title className='title'>Paid:</BookingStyled.title>
                <BookingStyled.Description>${ bookingData.order_details.amount} on {moment.utc(bookingData.created_date).format('MMM Do, YYYY') }</BookingStyled.Description>
              </span>
          </StarViewStyled.DetailWrapper>
          <BookingStyled.CommentList>
            Comments come here... pending
          </BookingStyled.CommentList>
          <StarViewStyled.CommentWrapper>
            <CommentBox classes={{root: 'comment-box'}} />
            <QuickComment classes={{root: 'quick-comment'}} />
          </StarViewStyled.CommentWrapper>
        </BookingStyled.RightSection>
      </BookingStyled.Layout>
    </StarViewStyled>
  )
}

StarView.propTypes = {
  closeModal: PropTypes.func.isRequired,
  bookingData: PropTypes.object.isRequired,
}

export default StarView;
