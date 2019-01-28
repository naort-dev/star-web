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
import addVideoComment from '../../../../services/addVideoComment';
import { starProfessionsFormater } from '../../../../utils/dataToStringFormatter';
import { requestTypeTitle } from '../../../../constants/requestTypes';
import VideoPlayer from '../../../../components/VideoPlayer';
import SnackBar from '../../../../components/SnackBar';
import Loader from '../../../../components/Loader';
import VideoShareStyled from './styled';
import { fetchCommentsList, resetCommentsList } from '../../../../store/shared/actions/getVideoComments';
import { toggleLogin } from '../../../../store/shared/actions/toggleModals';

class VideoShare extends React.Component {
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
      const offset = this.props.commentList.data[this.props.commentList.data.length - 1].id;
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

  toggleShare = () => {
    this.setState({ sharePopup: !this.state.sharePopup });
  }

  renderRequesttitle = () => {
    const { selectedVideo } = this.props;
    if (selectedVideo.booking_type === 3) { // Q&A video
      return `Q&A ${requestTypeTitle[selectedVideo.booking_type]}`;
    }
    return `${selectedVideo.occasion} ${requestTypeTitle[selectedVideo.booking_type]}`;
  }

  renderSocialIcons = (selectedVideo) => {
    const defaultUrl = selectedVideo.video_url;
    const shareUrl = `https://${defaultUrl}`;
    const title = selectedVideo.booking_title;
    return (
      <React.Fragment>
        <VideoShareStyled.Somenetwork>
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="Demo__some-network__share-button"
          >
            <FacebookIcon
              size={32}
              round
            />
            <VideoShareStyled.SocialTitle>Share to Facebook</VideoShareStyled.SocialTitle>
          </FacebookShareButton>
        </VideoShareStyled.Somenetwork>
        <VideoShareStyled.Somenetwork>
          <GooglePlusShareButton
            url={shareUrl}
            className="Demo__some-network__share-button"
          >
            <GooglePlusIcon
              size={32}
              round
            />
            <VideoShareStyled.SocialTitle>Share to Google Plus</VideoShareStyled.SocialTitle>
          </GooglePlusShareButton>
        </VideoShareStyled.Somenetwork>
        <VideoShareStyled.Somenetwork>
          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button"
          >
            <TwitterIcon
              size={32}
              round
            />
            <VideoShareStyled.SocialTitle>Share to Twitter</VideoShareStyled.SocialTitle>
          </TwitterShareButton>
        </VideoShareStyled.Somenetwork>
        <VideoShareStyled.Somenetwork>
          <WhatsappShareButton
            url={shareUrl}
            title={title}
            separator=":: "
            className="Demo__some-network__share-button"
          >
            <WhatsappIcon size={32} round />
            <VideoShareStyled.SocialTitle>Share to Whatsapp</VideoShareStyled.SocialTitle>
          </WhatsappShareButton>
        </VideoShareStyled.Somenetwork>
        <VideoShareStyled.Somenetwork>
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
            <VideoShareStyled.SocialTitle>Share via Email</VideoShareStyled.SocialTitle>
          </EmailShareButton>
        </VideoShareStyled.Somenetwork>
        <VideoShareStyled.Somenetwork onClick={() => this.copyUrl(shareUrl)}>
          <VideoShareStyled.Copy title="Copy to Clipboard" />
          <VideoShareStyled.SocialTitle>Copy link</VideoShareStyled.SocialTitle>
        </VideoShareStyled.Somenetwork>
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
      <VideoShareStyled>
        {
          this.state.sharePopup &&
            <VideoShareStyled.Overlay onClick={this.toggleShare} />
        }
        <VideoShareStyled.VideoContentWrapper>
          {
            this.state.snackBarText !== '' &&
              <SnackBar text={this.state.snackBarText} closeSnackBar={this.closeSnackBar} />
          }
          {
            !props.videoPopupLoading ?
              <React.Fragment>
                <VideoShareStyled.VideoPlayer>
                  <VideoShareStyled.StarLink mobile>
                    <VideoShareStyled.VideoRequestImage
                      imageUrl={props.selectedVideo.avatar_photo && props.selectedVideo.avatar_photo.thumbnail_url}
                    />
                    <VideoShareStyled.VideoRequestName>
                      {props.selectedVideo.full_name}
                      <VideoShareStyled.VideoTitle>
                        {this.renderRequesttitle()}
                      </VideoShareStyled.VideoTitle>
                    </VideoShareStyled.VideoRequestName>
                  </VideoShareStyled.StarLink>
                  <VideoShareStyled.VideoPlayerWrapper>
                    <VideoPlayer onVideoEnded={this.onVideoEnded} {...videoPlayerProps} />
                    {
                      !props.noSlider &&
                        <React.Fragment>
                          <VideoShareStyled.LeftSliderArrow onClick={() => props.changeVideo(props.selectedVideoIndex - 1)} />
                          <VideoShareStyled.RightSliderArrow onClick={() => props.changeVideo(props.selectedVideoIndex + 1)} />
                        </React.Fragment>
                    }
                  </VideoShareStyled.VideoPlayerWrapper>
                  <VideoShareStyled.VideoContent>
                    <VideoShareStyled.VideoRequester>
                      <VideoShareStyled.StarLink>
                        <VideoShareStyled.VideoRequestImage
                          imageUrl={props.selectedVideo.avatar_photo && props.selectedVideo.avatar_photo.thumbnail_url}
                        />
                        <VideoShareStyled.VideoRequestName>
                          {props.selectedVideo.full_name}
                          <VideoShareStyled.VideoTitle>
                            {this.renderRequesttitle()}
                          </VideoShareStyled.VideoTitle>
                        </VideoShareStyled.VideoRequestName>
                      </VideoShareStyled.StarLink>
                      <VideoShareStyled.UserActions>
                        <VideoShareStyled.ShareButton
                          onClick={this.toggleShare}
                        />
                        <VideoShareStyled.ChatIcon
                          onClick={() => this.selectCommentField()}
                          chatCount={this.props.commentList.count}
                        />
                      </VideoShareStyled.UserActions>
                      {this.findTime(props.selectedVideo.created_date)}
                    </VideoShareStyled.VideoRequester>
                    <VideoShareStyled.PopupActions>
                      <VideoShareStyled.CommentBoxWrapper>
                        {
                          !props.isLoggedIn ?
                            <VideoShareStyled.LoginReminder
                              onClick={() => this.props.toggleLogin(true)}
                            >
                              <span>Log in</span> to comment
                            </VideoShareStyled.LoginReminder>
                          :
                            <React.Fragment>
                              <VideoShareStyled.CommentSendIcon
                                onClick={() => this.commentAdder()}
                              />
                              <VideoShareStyled.CommentBox
                                innerRef={(node) => { this.commentInput = node; }}
                                placeholder="Enter your comment"
                                value={this.state.commentText}
                                onKeyUp={event => this.handleCommentEnter(event)}
                                onChange={event => this.handleCommentAdd(event)}
                              />
                            </React.Fragment>
                        }
                      </VideoShareStyled.CommentBoxWrapper>
                    </VideoShareStyled.PopupActions>
                    {
                      !this.props.commentList.loading || this.props.commentList.data.length ?
                        <VideoShareStyled.CommentsList>
                          <VideoShareStyled.commentListScrollbar
                            innerRef={(node) => { this.scrollBarRef = node }}
                            renderView={props => <div {...props} className="comments-list-scrollbar" id="scrollable-target" />}
                          >
                            {
                              props.commentList.data.map((item, index) => (
                                <VideoShareStyled.commentItem key={index}>
                                  {/* <VideoShareStyled.commenterImage
                                    imageUrl={item.user && item.user.image_url}
                                  /> */}
                                  <VideoShareStyled.commenterName>
                                    {item.user && item.user.get_short_name}
                                    <VideoShareStyled.comment>
                                      {item.comments}
                                    </VideoShareStyled.comment>
                                    {/* <VideoShareStyled.commentDate>
                                      {this.findTime(item.created_date)}
                                    </VideoShareStyled.commentDate> */}
                                  </VideoShareStyled.commenterName>
                                </VideoShareStyled.commentItem>
                              ))
                            }
                            {
                              this.props.commentList.data.length < this.props.commentList.count && this.props.commentList.data.length ?
                                <VideoShareStyled.commentItem>
                                  <VideoShareStyled.loadMoreComments onClick={() => this.loadMoreComments()}>
                                    Load more comments
                                  </VideoShareStyled.loadMoreComments>
                                </VideoShareStyled.commentItem>
                              : null
                            }
                            {
                              this.props.commentList.data.length && this.props.commentList.loading ?
                                <VideoShareStyled.loaderWrapper>
                                  <Loader />
                                </VideoShareStyled.loaderWrapper>
                              : null
                            }
                            {
                              !this.props.commentList.loading && !this.props.commentList.data.length ?
                                <VideoShareStyled.commentItem>No comments yet</VideoShareStyled.commentItem>
                              : null
                            }
                          </VideoShareStyled.commentListScrollbar>
                        </VideoShareStyled.CommentsList>
                      :
                        <VideoShareStyled.loaderWrapper>
                          <Loader />
                        </VideoShareStyled.loaderWrapper>
                    }
                  </VideoShareStyled.VideoContent>
                  <VideoShareStyled.SocialMediaWrapper visible={this.state.sharePopup}>
                    <VideoShareStyled.SocialHeading>Share</VideoShareStyled.SocialHeading>
                    {this.renderSocialIcons(props.selectedVideo)}
                  </VideoShareStyled.SocialMediaWrapper>
                </VideoShareStyled.VideoPlayer>
              </React.Fragment>
            : <Loader />
          }
        </VideoShareStyled.VideoContentWrapper>
      </VideoShareStyled>
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

export default connect(mapStateToProps, mapDispatchToProps)(VideoShare);
