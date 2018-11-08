import React from 'react';
import moment from 'moment';
import RequestVideoRecorder from '../../../../components/RequestVideoRecorder';
import OrderDetailsItem from '../../../../components/OrderDetails/orderDetailsItem';
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
            {
              props.orderDetails.request_details.stargramto !== 'Myself' && <OrderDetailsItem title="Relationship" value={`${props.orderDetails.request_details.stargramfrom} is ${props.orderDetails.request_details.stargramto}'s ${relationShip}`} />
            }
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
            <OrderDetailsItem title="Private video" value={isPrivate} />
        }
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
