import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Request, HeaderSection } from '../../pages/askQuestion/styled';
import getAWSCredentials from '../../utils/AWSUpload'
import { locations } from '../../constants/locations';
import { recorder } from '../../constants/videoRecorder';
import Loader from '../../components/Loader';
import { PaymentFooterController } from '../../components/PaymentFooterController';
import './ask';
import QAVideoRecorder from '../../components/QAVideoRecorder';
import { Confirm } from '../confirmBooking';

export default class Askquestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: props.bookingData.question ? props.bookingData.question : '',
      loader: false,
      // showConfirm: false,
    };
  }
  goBack = () => {
    this.props.changeStep(this.props.currentStepCount - 1);
  }
  cancel = () => {
    if (localStorage && localStorage.getItem('bookingData')) {
      localStorage.removeItem('bookingData');
    }
    this.props.cancelBookingDetails();
    this.props.onClearStreams();
    this.props.deleteVideo();
    this.props.history.push(`/${this.props.match.params.id}`);
  }

  handleBooking = (noEdit) => {
    if (this.props.isLoggedIn && !noEdit) {
      this.setState({ loader: true });
      let uploadVideo;
      if (this.props.videoUploader.savedFile != null) {
        uploadVideo = this.props.videoUploader.savedFile;
      }
      else {
        uploadVideo = new File([this.props.videoRecorder.recordedBuffer], 'askVideo.mp4');
      }
      getAWSCredentials(locations.askAwsVideoCredentials, this.props.session.auth_token.authentication_token, uploadVideo)
        .then((response) => {
          if (response && response.filename) {
            axios.post(response.url, response.formData).then(() => {
              this.setState({ loader: false });
              const bookObj = this.createBookingObject(response.filename);
              if (bookObj) {
                localStorage.setItem('bookingData', JSON.stringify(bookObj));
                this.props.setBookingDetails(bookObj);
                this.props.changeStep(this.props.currentStepCount + 1);
                this.setState({ showConfirm: true });
              }
            });
          }
        });
    } else {
      this.props.toggleRequestFlow(false);
    }
  }


  setQuestion = (question) => {
    this.setState({ question });
  }
  createBookingObject = (fileNameValue) => {
    const bookingData = {
      starDetail: this.props.userDetails,
      starPrice: this.props.celebrityDetails,
      question: this.state.question,
      fileName: fileNameValue,
      type: 3,

    };
    return bookingData;
  }
  render() {

    let coverPhoto;
    let imageList = [];
    let profilePhoto;
    let fullName = ``;
    let featuredImage;
    let firstImage;
    let secondImage;
    const disabled = this.props.videoRecorder.recordedBlob || this.props.videoUploader.savedFile ? false : true
    const rate = this.props.celebrityDetails.rate ? this.props.celebrityDetails.rate : 0;
    const remainingBookings = this.props.celebrityDetails.remaining_limit ? this.props.celebrityDetails.remaining_limit : 0;
    if (this.props.userDetails.first_name && this.props.userDetails.last_name) {
      fullName = this.props.userDetails.nick_name ? this.props.userDetails.nick_name
        : `${this.props.userDetails.first_name} ${this.props.userDetails.last_name}`;
    }
    if (this.props.userDetails.avatar_photo) {
      profilePhoto = this.props.userDetails.avatar_photo.thumbnail_url && this.props.userDetails.avatar_photo.thumbnail_url;
    } else {
      profilePhoto = this.props.userDetails.images && this.props.userDetails.images[0] && this.props.userDetails.images[0].thumbnail_url;
    }
    if (this.props.userDetails.featured_photo) {
      coverPhoto = this.props.userDetails.featured_photo.image_url && this.props.userDetails.featured_photo.image_url;
    } else {
      coverPhoto = this.props.userDetails.images && this.props.userDetails.images[0] && this.props.userDetails.images[0].image_url;
    }
    if (this.props.userDetails.images && this.props.userDetails.images.length) {
      firstImage = this.props.userDetails.images[0] ? this.props.userDetails.images[0].image_url : null;
      secondImage = this.props.userDetails.images[1] ? this.props.userDetails.images[1].image_url : null;
      imageList = [firstImage, secondImage];
    }
    if (this.props.userDetails.featured_photo) {
      featuredImage = this.props.userDetails.featured_photo.image_url && this.props.userDetails.featured_photo.image_url
    } else {
      featuredImage = this.props.userDetails.images && this.props.userDetails.images[0] && this.props.userDetails.images[0].image_url
    }
    return (
      <React.Fragment>
        {
          this.props.currentStepCount >= 2 ?
            <Confirm {...this.props} changeStep={this.props.changeStep} currentStepCount={this.props.currentStepCount}/>
            :
            <Request.Wrapper>
              <Request.Content>
                {this.state.loader ?
                  <Request.loaderWrapper>
                    <Loader />
                  </Request.loaderWrapper>
                  :
                  null
                }
                <Request>
                  <Request.LeftSection>
                    <Request.ComponentWrapper>
                      <Request.Questionwraps>
                        <Request.Ask>
                          <Request.recorderWrapper>
                            <QAVideoRecorder star={fullName} {...this.props} src={this.props.bookingData.requestVideo && this.props.bookingData.requestVideo[0].s3_video_url} duration={recorder.askTimeOut} onSubmit={this.handleBooking.bind(this)} />
                          </Request.recorderWrapper>
                        </Request.Ask>
                      </Request.Questionwraps>
                    </Request.ComponentWrapper>
                  </Request.LeftSection>
                </Request>
              </Request.Content>
            </Request.Wrapper>
        }
      </React.Fragment>
    );
  }
}
