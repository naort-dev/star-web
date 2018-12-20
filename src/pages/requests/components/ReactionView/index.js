import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import Loader from '../../../../components/Loader';
import StarRating from '../../../../components/StarRating';
import VideoPlayer from '../../../../components/VideoPlayer';
import { requestTypeTitle } from '../../../../constants/requestTypes';
import { getReactions } from '../../../../services/requestFeedback';
import addVideoComment from '../../../../services/addVideoComment';
import { fetchCommentsList, resetCommentsList } from '../../../../store/shared/actions/getVideoComments';
import ReactionStyled from './styled';

class ReactionView extends React.Component {
  constructor(props) {
    super(props);
    const { request_details: requestDetails } = props.orderDetails;
    this.date = requestDetails ? requestDetails.date : null;
  }

  state = {
    reactionsLoading: true,
    reactions: [],
    commentText: '',
    tipDetails: {},
  }

  componentDidMount() {
    const { orderDetails } = this.props;
    const { request_video: requestVideo } = orderDetails;
    const videoId = requestVideo.find(video => video.video_status === 1).video_id; // find the completed video id.
    this.videoId = videoId;
    this.props.fetchCommentsList(videoId, 0, true);
    getReactions(this.props.orderDetails.booking_id)
      .then((reactions) => {
        this.setState({ reactions: reactions.reactionFiles, tipDetails: reactions.tipDetails, reactionsLoading: false });
      });
  }

  componentWillUnmount() {
    this.props.resetCommentsList();
  }

