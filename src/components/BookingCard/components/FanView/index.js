import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Scrollbars from 'react-custom-scrollbars';
import { moreOptions } from './constants';
import { findCompletedVideo } from '../../../../utils/dataformatter';
import { openStatusList, completedStatusList } from '../../../../constants/requestStatusList';
import { CloseButton } from '../../../../styles/CommonStyled';
import CommentBox from '../../../CommentBox';
import { downloadItem } from '../../../../utils/domUtils';
import addVideoComment from '../../../../services/addVideoComment';
import CommentListing from '../../../CommentListing';
import MoreActions from '../../../MoreActions';
import ActionBar from '../../../ActionBar';
import VideoRender from '../../../VideoRender';
import BookingStyled from '../../styled';
import FanViewStyled from './styled';

const FanView = (props) => {

  const [requestType, updateRequestType] = useState('completed');
  const [finalVideo, setFinalVideo] = useState('');
  const [videoId, updateVideoId] = useState('');
  const [video, setVideo] = useState('');
  const { bookingData } = props;

  useEffect(() => {
    setFinalVideo(findCompletedVideo(bookingData));
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
    if (openStatusList.indexOf(bookingData.request_status) >= 0) {
      updateRequestType('open');
    } else if (completedStatusList.indexOf(bookingData.request_status) >= 0) {
      updateRequestType('completed');
    } else {
      updateRequestType('cancelled');
    }
  }, [props.bookingData.id])

  const onReactionClose = () => {
    setVideo(finalVideo);
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

  const onSelectAction = (option) => {
    if(option.value === 'contact') {
      props.toggleContactSupport(true);
    } else if(option.value === 'download') {
      const completedVideo = findCompletedVideo(bookingData);
      downloadItem(completedVideo.s3_video_url, bookingData.booking_title);
    }
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
    <FanViewStyled>
      <BookingStyled.Layout starMode={false}>
        <BookingStyled.LeftSection>
          {
            <MoreActions
              classes={{ root: 'more-action-root', icon: 'more-action-icon' }}
              options={moreOptions[requestType]}
              onSelectOption={onSelectAction}
            />
          }
          <FanViewStyled.VideoWrapper closeEnable={video.isReaction}>
            {
              video.isReaction ? <CloseButton className='close-btn' onClick={onReactionClose} /> : null
            }
            <VideoRender
              classes={{
                container: 'video-container'
              }}
              variableWidth
              variableHeight
              autoPlay
              type={video.type}
              noBorder
              videoSrc={video.s3_video_url}
              cover={video.s3_thumbnail_url}
            />
          </FanViewStyled.VideoWrapper>
          <BookingStyled.OrderText onClick={props.toggleDetails(true)}>Booking details</BookingStyled.OrderText>
        </BookingStyled.LeftSection>
        <BookingStyled.RightSection>
          <FanViewStyled.DetailWrapper>
            <span className='detail-header'>
              <span>
                <BookingStyled.title className='title'>Recorded:</BookingStyled.title>
                <BookingStyled.Description>{ moment.utc(bookingData.video_created_date).format('MMM Do, YYYY') }</BookingStyled.Description>
              </span>
              <MoreActions
                classes={{ root: 'more-action-root', icon: 'more-action-icon' }}
                options={moreOptions[requestType]}
                onSelectOption={onSelectAction}
              />
            </span>
            <ActionBar
              bookingId={bookingData.booking_id}
              disableRating={bookingData.has_rating}
              disableReaction={bookingData.has_reaction}
              onAction={props.onCompleteAction}
            />
          </FanViewStyled.DetailWrapper>
          <BookingStyled.CommentList starMode={false}>
            <Scrollbars
              autoHide
              renderView={scrollProps => <div {...scrollProps} id="comments-scroll-target" />}
            >
              <CommentListing
                notCenter
                scrollTarget='comments-scroll-target'
                dataList={props.activitiesList.data}
                noDataText='No comments yet'
                disableAction
                loading={props.activitiesList.loading}
                offset={props.activitiesList.offset}
                fetchData={fetchActivity}
                onReactionClick={onReactionClick}
                totalCount={props.activitiesList.count}
                limit={props.activitiesList.limit}
              />
            </Scrollbars>
          </BookingStyled.CommentList>
          <FanViewStyled.CommentWrapper>
            <CommentBox
              maxLength={52}
              classes={{root: 'comment-box'}}
              onSubmit={submitComment}
            />
          </FanViewStyled.CommentWrapper>
          <BookingStyled.OrderText onClick={props.toggleDetails(true)}>Bookings details</BookingStyled.OrderText>
        </BookingStyled.RightSection>
      </BookingStyled.Layout>
    </FanViewStyled>
  )
}

FanView.defaultProps = {
  modalData: {},
  activitiesList: {},
  onCompleteAction: () => {},
}

FanView.propTypes = {
  closeModal: PropTypes.func.isRequired,
  bookingData: PropTypes.object.isRequired,
  fetchActivitiesList: PropTypes.func.isRequired,
  toggleContactSupport: PropTypes.func.isRequired,
  toggleDetails: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  modalData: PropTypes.object,
  activitiesList: PropTypes.object,
  onCompleteAction: PropTypes.func,
}

export default FanView;
