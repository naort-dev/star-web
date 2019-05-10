import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import VideoRender from '../../../../components/VideoRender';

import ListingStyled from './styled';

const videoCountLimit = {
  'mobile': 2,
  'ipad': 2,
  'desktop': 4,
}

const reactionCountLimit = {
  'mobile': 3,
  'ipad': 3,
  'desktop': 5,
}

const ListingSection = (props) => {

  const [selectedVideo, updateSelectedVideo] = useState([0]);
  const [videosList, updateVideosList] = useState([]);
  const [videoCount, updateVideoCount] = useState(2);
  const [reactionCount, updateReactionCount] = useState(3);

  const handleWindowResize = () => {
    if (document.body.getBoundingClientRect().width >= 1280 || window.innerWidth >= 1280) {
      updateVideoCount(videoCountLimit.desktop);
      updateReactionCount(reactionCountLimit.desktop);
    } else if (document.body.getBoundingClientRect().width <= 832 || window.innerWidth <= 832) {
      updateVideoCount(videoCountLimit.mobile);
      updateReactionCount(reactionCountLimit.mobile);
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
      props.fetchCelebVideosList(props.userDetails.id, 0, true, videoCount);
      props.fetchCelebReactionsList(props.userDetails.user_id, 0, true, reactionCount);
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

  const showMore = type => () => {
    if (type === 'videos') {
      props.fetchCelebVideosList(props.userDetails.id, props.videosList.offset + videoCount, true, videoCount*2)
      const newVideoSelection = [...selectedVideo];
      newVideoSelection.push(videosList.length);
      newVideoSelection.push(videosList.length+videoCount);
      updateSelectedVideo(newVideoSelection);
    } else {
      props.fetchCelebReactionsList(props.userDetails.user_id, props.reactionsList.offset + reactionCount, true, reactionCount*2);
    }
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
          {
            props.videosList.count > videosList.length ?
              <ListingStyled.ContentItem className="show-more">
                <span onClick={showMore('videos')}>Show More</span>
              </ListingStyled.ContentItem>
            : null
          }
        </ListingStyled.Content>
      </ListingStyled.ContentSection>
      <ListingStyled.ContentSection>
        <ListingStyled.ContentHeader>
          Latest responses...
        </ListingStyled.ContentHeader>
        <ListingStyled.Content>
          {
            props.reactionsList.data.map((reaction) => {
              return (
                <ListingStyled.ContentItem key={reaction.reaction_id}>
                  <ListingStyled.VideoItemWrapper>
                    <ListingStyled.VideoItem>
                      <VideoRender
                        variableWidth
                        variableHeight
                        noBorder
                        videoSrc={reaction.reaction_file_url}
                        cover={reaction.reaction_thumbnail_url}
                      />
                    </ListingStyled.VideoItem>
                  </ListingStyled.VideoItemWrapper>
                </ListingStyled.ContentItem>
              )
            })
          }
          {
            props.reactionsList.count > props.reactionsList.data.length ?
              <ListingStyled.ContentItem className="show-more">
                <span onClick={showMore('reactions')}>Show More</span>
              </ListingStyled.ContentItem>
            : null
          }
        </ListingStyled.Content>
      </ListingStyled.ContentSection>
    </ListingStyled>
  )
}

ListingSection.propTypes = {
  videosList: PropTypes.object.isRequired,
  reactionsList: PropTypes.object.isRequired,
  fetchCelebVideosList: PropTypes.func.isRequired,
  fetchCelebReactionsList: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
}

export default ListingSection;
