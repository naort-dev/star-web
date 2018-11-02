import React from 'react';
import moment from 'moment';
import VideoRenderDiv from './styled';
import VideoPlayer from '../VideoPlayer';
import RequestFlowPopup from '../RequestFlowPopup';
import { requestTypes } from '../../constants/requestTypes';
import OrderDetailsItem from '../OrderDetails/orderDetailsItem';
import StarRating from '../StarRating';
import { celebRequestStatusList, requestStatusList, openStatusList, celebOpenStatusList, celebCompletedStatusList, completedStatusList } from '../../constants/requestStatusList';

export default class RequestDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coverImage: false,
      profileImage: false,
      videoPlayerProps: null,
      itemSelected: false,
      showDetails: false,
    };
    this.coverImage = new Image();
    this.profileImage = new Image();
    this.mounted = true;
    this.charLimit = 50;
    this.requestType = requestTypes;
    this.openColor = '#EA57A1';
    this.completedColor = '#64C937';
    this.cancelledColor = '#363636';
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
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  getQaVideoData = (requestVideo) => {
    let videoPlayerProps = {};
    requestVideo.forEach((video) => {
      if (video.video_status === 4) {
        videoPlayerProps = {
          ...videoPlayerProps,
          primaryCover: video.s3_thumbnail_url ? video.s3_thumbnail_url : '',
          primarySrc: video.s3_video_url ? video.s3_video_url : '',
          ratio: video.width / video.height,
        };
      } else if (video.video_status === 5) {
        videoPlayerProps = {
          ...videoPlayerProps,
          secondaryCover: video.s3_thumbnail_url ? video.s3_thumbnail_url : '',
          secondarySrc: video.s3_video_url ? video.s3_video_url : '',
          ratio: video.width / video.height,
        };
      }
    });
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

  findTime = () => {
    let timeString = '';
    if (this.props.starMode && this.props.requestStatus === 4) { // Processing Videos
      timeString = 'Completed';
    } else {
      const currentDate = new Date();
      const createdDate = new Date(this.props.createdDate);
      const timeDiff = currentDate - createdDate;
      const diffDays = Math.floor(timeDiff / 86400000); // days
      const diffHrs = Math.floor((timeDiff % 86400000) / 3600000); // hours
      const diffMins = Math.round(((timeDiff % 86400000) % 3600000) / 60000); // minutes
      if (diffDays >= 1) {
        timeString = diffDays === 1 ? `${timeString} ${diffDays} day ago` : `${timeString} ${diffDays} days ago`;
      } else if (diffHrs >= 1) {
        timeString = diffHrs === 1 ? `${timeString} ${diffHrs} hour ago` : `${timeString} ${diffHrs} hours ago`;
      } else if (diffMins >= 1) {
        timeString = diffMins === 1 ? `${timeString} ${diffMins} minute ago` : `${timeString} ${diffMins} minutes ago`;
      } else {
        timeString = `${timeString} just now`;
      }
    }
    return timeString;
  }

  activateVideo = () => {
    const { requestVideo, requestType } = this.props;
    if (requestVideo && requestVideo.length) {
      const videoPlayerProps = requestType === 3 ? this.getQaVideoData(requestVideo) : {
        primaryCover: requestVideo[0].s3_thumbnail_url ? requestVideo[0].s3_thumbnail_url : '',
        primarySrc: requestVideo[0].s3_video_url ? requestVideo[0].s3_video_url : '',
        ratio: requestVideo[0].width / requestVideo[0].height,
      };
      this.setState({
        videoPlayerProps,
      });
    }
  }
  closeVideo = () => {
    this.setState({ videoPlayerProps: null });
  }

  getOccasionDetails = (occasionType) => {
    const { props } = this;
    const occasionDate = props.orderDetails.request_details && props.orderDetails.request_details.date ? moment(props.orderDetails.request_details.date).format('LL') : '';
    switch (occasionType) {
      case 1:
      case 5:
        return (
          <OrderDetailsItem title="Occasion Date" value={occasionDate} />
        );
      case 2:
        return <OrderDetailsItem title="What specifically for" value={props.orderDetails.request_details.specifically_for} />;
      case 3:
        return <OrderDetailsItem title="Person of honor" value={props.orderDetails.request_details.honoring_for} />;
      case 4:
        return <OrderDetailsItem title={`${props.orderDetails.occasion} from`} value={props.orderDetails.request_details.from_where} />;
      case 6:
        return <OrderDetailsItem title="Event Title" value={props.orderDetails.request_details.event_title} />;
      case 7:
        return <OrderDetailsItem title="Guest of honor" value={props.orderDetails.request_details.event_guest_honor} />;
      default:
        return null;
    }
  }

  getEventDetails = (eventType) => {
    const { props } = this;
    const occasionDate = props.orderDetails.request_details && props.orderDetails.request_details.date ? moment(props.orderDetails.request_details.date).format('LL') : '';
    const relationShip = props.orderDetails.request_details && props.orderDetails.request_details.relationship && props.orderDetails.request_details.relationship.title ? props.orderDetails.request_details.relationship.title : '';
    switch (eventType) {
      case 1:
        // Personal Shout-outs
        return (
          <React.Fragment>
            <OrderDetailsItem title="Occasion" value={props.orderDetails.occasion} />
            <OrderDetailsItem title="To"
              value={this.renderStargramDestinationDetails(props.orderDetails.request_details.stargramto, props.orderDetails.to_audio_file)}
            />
            <OrderDetailsItem title="From"
              value={this.renderStargramDestinationDetails(props.orderDetails.request_details.stargramfrom, props.orderDetails.from_audio_file)}
            />
            <OrderDetailsItem title="Relationship" value={`${props.orderDetails.request_details.stargramfrom} is ${props.orderDetails.request_details.stargramto}'s ${relationShip}`} />
            {
              this.getOccasionDetails(props.orderDetails.occasion_type)
            }
            <OrderDetailsItem title="Important Info" value={props.orderDetails.request_details.important_info} />
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
            <OrderDetailsItem title="Host" value={props.orderDetails.request_details.event_host} />
            <OrderDetailsItem title="Event Date" value={occasionDate} />
            <OrderDetailsItem title="Important Info" value={props.orderDetails.request_details.important_info} />
          </React.Fragment>
        );
      case 3:
        // Q&A
        return <OrderDetailsItem title="Title" value={props.orderDetails.request_details.question} />;
      default: return null;
    }
  }

  selectItem = () => {
    this.props.selectItem();
  }

  showDetails = () => {
    this.setState({ showDetails: !this.state.showDetails });
  }

  playAudio = (audioSrc) => {
    const audio = new Audio(audioSrc);
    audio.play();
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

  // renderVideoDetails = (text) => {
  //   let splicedText = text;
  //   if (text.length > this.charLimit) {
  //     splicedText = text.substring(0, this.charLimit) + '...';
  //   }
  //   return splicedText;
  // }

  renderSecondaryControlButton = () => {
    const { starMode, requestStatus } = this.props;
    const starVideoShare = starMode && celebCompletedStatusList.indexOf(requestStatus > -1) && this.props.orderDetails.public_request;
    const fanVideoShare = !starMode && completedStatusList.indexOf(requestStatus) > -1;
    const canVideoShare = starVideoShare || fanVideoShare;
    const canEdit = !starMode && this.props.orderDetails.editable;
    if (starMode && celebOpenStatusList.indexOf(requestStatus) > -1) {
      return <VideoRenderDiv.ControlButton onClick={() => this.props.selectItem('respond')}>Respond</VideoRenderDiv.ControlButton>;
    } else if (canVideoShare) {
      return <VideoRenderDiv.ShareButton>Share</VideoRenderDiv.ShareButton>;
    } else if (canEdit) { // completed video for fan
      return <VideoRenderDiv.ShareButton onClick={() => this.props.selectItem('edit')}>Edit</VideoRenderDiv.ShareButton>;
    }
    return null;
  }

  renderTime = () => {
    const { starMode, requestStatus } = this.props;
    const isOpenRequest = (starMode && celebOpenStatusList.indexOf(requestStatus) > -1) || (!starMode && openStatusList.indexOf(requestStatus) > -1);
    if (isOpenRequest) {
      return <VideoRenderDiv.RequestTime>{this.findTime()}</VideoRenderDiv.RequestTime>;
    }
    return null;
  }

  renderOrderDetails = () => {
    const { props } = this;
    const price = props.orderDetails.order_details ? props.orderDetails.order_details.amount: 0;
    const isPrivate = props.orderDetails.public_request ? 'No' : 'Yes';
    return (
      <React.Fragment>
        {
          !props.starMode &&
            <OrderDetailsItem title="Requested" value={moment(props.orderDetails.created_date).format('LL')} />
        }
        {
          this.getEventDetails(props.orderDetails.request_type)
        }
        {/* Show Reason if request is cancelled */}
        {
          props.requestStatusId === 5 ?
            <OrderDetailsItem title="Decline Reason" value={props.orderDetails.comment} />
            : null
        }
        {
          !props.starMode &&
            <OrderDetailsItem title="Booking Price" value={`$${price}`} />
        }
        {
          !props.starMode &&
            <OrderDetailsItem title="Make this Video private" value={isPrivate} />
        }
        {props.requestStatusId === 6 &&
          <VideoRenderDiv.DetailsItem>
            <VideoRenderDiv.DetailsTitle>Rating:</VideoRenderDiv.DetailsTitle>
            <VideoRenderDiv.DetailsValue>
              <StarRating rating={props.orderDetails.fan_rating ? props.orderDetails.fan_rating.fan_rate : this.state.rate} readOnly />
            </VideoRenderDiv.DetailsValue>
          </VideoRenderDiv.DetailsItem>
        }
      </React.Fragment>
    )
  }

  render() {
    const { props } = this;
    return (
      <VideoRenderDiv>
        {
          this.state.videoPlayerProps ?
            <RequestFlowPopup
              dotsCount={0}
              closePopUp={this.closeVideo}
              smallPopup
            >
              <VideoRenderDiv.VideoPlayerWrapper>
                <VideoPlayer {...this.state.videoPlayerProps} />                
              </VideoRenderDiv.VideoPlayerWrapper>
            </RequestFlowPopup>
          : null
        }
        <VideoRenderDiv.ProfileContent>
          <VideoRenderDiv.ProfileDetailWrapper>
            <VideoRenderDiv.ProfileImageWrapper>
              <VideoRenderDiv.ProfileImage
                imageUrl={this.state.profileImage}
              />
            </VideoRenderDiv.ProfileImageWrapper>
            <VideoRenderDiv.DetailWrapper>
              <VideoRenderDiv.StarName>
                {props.starMode ? props.fanName : props.starName }
              </VideoRenderDiv.StarName>
              <VideoRenderDiv.StarDetails>{props.details}</VideoRenderDiv.StarDetails>
            </VideoRenderDiv.DetailWrapper>
          </VideoRenderDiv.ProfileDetailWrapper>
          <VideoRenderDiv.StatusDetailsWrapper>
            <VideoRenderDiv.StatusDetails>
              <VideoRenderDiv.StarDetails>Status</VideoRenderDiv.StarDetails>
              <VideoRenderDiv.RequestStatus
               color={this.getStatusColor(props.starMode ? celebRequestStatusList[props.requestStatus] : requestStatusList[props.requestStatus])}
               highlight={props.starMode ? celebOpenStatusList.indexOf(props.requestStatus) > -1 : openStatusList.indexOf(props.requestStatus) > -1}
              >
                {props.starMode ? celebRequestStatusList[props.requestStatus] : requestStatusList[props.requestStatus]}
              </VideoRenderDiv.RequestStatus>
              {this.renderTime()}
            </VideoRenderDiv.StatusDetails>
            <VideoRenderDiv.ControlWrapper>
              <VideoRenderDiv.ControlButton onClick={this.showDetails} alternate>
                {this.state.showDetails ? 'Hide details' : 'View details'}
              </VideoRenderDiv.ControlButton>
              {
                this.renderSecondaryControlButton()
              }
            </VideoRenderDiv.ControlWrapper>
            <VideoRenderDiv.DetailsContainer isVisible={this.state.showDetails}>
              <VideoRenderDiv.DetailsWrapper>
                {
                  this.renderOrderDetails()
                }
              </VideoRenderDiv.DetailsWrapper>
              <VideoRenderDiv.ImageSection
                onClick={this.activateVideo}
                height={props.imageHeight}
                imageUrl={this.state.coverImage}
              >
                {this.state.coverImage ? <VideoRenderDiv.PlayButton isVisible={this.state.showDetails} /> : null}
              </VideoRenderDiv.ImageSection>
            </VideoRenderDiv.DetailsContainer>
          </VideoRenderDiv.StatusDetailsWrapper>
        </VideoRenderDiv.ProfileContent>
      </VideoRenderDiv>
    );
  }
}

