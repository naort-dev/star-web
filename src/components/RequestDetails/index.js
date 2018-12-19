import React from 'react';
import moment from 'moment';
import VideoRenderDiv from './styled';
import VideoPopup from '../VideoPopup';
import VideoPlayer from '../VideoPlayer';
import RequestFlowPopup from '../RequestFlowPopup';
import { requestTypes, requestTypeTitle } from '../../constants/requestTypes';
import OrderDetailsItem from '../OrderDetails/orderDetailsItem';
import StarRating from '../StarRating';
import { requestExpiryDays } from '../../constants';
import { numberToDollarFormatter } from '../../utils/dataformatter';
import { setVideoViewStatus } from '../../services/requestFeedback';
import { celebRequestStatusList, requestStatusList, openStatusList, celebOpenStatusList, celebCompletedStatusList, completedStatusList } from '../../constants/requestStatusList';

import { cloneDeep } from 'lodash';

export default class RequestDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coverImage: false,
      profileImage: false,
      videoPlayerProps: null,
      showDetails: false,
      showActions: false,
    };
    this.coverImage = new Image();
    this.profileImage = new Image();
    this.mounted = true;
    this.requestType = requestTypes;
    this.openColor = '#FF6C58';
    this.completedColor = '#64C937';
    this.cancelledColor = '#363636';
    this.videoRead = false;
  }
  componentWillMount() {
    this.coverImage.onload = () => {
      if (this.mounted) {
        this.setState({ coverImage: this.coverImage.src });
      }
    };
    this.coverImage.src = this.props.cover;
    this.profileImage.onload = () => {
      if (this.mounted) {
        this.setState({ profileImage: this.profileImage.src });
      }
    };
    this.profileImage.src = this.props.starMode ? this.props.fanProfile : this.props.profile;
    window.addEventListener('click', this.handleGlobalClick);
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  onVideoEnded = () => {
    const { requestStatus, requestVideo, orderDetails } = this.props;
    if (requestStatus === 6) { // completed video
      const finalVideo = requestVideo.find(video => video.video_status === 1); // find final video
      if (!finalVideo.read_status) {
        this.videoRead = true;
        setVideoViewStatus(finalVideo.video_id)
          .then((success) => {
            if (success) {
              finalVideo.read_status = true;
              const orderDetailsTemp = cloneDeep(orderDetails);
              const videoIndex = requestVideo.findIndex(video => video.video_status === 1);
              orderDetailsTemp.request_video[videoIndex] = finalVideo;
              this.props.updateVideosList(orderDetails.id, orderDetailsTemp);
            }
          });
      }
    }
  }

  getQaVideoData = (requestVideo) => {
    const { requestStatus, orderDetails } = this.props;
    let videoPlayerProps = {};
    if (requestStatus === 6) { // completed video
      requestVideo.forEach((video) => {
        if (video.video_status === 4) { // Question Video
          videoPlayerProps = {
            ...videoPlayerProps,
            ...video,
            ...orderDetails,
            question_answer_videos: {
              ...videoPlayerProps.question_answer_videos,
              question: video.s3_video_url,
              question_thumb: video.s3_thumbnail_url,
            },
            full_name: orderDetails.celebrity,
          };
        } else if (video.video_status === 5) { // Answer Video
          videoPlayerProps = {
            ...videoPlayerProps,
            question_answer_videos: {
              ...videoPlayerProps.question_answer_videos,
              answer_thumb: video.s3_thumbnail_url,
              answer: video.s3_video_url,
            },
          };
        }
      });
    } else {
      const questionVideo = requestVideo.filter(video => video.video_status === 4)[0]; // question video 
      videoPlayerProps = {
        primaryCover: questionVideo.s3_thumbnail_url ? questionVideo.s3_thumbnail_url : '',
        primarySrc: questionVideo.s3_video_url ? questionVideo.s3_video_url : '',
        ratio: questionVideo.width / questionVideo.height,
      };
    }
    return videoPlayerProps;
  }

  getStatusColor = (status) => {
    if (status === 'Open') {
      return this.openColor;
    } else if (status === 'Completed') {
      return this.completedColor;
    }
    return this.cancelledColor;
  }

  getOccasionDetails = (occasionType) => {
    const { props } = this;
    const occasionDate = props.orderDetails.request_details && props.orderDetails.request_details.date ? moment(props.orderDetails.request_details.date).format('LL') : '';
    const specificallyFor = props.orderDetails.request_details && props.orderDetails.request_details.specifically_for;
    const honoringFor = props.orderDetails.request_details && props.orderDetails.request_details.honoring_for;
    const fromWhere = props.orderDetails.request_details && props.orderDetails.request_details.from_where;
    const eventTitle = props.orderDetails.request_details && props.orderDetails.request_details.event_title;
    const eventGuestHonor = props.orderDetails.request_details && props.orderDetails.request_details.event_guest_honor;
    switch (occasionType) {
      case 1:
      case 5:
        return (
          <OrderDetailsItem title="Occasion Date" value={occasionDate} />
        );
      case 2:
        return <OrderDetailsItem title="What specifically for" value={specificallyFor} />;
      case 3:
        return <OrderDetailsItem title="Person of honor" value={honoringFor} />;
      case 4:
        return <OrderDetailsItem title={`${props.orderDetails.occasion} from`} value={fromWhere} />;
      case 6:
        return <OrderDetailsItem title="Event Title" value={eventTitle} />;
      case 7:
        return <OrderDetailsItem title="Guest of honor" value={eventGuestHonor} />;
      default:
        return null;
    }
  }

  getEventDetails = (eventType) => {
    const { props } = this;
    const occasionDate = props.orderDetails.request_details && props.orderDetails.request_details.date ? moment(props.orderDetails.request_details.date).format('LL') : '';
    const relationShip = props.orderDetails.request_details && props.orderDetails.request_details.relationship && props.orderDetails.request_details.relationship.title ? props.orderDetails.request_details.relationship.title : '';
    const stargramto = props.orderDetails.request_details && props.orderDetails.request_details.stargramto;
    const stargramfrom = props.orderDetails.request_details && props.orderDetails.request_details.stargramfrom;
    const importantInfo = props.orderDetails.request_details && props.orderDetails.request_details.important_info;
    const eventHost = props.orderDetails.request_details && props.orderDetails.request_details.event_host;
    const question = props.orderDetails.request_details && props.orderDetails.request_details.question;
    switch (eventType) {
      case 1:
        // Personal Shout-outs
        return (
          <React.Fragment>
            <OrderDetailsItem title="Occasion" value={props.orderDetails.occasion} />
            {
              stargramto &&
                <OrderDetailsItem title="To"
                  value={this.renderStargramDestinationDetails(stargramto, props.orderDetails.to_audio_file)}
                />
            }
            {
              stargramfrom &&
                <OrderDetailsItem title="From"
                  value={this.renderStargramDestinationDetails(stargramfrom, props.orderDetails.from_audio_file)}
                />
            }
            {
              stargramto !== 'Myself' && stargramfrom !== null && stargramto !== null &&
                <OrderDetailsItem title="Relationship" value={`${stargramfrom} is ${stargramto}'s ${relationShip}`} />
            }
            {
              this.getOccasionDetails(props.orderDetails.occasion_type)
            }
            <OrderDetailsItem title="Important Info" value={importantInfo} />
          </React.Fragment>
        );
      case 2:
        // Event Announcement
        return (
          <React.Fragment>
            <OrderDetailsItem title="Event" value={props.orderDetails.occasion} />
            {
              this.getOccasionDetails(props.orderDetails.occasion_type)
            }
            <OrderDetailsItem title="Host" value={eventHost} />
            <OrderDetailsItem title="Event Date" value={occasionDate} />
            <OrderDetailsItem title="Important Info" value={importantInfo} />
          </React.Fragment>
        );
      case 3:
        // Q&A
        return <OrderDetailsItem title="Title" value={question} />;
      default: return null;
    }
  }

  getMoreSettingsRef = (node) => {
    if (!this.moreSettings) {
      this.moreSettings = node;
    }
  }

  getMoreSettingsWrapperRef = (node) => {
    if (!this.moreSettingsWrapper) {
      this.moreSettingsWrapper = node;
    }
  }

  getTitle = () => {
    const { request_type: requestType, occasion } = this.props.orderDetails;
    if (requestType === 3) { // Q&A video
      return `Q&A ${requestTypeTitle[requestType]}`;
    }
    return `${occasion} ${requestTypeTitle[requestType]}`;
  }

  handleGlobalClick = (event) => {
    const moreSettingsClick = this.moreSettings && !this.moreSettings.contains(event.target)
    const moreSettingsWrapperClick = this.moreSettingsWrapper && !this.moreSettingsWrapper.contains(event.target)
    const shouldHide = moreSettingsClick && moreSettingsWrapperClick && this.state.showActions;
    if (shouldHide) {
      this.setState({ showActions: false });
    }
  }

  findTime = (fromDate, toDate, futureTime) => {
    let timeString = futureTime ? 'Due in' : '';
    if (this.props.starMode && this.props.requestStatus === 4) { // Processing Videos
      timeString = 'Completed (Processing)';
    } else {
      const timeDiff = toDate - fromDate;
      const diffDays = Math.floor(timeDiff / 86400000); // days
      const diffHrs = Math.floor((timeDiff % 86400000) / 3600000); // hours
      const diffMins = Math.round(((timeDiff % 86400000) % 3600000) / 60000); // minutes
      const diffAppend = futureTime ? '' : 'ago';
      if (diffDays >= 1) {
        if (futureTime && diffHrs > 0) {
          timeString = diffDays + 1 === 1 ? `${timeString} ${diffDays} day ${diffAppend}` : `${timeString} ${diffDays + 1} days ${diffAppend}`;
        } else {
          timeString = diffDays === 1 ? `${timeString} ${diffDays} day ${diffAppend}` : `${timeString} ${diffDays} days ${diffAppend}`;
        }
      } else if (diffHrs >= 1) {
        timeString = diffHrs === 1 ? `${timeString} ${diffHrs} hour ${diffAppend}` : `${timeString} ${diffHrs} hours ${diffAppend}`;
      } else if (diffMins >= 1) {
        timeString = diffMins === 1 ? `${timeString} ${diffMins} minute ${diffAppend}` : `${timeString} ${diffMins} minutes ${diffAppend}`;
      } else {
        timeString = `${timeString} ${futureTime ? diffAppend : 'just now'}`;
      }
    }
    return timeString;
  }

  activateVideo = () => {
    const { requestVideo, requestType, orderDetails, requestStatus } = this.props;
    if (requestVideo && requestVideo.length) {
      const selectedVideo = requestType === 3 ? this.getQaVideoData(requestVideo) : {
        ...requestVideo[0],
        ...orderDetails,
        full_name: orderDetails.celebrity,
      };
      if (requestStatus === 6) { // completed video
        this.setState({
          selectedVideo,
        });
      } else if (requestStatus !== 6 && requestType === 3) {
        this.setState({
          videoPlayerProps: selectedVideo,
        });
      }
    }
  }
  closeVideo = () => {
    const { requestStatus } = this.props;
    if (requestStatus === 6) { // completed video
      if (this.videoRead) {
        this.props.selectItem('rate');
        this.videoRead = false;
      }
    }
    this.setState({ selectedVideo: null, videoPlayerProps: null });
  }

  showDetails = () => {
    this.setState({ showDetails: !this.state.showDetails });
  }

  playAudio = (audioSrc) => {
    const audio = new Audio(audioSrc);
    audio.play();
  }

  toggleActions = () => {
    this.setState({ showActions: !this.state.showActions });
  }

  downloadVideo = () => {
    const { request_video: requestVideo, booking_title } = this.props.orderDetails;
    const finalVideo = requestVideo.filter(video => video.video_status === 1)[0];
    const link = document.createElement('a');
    link.target = '_blank';
    link.download = `${booking_title}`;
    link.href = finalVideo.s3_video_url;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  renderStargramDestinationDetails = (text, audioSrc) => {
    return (
      <React.Fragment>
        <span>
          {text}
        </span>
        {
          audioSrc &&
            <VideoRenderDiv.AudioIcon
              src="assets/images/voice.png"
              onClick={() => this.playAudio(audioSrc)}
            />
        }
      </React.Fragment>
    );
  }
  renderActions = () => {
    const { starMode, requestStatus, orderDetails } = this.props;
    const showRateButton = requestStatus === 6 && !starMode && !orderDetails.fan_rating;
    const celebVideoDownload = starMode && requestStatus === 6 && orderDetails.public_request;
    const fanVideoDownload = !starMode && requestStatus === 6;
    const canDownload = celebVideoDownload || fanVideoDownload;
    return (
      <React.Fragment>
        <VideoRenderDiv.MoreSettingsListItem onClick={() => this.props.selectItem('contact')}>Contact support</VideoRenderDiv.MoreSettingsListItem>
        <VideoRenderDiv.MoreSettingsListItem onClick={() => this.props.selectItem('report')}>Report abuse</VideoRenderDiv.MoreSettingsListItem>
        {showRateButton && <VideoRenderDiv.MoreSettingsListItem onClick={() => this.props.selectItem('rate')}>Rate</VideoRenderDiv.MoreSettingsListItem>}
        {
          canDownload && <VideoRenderDiv.MoreSettingsListItem onClick={this.downloadVideo}>Download video</VideoRenderDiv.MoreSettingsListItem>
        }
      </React.Fragment>
    )
  }

  renderActionButton = () => {
    const { requestStatus } = this.props;
    if (requestStatus !== 5) { // no actions for cancelled videos
      return (
        <VideoRenderDiv.MoreSettings innerRef={this.getMoreSettingsWrapperRef} onClick={this.toggleActions} alternate>
          <VideoRenderDiv.HorizontalHamburger />
          {
            this.state.showActions &&
              <VideoRenderDiv.MoreSettingsList innerRef={this.getMoreSettingsRef}>
                {this.renderActions()}
              </VideoRenderDiv.MoreSettingsList>
          }
        </VideoRenderDiv.MoreSettings>
      );
    }
    return null;
  }
  renderSecondaryControlButton = () => {
    const { starMode, requestStatus, orderDetails } = this.props;
    const starVideoShare = starMode && celebCompletedStatusList.indexOf(requestStatus) > -1 && orderDetails.public_request;
    const fanVideoShare = !starMode && completedStatusList.indexOf(requestStatus) > -1;
    const canVideoShare = (starVideoShare || fanVideoShare) && requestStatus !== 4;// 4 - processing video
    const canEdit = !starMode && orderDetails.editable;
    if (starMode && celebOpenStatusList.indexOf(requestStatus) > -1) {
      return <VideoRenderDiv.ControlButton onClick={() => this.props.selectItem('respond')}>Respond</VideoRenderDiv.ControlButton>;
    } else if (canVideoShare) {
      return <VideoRenderDiv.ShareButton onClick={() => this.props.selectItem('share')}>Share</VideoRenderDiv.ShareButton>;
    } else if (canEdit) { // completed video for fan
      return <VideoRenderDiv.ControlButton alternate onClick={() => this.props.selectItem('edit')}>Edit details</VideoRenderDiv.ControlButton>;
    }
    return null;
  }

  renderTimeLeft = () => {
    const { starMode, requestStatus, createdDate } = this.props;
    const finalCreatedDate = new Date(createdDate);
    const currentDate = new Date();
    const celebOpenRequest = starMode && celebOpenStatusList.indexOf(requestStatus) > -1;
    if (celebOpenRequest) {
      const expiryDate = new Date(createdDate);
      expiryDate.setDate(finalCreatedDate.getDate() + requestExpiryDays);
      return <VideoRenderDiv.RequestTime timeLeft>{this.findTime(currentDate, expiryDate, true)}</VideoRenderDiv.RequestTime>;
    }
    return null;
  }

  renderTime = () => {
    const { starMode, requestStatus, createdDate, orderDetails } = this.props;
    const finalCreatedDate = new Date(createdDate);
    const currentDate = new Date();
    const celebOpenRequest = starMode && celebOpenStatusList.indexOf(requestStatus) > -1;
    const celebCompletedRequest = starMode && celebCompletedStatusList.indexOf(requestStatus) > -1;
    const fanCompletedRequest = !starMode && completedStatusList.indexOf(requestStatus) > 1;
    if (fanCompletedRequest || celebCompletedRequest) {
      const completedDate = orderDetails.request_details ? new Date(orderDetails.request_details.date) : null;
      return <VideoRenderDiv.RequestTime>{this.findTime(completedDate, currentDate)}</VideoRenderDiv.RequestTime>;
    } else if (!celebOpenRequest) {
      return <VideoRenderDiv.RequestTime>{this.findTime(finalCreatedDate, currentDate)}</VideoRenderDiv.RequestTime>;
    }
    return null;
  }

  renderCancelButton = () => {
    const { requestStatus, starMode } = this.props;
    const celebCancellable = starMode && starMode && celebOpenStatusList.indexOf(requestStatus) > -1;
    const fanCancellable = !starMode && openStatusList.indexOf(requestStatus) > -1;
    if (celebCancellable) {
      return <VideoRenderDiv.TextButton onClick={() => this.props.selectItem('decline')}>Decline request</VideoRenderDiv.TextButton>;
    } else if (fanCancellable) {
      return <VideoRenderDiv.TextButton onClick={() => this.props.selectItem('cancel')}>Cancel request</VideoRenderDiv.TextButton>;
    }
    return null;
  }

  renderOrderDetails = () => {
    const { requestStatus, orderDetails, starMode } = this.props;
    const price = orderDetails.order_details ? orderDetails.order_details.amount: 0;
    const orderId = orderDetails.order_details ? orderDetails.order_details.order: '';
    const isPrivate = orderDetails.public_request ? 'No' : 'Yes';
    return (
      <React.Fragment>
        {
          !starMode &&
            <OrderDetailsItem title="Requested" value={moment(orderDetails.created_date).format('LL')} />
        }
        {
          this.getEventDetails(orderDetails.request_type)
        }
        {/* Show Reason if request is cancelled */}
        {
          requestStatus === 5 ?
            <OrderDetailsItem title="Decline Reason" value={orderDetails.comment} />
            : null
        }
        <OrderDetailsItem title="Private video" value={isPrivate} />
        {requestStatus === 6 && orderDetails.fan_rating !== null &&
          <OrderDetailsItem
            title="Rating"
            value={<StarRating rating={orderDetails.fan_rating ? orderDetails.fan_rating.fan_rate : 0} readOnly />}
          />
        }
        {requestStatus === 6 && orderDetails.fan_rating !== null &&
          <OrderDetailsItem
            title="Comments"
            value={orderDetails.fan_rating.comments}
          />
        }
        <OrderDetailsItem title="Order#" value={orderId} />
        {
          !starMode &&
            <OrderDetailsItem bold title="Booking Price" value={`${numberToDollarFormatter(price)}`} />
        }
      </React.Fragment>
    );
  }

  render() {
    const { props } = this;
    return (
      <VideoRenderDiv>
        {
          this.state.selectedVideo ?
            <VideoPopup
              selectedVideo={this.state.selectedVideo}
              onVideoEnded={this.onVideoEnded}
              noSlider
              closePopUp={this.closeVideo}
            />
          : null
        }
        {
          this.state.videoPlayerProps ?
            <RequestFlowPopup
              dotsCount={0}
              closePopUp={this.closeVideo}
              smallPopup
            >
              <VideoRenderDiv.VideoPlayerWrapper>
                <VideoPlayer onVideoEnded={this.onVideoEnded} {...this.state.videoPlayerProps} />                
              </VideoRenderDiv.VideoPlayerWrapper>
            </RequestFlowPopup>
          : null
        }
        <VideoRenderDiv.ProfileContent>
          <VideoRenderDiv.ImageSectionWrapper>
            <VideoRenderDiv.ImageSection
              onClick={this.activateVideo}
              height={props.imageHeight}
              imageUrl={this.state.coverImage}
            >
              {this.state.coverImage ? <VideoRenderDiv.PlayButton isVisible /> : null}
            </VideoRenderDiv.ImageSection>
            {
              props.starMode && props.orderDetails.fan_rating !== null &&
                <VideoRenderDiv.ReactionControl>
                  <VideoRenderDiv.ReactionControlText onClick={() => this.props.selectItem('reaction')} >
                    View reaction
                  </VideoRenderDiv.ReactionControlText>
                </VideoRenderDiv.ReactionControl>
            }
          </VideoRenderDiv.ImageSectionWrapper>
          <VideoRenderDiv.ContentWrapper>
            <VideoRenderDiv.ProfileDetailWrapper>
              <VideoRenderDiv.ProfileImageWrapper>
                <VideoRenderDiv.ProfileImage
                  imageUrl={this.state.profileImage}
                />
              </VideoRenderDiv.ProfileImageWrapper>
              <VideoRenderDiv.DetailWrapper>
                <VideoRenderDiv.StarName>
                  {props.starMode ? this.getTitle() : props.details}
                </VideoRenderDiv.StarName>
                {this.renderTime()}
                <VideoRenderDiv.StarDetails>{props.starMode ? props.fanName : props.starName }</VideoRenderDiv.StarDetails>
              </VideoRenderDiv.DetailWrapper>
            </VideoRenderDiv.ProfileDetailWrapper>
            <VideoRenderDiv.StatusDetailsWrapper>
              <VideoRenderDiv.StatusDetails>
                <VideoRenderDiv.RequestStatus
                  color={this.getStatusColor(props.starMode ? celebRequestStatusList[props.requestStatus] : requestStatusList[props.requestStatus])}
                  highlight={props.starMode ? celebOpenStatusList.indexOf(props.requestStatus) > -1 : openStatusList.indexOf(props.requestStatus) > -1}
                >
                  {props.starMode ? celebRequestStatusList[props.requestStatus] : requestStatusList[props.requestStatus]}
                </VideoRenderDiv.RequestStatus>
                {this.renderTimeLeft()}
              </VideoRenderDiv.StatusDetails>
              <VideoRenderDiv.ControlWrapper>
                <VideoRenderDiv.ControlButton onClick={this.showDetails} alternate>
                  {this.state.showDetails ? 'Hide details' : 'View details'}
                </VideoRenderDiv.ControlButton>
                {
                  this.renderSecondaryControlButton()
                }
                {
                  this.renderActionButton()
                }
              </VideoRenderDiv.ControlWrapper>
              <VideoRenderDiv.DetailsContainer isVisible={this.state.showDetails}>
                <VideoRenderDiv.ImageSection
                  mobile
                  onClick={this.activateVideo}
                  height={props.imageHeight}
                  imageUrl={this.state.coverImage}
                >
                  {this.state.coverImage ? <VideoRenderDiv.PlayButton isVisible /> : null}
                </VideoRenderDiv.ImageSection>
                <VideoRenderDiv.DetailsWrapper>
                  <VideoRenderDiv.DetailsTitle>Request Details</VideoRenderDiv.DetailsTitle>
                  <VideoRenderDiv.DetailsList>
                    {
                      this.renderOrderDetails()
                    }
                  </VideoRenderDiv.DetailsList>
                  {
                    this.renderCancelButton()
                  }
                </VideoRenderDiv.DetailsWrapper>
              </VideoRenderDiv.DetailsContainer>
            </VideoRenderDiv.StatusDetailsWrapper>
          </VideoRenderDiv.ContentWrapper>
        </VideoRenderDiv.ProfileContent>
      </VideoRenderDiv>
    );
  }
}

