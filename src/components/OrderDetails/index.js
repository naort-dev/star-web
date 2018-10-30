import React from 'react';
import axios from 'axios';
import Scrollbars from 'react-custom-scrollbars';
import VideoPlayer from '../VideoPlayer';
import RequestFlowPopup from '../RequestFlowPopup';
import DeclinePopup from './DeclinePopup';
import AlertPopup from './AlertPopup';
import SubmitPopup from './SubmitPopup';
import Popup from '../Popup';
import ShareView from './ShareView';
import RequestVideoRecorder from '../RequestVideoRecorder';
import OrderDetailsItem from './orderDetailsItem';
import { locations } from '../../constants/locations';
import getAWSCredentials from '../../utils/AWSUpload';
import { recorder } from '../../constants/videoRecorder';
import Api from '../../lib/api';
import OrderStyled from './styled';
import StarRating from '../StarRating';


export default class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showActions: false,
      showPopup: false,
      declinePopup: false,
      recordMode: props.recordMode,
      audioUrl: null,
    };
  }

  getOccasionDetails = (occasionType, isOverlay) => {
    const { props } = this;
    switch (occasionType) {
      case 1:
      case 5:
        return (
          <OrderDetailsItem overlay={isOverlay} title="Occasion Date" value={props.occasionDate} />
        );
      case 2:
        return <OrderDetailsItem overlay={isOverlay} title="What specifically for" value={props.orderDetails.request_details.specifically_for} />;
      case 3:
        return <OrderDetailsItem overlay={isOverlay} title="Person of honor" value={props.orderDetails.request_details.honoring_for} />;
      case 4:
        return <OrderDetailsItem overlay={isOverlay} title={`${props.orderDetails.occasion} from`} value={props.orderDetails.request_details.from_where} />;
      case 6:
        return <OrderDetailsItem overlay={isOverlay} title="Event Title" value={props.orderDetails.request_details.event_title} />;
      case 7:
        return <OrderDetailsItem overlay={isOverlay} title="Guest of honor" value={props.orderDetails.request_details.event_guest_honor} />;
      default:
        return null;
    }
  }

  getEventDetails = (eventType, isOverlay) => {
    const { props } = this;
    switch (eventType) {
      case 1:
        // Personal Shout-outs
        return (
          <React.Fragment>
            <OrderDetailsItem overlay={isOverlay} title="Occasion" value={props.orderDetails.occasion} />
            <OrderDetailsItem overlay={isOverlay} title="To"
              value={this.renderStargramDestinationDetails(props.orderDetails.request_details.stargramto, props.orderDetails.to_audio_file)}
            />
            <OrderDetailsItem overlay={isOverlay} title="From"
              value={this.renderStargramDestinationDetails(props.orderDetails.request_details.stargramfrom, props.orderDetails.from_audio_file)}
            />
            <OrderDetailsItem overlay={isOverlay} title="Relationship" value={`${props.orderDetails.request_details.stargramfrom} is ${props.orderDetails.request_details.stargramto}'s ${props.relationShip}`} />
            {
              this.getOccasionDetails(props.orderDetails.occasion_type, isOverlay)
            }
            <OrderDetailsItem overlay={isOverlay} title="Important Info" value={props.orderDetails.request_details.important_info} />
          </React.Fragment>
        );
      case 2:
        // Event Announcement
        return (
          <React.Fragment>
            <OrderDetailsItem overlay={isOverlay} title="Event" value={props.orderDetails.occasion} />
            {
              this.getOccasionDetails(props.orderDetails.occasion_type, isOverlay)
            }
            <OrderDetailsItem overlay={isOverlay} title="Host" value={props.orderDetails.request_details.event_host} />
            <OrderDetailsItem overlay={isOverlay} title="Event Date" value={props.occasionDate} />
            <OrderDetailsItem overlay={isOverlay} title="Important Info" value={props.orderDetails.request_details.important_info} />
          </React.Fragment>
        );
      case 3:
        // Q&A
        return <OrderDetailsItem overlay={isOverlay} title="Title" value={props.orderDetails.request_details.question} />;
      default: return null;
    }
  }

  uploadVideoToAWS = (video) => {
    this.props.requestFetchStart();
    getAWSCredentials(locations.askAwsVideoCredentials, this.props.session.auth_token.authentication_token, video)
      .then((response) => {
        if (response && response.filename) {
          axios.post(response.url, response.formData).then(() => {
            this.props.responseVideo(this.props.orderDetails.id, response.filename);
            this.setState({
              showPopup: true,
              uploadSuccess: true,
            });
          });
        }
      });
  }

  toggleActions = () => {
    this.setState({ showActions: !this.state.showActions });
  }

  downloadVideo = (videoId) => {
    const videoUrl = Api.downloadVideo(videoId);
    const element = document.createElement('a');
    element.setAttribute('href', videoUrl);
    element.setAttribute('download', 'video.mp4');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  modifyBooking = () => {
    if (this.props.starMode) {
      this.setState({ showPopup: true, declinePopup: true });
    } else {
      const orderDetails = this.props.orderDetails;
      let bookingData = {
        edit: true,
        requestId: orderDetails.id,
        hostName: orderDetails.request_details.stargramto,
        userName: orderDetails.request_details.stargramfrom,
        date: orderDetails.request_details.date,
      };
      this.props.fetchCelebDetails(orderDetails.celebrity_id);
      let selectedRequestType = '';
      if (orderDetails.request_type === 1) { // Shout Outs
        bookingData = {
          ...bookingData,
          eventName: orderDetails.occasion,
          relationshipValue: orderDetails.request_details.relationship && orderDetails.request_details.relationship.id,
          otherRelationValue: orderDetails.request_details.relationship && orderDetails.request_details.relationship.title,
          type: 1,
          publicRequest: orderDetails.public_request,
          occasionType: orderDetails.occasion_type,
          selectedValue: orderDetails.occasion_id,
          selectedPersonal: orderDetails.request_details.stargramto !== 'Myself' ? '2' : '1',
          specification: orderDetails.request_details.specifically_for,
          importantinfo: orderDetails.request_details.important_info,
          from_audio_file: orderDetails.from_audio_file,
          to_audio_file: orderDetails.to_audio_file,
        };
        this.props.saveAudioRecording('from', { recordedBlob: null, recordedUrl: orderDetails.from_audio_file }); // update from audio in request flow
        this.props.saveAudioRecording('for', { recordedBlob: null, recordedUrl: orderDetails.to_audio_file }); // update to audio in request flow
        selectedRequestType = 'personal';
      } else if (orderDetails.request_type === 2) { // events
        bookingData = {
          ...bookingData,
          eventName: orderDetails.occasion,
          relationshipValue: orderDetails.request_details.relationship && orderDetails.request_details.relationship.id,
          type: 1,
          publicRequest: orderDetails.public_request,
          occasionType: orderDetails.occasion_type,
          selectedValue: orderDetails.occasion_id,
          selectedPersonal: orderDetails.request_details.stargramfrom !== 'Myself' ? '2' : '1',
          specification: orderDetails.request_details.specifically_for,
          importantinfo: orderDetails.request_details.important_info,
          // otherRelationValue:undefined,
          from_audio_file: orderDetails.from_audio_file,
          to_audio_file: orderDetails.from_whereto_audio_file,
        };
        selectedRequestType = 'event';
      } else if (orderDetails.request_type === 3) { // Q&A
        bookingData = {
          ...bookingData,
          question: orderDetails.booking_title,
          requestVideo: orderDetails.request_video
        };
        selectedRequestType = 'ask';
      }
      this.props.setBookingDetails(bookingData);
      this.props.history.push(`/${orderDetails.celebrity_id}`);
      this.props.setRequestFlow(orderDetails.celebrity_id, selectedRequestType, 1);
    }
  }

  videoSubmit = () => {
    let video;
    if (this.props.videoUploader.savedFile != null) {
      video = this.props.videoUploader.savedFile;
    } else {
      video = this.props.videoRecorder.recordedBuffer ? new File([this.props.videoRecorder.recordedBuffer], 'askVideo.mp4') : null;
    }
    if (video) {
      this.uploadVideoToAWS(video);
    }
  }

  handleBooking = () => {
    if (this.props.starMode) {
      this.setState({ recordMode: true });
    } else {
      this.setState({ showPopup: true, declinePopup: true });
    }
  }

  closePopup = (rate) => {
    if (this.state.uploadSuccess) this.props.hideRequest();
    this.setState({
      showPopup: false,
      declinePopup: false,
      showRatingPopup: false,
      showContactSupportPopup: false,
      showReportAbusePopup: false,
      audioUrl: null,
      uploadSuccess: false,
      rate,
    });
  }

  changeRequestStatus = (requestId, requestStatus, reason) => {
    this.props.changeRequestStatus(requestId, requestStatus, reason);
    this.closePopup();
    this.props.hideRequest();
  }

  playAudio(audioSrc){
    const audio = new Audio(audioSrc)
    audio.play()
  }

  renderRecordTitle = () => {
    if (this.props.orderDetails.request_type === 1) {
      return `Shout-out request from ${this.props.orderDetails.fan}`
    } else if (this.props.orderDetails.request_type === 2) {
      return `Announcement request from ${this.props.orderDetails.fan}`
    }
    return `Answer ${this.props.orderDetails.fan}'s question`;
  }

  renderOrderDetails = (isOverlay) => {
    const { props } = this;
    return (
      <React.Fragment>
        {
          !props.starMode &&
            <OrderStyled.DetailsItem overlay={isOverlay}>
              <OrderStyled.DetailsTitle overlay={isOverlay}>Requested</OrderStyled.DetailsTitle>
              <OrderStyled.DetailsValue overlay={isOverlay}>{props.createdDate}</OrderStyled.DetailsValue>
            </OrderStyled.DetailsItem>
        }
        {
          this.getEventDetails(props.orderDetails.request_type, isOverlay)
        }
        {/* Show Reason if request is cancelled */}
        {
          props.requestStatusId === 5 ?
            <OrderDetailsItem overlay={isOverlay} title="Decline Reason" value={props.orderDetails.comment} />
            : null
        }
        {
          !props.starMode &&
            <OrderStyled.DetailsItem overlay={isOverlay}>
              <OrderStyled.DetailsTitle overlay={isOverlay}>Booking Price</OrderStyled.DetailsTitle>
              <OrderStyled.DetailsValue overlay={isOverlay}>${props.price}</OrderStyled.DetailsValue>
            </OrderStyled.DetailsItem>
        }
        {
          !props.starMode &&
            <OrderStyled.DetailsItem overlay={isOverlay}>
              <OrderStyled.DetailsTitle overlay={isOverlay}>Make this Video private</OrderStyled.DetailsTitle>
              <OrderStyled.DetailsValue overlay={isOverlay}>{props.isPrivate}</OrderStyled.DetailsValue>
            </OrderStyled.DetailsItem>
        }
        {props.requestStatusId === 6 &&
          <OrderStyled.DetailsItem overlay={isOverlay}>
            <OrderStyled.DetailsTitle overlay={isOverlay}>Rating:</OrderStyled.DetailsTitle>
            <OrderStyled.DetailsValue overlay={isOverlay}>
              <StarRating rating={props.orderDetails.fan_rating ? props.orderDetails.fan_rating.fan_rate : this.state.rate} readOnly />
            </OrderStyled.DetailsValue>
          </OrderStyled.DetailsItem>
        }
      </React.Fragment>
    )
  }

  renderStargramDestinationDetails = (text, audioSrc) => {
    return (
      <React.Fragment>
        <span>
          {text}
        </span>
        {
          audioSrc &&
            <OrderStyled.AudioIcon
              src='assets/images/voice.png'
              onClick={() => this.playAudio(audioSrc)}
            />
        }
      </React.Fragment>
    );
  }

  renderVideo = (props, title, shareUrl, starMode) => {
    if (props.requestVideo) {
      return (
        <React.Fragment>
          <OrderStyled.VideoContentWrapper starMode={starMode} width={props.requestVideo.videoWidth} height={props.requestVideo.videoHeight}>
            <VideoPlayer
              videoWidth="100%"
              videoHeight="100%"
              primaryCover={props.requestVideo.s3_thumbnail_url ? props.requestVideo.s3_thumbnail_url : ''}
              primarySrc={props.requestVideo.s3_video_url ? props.requestVideo.s3_video_url : ''}
            />
          </OrderStyled.VideoContentWrapper>
          {/* Show Share only for completed videos */}
          {
            props.requestStatusId === 6 && ((!props.starMode) || (props.starMode && props.orderDetails.public_request)) ?
              <ShareView title={title} shareUrl={shareUrl} />
            : null
          }
          <OrderStyled.VideoDetails>
            <OrderStyled.VideoTitle>
              {props.orderDetails.booking_title}
            </OrderStyled.VideoTitle>
            <OrderStyled.VideoRequester>
              <OrderStyled.VideoRequestImage
                imageUrl={props.orderDetails.fan_photo && props.orderDetails.fan_photo.thumbnail_url}
              />
              <OrderStyled.VideoRequestName>
                {props.orderDetails.fan}
              </OrderStyled.VideoRequestName>
            </OrderStyled.VideoRequester>
            {
              props.requestStatusId === 6 && ((!props.starMode) || (props.starMode && props.orderDetails.public_request)) ?
                <OrderStyled.DownloadVideo
                  onClick={() => this.downloadVideo(props.requestVideo.video_id)}
                >
                  Download
                </OrderStyled.DownloadVideo>
                : null
            }
          </OrderStyled.VideoDetails>
        </React.Fragment>
      );
    } else if (!props.starMode) {
      return (
        <OrderStyled.NoVideoText>
          {
            props.requestStatusId !== 5 ?
              'The request has been sent. Stay tuned!'
              : 'This request has been cancelled.'
          }
        </OrderStyled.NoVideoText>
      );
    }
    return null;
  }

  renderVideoRecorder = (props) => {
    // Show only if request is not cancelled or not completed or not processing
    if (props.requestStatusId !== 4 && props.requestStatusId !== 5 && props.requestStatusId !== 6) {
      return (
        <OrderStyled.VideoRecorder>
          <RequestVideoRecorder
            {...this.props}
            overlayData={() => this.renderOrderDetails('overlay')}
            duration={recorder.askTimeOut}
            onSubmit={() => this.videoSubmit()}
          />
        </OrderStyled.VideoRecorder>
      );
    }
    return (
      <OrderStyled.NoVideoText>
        Your Video upload is complete and is now being processed for
        better streaming. This will take a few minutes. The requester will be notified as
        soon as it is ready.
      </OrderStyled.NoVideoText>
    );
  }

  renderPopup = () => {
    if (this.state.declinePopup) {
      return (
        <DeclinePopup
          changeRequestStatus={reason => this.changeRequestStatus(this.props.orderDetails.id, 5, reason)} // to cancel a request
          starMode={this.props.starMode}
          closePopup={this.closePopup}
          requestType={this.props.orderDetails.request_type}
        />
      );
    } else if (this.state.uploadSuccess) {
      return (<AlertPopup
        message={`Thank you! Your video has been sent to ${this.props.orderDetails.fan}`}
        closePopup={this.closePopup}
      />);
    } else if (this.state.showRatingPopup) {
      return (
        <SubmitPopup
          heading="Rate video"
          onSubmit={data => this.props.rateCelebrity({
            celebrity: this.props.orderDetails.celebrity_id,
            fan_rate: data.rating.toString(),
            starsona: this.props.orderDetails.id,
            comments: data.comment,
          })}
          closePopup={this.closePopup}
          onRatingSuccess={() => this.setState({ hideRating: true })}
        />
      );
    } else if (this.state.showContactSupportPopup) {
      return (
        <SubmitPopup
          heading="Contact support"
          onSubmit={data => this.props.contactSupport({ comments: data.comment })}
          closePopup={this.closePopup}
        />
      );
    } else if (this.state.showReportAbusePopup) {
      return (
        <SubmitPopup
          heading="Report abuse"
          onSubmit={data => this.props.reportAbuse({
            celebrity: this.props.orderDetails.celebrity_id,
            abuse_comment: data.comment,
          })}
          closePopup={this.closePopup}
        />
      );
    } else if (this.state.audioUrl) {
      return (
        <audio src={this.state.audioUrl} controls />
      );
    }
    return null;
  }

  renderActionList = () => (
    <OrderStyled.MoreActionsList>
      {!this.props.orderDetails.fan_rating && this.props.requestStatusId === 6 && !this.state.hideRating &&
        <OrderStyled.MoreActionsItem
          onClick={() => {
            this.toggleActions();
            this.setState({ showPopup: true, showRatingPopup: true });
          }}
        >
          Rate celebrity
        </OrderStyled.MoreActionsItem>}
      <OrderStyled.MoreActionsItem
        onClick={() => {
          this.toggleActions();
          this.setState({ showPopup: true, showContactSupportPopup: true });
        }}
      >
        Contact support
      </OrderStyled.MoreActionsItem>
      {this.props.requestStatusId === 6 &&
      <OrderStyled.MoreActionsItem
        onClick={() => {
          this.toggleActions();
          this.setState({ showPopup: true, showReportAbusePopup: true });
        }}
      >
        Report abuse
      </OrderStyled.MoreActionsItem>}
    </OrderStyled.MoreActionsList>
  )

  render() {
    const { props } = this;
    let shareUrl = '';
    let title = '';
    if (this.props.requestVideo) {
      const defaultUrl = this.props.requestVideo.video_url;
      shareUrl = `https://${defaultUrl}`;
      title = props.orderDetails.booking_title;
    }
    return (
      <React.Fragment>
        {
          this.state.showPopup &&
            <Popup
              smallPopup
              closePopUp={this.closePopup}
            >
              {
                this.renderPopup()
              }
            </Popup>
        }
        <RequestFlowPopup
          dotsCount={0}
          closePopUp={() => this.props.hideRequest()}
          smallPopup
        >
          {
            this.state.recordMode && props.starMode &&
              <OrderStyled.BackButton onClick={() => this.setState({ recordMode: false })} />
          }
          {
            this.state.recordMode && props.starMode ?
              this.renderVideoRecorder(props)
            :
              <OrderStyled buttonsEnabled={props.requestStatusId !== 4 && props.requestStatusId !== 5 && props.requestStatusId !== 6}>
                <OrderStyled.Header>New {props.requestType} request</OrderStyled.Header>
                <OrderStyled.ProfileImageWrapper>
                  <OrderStyled.ProfileImage
                    imageUrl={props.orderDetails.avatar_photo && props.orderDetails.avatar_photo.thumbnail_url}
                  />
                  <OrderStyled.ProfileDetailsWrapper>
                    <OrderStyled.StarName>{props.orderDetails.celebrity}</OrderStyled.StarName>
                    <OrderStyled.ProfileDetails>ORDER#: {props.orderId}</OrderStyled.ProfileDetails>
                    <OrderStyled.ProfileDetails>STATUS: <span>{props.requestStatus}</span></OrderStyled.ProfileDetails>
                  </OrderStyled.ProfileDetailsWrapper>
                </OrderStyled.ProfileImageWrapper>
                <OrderStyled.ContentWrapper>
                  <OrderStyled.leftContent>
                    <OrderStyled.DetailsWrapper>
                      {
                        this.renderOrderDetails()
                      }
                    </OrderStyled.DetailsWrapper>
                  </OrderStyled.leftContent>
                </OrderStyled.ContentWrapper>
                {
                  props.requestStatusId !== 4 && props.requestStatusId !== 5 && props.requestStatusId !== 6 &&
                    <OrderStyled.ActionButtonWrapper>
                      {
                        props.starMode &&
                          <OrderStyled.ActionButton onClick={this.handleBooking}>
                            Respond
                          </OrderStyled.ActionButton>
                      }
                      {
                        !props.starMode && this.props.orderDetails.editable &&
                          <OrderStyled.ActionButton onClick={this.modifyBooking}>
                            Edit request
                          </OrderStyled.ActionButton>
                      }
                      <OrderStyled.ActionButton onClick={props.starMode ? this.modifyBooking : this.handleBooking} secondary>
                        { props.starMode ? 'Decline Request' : 'Cancel request' }
                      </OrderStyled.ActionButton>
                    </OrderStyled.ActionButtonWrapper>
                }
              </OrderStyled>
          }
        </RequestFlowPopup>
      </React.Fragment>
      
    );
  }
}
