import React from 'react';
import moment from 'moment';
import axios from 'axios';
import RequestVideoRecorder from '../../../../components/RequestVideoRecorder';
import OrderDetailsItem from '../../../../components/OrderDetails/orderDetailsItem';
import { numberToDollarFormatter } from '../../../../utils/dataformatter';
import getAWSCredentials from '../../../../utils/AWSUpload';
import { locations } from '../../../../constants/locations';
import StarRating from '../../../../components/StarRating';
import { recorder } from '../../../../constants/videoRecorder';
import VideoRecorderStyled from './styled';

export default class VideoRecorder extends React.Component {

  getOccasionDetails = (occasionType) => {
    const { props } = this;
    const occasionDate = props.orderDetails.request_details && props.orderDetails.request_details.date ? moment(props.orderDetails.request_details.date).format('LL') : '';
    switch (occasionType) {
      case 1:
      case 5:
        return (
          <OrderDetailsItem overlay title="Occasion Date" value={occasionDate} />
        );
      case 2:
        return <OrderDetailsItem overlay title="What specifically for" value={props.orderDetails.request_details.specifically_for} />;
      case 3:
        return <OrderDetailsItem overlay title="Person of honor" value={props.orderDetails.request_details.honoring_for} />;
      case 4:
        return <OrderDetailsItem overlay title={`${props.orderDetails.occasion} from`} value={props.orderDetails.request_details.from_where} />;
      case 6:
        return <OrderDetailsItem overlay title="Event Title" value={props.orderDetails.request_details.event_title} />;
      case 7:
        return <OrderDetailsItem overlay title="Guest of honor" value={props.orderDetails.request_details.event_guest_honor} />;
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
            <OrderDetailsItem overlay title="Occasion" value={props.orderDetails.occasion} />
            <OrderDetailsItem overlay title="To"
              value={this.renderStargramDestinationDetails(props.orderDetails.request_details.stargramto, props.orderDetails.to_audio_file)}
            />
            <OrderDetailsItem overlay title="From"
              value={this.renderStargramDestinationDetails(props.orderDetails.request_details.stargramfrom, props.orderDetails.from_audio_file)}
            />
            {
              props.orderDetails.request_details.stargramto !== 'Myself' && <OrderDetailsItem overlay title="Relationship" value={`${props.orderDetails.request_details.stargramfrom} is ${props.orderDetails.request_details.stargramto}'s ${relationShip}`} />
            }
            {
              this.getOccasionDetails(props.orderDetails.occasion_type)
            }
            <OrderDetailsItem overlay title="Important Info" value={props.orderDetails.request_details.important_info} />
          </React.Fragment>
        );
      case 2:
        // Event Announcement
        return (
          <React.Fragment>
            <OrderDetailsItem overlay title="Event" value={props.orderDetails.occasion} />
            {
              this.getOccasionDetails(props.orderDetails.occasion_type)
            }
            <OrderDetailsItem overlay title="Host" value={props.orderDetails.request_details.event_host} />
            <OrderDetailsItem overlay title="Event Date" value={occasionDate} />
            <OrderDetailsItem overlay title="Important Info" value={props.orderDetails.request_details.important_info} />
          </React.Fragment>
        );
      case 3:
        // Q&A
        return <OrderDetailsItem overlay title="Title" value={props.orderDetails.request_details.question} />;
      default: return null;
    }
  }

  playAudio = (audioSrc) => {
    const audio = new Audio(audioSrc);
    audio.play();
  }

  uploadVideoToAWS = (video) => {
    this.props.requestFetchStart();
    getAWSCredentials(locations.askAwsVideoCredentials, this.props.session.auth_token.authentication_token, video)
      .then((response) => {
        if (response && response.filename) {
          axios.post(response.url, response.formData).then(() => {
            this.props.responseVideo(this.props.orderDetails.id, response.filename);
            this.props.onComplete(true);
          })
            .catch((e) => {
              this.props.onComplete(false);
            });
        }
      });
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

  renderStargramDestinationDetails = (text, audioSrc) => {
    return (
      <React.Fragment>
        <span>
          {text}
        </span>
        {
          audioSrc &&
            <VideoRecorderStyled.AudioIcon
              src="assets/images/voice.png"
              onClick={() => this.playAudio(audioSrc)}
            />
        }
      </React.Fragment>
    );
  }

  renderOrderDetails = () => {
    const { props } = this;
    const price = props.orderDetails.order_details ? props.orderDetails.order_details.amount: 0;
    const isPrivate = props.orderDetails.public_request ? 'No' : 'Yes';
    return (
      <React.Fragment>
        {
          !props.starMode &&
            <OrderDetailsItem overlay title="Requested" value={moment(props.orderDetails.created_date).format('LL')} />
        }
        {
          this.getEventDetails(props.orderDetails.request_type)
        }
        {/* Show Reason if request is cancelled */}
        {
          props.requestStatusId === 5 ?
            <OrderDetailsItem overlay title="Decline Reason" value={props.orderDetails.comment} />
            : null
        }
        {
          !props.starMode &&
            <OrderDetailsItem overlay title="Private video" value={isPrivate} />
        }
        <OrderDetailsItem overlay bold title="Booking Price" value={`${numberToDollarFormatter(price)}`} />
        {props.requestStatusId === 6 &&
          <VideoRecorderStyled.DetailsItem>
            <VideoRecorderStyled.DetailsTitle>Rating:</VideoRecorderStyled.DetailsTitle>
            <VideoRecorderStyled.DetailsValue>
              <StarRating rating={props.orderDetails.fan_rating ? props.orderDetails.fan_rating.fan_rate : this.state.rate} readOnly />
            </VideoRecorderStyled.DetailsValue>
          </VideoRecorderStyled.DetailsItem>
        }
      </React.Fragment>
    )
  }

  render() {
    return (
      <VideoRecorderStyled>
        <RequestVideoRecorder
          {...this.props}
          overlayData={() => this.renderOrderDetails('overlay')}
          duration={recorder.askTimeOut}
          onSubmit={() => this.videoSubmit()}
        />
      </VideoRecorderStyled>
    )
  }
}
