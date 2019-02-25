import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import addVideoComment from '../../services/addVideoComment';
import { starProfessionsFormater, shareTitleGenerator } from '../../utils/dataToStringFormatter';
import VideoPlayer from '../VideoPlayer';
import Loader from '../Loader';
import RequestFlowPopup from '../RequestFlowPopup';
import ShareView from '../ShareView';
import VideoPopupStyled from './styled';
import { fetchCommentsList, resetCommentsList } from '../../store/shared/actions/getVideoComments';
import { toggleLogin } from '../../store/shared/actions/toggleModals';

class VideoPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: '',
      shareView: false,
    };
    this.commentSelected = false;
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
      this.setState({
        commentText: '',
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
  }
  onVideoEnded = () => {
    if (this.props.onVideoEnded) {
      this.props.onVideoEnded();
    }
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

  toggleShare = () => {
    const { shareView } = this.state;
    this.setState({ shareView: !shareView });
  }

  addVideoComment = (videoId, comment) => {
    this.setState({ commentText: '' });
    addVideoComment(videoId, comment)
      .then(() => {
        this.props.fetchCommentsList(this.props.selectedVideo.video_id, 0, true)
          .then(() => {
            if (this.scrollBarRef) {
              this.scrollBarRef.scrollToBottom();
            }
          });
      });
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
    return (
      <VideoPopupStyled>
        <RequestFlowPopup
          noDisableScroll={props.noDisableScroll}
          autoWidth
          dotsCount={0}
          selectedDot={1}
          closePopUp={props.closePopUp}
          preventScroll={this.state.sharePopup}
          largePopup
        >
          <VideoPopupStyled.VideoContentWrapper shareActive={this.state.shareView}>
            {
              this.state.shareView &&
                <ShareView
                  closePopUp={this.toggleShare}
                  title={shareTitleGenerator(props.selectedVideo.booking_type, props.selectedVideo.full_name)}
                  emailSubject={`Check out this video from ${props.selectedVideo.full_name} !`}
                  body={shareTitleGenerator(props.selectedVideo.booking_type, props.selectedVideo.full_name)}
                  shareUrl={`https://${props.selectedVideo.video_url}`}
                />
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
        </RequestFlowPopup>
      </VideoPopupStyled>
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