  getTitle = () => {
    const { request_type: requestType, occasion } = this.props.orderDetails;
    if (requestType === 3) { // Q&A video
      return `Q&A ${requestTypeTitle[requestType]}`;
    }
    return `${occasion} ${requestTypeTitle[requestType]}`;
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
      this.props.fetchCommentsList(this.videoId, offset);
    }
  }

  addVideoComment = (videoId, comment) => {
    this.setState({ commentText: '' });
    addVideoComment(videoId, comment)
      .then(() => {
        this.props.fetchCommentsList(this.videoId, 0, true);
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
    if (this.state.commentText !== '') {
      this.addVideoComment(this.videoId, this.state.commentText);
    }
  }

  handleCommentEnter = (event) => {
    if (event.keyCode === 13) {
      this.commentAdder();
    }
  }

  renderSlides = (sliderProps) => {
    if (sliderProps.fileType === 1) {
      return <img src={sliderProps.original} alt="reaction" />;
    }
    return <VideoPlayer fill primarySrc={sliderProps.original} />;
  }

  renderReactions = () => {
    const { reactions } = this.state;
    const sliderItems = reactions.map((reaction) => {
      return {
        original: reaction.s3_reaction_file_url,
        thumbnail: '',
        fileType: reaction.file_type,
      };
    });
    if (sliderItems) {
      return (
        <ImageGallery
          items={sliderItems}
          showThumbnails={false}
          showFullscreenButton={false}
          useBrowserFullscreen={false}
          showPlayButton={false}
          autoPlay={false}
          renderItem={this.renderSlides}
          slideInterval={8000}
          showBullets
        />
      );
    }
    return null;
  }

  render() {
    const { orderDetails, closePopup, fanProfile } = this.props;
    const { tipDetails } = this.state;
    return (
      <ReactionStyled>
        <ReactionStyled.BackButton onClick={closePopup} />
        <ReactionStyled.Header>
          Fan reaction
          <StarRating rating={orderDetails.fan_rating ? orderDetails.fan_rating.fan_rate : 0} readOnly />
        </ReactionStyled.Header>
        {
          this.state.reactionsLoading &&
            <Loader />
        }
        {
          this.state.reactions.length !== 0 &&
            <ReactionStyled.MediaWrapper>
              {
                this.renderReactions()
              }
            </ReactionStyled.MediaWrapper>
        }
        {
          !this.state.reactionsLoading && this.state.reactions.length === 0 &&
            <ReactionStyled.OrderDetailsWrapper>
              <ReactionStyled.ProfileImage
                imageUrl={fanProfile}
              />
              <ReactionStyled.BookingTitle>
                {this.getTitle()} for {orderDetails.celebrity}
              </ReactionStyled.BookingTitle>
              {
                this.date &&
                  <ReactionStyled.DateDetails>
                    Completed on
                    &nbsp;{moment(this.date).format('MMM')} {moment(this.date).format('DD')}
                  </ReactionStyled.DateDetails>
              }
            </ReactionStyled.OrderDetailsWrapper>
        }
        {
          orderDetails.fan_rating && orderDetails.fan_rating.comments ?
            <ReactionStyled.RowItem>
              <ReactionStyled.RowItemHeader>
                {`Message from ${orderDetails.fan}`}
              </ReactionStyled.RowItemHeader>
              {orderDetails.fan_rating.comments}
            </ReactionStyled.RowItem>
          : null
        }
        {
          orderDetails.fan_rating.fan_rate <= 2 && orderDetails.fan_rating.reason ?
            <ReactionStyled.RowItem>
              <ReactionStyled.RowItemHeader>
                What went wrong
              </ReactionStyled.RowItemHeader>
              <ReactionStyled.ReasonItem>
                {orderDetails.fan_rating.reason}
              </ReactionStyled.ReasonItem>
            </ReactionStyled.RowItem>
          : null
        }
        {
          orderDetails.fan_rating.fan_rate > 3 && Object.keys(tipDetails).length > 0 && tipDetails.amount !== 0 ?
            <ReactionStyled.RowItem>
              <ReactionStyled.RowItemHeader>
                Tip
              </ReactionStyled.RowItemHeader>
              {orderDetails.fan} has tipped you <b>${parseInt(tipDetails.amount, 0)}</b>
            </ReactionStyled.RowItem>
          : null
        }
        <ReactionStyled.PopupActions>
          <ReactionStyled.CommentBoxWrapper>
            <ReactionStyled.CommentSendIcon
              onClick={() => this.commentAdder()}
            />
            <ReactionStyled.CommentBox
              innerRef={(node) => { this.commentInput = node }}
              placeholder="Enter your comment"
              value={this.state.commentText}
              onKeyUp={event => this.handleCommentEnter(event)}
              onChange={event => this.handleCommentAdd(event)}
            />
          </ReactionStyled.CommentBoxWrapper>
        </ReactionStyled.PopupActions>
        {
          !this.props.commentList.loading || this.props.commentList.data.length ?
            <ReactionStyled.CommentsList>
              {
                this.props.commentList.data.map((item, index) => (
                  <ReactionStyled.commentItem key={index}>
                    <ReactionStyled.commenterImage
                      imageUrl={item.user && item.user.image_url}
                    />
                    <ReactionStyled.commenterName>
                      {item.user && item.user.get_short_name}
                      <ReactionStyled.comment>
                        {item.comments}
                      </ReactionStyled.comment>
                      <ReactionStyled.commentDate>
                        {this.findTime(item.created_date)}
                      </ReactionStyled.commentDate>
                    </ReactionStyled.commenterName>
                  </ReactionStyled.commentItem>
                ))
              }
              {
                this.props.commentList.data.length < this.props.commentList.count && this.props.commentList.data.length ?
                  <ReactionStyled.commentItem>
                    <ReactionStyled.loadMoreComments onClick={() => this.loadMoreComments()}>
                      Load more comments
                    </ReactionStyled.loadMoreComments>
                  </ReactionStyled.commentItem>
                : null
              }
              {
                this.props.commentList.data.length && this.props.commentList.loading ?
                  <ReactionStyled.loaderWrapper>
                    <Loader />
                  </ReactionStyled.loaderWrapper>
                : null
              }
              {
                !this.props.commentList.loading && !this.props.commentList.data.length ?
                  <ReactionStyled.commentItem>No comments yet</ReactionStyled.commentItem>
                : null
              }
            </ReactionStyled.CommentsList>
          :
            <ReactionStyled.loaderWrapper>
              <Loader />
            </ReactionStyled.loaderWrapper>
        }
      </ReactionStyled>
    );
  }
}

const mapStateToProps = state => ({
  commentList: state.commentsList,
});

const mapDispatchToProps = dispatch => ({
  fetchCommentsList: (videoId, offset, refresh) => dispatch((fetchCommentsList(videoId, offset, refresh))),
  resetCommentsList: () => dispatch(resetCommentsList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReactionView);
