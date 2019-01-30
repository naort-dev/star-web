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
import addVideoComment from '../../services/addVideoComment';
import { starProfessionsFormater } from '../../utils/dataToStringFormatter';
import VideoPlayer from '../VideoPlayer';
import SnackBar from '../SnackBar';
import Loader from '../Loader';
import RequestFlowPopup from '../RequestFlowPopup';
import VideoPopupStyled from './styled';
import { fetchCommentsList, resetCommentsList } from '../../store/shared/actions/getVideoComments';
import { toggleLogin } from '../../store/shared/actions/toggleModals';

class VideoPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sharePopup: false,
      pendingComment: '',
      commentText: '',
      snackBarText: '',
    };
  }

  componentWillMount() {
    this.props.fetchCommentsList(this.props.selectedVideo.video_id, 0, true);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoggedIn !== nextProps.isLoggedIn && nextProps.selectedVideo.video_id && this.state.pendingComment !== '') {
      this.addVideoComment(nextProps.selectedVideo.video_id, this.state.pendingComment, nextProps.isLoggedIn);
    }
    if (this.props.selectedVideo.video_id !== nextProps.selectedVideo.video_id && nextProps.selectedVideo.video_id) {
      this.props.resetCommentsList();
      this.props.fetchCommentsList(nextProps.selectedVideo.video_id, 0, true);
      if (this.state.pendingComment) {
        this.addVideoComment(nextProps.selectedVideo.video_id, this.state.pendingComment, nextProps.isLoggedIn);
      }
      this.setState({
        commentText: '',
        sharePopup: false,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.commentList.count - prevProps.commentList.count === 1 && this.scrollBarRef) {
      if (this.commentInput) {
        this.commentInput.focus();
      }
    }
  }

  componentWillUnmount() {
    this.props.resetCommentsList();
  }

  onVideoEnded = () => {
    if (this.props.onVideoEnded) {
      this.props.onVideoEnded();
    }
  }

  setSnackBarText = (text) => {
    this.setState({ snackBarText: text });
  }

  findTime = (commentDate) => {
    let timeString = '';
    const currentDate = new Date();
    const createdDate = new Date(commentDate);
    const timeDiff = currentDate - createdDate;
    const diffDays = Math.floor(timeDiff / 86400000); // days
    const diffHrs = Math.floor((timeDiff % 86400000) / 3600000); // hours
    const diffMins = Math.round(((timeDiff % 86400000) % 3600000) / 60000); // minutes
    if (diffDays >= 30) {
      timeString = moment(commentDate).format('MMM DD, YYYY');
    } else if (diffDays >= 1) {
      timeString = diffDays === 1 ? `${diffDays} day ago` : `${diffDays} days ago`;
    } else if (diffHrs >= 1) {
      timeString = diffHrs === 1 ? `${diffHrs} hour ago` : `${diffHrs} hours ago`;
    } else if (diffMins >= 1) {
      timeString = diffMins === 1 ? `${diffMins} minute ago` : `${diffMins} minutes ago`;
    } else {
      timeString = 'just now';
    }
    return timeString;
  }

  loadMoreComments = () => {
    if (this.props.commentList.data.length < this.props.commentList.count) {
      const offset = this.props.commentList.data[0].id;
      this.props.fetchCommentsList(this.props.selectedVideo.video_id, offset);
    }
  }

  addVideoComment = (videoId, comment, isLoggedIn) => {
    if (isLoggedIn) {
      this.setState({ commentText: '' });
      addVideoComment(videoId, comment)
        .then(() => {
          this.setState({ pendingComment: '' });
          this.props.fetchCommentsList(this.props.selectedVideo.video_id, 0, true);
        });
    } else {
      this.setState({ pendingComment: comment });
      this.props.toggleLogin(true);
    }
  }

  selectCommentField = () => {
    if (this.commentInput) {
      this.commentInput.focus();
    }
  }

  handleCommentAdd = (event) => {
    this.setState({ commentText: event.target.value });
  }

  commentAdder = () => {
    if (this.state.commentText !== '') {
      this.addVideoComment(this.props.selectedVideo.video_id, this.state.commentText, this.props.isLoggedIn);
    }
  }

  handleCommentEnter = (event) => {
    if (event.keyCode === 13) {
      this.commentAdder();
    }
  }
  
  closeSnackBar = () => {
    this.setState({ snackBarText: '' });
  }

  copyUrl = (shareUrl) => {
    copy(shareUrl);
    this.setSnackBarText('Link copied to clipboard');
  }

  renderSocialIcons = (selectedVideo) => {
    const defaultUrl = selectedVideo.video_url;
    const shareUrl = `https://${defaultUrl}`;
    const title = selectedVideo.booking_title;
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
              round
            />
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
          <VideoPopupStyled.Copy title="Copy to Clipboard" onClick={() => this.copyUrl(shareUrl)} />
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
      ratio: props.selectedVideo.width / props.selectedVideo.height,
    } : {
      primaryCover: props.selectedVideo.s3_thumbnail_url ? props.selectedVideo.s3_thumbnail_url : '',
      primarySrc: props.selectedVideo.s3_video_url ? props.selectedVideo.s3_video_url : '',
      ratio: props.selectedVideo.width / props.selectedVideo.height,
    };
    return (
      <RequestFlowPopup
        noDisableScroll={this.props.noDisableScroll}
        autoWidth
        dotsCount={0}
        selectedDot={1}
        closePopUp={props.closePopUp}
        largePopup
      >
        <VideoPopupStyled.VideoContentWrapper>
          {
            this.state.snackBarText !== '' &&
              <SnackBar text={this.state.snackBarText} closeSnackBar={this.closeSnackBar} />
          }
          {
            !props.videoPopupLoading ?
              <React.Fragment>
                <VideoPopupStyled.VideoPlayer>
                  <VideoPopupStyled.VideoPlayerWrapper>
                    <VideoPlayer onVideoEnded={this.onVideoEnded} {...videoPlayerProps} />
                    {
                      !props.noSlider &&
                        <React.Fragment>
                          <VideoPopupStyled.LeftSliderArrow onClick={() => props.changeVideo(props.selectedVideoIndex - 1)} />
                          <VideoPopupStyled.RightSliderArrow onClick={() => props.changeVideo(props.selectedVideoIndex + 1)} />
                        </React.Fragment>
                    }
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
                      <VideoPopupStyled.UserActions>
                        <VideoPopupStyled.ShareButton
                          onClick={() => this.setState({ sharePopup: !this.state.sharePopup })}
                        />
                        <VideoPopupStyled.ChatIcon
                          onClick={() => this.selectCommentField()}
                          chatCount={this.props.commentList.count}
                        />
                      </VideoPopupStyled.UserActions>
                    </VideoPopupStyled.VideoRequester>
                    {
                      !this.props.commentList.loading || this.props.commentList.data.length ?
                        <VideoPopupStyled.CommentsList>
                          <VideoPopupStyled.commentListScrollbar
                            innerRef={(node) => { this.scrollBarRef = node }}
                            renderView={props => <div {...props} className="comments-list-scrollbar" id="scrollable-target" />}
                          >
                            {
                              this.props.commentList.data.length < this.props.commentList.count && this.props.commentList.data.length ?
                                <VideoPopupStyled.commentItem>
                                  <VideoPopupStyled.loadMoreComments isLoading={this.props.commentList.loading} onClick={this.loadMoreComments}>
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
                                      {this.findTime(item.created_date)}
                                    </VideoPopupStyled.commentDate>
                                  </VideoPopupStyled.commenterName>
                                </VideoPopupStyled.commentItem>
                              ))
                            }
                            {
                              !this.props.commentList.loading && !this.props.commentList.data.length ?
                                <VideoPopupStyled.commentItem>No comments yet</VideoPopupStyled.commentItem>
                              : null
                            }
                          </VideoPopupStyled.commentListScrollbar>
                        </VideoPopupStyled.CommentsList>
                      :
                        <VideoPopupStyled.loaderWrapper>
                          <Loader />
                        </VideoPopupStyled.loaderWrapper>
                    }
                    <VideoPopupStyled.PopupActions>
                      <VideoPopupStyled.CommentBoxWrapper>
                        <VideoPopupStyled.CommentSendIcon
                          onClick={() => this.commentAdder()}
                        />
                        <VideoPopupStyled.CommentBox
                          innerRef={(node) => { this.commentInput = node }}
                          placeholder="Enter your comment"
                          value={this.state.commentText}
                          onKeyUp={event => this.handleCommentEnter(event)}
                          onChange={event => this.handleCommentAdd(event)}
                        />
                      </VideoPopupStyled.CommentBoxWrapper>
                    </VideoPopupStyled.PopupActions>
                  </VideoPopupStyled.VideoContent>
                  <VideoPopupStyled.SocialMediaWrapper visible={this.state.sharePopup}>
                    {this.renderSocialIcons(props.selectedVideo)}
                  </VideoPopupStyled.SocialMediaWrapper>
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
  isLoggedIn: state.session.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  fetchCommentsList: (videoId, offset, refresh) => dispatch((fetchCommentsList(videoId, offset, refresh))),
  resetCommentsList: () => dispatch(resetCommentsList()),
  toggleLogin: state => dispatch(toggleLogin(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoPopup);
