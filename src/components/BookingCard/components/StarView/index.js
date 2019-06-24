import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Scrollbars from 'react-custom-scrollbars';
import { numberToCommaFormatter, findCompletedVideo } from '../../../../utils/dataformatter';
import { CloseButton } from '../../../../styles/CommonStyled';
import CommentBox from '../../../CommentBox';
import addVideoComment from '../../../../services/addVideoComment';
import CommentListing from '../../../CommentListing';
import QuickComment from '../../../QuickComment';
import VideoRender from '../../../VideoRender';
import Share from '../../../Share';
import BookingStyled from '../../styled';
import StarViewStyled from './styled';

const StarView = (props) => {

  const [videoId, updateVideoId] = useState('');
  const [video, setVideo] = useState('');
  const { bookingData } = props;

  useEffect(() => {
    updateVideoId(findCompletedVideo(bookingData).video_id);
    props.fetchActivitiesList(bookingData.booking_id, 0, true);
    if (props.modalData.reactionUrl) {
      setVideo({
        s3_video_url: props.modalData.reactionType === 2 && props.modalData.reactionUrl,
        type: props.modalData.reactionType === 1 && 'image',
        isReaction: true,
        s3_thumbnail_url: props.modalData.reactionType === 2 ? props.modalData.reactionThumbnail : props.modalData.reactionUrl,
      })
    } else {
      setVideo(findCompletedVideo(bookingData));
    }
  }, [props.bookingData.id])

  const onReactionClose = () => {
    setVideo(findCompletedVideo(bookingData));
  }

  const onReactionClick = (fileUrl, thumbnail, type) => {
    setVideo({
      s3_video_url: fileUrl,
      type: type === 1 && 'image',
      isReaction: true,
      s3_thumbnail_url: type === 2 ? thumbnail : fileUrl,
    })
  }

  const fetchActivity = (offset, refresh) => {
    props.fetchActivitiesList(props.bookingData.id, offset, refresh);
  }

  const submitComment = async (comment) => {
    props.loaderAction(true);
    try {
      await addVideoComment(videoId, comment);
      props.fetchActivitiesList(bookingData.booking_id, 0, true);
    } catch(exception) {
      props.updateToast({
        value: true,
        message: exception.response.data.error.message,
        variant: 'error',
      })
    }
    props.loaderAction(false);
  }

  return (
    <StarViewStyled>
      <BookingStyled.Layout>
        <BookingStyled.LeftSection>
          <StarViewStyled.VideoWrapper closeEnable={video.isReaction}>
            {
              video.isReaction ? <CloseButton className='close-btn' onClick={onReactionClose} /> : null
            }
            <VideoRender
              classes={{
                container: 'video-container'
              }}
              variableWidth
              variableHeight
              type={video.type}
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
            <Scrollbars
              autoHide
              renderView={scrollProps => <div {...scrollProps} id="comments-scroll-target" />}
            >
              <CommentListing
                notCenter
                scrollTarget='comments-scroll-target'
                dataList={props.activitiesList.data}
                noDataText='No records found'
                loading={props.activitiesList.loading}
                offset={props.activitiesList.offset}
                fetchData={fetchActivity}
                onReactionClick={onReactionClick}
                totalCount={props.activitiesList.count}
                limit={props.activitiesList.limit}
              />
            </Scrollbars>
          </BookingStyled.CommentList>
          <StarViewStyled.CommentWrapper>
            <CommentBox
              maxLength={52}
              classes={{root: 'comment-box'}}
              onSubmit={submitComment}
            />
            <QuickComment bookingId={bookingData.booking_id} fanName={bookingData.fan} videoId={videoId} classes={{root: 'quick-comment'}} />
          </StarViewStyled.CommentWrapper>
          <BookingStyled.OrderText starMode onClick={props.toggleDetails(true)}>Order Details</BookingStyled.OrderText>
        </BookingStyled.RightSection>
      </BookingStyled.Layout>
    </StarViewStyled>
  )
}

StarView.defaultProps = {
  modalData: {},
  activitiesList: {},
}

StarView.propTypes = {
  closeModal: PropTypes.func.isRequired,
  bookingData: PropTypes.object.isRequired,
  fetchActivitiesList: PropTypes.func.isRequired,
  toggleDetails: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  modalData: PropTypes.object,
  activitiesList: PropTypes.object,
}

export default StarView;
