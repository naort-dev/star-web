import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import VideoRender from '../../../../components/VideoRender';

import ListingStyled from './styled';

const videoCountLimit = {
  'mobile': 2,
  'ipad': 2,
  'desktop': 4,
}

const ListingSection = (props) => {

  const [selectedVideo, updateSelectedVideo] = useState([0]);
  const [videosList, updateVideosList] = useState([]);
  const [videoCount, updateVideoCount] = useState(2);

  const handleWindowResize = () => {
    if (document.body.getBoundingClientRect().width >= 1280 || window.innerWidth >= 1280) {
      updateVideoCount(videoCountLimit.desktop);
    } else if (document.body.getBoundingClientRect().width <= 832 || window.innerWidth <= 832) {
      updateVideoCount(videoCountLimit.mobile);
    }
  }

  useEffect(() => {
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    }
  }, [])

  useEffect(() => {
    updateVideosList(props.videosList.data);
  }, [props.videosList.data])

  useEffect(() => {
    if (props.userDetails.id) {
      props.fetchCelebVideosList(props.userDetails.id, 0, true, videoCount)
    }
  }, [props.userDetails.id])

  const onVideoClick = (index, type) => () => {
    if (type === 'videos') {
      const selectPosition = Math.floor(index/videoCount);
      const newVideoSelection = [...selectedVideo];
      newVideoSelection[selectPosition] = index;
      updateSelectedVideo(newVideoSelection);
    }
  }

  const showMore = () => {
    props.fetchCelebVideosList(props.userDetails.id, props.videosList.offset + videoCount, true, videoCount*2)
    const newVideoSelection = [...selectedVideo];
    newVideoSelection.push(videosList.length);
    newVideoSelection.push(videosList.length+videoCount);
    updateSelectedVideo(newVideoSelection);
  }

  const renderVideoSection = (video, index) => {
    return (
      <ListingStyled.ContentItem key={video.booking_id}>
        <ListingStyled.VideoItemWrapper>
          <ListingStyled.VideoItem onClick={onVideoClick(index, 'videos')}>
            <VideoRender
              variableWidth
              variableHeight
              noBorder
              videoSrc={video.s3_video_url}
              cover={video.s3_thumbnail_url}
            />
          </ListingStyled.VideoItem>
        </ListingStyled.VideoItemWrapper>
        <ListingStyled.CommentsWrapper visible={selectedVideo.indexOf(index) >= 0}>
          {
            video.comments.length ?
              video.comments.map((commentItem) => {
                return <span className="comment-item">"{commentItem.comments}"</span>
              })
            : 'No comments yet'
          }
        </ListingStyled.CommentsWrapper>
      </ListingStyled.ContentItem>
    )
  }
  return (
    <ListingStyled>
      <ListingStyled.ContentSection>
        <ListingStyled.ContentHeader>
          Latest videos...
        </ListingStyled.ContentHeader>
        <ListingStyled.Content>
          {
            videosList.map((video, index) => {
              return renderVideoSection(video, index)
            })
          }
          <ListingStyled.ContentItem className="show-more">
            <span onClick={showMore}>Show More</span>
          </ListingStyled.ContentItem>
        </ListingStyled.Content>
      </ListingStyled.ContentSection>
      <ListingStyled.ContentSection>
        <ListingStyled.ContentHeader>
          Latest reactions...
        </ListingStyled.ContentHeader>
        <ListingStyled.Content>
          sadasdasd
        </ListingStyled.Content>
      </ListingStyled.ContentSection>
    </ListingStyled>
  )
}

ListingSection.propTypes = {
  videosList: PropTypes.object.isRequired,
}

export default ListingSection;
