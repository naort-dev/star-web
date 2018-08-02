import React from 'react';
import axios from 'axios';
import VideoPlayer from '../VideoPlayer';
import Header from '../Header';
import DeclinePopup from './DeclinePopup';
import SubmitPopup from './SubmitPopup';
import Popup from '../Popup';
import ShareView from './ShareView';
import VideoRecorder from '../WebRTCVideoRecorder';
import OrderDetailsItem from './orderDetailsItem';
import { locations } from '../../constants/locations';
import getAWSCredentials from '../../utils/AWSUpload';
import { starProfessionsFormater } from '../../utils/dataToStringFormatter';
import { recorder } from '../../constants/videoRecorder';
import { PaymentFooterController } from '../PaymentFooterController';
import Api from '../../lib/api';
import OrderStyled from './styled';


export default class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showActions: false,
      showPopup: false,
      declinePopup: false,
    };
  }

  getOccasionDetails = (occasionType) => {
    const { props } = this;
    switch (occasionType) {
      case 1:
      case 5:
        return (
          <OrderDetailsItem title="Occasion Date" value={props.occasionDate} />
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
    switch (eventType) {
      case 1:
        // Personal Shout-outs
        return (
          <React.Fragment>
            <OrderDetailsItem title="Occasion" value={props.orderDetails.occasion} />
            <OrderDetailsItem title="To" value={props.orderDetails.request_details.stargramto} />
            <OrderDetailsItem title="From" value={props.orderDetails.request_details.stargramfrom} />
            <OrderDetailsItem title={`${props.orderDetails.request_details.stargramfrom} is ${props.orderDetails.request_details.stargramto}'s`} value={props.relationShip} />
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
              this.getOccasionDetails(props.occasion_type)
            }
            <OrderDetailsItem title="Host" value={props.orderDetails.request_details.event_host} />
            <OrderDetailsItem title="Event Date" value={props.occasionDate} />
            <OrderDetailsItem title="Important Info" value={props.orderDetails.request_details.important_info} />
          </React.Fragment>
        );
      case 3:
        // Q&A
        return <OrderDetailsItem title="Title" value={props.orderDetails.request_details.question} />;
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
            this.closePopup();
            this.props.hideRequest();
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
    }
    const orderDetails = this.props.orderDetails;
    let bookingData = {
      edit: true,
      requestId: orderDetails.id,
      hostName: orderDetails.request_details.stargramfrom,
      userName: orderDetails.request_details.stargramto,
      date: this.props.createdDate,
    };
    let redirectUrl = '';
    if (orderDetails.request_type === 1) { // Shout Outs
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
      redirectUrl = `/${orderDetails.celebrity_id}/request/personal`;
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
      redirectUrl = `/${orderDetails.celebrity_id}/request/event`;
    }
    this.props.setBookingDetails(bookingData);
    this.props.history.push(redirectUrl);
  }

  handleBooking = () => {
    if (this.props.starMode) {
      let video;
      if (this.props.videoUploader.savedFile != null) {
        video = this.props.videoUploader.savedFile;
      } else {
        video = new File([this.props.videoRecorder.recordedBuffer], 'askVideo.mp4');
      }
      if (video) {
        this.uploadVideoToAWS(video);
      }
    } else {
      this.setState({ showPopup: true, declinePopup: true });
    }
  }

  closePopup = () => {
    this.setState({
      showPopup: false,
      declinePopup: false,
      showRatingPopup: false,
      showContactSupportPopup: false,
      showReportAbusePopup: false,
    });
  }

  changeRequestStatus = (requestId, requestStatus, reason) => {
    this.props.changeRequestStatus(requestId, requestStatus, reason);
    this.closePopup();
    this.props.hideRequest();
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
            props.requestStatusId === 6 && <ShareView title={title} shareUrl={shareUrl} />
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
              props.requestStatusId === 6 ?
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
          <VideoRecorder {...this.props} duration={recorder.askTimeOut} />
        </OrderStyled.VideoRecorder>
      );
    }
    return null;
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
    }
    return null;
  }

  renderActionList = () => (
    <OrderStyled.MoreActionsList>
      {!this.props.orderDetails.fan_rating && this.props.requestStatusId === 6 &&
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
      <OrderStyled>
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
        <OrderStyled.Header>
          <OrderStyled.HeaderNavigation
            onClick={() => props.hideRequest()}
          />
          <OrderStyled.HeaderTitle>
            {props.requestType}
          </OrderStyled.HeaderTitle>
        </OrderStyled.Header>
        <OrderStyled.DesktopHeader>
          <Header
            menuActive={false}
            enableMenu={() => { }}
            history={this.props.history}
          />
        </OrderStyled.DesktopHeader>
        <OrderStyled.ContentWrapper>
          <OrderStyled.leftContent>
            <OrderStyled.scrollWrapper
              autoHide
              renderView={props => <div {...props} className="order-details-scroll-wrapper" />}
            >
              {
                props.starMode && props.requestStatusId !== 4 && props.requestStatusId !== 5 && props.requestStatusId !== 6 ?
                  this.renderVideo(props, title, shareUrl, this.props.starMode)
                :
                  <OrderStyled.rightContent notStar>
                    {this.renderVideo(props, title, shareUrl)}
                  </OrderStyled.rightContent>
              }
              {
                !props.starMode &&
                  <OrderStyled.ProfileImageWrapper>
                    <OrderStyled.ProfileImage
                      imageUrl={props.orderDetails.avatar_photo && props.orderDetails.avatar_photo.thumbnail_url}
                    />
                    <OrderStyled.MoreActionsWrapper>
                      {this.props.requestStatusId !== 5 && <OrderStyled.MoreActionsIcon onClick={() => this.toggleActions()} />}
                      {
                        this.state.showActions && !this.props.starMode &&
                          this.renderActionList()
                      }
                    </OrderStyled.MoreActionsWrapper>
                    <OrderStyled.StarName>{props.orderDetails.celebrity}</OrderStyled.StarName>
                    <OrderStyled.StarProfessions>{starProfessionsFormater(props.orderDetails.professions)}</OrderStyled.StarProfessions>
                  </OrderStyled.ProfileImageWrapper>
              }
              <OrderStyled.MainTitle>Order Details</OrderStyled.MainTitle>
              <OrderStyled.DetailsWrapper>
                <OrderStyled.DetailsItem>
                  <OrderStyled.DetailsTitle>Status:</OrderStyled.DetailsTitle>
                  <OrderStyled.DetailsValue>{props.requestStatus}</OrderStyled.DetailsValue>
                </OrderStyled.DetailsItem>
                <OrderStyled.DetailsItem>
                  <OrderStyled.DetailsTitle>Requested:</OrderStyled.DetailsTitle>
                  <OrderStyled.DetailsValue>{props.createdDate}</OrderStyled.DetailsValue>
                </OrderStyled.DetailsItem>
                {
                  this.getEventDetails(props.orderDetails.request_type)
                }
                {/* Show Reason if request is cancelled */}
                {
                  props.requestStatusId === 5 ?
                    <OrderDetailsItem title="Decline Reason" value={props.orderDetails.comment} />
                    : null
                }
                <OrderStyled.DetailsItem>
                  <OrderStyled.DetailsTitle>Booking Price:</OrderStyled.DetailsTitle>
                  <OrderStyled.DetailsValue>${props.price}</OrderStyled.DetailsValue>
                </OrderStyled.DetailsItem>
                <OrderStyled.DetailsItem>
                  <OrderStyled.DetailsTitle>Make this Video private:</OrderStyled.DetailsTitle>
                  <OrderStyled.DetailsValue>{props.isPrivate}</OrderStyled.DetailsValue>
                </OrderStyled.DetailsItem>
                <OrderStyled.DetailsItem>
                  <OrderStyled.DetailsTitle>Order#:</OrderStyled.DetailsTitle>
                  <OrderStyled.DetailsValue>{props.orderId}</OrderStyled.DetailsValue>
                </OrderStyled.DetailsItem>
              </OrderStyled.DetailsWrapper>
            </OrderStyled.scrollWrapper>
            {/* Show only if request is not cancelled or not completed or not processing */}
            {
              props.requestStatusId !== 4 && props.requestStatusId !== 5 && props.requestStatusId !== 6 &&
                <OrderStyled.ControlWrapper>
                  <PaymentFooterController
                    buttonMode
                    modifyBooking={this.modifyBooking}
                    handleBooking={this.handleBooking}
                    modifyButtonName={this.props.starMode ? 'Cancel' : (this.props.orderDetails.editable ? 'Edit Request' : '')}
                    buttonName={!this.props.starMode ? 'Cancel' : 'Send'}
                  />
                </OrderStyled.ControlWrapper>
            }
          </OrderStyled.leftContent>
          <OrderStyled.rightContent>
            <OrderStyled.CloseButton onClick={() => props.hideRequest()} />
            {
              props.starMode && props.requestStatusId !== 4 && props.requestStatusId !== 5 && props.requestStatusId !== 6 ?
                this.renderVideoRecorder(props)
              : <OrderStyled.VideoContainer>{this.renderVideo(props, title, shareUrl)}</OrderStyled.VideoContainer>
            }
          </OrderStyled.rightContent>
        </OrderStyled.ContentWrapper>
      </OrderStyled>
    );
  }
}
