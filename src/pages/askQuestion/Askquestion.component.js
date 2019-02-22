import React from 'react';
import axios from 'axios';
import { Request } from '../../pages/askQuestion/styled';
import getAWSCredentials from '../../utils/AWSUpload';
import { locations } from '../../constants/locations';
import { recorder } from '../../constants/videoRecorder';
import Loader from '../../components/Loader';
import './ask';
import QAVideoRecorder from '../../components/QAVideoRecorder';
import { Confirm } from '../confirmBooking';

export default class Askquestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: props.bookingData.question ? props.bookingData.question : '',
      loader: false,
    };
  }
  setQuestion = (question) => {
    this.setState({ question });
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
      } else {
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
              }
            });
          }
        });
    } else {
      this.props.toggleRequestFlow(false);
    }
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
    let fullName = '';
    if (this.props.userDetails.first_name && this.props.userDetails.last_name) {
      fullName = this.props.userDetails.nick_name ? this.props.userDetails.nick_name
        : `${this.props.userDetails.first_name} ${this.props.userDetails.last_name}`;
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
