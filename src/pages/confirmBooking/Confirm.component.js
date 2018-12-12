import React from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { Request, HeaderSection, ConfirmationModal } from '../../pages/confirmBooking/styled';
import { ImageStack } from '../../components/ImageStack';
import OrderDetailsItem from '../../components/OrderDetails/orderDetailsItem';
import Loader from '../../components/Loader';
import './confirmCss';
import VideoPlayer from '../../components/VideoPlayer';
import fetchAWSVideo from '../../services/getAwsVideo';
import Popup from '../../components/Popup';
import { PaymentFooterController } from '../../components/PaymentFooterController';
import StripeCheckout from '../../components/StripeCheckout';
import { starProfessionsFormater } from '../../utils/dataToStringFormatter';

export default class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingData: {},
      publicRequest: true,
      audioUrl: null,
      QAVideo: {
        url: null,
        error: '',
      },
    };
  }
  componentWillMount() {
    const StoreEmpty = this.checkDataInStore(this.props.bookingData);
    let bookingData;
    if (StoreEmpty) {
      if (localStorage && localStorage.getItem('bookingData')) {
        const localStorageValue = localStorage.getItem('bookingData');
        bookingData = JSON.parse(localStorageValue);
        this.updateDataToStore();
      }
    } else {
      bookingData = this.props.bookingData;
    }
    if (bookingData.type === 3) {
      fetchAWSVideo(this.props.authToken, bookingData.fileName)
        .then((videoUrl) => {
          this.setState({ QAVideo: { ...this.state.QAVideo, url: videoUrl } });
        }).catch((exception) => {
          this.setState({ QAVideo: { ...this.state.QAVideo, error: "Something unexpected happened" } });
        });
    } //QA video
    this.updatePublicStatus(bookingData);
    this.setState({
      bookingData,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.paymentStatus !== nextProps.paymentStatus && nextProps.paymentStatus) {
      this.props.changeStep(this.props.currentStepCount + 1);
    }
  }

  getOccasionDetails = (occasionType) => {
    const { props } = this;
    const that = props.bookingData;
    switch (occasionType) {
      case 1:
      case 5:
        return (
          <OrderDetailsItem title="Occasion Date" value={moment(that.date).format('MMM DD, YYYY')} />
        );
      case 2:
        return <OrderDetailsItem title="What specifically for" value={that.specification} />;
      case 3:
        return <OrderDetailsItem title="Person of honor" value={that.specification} />;
      case 4:
        return <OrderDetailsItem title={`${that.eventName} from`} value={that.specification} />;
      case 6:
        return <OrderDetailsItem title="Event Title" value={that.eventdetailName} />;
      case 7:
        return <OrderDetailsItem title="Guest of honor" value={that.hostName} />;
      default:
        return null;
    }
  }

  getEventDetails = (eventType) => {
    const { props } = this;
    const that = props.bookingData;
    switch (eventType) {
      case 1:
        // Personal Shout-outs
        return (
          <React.Fragment>
            <OrderDetailsItem title="Occasion" value={that.eventName} />
            <OrderDetailsItem title="To"
              value={this.renderStargramDestinationDetails(that.hostName, props.toAudio && props.toAudio.recordedUrl)}
            />
            <OrderDetailsItem title="From"
              value={this.renderStargramDestinationDetails(that.userName, props.fromAudio && props.fromAudio.recordedUrl)}
            />
            <OrderDetailsItem title={`${that.userName} is ${that.hostName}'s`} value={that.relationship} />
            {
              this.getOccasionDetails(that.occasionType)
            }
            <OrderDetailsItem title="Important Info" value={that.importantinfo} />
          </React.Fragment>
        );
      case 2:
        // Event Announcement
        return (
          <React.Fragment>
            <OrderDetailsItem title="Event" value={that.eventName} />
            {
              this.getOccasionDetails(that.occasionType)
            }
            <OrderDetailsItem title="Host" value={that.userName} />
            <OrderDetailsItem title="Event Date" value={moment(that.date).format('MMM DD, YYYY')} />
            <OrderDetailsItem title="Important Info" value={that.importantinfo} />
          </React.Fragment>
        );
      case 3:
        // Q&A
        return <OrderDetailsItem title="Title" value={that.question} />;
      default: return null;
    }
  }

  checkDataInStore = (obj) => {
    return Object.keys(obj).length === 0;
  }
  updateDataToStore = () => {
    if (localStorage && localStorage.getItem('bookingData')) {
      const localStorageValue = localStorage.getItem('bookingData');
      this.props.setBookingDetails(JSON.parse(localStorageValue));
    }
  }

  handleBooking = () => {
    if (this.props.isLoggedIn) {
      if (this.state.bookingData.edit) {
        this.props.starsonaRequest(this.state.bookingData, this.state.publicRequest, () => {
          this.props.resetRequestFlow();
          this.props.history.push('/user/myVideos');
          localStorage.removeItem('bookingData');
          this.props.cancelBookingDetails();
        });
      } else {
        this.props.starsonaRequest(this.state.bookingData, this.state.publicRequest);
        this.props.changeStep(this.props.currentStepCount + 1);
        this.setState({ paymentMode: true });
      }
    } else {
      this.props.redirectToLogin();
    }
  }

  cancel = () => {
    if (localStorage && localStorage.getItem('bookingData')) {
      localStorage.removeItem('bookingData');
    }
    this.props.cancelBookingDetails();
    this.props.history.push(`/starDetail/${this.props.match.params.id}`);
  }
  goBack = () => {
    if (this.state.paymentMode) {
      this.setState({ paymentMode: false });
    }
    this.props.changeStep(this.props.currentStepCount - 1);
  }

  updatePublicStatus = (bookingData) => {
    const publicRequest = typeof bookingData.publicRequest !== 'undefined' ? bookingData.publicRequest : true;
    this.setState({ publicRequest });
  }

  changePublicStatus = () => {
    this.setState({ publicRequest: !this.state.publicRequest }, () => {
      if (localStorage && localStorage.getItem('bookingData')) {
        const localStorageValue = JSON.parse(localStorage.getItem('bookingData'));
        localStorageValue.publicRequest = this.state.publicRequest;
        localStorage.setItem('bookingData', JSON.stringify(localStorageValue));
        this.props.setBookingDetails(localStorageValue);
      }
    });
  }

  exitPaymentMode = () => {
    this.setState({ paymentMode: false });
  }

  closeRequestFlow = () => {
    this.clearStream();
    this.props.resetRequestFlow();
    this.props.fetchCelebDetails(this.props.userDetails.user_id);
    this.props.resetPaymentDetails();
    this.props.deleteVideo();
    this.props.cancelBookingDetails();
    this.props.clearAudio();
  }

  clearStream = () => {
    if (window.stream) {
      const tracks = window.stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    }
    this.props.onClearStreams();
  }

  getRequestType = () => {
    const { type } = this.state.bookingData
    switch (type) {
      case 1: return 'personalized video';
      case 2: return 'event announcement';
      case 3: return 'live question and answer';
      default: return null;
    }
  }

  orderConfirmationView = fullName => (
    <ConfirmationModal>
      <ConfirmationModal.confirmationWrapper>
        <ConfirmationModal.Heading>Thank you! Your request has been submitted</ConfirmationModal.Heading>
        <ConfirmationModal.description>
          {fullName} now has a week to complete your {this.getRequestType()}. We'll notify you as soon as it's done.
        </ConfirmationModal.description>
        <ConfirmationModal.ButtonWrapper>
          <ConfirmationModal.Button onClick={() => this.closeRequestFlow()}>Close</ConfirmationModal.Button>
        </ConfirmationModal.ButtonWrapper>
      </ConfirmationModal.confirmationWrapper>
    </ConfirmationModal>
  )


  playAudio(audioSrc){
    const audio = new Audio(audioSrc)
    audio.play()
  }

  renderStargramDestinationDetails = (text, audioSrc) => {
    return (
      <React.Fragment>
        <span>
          {text}
        </span>
        {
          audioSrc &&
            <Request.AudioIcon
              src='assets/images/voice.png'
              onClick={() => this.playAudio(audioSrc)}
            />
        }
      </React.Fragment>
    );
  }

  renderPaymentDetails = (props, rate, fullName, profilePhoto, remainingBookings, requestType) => {
    return (
      <StripeCheckout
        rate={rate}
        fullName={fullName}
        requestType={requestType}
        profilePhoto={profilePhoto}
        authToken={props.authToken}
        remainingBookings={remainingBookings}
        exitPaymentMode={this.exitPaymentMode}
      />
    );
  }

  renderConfirmDetails = (bookingData, rate, remainingBookings, profilePhoto, fullName) => (
    <React.Fragment>
      <Request.ProfileImageWrapper>
        <Request.ProfileImage
          imageUrl={profilePhoto}
        />
        <Request.StarName>{fullName}</Request.StarName>
        <Request.StarProfessions>{starProfessionsFormater(this.state.bookingData.starPrice.profession_details)}</Request.StarProfessions>
      </Request.ProfileImageWrapper>
      <Request.Heading>Confirm Booking</Request.Heading>
      {
        this.state.bookingData.type === 3 &&
          <Request.smallScreenVideo>
            <Request.VideoContentWrapper>
              <VideoPlayer
                primarySrc={this.state.QAVideo.url}
              />
            </Request.VideoContentWrapper>
          </Request.smallScreenVideo>
      }
      <Request.Questionwraps>
        <Request.Ask>
          {
            this.getEventDetails(bookingData.type)
          }
        </Request.Ask>
      </Request.Questionwraps>
      <Request.OptionWrapper>
        <Request.CheckBoxWrapper>
          <Request.Label className="checkbox_container">
            <span>I give permission to {fullName} and Starsona to share my video on social media</span>
            <Request.CheckBox
              id="private_video"
              type="checkbox"
              checked={this.state.publicRequest}
              onChange={() => this.changePublicStatus()}
            />
            <Request.Span htmlFor="private_video" className="checkmark" />
          </Request.Label>
        </Request.CheckBoxWrapper>
      </Request.OptionWrapper>
      <Request.PaymentControllerWrapper>
        <Request.ContinueButton onClick={() => this.handleBooking()}>
          {bookingData.edit ? 'Save' : 'Continue'}
        </Request.ContinueButton>
      </Request.PaymentControllerWrapper>
    </React.Fragment>
  )

  render() {
    let coverPhoto;
    let imageList = [];
    let profilePhoto;
    let fullName = '';
    let featuredImage;
    let firstImage;
    let secondImage;
    const { props } = this;
    const { bookingData } = this.state;
    const rate = bookingData.starPrice.rate ? bookingData.starPrice.rate : 0;
    const remainingBookings = bookingData.starPrice.remaining_limit ? bookingData.starPrice.remaining_limit : 0;
    if (bookingData.starDetail.nick_name || bookingData.starDetail.first_name || bookingData.starDetail.last_name) {
      fullName = bookingData.starDetail.nick_name ? bookingData.starDetail.nick_name
        : `${bookingData.starDetail.first_name} ${bookingData.starDetail.last_name}`;
    }
    if (bookingData.starDetail.avatar_photo) {
      profilePhoto = bookingData.starDetail.avatar_photo.thumbnail_url && bookingData.starDetail.avatar_photo.thumbnail_url;
    } else {
      profilePhoto = bookingData.starDetail.images && bookingData.starDetail.images[0] && bookingData.starDetail.images[0].thumbnail_url;
    }
    if (bookingData.starDetail.featured_photo) {
      coverPhoto = bookingData.starDetail.featured_photo.image_url && bookingData.starDetail.featured_photo.image_url;
    } else {
      coverPhoto = bookingData.starDetail.images && bookingData.starDetail.images[0] && bookingData.starDetail.images[0].image_url;
    }
    if (bookingData.starDetail.images && bookingData.starDetail.images.length) {
      firstImage = bookingData.starDetail.images[0] ? bookingData.starDetail.images[0].image_url : null;
      secondImage = bookingData.starDetail.images[1] ? bookingData.starDetail.images[1].image_url : null;
      imageList = [firstImage, secondImage];
    }
    if (bookingData.starDetail.featured_photo) {
      featuredImage = bookingData.starDetail.featured_photo.image_url && bookingData.starDetail.featured_photo.image_url
    } else {
      featuredImage = bookingData.starDetail.images && bookingData.starDetail.images[0] && bookingData.starDetail.images[0].image_url
    }
    return (
      <Request.Wrapper>
        {
          this.props.loading ?
            <ConfirmationModal.loaderWrapper>
              <Loader />
            </ConfirmationModal.loaderWrapper>
          : null
        }
        <Request.Content>
          <Request>
            <Request.LeftSection>
              {
                this.state.audioUrl &&
                  <Popup
                    smallPopup
                    closePopUp={()=>this.setState({audioUrl: null})}
                  >
                    <audio src={this.state.audioUrl} controls />
                  </Popup>
              }
              <HeaderSection>
                {
                  !this.props.paymentStatus && <HeaderSection.HeaderNavigation onClick={() => this.goBack()} />
                }
              </HeaderSection>
              <Request.ComponentWrapper>
                {
                  this.state.paymentMode ?
                    this.renderPaymentDetails(props, rate, fullName, profilePhoto, remainingBookings, this.state.bookingData.type)
                  : null
                }
                {
                  !this.state.paymentMode && !this.props.paymentStatus &&
                    this.renderConfirmDetails(bookingData, rate, remainingBookings, profilePhoto, fullName)
                }
                {
                  this.props.paymentStatus && this.orderConfirmationView(fullName)
                }
              </Request.ComponentWrapper>
            </Request.LeftSection>
          </Request>
        </Request.Content>
      </Request.Wrapper>
    );
  }
}
