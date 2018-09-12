import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
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
      hasMore: true,
    };
  }

  componentWillMount() {
    this.props.fetchCommentsList(this.props.selectedVideo.video_id, 0, true);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedVideo.video_id !== nextProps.selectedVideo.video_id) {
      this.props.fetchCommentsList(nextProps.selectedVideo.video_id, 0, true);
    }
  }

  loadMoreComments = () => {
    if (this.props.commentList.data.length >= this.props.commentList.count) {
      this.setState({ hasMore: false })
    } else {
      const { offset, limit } = this.props.commentList;
      this.props.fetchCommentsList(this.props.selectedVideo.video_id, offset + limit);
    }
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
                      <VideoPopupStyled.StarLink to={`/${props.selectedVideo.user_id}`}>
                        <VideoPopupStyled.VideoRequestImage
                          imageUrl={props.selectedVideo.avatar_photo && props.selectedVideo.avatar_photo.thumbnail_url}
                        />
                        <VideoPopupStyled.VideoRequestName>
                          {props.selectedVideo.full_name}
                          <VideoPopupStyled.VideoTitle>
                            {starProfessionsFormater(props.selectedVideo.professions)}
                          </VideoPopupStyled.VideoTitle>
                        </VideoPopupStyled.VideoRequestName>
                      </VideoPopupStyled.StarLink>
                    </VideoPopupStyled.VideoRequester>
                    <VideoPopupStyled.PopupActions>
                      <VideoPopupStyled.ShareButton
                        onClick={() => this.setState({ sharePopup: !this.state.sharePopup })}
                      />
                      <VideoPopupStyled.SocialMediaWrapper visible={this.state.sharePopup}>
                        {this.renderSocialIcons(props.selectedVideo)}
                      </VideoPopupStyled.SocialMediaWrapper>
                      <VideoPopupStyled.CommentBox
                        placeholder="Enter your comment"
                      />
                    </VideoPopupStyled.PopupActions>
                    {
                      !this.props.commentList.loading || this.props.commentList.data.length ?
                        <VideoPopupStyled.CommentsList>
                          <VideoPopupStyled.commentListScrollbar
                            renderView={props => <div {...props} className="comments-list-scrollbar" id="scrollable-target" />}
                          >
                            {/* <VideoPopupStyled.commentItem>
                              <VideoPopupStyled.CommentBox
                                placeholder="Enter your comment"
                              />
                            </VideoPopupStyled.commentItem> */}
                            {
                              this.props.commentList.data.length < this.props.commentList.count && this.props.commentList.data.length ?
                                <VideoPopupStyled.commentItem>
                                  <VideoPopupStyled.loadMoreComments onClick={() => this.loadMoreComments()}>
                                    Load more comments
                                  </VideoPopupStyled.loadMoreComments>
                                </VideoPopupStyled.commentItem>
                              : null
                            }
                            {
                              this.props.commentList.data.length && this.props.commentList.loading ?
                                <VideoPopupStyled.loaderWrapper>
                                  <Loader />
                                </VideoPopupStyled.loaderWrapper>
                              : null
                            }
                            {
                              props.commentList.data.map((item, index) => (
                                <VideoPopupStyled.commentItem key={index}>
                                  <VideoPopupStyled.commenterImage
                                    imageUrl={item.user && item.user.image_url}
                                  />
                                  <VideoPopupStyled.commenterName>
                                    {item.user && item.user.get_short_name}
                                    <VideoPopupStyled.comment>
                                      {item.comments}
                                    </VideoPopupStyled.comment>
                                    <VideoPopupStyled.commentDate>
                                      {moment(item.created_date).format('MMM DD, YYYY')}
                                    </VideoPopupStyled.commentDate>
                                  </VideoPopupStyled.commenterName>
                                </VideoPopupStyled.commentItem>
                              ))
                            }
                            {
                              !this.props.commentList.loading && !this.props.commentList.data.length ?
                                <VideoPopupStyled.commentItem>No Comments yet</VideoPopupStyled.commentItem>
                              : null
                            }
                          </VideoPopupStyled.commentListScrollbar>
                        </VideoPopupStyled.CommentsList>
                      :
                        <VideoPopupStyled.loaderWrapper>
                          <Loader />
                        </VideoPopupStyled.loaderWrapper>
                    }
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
