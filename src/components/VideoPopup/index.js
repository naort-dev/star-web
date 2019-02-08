import React from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
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
import Popup from '../Popup';
import RequestFlowPopup from '../RequestFlowPopup';
import { requestTypes } from '../../constants/requestTypes';
import VideoPopupStyled from './styled';
import { fetchCommentsList, resetCommentsList } from '../../store/shared/actions/getVideoComments';
import { toggleLogin } from '../../store/shared/actions/toggleModals';

class VideoPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sharePopup: false,
      commentText: '',
      snackBarText: '',
    };
    this.commentSelected = false;
  }

  componentWillMount() {
    this.props.fetchCommentsList(this.props.selectedVideo.video_id, 0, true);
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoggedIn !== nextProps.isLoggedIn && nextProps.selectedVideo.video_id && this.state.pendingComment !== '') {
      this.addVideoComment(nextProps.selectedVideo.video_id, this.state.pendingComment, nextProps.isLoggedIn);
    }
    if (this.props.selectedVideo.video_id !== nextProps.selectedVideo.video_id && nextProps.selectedVideo.video_id) {
      this.props.resetCommentsList();
      this.props.fetchCommentsList(nextProps.selectedVideo.video_id, 0, true);
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
    if (prevProps.isLoggedIn !== this.props.isLoggedIn && this.commentSelected) {
      this.commentSelected = false;
      if (this.commentInput) {
        setTimeout(() => {
          this.commentInput.focus();
        }, 0);
      }
    }
  }

  componentWillUnmount() {
    this.props.resetCommentsList();
    window.removeEventListener('resize', this.handleWindowResize);
  }
  onVideoEnded = () => {
    if (this.props.onVideoEnded) {
      this.props.onVideoEnded();
    }
  }

  setSnackBarText = (text) => {
    this.setState({ snackBarText: text });
  }

  handleWindowResize = () => {
    this.setState({ sharePopup: false });
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

  addVideoComment = (videoId, comment) => {
    this.setState({ commentText: '' });
    addVideoComment(videoId, comment)
      .then(() => {
        this.props.fetchCommentsList(this.props.selectedVideo.video_id, 0, true);
      });
  }

  toggleShare = () => {
    const { sharePopup } = this.state;
    if (sharePopup) {
      enableBodyScroll(null);
    } else if (document.body.getBoundingClientRect().width < this.popupShareResolution) {
      disableBodyScroll(null);
    }
    this.setState({ sharePopup: !sharePopup });
  }

  selectCommentField = () => {
    if (this.props.isLoggedIn) {
      if (this.commentInput) {
        this.commentInput.focus();
      }
    } else {
      this.commentSelected = true;
      this.props.toggleLogin(true);
    }
  }

  handleCommentAdd = (event) => {
    this.setState({ commentText: event.target.value });
  }

  commentAdder = () => {
    const { commentText } = this.state;
    if (this.props.isLoggedIn) {
      if (commentText.trim('')) {
        this.addVideoComment(this.props.selectedVideo.video_id, this.state.commentText);
      }
    } else {
      this.commentSelected = true;
      this.props.toggleLogin(true);
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
    let title = '';
    if (requestTypes[selectedVideo.booking_type] === 'Shout-out') {
      title = `Watch this video shout-out from ${selectedVideo.full_name}`;
    } else if (requestTypes[selectedVideo.booking_type] === 'Event') {
      title = `Check out my video announcement courtesy of ${selectedVideo.full_name}`;
    } else if (requestTypes[selectedVideo.booking_type] === 'Q&A') {
      title = `${selectedVideo.full_name} answers my fan question!`;
    }
    const emailSubject = `Check out this video from ${selectedVideo.full_name} !`;
    const emailBody = `${title}\n${shareUrl}`;
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
            <VideoPopupStyled.SocialTitle>Share to Facebook</VideoPopupStyled.SocialTitle>
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
            <VideoPopupStyled.SocialTitle>Share to Google Plus</VideoPopupStyled.SocialTitle>
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
            <VideoPopupStyled.SocialTitle>Share to Twitter</VideoPopupStyled.SocialTitle>
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
            <VideoPopupStyled.SocialTitle>Share to Whatsapp</VideoPopupStyled.SocialTitle>
          </WhatsappShareButton>
        </VideoPopupStyled.Somenetwork>
        <VideoPopupStyled.Somenetwork>
          <EmailShareButton
            url={shareUrl}
            subject={emailSubject}
            body={emailBody}
            className="Demo__some-network__share-button"
          >
            <EmailIcon
              size={32}
              round
            />
            <VideoPopupStyled.SocialTitle>Share via Email</VideoPopupStyled.SocialTitle>
          </EmailShareButton>
        </VideoPopupStyled.Somenetwork>
        <VideoPopupStyled.Somenetwork onClick={() => this.copyUrl(shareUrl)}>
          <VideoPopupStyled.Copy title="Copy to Clipboard" />
          <VideoPopupStyled.SocialTitle>Copy link</VideoPopupStyled.SocialTitle>
        </VideoPopupStyled.Somenetwork>
        <VideoPopupStyled.Somenetwork isCancel onClick={this.toggleShare}>
          Cancel
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
    if (props.loginModal) {
      return null;
    }
    if (this.state.sharePopup && document.body.getBoundingClientRect().width >= 1025) {
      return (
        <Popup
          smallPopup
          closePopUp={this.toggleShare}
        >
          { this.renderSocialIcons(props.selectedVideo) }
        </Popup>
      );
    }
    return (
      <RequestFlowPopup
        noDisableScroll={props.noDisableScroll}
        autoWidth
        dotsCount={0}
        selectedDot={1}
        closePopUp={props.closePopUp}
        preventScroll={this.state.sharePopup}
        largePopup
      >
        {
          this.state.sharePopup &&
            <VideoPopupStyled.Overlay onClick={this.toggleShare} />
        }
        {
          this.state.snackBarText !== '' &&
            <SnackBar text={this.state.snackBarText} closeSnackBar={this.closeSnackBar} />
        }
        <VideoPopupStyled.VideoContentWrapper>
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
                        <VideoPopupStyled.ChatIcon
                          title="Comment on this video"
                          onClick={this.selectCommentField}
                        />
                        {
                          this.props.commentList.count > 0 ?
                            <VideoPopupStyled.ChatCount>{this.props.commentList.count}</VideoPopupStyled.ChatCount>
                          : null
                        }
                        <VideoPopupStyled.ShareButton
                          title="Share this video"
                          onClick={this.toggleShare}
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
                        <VideoPopupStyled.CommentsList>
                          <Loader />
                        </VideoPopupStyled.CommentsList>
                    }
                    <VideoPopupStyled.PopupActions>
                      <VideoPopupStyled.CommentBoxWrapper>
                        {
                          !props.isLoggedIn ?
                            <VideoPopupStyled.LoginReminder
                              onClick={this.commentAdder}
                            >
                              <span>Log in</span> to comment
                            </VideoPopupStyled.LoginReminder>
                          :
                            <React.Fragment>
                              <VideoPopupStyled.CommentSendIcon
                                onClick={this.commentAdder}
                              />
                              <VideoPopupStyled.CommentBox
                                innerRef={(node) => { this.commentInput = node }}
                                placeholder="Add a comment..."
                                value={this.state.commentText}
                                onKeyUp={event => this.handleCommentEnter(event)}
                                onChange={event => this.handleCommentAdd(event)}
                              />
                            </React.Fragment>
                        }
                      </VideoPopupStyled.CommentBoxWrapper>
                    </VideoPopupStyled.PopupActions>
                  </VideoPopupStyled.VideoContent>
                </VideoPopupStyled.VideoPlayer>
              </React.Fragment>
            : <Loader />
          }
        </VideoPopupStyled.VideoContentWrapper>
        <VideoPopupStyled.SocialMediaWrapper innerRef={(node) => {this.shareWrapper = node;}} mobile visible={this.state.sharePopup}>
          <VideoPopupStyled.Drawer onClick={this.toggleShare} />
          <VideoPopupStyled.SocialHeading>Share</VideoPopupStyled.SocialHeading>
          {this.renderSocialIcons(props.selectedVideo)}
        </VideoPopupStyled.SocialMediaWrapper>
      </RequestFlowPopup>
    );
  }
}

const mapStateToProps = state => ({
  commentList: state.commentsList,
  isLoggedIn: state.session.isLoggedIn,
  loginModal: state.modals.loginModal,
});

const mapDispatchToProps = dispatch => ({
  fetchCommentsList: (videoId, offset, refresh) => dispatch((fetchCommentsList(videoId, offset, refresh))),
  resetCommentsList: () => dispatch(resetCommentsList()),
  toggleLogin: state => dispatch(toggleLogin(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoPopup);
