import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Helmet from 'react-helmet';
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
import { requestTypeTitle, requestTypes } from '../../../../constants/requestTypes';
import VideoPlayer from '../../../../components/VideoPlayer';
import SnackBar from '../../../../components/SnackBar';
import Loader from '../../../../components/Loader';
import Popup from '../../../../components/Popup';
import VideoShareStyled from './styled';
import { setMetaTags } from '../../../../utils/setMetaTags';
import { fetchCommentsList, addVideoComment, resetCommentsList } from '../../../../store/shared/actions/getVideoComments';
import { toggleLogin } from '../../../../store/shared/actions/toggleModals';

class VideoShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sharePopup: false,
      commentText: '',
      snackBarText: '',
    };
  }

  componentWillMount() {
    this.props.fetchCommentsList(this.props.selectedVideo.video_id, 0, true);
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

  addVideoComment = (videoId, comment) => {
    this.setState({ commentText: '' });
    this.props.addVideoComment(videoId, comment)
      .then(() => {
        if (this.scrollBarRef) {
          this.scrollBarRef.scrollIntoView({ behavior: 'smooth' });
        }
      });
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
    const { commentText } = this.state;
    if (commentText.trim('')) {
      this.addVideoComment(this.props.selectedVideo.video_id, this.state.commentText)
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
            subject={emailSubject}
            body={emailBody}
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
        <VideoShareStyled.Somenetwork isCancel onClick={this.toggleShare}>
          Cancel
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
        <Helmet
          title={props.selectedVideo.videoTitle}
          meta={[...setMetaTags(
            props.selectedVideo.videoTitle,
            props.selectedVideo ? props.selectedVideo.s3_thumbnail_url : '../../assets/images/profile.png',
            `Get your personalized video from ${props.selectedVideo.full_name}`,
          ),
          { property: 'al:ios:app_store_id', content: env('iosAppId') },
          { property: 'al:ios:url', content: `${env('androidAppId')}://profile/?profile_id=${this.props.match.params.id.toLowerCase()}` },
          { property: 'al:ios:app_name', content: 'Starsona' },
          { property: 'al:android:package', content: env('androidAppId') },
          { property: 'al:android:url', content: `${env('androidAppId')}://profile/${this.props.match.params.id.toLowerCase()}` },
          { property: 'al:android:app_name', content: 'Starsona' },
          ]}
        />
        {
          this.state.sharePopup &&
            <VideoShareStyled.Overlay onClick={this.toggleShare} />
        }
        {
          this.state.sharePopup &&
            <VideoShareStyled.SocialMediaWrapper>
              <Popup
                smallPopup
                closePopUp={this.toggleShare}
              >
                { this.renderSocialIcons(props.selectedVideo) }
              </Popup>
            </VideoShareStyled.SocialMediaWrapper>
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
                    <Link to={`/${props.selectedVideo.celebrity_id}`}>
                      <VideoShareStyled.VideoRequestImage
                        imageUrl={props.selectedVideo.avatar_photo && props.selectedVideo.avatar_photo.thumbnail_url}
                      />
                      <VideoShareStyled.VideoRequestName>
                        {props.selectedVideo.full_name}
                        <VideoShareStyled.VideoTitle>
                          {this.renderRequesttitle()}
                        </VideoShareStyled.VideoTitle>
                      </VideoShareStyled.VideoRequestName>                    
                    </Link>
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
                        <Link to={`/${props.selectedVideo.celebrity_id}`}>
                          <VideoShareStyled.VideoRequestImage
                            imageUrl={props.selectedVideo.avatar_photo && props.selectedVideo.avatar_photo.thumbnail_url}
                          />
                          <VideoShareStyled.VideoRequestName>
                            {props.selectedVideo.full_name}
                            <VideoShareStyled.VideoTitle>
                              {this.renderRequesttitle()}
                            </VideoShareStyled.VideoTitle>
                          </VideoShareStyled.VideoRequestName>
                        </Link>
                      </VideoShareStyled.StarLink>
                      <VideoShareStyled.UserActions mobile>
                        <VideoShareStyled.ShareButton
                          onClick={this.toggleShare}
                        />
                        <VideoShareStyled.ChatIcon
                          onClick={() => this.selectCommentField()}
                          chatCount={this.props.commentList.count}
                        />
                        <VideoShareStyled.VideoDate>
                          {this.findTime(props.selectedVideo.created_date)}
                        </VideoShareStyled.VideoDate>
                      </VideoShareStyled.UserActions>
                    </VideoShareStyled.VideoRequester>
                    {
                      !this.props.commentList.loading || this.props.commentList.data.length ?
                        <VideoShareStyled.CommentsList>
                          {
                            this.props.commentList.data.length < this.props.commentList.count && this.props.commentList.data.length ?
                              <VideoShareStyled.commentItem>
                                <VideoShareStyled.loadMoreComments isLoading={this.props.commentList.loading} onClick={this.loadMoreComments}>
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
                          {/* <VideoShareStyled.commentListScrollbar
                            innerRef={(node) => { this.scrollBarRef = node }}
                            autoHeight
                            renderView={props => <div {...props} className="comments-list-scrollbar" id="scrollable-target" />}
                          > */}
                            {
                              props.commentList.data.map((item, index) => (
                                <VideoShareStyled.commentItem key={index}>
                                  <VideoShareStyled.commenterName>
                                    {item.user && item.user.get_short_name}
                                    <VideoShareStyled.comment>
                                      {item.comments}
                                    </VideoShareStyled.comment>
                                  </VideoShareStyled.commenterName>
                                </VideoShareStyled.commentItem>
                              ))
                            }
                            {
                              !this.props.commentList.loading && !this.props.commentList.data.length ?
                                <VideoShareStyled.commentItem>No comments yet</VideoShareStyled.commentItem>
                              : null
                            }
                          {/* </VideoShareStyled.commentListScrollbar> */}
                          <li ref={(node) => this.scrollBarRef = node} />
                        </VideoShareStyled.CommentsList>
                      :
                        <VideoShareStyled.loaderWrapper>
                          <Loader />
                        </VideoShareStyled.loaderWrapper>
                    }
                    <VideoShareStyled.UserActions>
                      <VideoShareStyled.ShareButton
                        onClick={this.toggleShare}
                      />
                      <VideoShareStyled.ChatIcon
                        onClick={() => this.selectCommentField()}
                        chatCount={this.props.commentList.count}
                      />
                      <VideoShareStyled.VideoDate>
                        {this.findTime(props.selectedVideo.created_date)}
                      </VideoShareStyled.VideoDate>
                    </VideoShareStyled.UserActions>
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
                                onClick={this.commentAdder}
                              />
                              <VideoShareStyled.CommentBox
                                innerRef={(node) => { this.commentInput = node; }}
                                placeholder="Add a comment..."
                                value={this.state.commentText}
                                onKeyUp={event => this.handleCommentEnter(event)}
                                onChange={event => this.handleCommentAdd(event)}
                              />
                            </React.Fragment>
                        }
                      </VideoShareStyled.CommentBoxWrapper>
                    </VideoShareStyled.PopupActions>
                  </VideoShareStyled.VideoContent>
                  <VideoShareStyled.SocialMediaWrapper mobile visible={this.state.sharePopup}>
                    <VideoShareStyled.Drawer onClick={this.toggleShare} />
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
  addVideoComment: (videoId, comment) => dispatch(addVideoComment(videoId, comment)),
  resetCommentsList: () => dispatch(resetCommentsList()),
  toggleLogin: state => dispatch(toggleLogin(state)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VideoShare));
