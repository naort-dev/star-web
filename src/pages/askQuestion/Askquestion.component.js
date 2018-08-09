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
import VideoRecorder from '../../components/WebRTCVideoRecorder';
import { Confirm } from '../confirmBooking';

export default class Askquestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginRedirect: false,
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
    this.props.history.push(`/starDetail/${this.props.match.params.id}`);
  }


  handleBooking = () => {
    this.setState({ loader: true });
    if (this.props.isLoggedIn) {
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
      this.props.setRedirectUrls(this.props.location.pathname);
      this.setState({ loginRedirect: true });
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
    if (this.state.loginRedirect) {
      return <Redirect to="/login" />;
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
                  {/* <HeaderSection>
              <HeaderSection.HeaderNavigation onClick={() => this.goBack()} />
              <HeaderSection.MiddleDiv> {fullName}</HeaderSection.MiddleDiv>
              <Link to={`/starDetail/${this.props.match.params.id}`}>
                <HeaderSection.RightDiv onClick={() => this.cancel()}>Cancel</HeaderSection.RightDiv>
              </Link>
            </HeaderSection> */}
                  {/* <Request.RightSection>
              <Request.recorderWrapper>
                <VideoRecorder {...this.props} src={this.props.bookingData.requestVideo && this.props.bookingData.requestVideo[0].s3_video_url} duration={recorder.askTimeOut} />
              </Request.recorderWrapper>
            </Request.RightSection> */}
                  <Request.LeftSection>
                    <Request.ComponentWrapper>
                      <Request.ComponentWrapperScroll
                        autoHide
                        renderView={props => <div {...props} className="component-wrapper-scroll-wrapper" />}
                      >
                      <Request.Heading>What’s your question? </Request.Heading>
                        <Request.Questionwraps>
                          <Request.Ask>
                            <Request.InputFieldsWrapper>
                              <Request.InputWrapper>
                                <Request.Label>Tell {fullName} a little about your question</Request.Label>
                                <Request.WrapsInput>
                                  <Request.InputQuestion
                                    placeholder="Best to start your question with “What”, “How” or “Why”."
                                    value={this.state.question}
                                    onChange={event => this.setQuestion(event.target.value)}
                                  />
                                  <Request.ErrorMsg></Request.ErrorMsg>
                                </Request.WrapsInput>
                              </Request.InputWrapper>
                            </Request.InputFieldsWrapper>

                            <Request.recorderWrapper>
                              <VideoRecorder {...this.props} src={this.props.bookingData.requestVideo && this.props.bookingData.requestVideo[0].s3_video_url} duration={recorder.askTimeOut} />
                            </Request.recorderWrapper>


                          </Request.Ask>
                        </Request.Questionwraps>
                      </Request.ComponentWrapperScroll>
                      <Request.PaymentControllerWrapper>
                        <Request.ContinueButton onClick={() => this.handleBooking()}>
                          Book
                      </Request.ContinueButton>
                      </Request.PaymentControllerWrapper>
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
