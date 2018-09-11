import React from 'react';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  WhatsappIcon,
  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon,
  EmailIcon,
} from 'react-share';
import copy from 'copy-to-clipboard';
import { starProfessionsFormater } from '../../utils/dataToStringFormatter';
import VideoPlayer from '../VideoPlayer';
import Loader from '../Loader';
import RequestFlowPopup from '../RequestFlowPopup';
import VideoPopupStyled from './styled';
import { fetchCommentsList } from '../../store/shared/actions/getVideoComments'

class VideoPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sharePopup: false,
    };
  }

  componentWillMount() {
    console.log(this.props.selectedVideo)
    this.props.fetchCommentsList(this.props.selectedVideo.video_id, 0, true);
  }

  renderSocialIcons = (selectedVideo) => {
    const defaultUrl = selectedVideo.video_url;
    const shareUrl = `https://${defaultUrl}`;
    const title = selectedVideo.booking_title
    return (
      <React.Fragment>
        <VideoPopupStyled.Somenetwork>
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="Demo__some-network__share-button"
          >
            <FacebookIcon
              size={32}
              round
            />
          </FacebookShareButton>
        </VideoPopupStyled.Somenetwork>
        <VideoPopupStyled.Somenetwork>
          <GooglePlusShareButton
            url={shareUrl}
            className="Demo__some-network__share-button"
          >
            <GooglePlusIcon
              size={32}
              round />
          </GooglePlusShareButton>
        </VideoPopupStyled.Somenetwork>
        <VideoPopupStyled.Somenetwork>
          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button"
          >
            <TwitterIcon
              size={32}
              round
            />
          </TwitterShareButton>
        </VideoPopupStyled.Somenetwork>
        <VideoPopupStyled.Somenetwork>
          <WhatsappShareButton
            url={shareUrl}
            title={title}
            separator=":: "
            className="Demo__some-network__share-button"
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </VideoPopupStyled.Somenetwork>
        <VideoPopupStyled.Somenetwork>
          <EmailShareButton
            url={shareUrl}
            subject={title}
            body={shareUrl}
            className="Demo__some-network__share-button"
          >
            <EmailIcon
              size={32}
              round
            />
          </EmailShareButton>
        </VideoPopupStyled.Somenetwork>
        <VideoPopupStyled.Somenetwork>
          <VideoPopupStyled.Copy title="Copy to Clipboard" onClick={() => copy(shareUrl)} />
        </VideoPopupStyled.Somenetwork>
      </React.Fragment>
    );
  }

  render() {
    const { props } = this;
    const videoPlayerProps = props.selectedVideo.question_answer_videos ? {
      primaryCover: props.selectedVideo.question_answer_videos.question_thumb ? props.selectedVideo.question_answer_videos.question_thumb : '',
      primarySrc: props.selectedVideo.question_answer_videos.answer ? props.selectedVideo.question_answer_videos.question : '',
      secondaryCover: props.selectedVideo.question_answer_videos.answer_thumb ? props.selectedVideo.question_answer_videos.answer_thumb : '',
      secondarySrc: props.selectedVideo.question_answer_videos.answer ? props.selectedVideo.question_answer_videos.answer : '',
    } : {
      primaryCover: props.selectedVideo.s3_thumbnail_url ? props.selectedVideo.s3_thumbnail_url : '',
      primarySrc: props.selectedVideo.s3_video_url ? props.selectedVideo.s3_video_url : '',
    };
    return (
      <RequestFlowPopup
        dotsCount={0}
        selectedDot={1}
        closePopUp={() => props.closePopUp()}
        largePopup
      >
        <VideoPopupStyled.VideoContentWrapper>
          {
            !props.videoPopupLoading ?
              <React.Fragment>
                <VideoPopupStyled.VideoPlayer>
                  <VideoPopupStyled.VideoPlayerWrapper>
                    <VideoPlayer {...videoPlayerProps} />
                    <VideoPopupStyled.LeftSliderArrow onClick={() => props.changeVideo(props.selectedVideoIndex-1)} />
                    <VideoPopupStyled.RightSliderArrow onClick={() => props.changeVideo(props.selectedVideoIndex+1)} />
                  </VideoPopupStyled.VideoPlayerWrapper>
                  <VideoPopupStyled.VideoContent>
                    <VideoPopupStyled.VideoRequester>
                      <Link to={`/${props.selectedVideo.user_id}`} >
                        <VideoPopupStyled.VideoRequestImage
                          imageUrl={props.selectedVideo.avatar_photo && props.selectedVideo.avatar_photo.thumbnail_url}
                        />
                        <VideoPopupStyled.VideoRequestName>
                          {props.selectedVideo.full_name}
                          <VideoPopupStyled.VideoTitle>
                            {starProfessionsFormater(props.selectedVideo.professions)}
                          </VideoPopupStyled.VideoTitle>
                        </VideoPopupStyled.VideoRequestName>
                      </Link>
                    </VideoPopupStyled.VideoRequester>
                    <VideoPopupStyled.ShareButton
                      onClick={() => this.setState({ sharePopup: !this.state.sharePopup })}
                    />
                    {
                      this.state.sharePopup &&
                        <VideoPopupStyled.SocialMediaWrapper>
                          {this.renderSocialIcons(props.selectedVideo)}
                        </VideoPopupStyled.SocialMediaWrapper>
                    }
                    <VideoPopupStyled.CommentsList>
                      <Scrollbars
                        renderView={props => <div {...props} className="comments-list-scrollbar" id="scrollable-target" />}
                      >
                        {
                          props.commentList.data.map((item, index) => (
                            <VideoPopupStyled.commentItem key={index}>
                              {item.id}
                            </VideoPopupStyled.commentItem>
                          ))
                        }
                      </Scrollbars>
                    </VideoPopupStyled.CommentsList>
                  </VideoPopupStyled.VideoContent>
                </VideoPopupStyled.VideoPlayer>
              </React.Fragment>
            : <Loader />
          }
        </VideoPopupStyled.VideoContentWrapper>
      </RequestFlowPopup>
    );
  }
}

const mapStateToProps = state => ({
  commentList: state.commentsList,
});

const mapDispatchToProps = dispatch => ({
  fetchCommentsList: (videoId, offset, refresh) => dispatch((fetchCommentsList(videoId, offset, refresh))),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoPopup);
