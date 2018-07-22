import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';
import { Request, HeaderSection } from '../../pages/askQuestion/styled';
import getAWSCredentials from '../../utils/AWSUpload'
import { locations } from '../../constants/locations';
import { ImageStack } from '../../components/ImageStack';
import { PaymentFooterController } from '../../components/PaymentFooterController';
import './ask';
import VideoRecorder from '../../components/WebRTCVideoRecorder';

export default class Askquestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginRedirect: false,
<<<<<<< HEAD
      question: '',
=======
      QuestionValue: '',
>>>>>>> d32fb28d80d4072100c88754d7a34dfdb794f00f
    };
  }
  goBack = () => {
    this.props.history.goBack();
  }
  cancel = () => {
    if (localStorage && localStorage.getItem('bookingData')) {
      localStorage.removeItem('bookingData');
    }
    this.props.cancelBookingDetails();
    this.props.history.push(`/starDetail/${this.props.match.params.id}`);
  }


  handleBooking = () => {
    if (this.props.isLoggedIn) {
      const askVideo = new File([this.props.videoRecorder.recordedBuffer], 'askVideo.mp4');
      getAWSCredentials(locations.askAwsVideoCredentials, this.props.session.auth_token.authentication_token, askVideo)
        .then((response) => {
          if (response && response.filename) {
            const bookObj = this.createBookingObject(response.filename);
            if (bookObj) {
              localStorage.setItem('bookingData', JSON.stringify(bookObj));
              this.props.setBookingDetails(bookObj);
              this.props.history.push(`/${this.props.match.params.id}/request/confirm`);
            }
          }
        }
        )
    } else {
      this.props.setRedirectUrls(this.props.location.pathname);
      this.setState({ loginRedirect: true });
    }
    // const askVideo = new File([this.props.videoRecorder.recordedBuffer], 'askVideo.mp4');
    // getAWSCredentials(locations.askAwsVideoCredentials, this.props.session.auth_token.authentication_token, askVideo)
    // .then(response => console.log("response is", response))
    // .then((response) => {
    //   axios.post(response.url, response.formData)
    //     .then(() => fetch.post('https://app.staging.starsona.com/api/v1/user/celebrity_profile/', {
    //       ...this.props.location.state.bioDetails, profile_video: response.filename, availability: true
    //     },
    //       {
    //         "headers": {
    //           'Authorization': `token ${this.props.session.auth_token.authentication_token}`
    //         }
    //       }
    //     )
    //     )
    // })
  }
  setQuestion = (question) => {
    this.setState({question});
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

      <Request.Wrapper>
        <Request.Content>
          <Request>
            <Request.LeftSection>
              <HeaderSection>
                <HeaderSection.HeaderNavigation onClick={() => this.goBack()} />
                <HeaderSection.MiddleDiv> {fullName}</HeaderSection.MiddleDiv>
                <Link to={`/starDetail/${this.props.match.params.id}`}>
                  <HeaderSection.RightDiv onClick={() => this.cancel()}>Cancel</HeaderSection.RightDiv>
                </Link>
              </HeaderSection>
              <Request.SmallScreenLayout>
                <Request.ImageRenderDiv>
                  <Request.ImageSection
                    imageUrl={coverPhoto}
                  />
                </Request.ImageRenderDiv>
              </Request.SmallScreenLayout>

              <Request.ComponentWrapper>
                <Scrollbars>
                  <Request.Questionwraps>
                    <Request.Ask>
                      <Request.InputFieldsWrapper>
                        <Request.InputWrapper>
                          <Request.Label>What’s your question ?</Request.Label>
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

                    </Request.Ask>
                  </Request.Questionwraps>
                </Scrollbars>
                <Request.PaymentControllerWrapper>
                  <PaymentFooterController
                    buttonName="Book"
                    rate={rate}
                    remainingBookings={remainingBookings}
                    handleBooking={this.handleBooking}
                  />
                </Request.PaymentControllerWrapper>
              </Request.ComponentWrapper>
            </Request.LeftSection>
            <Request.RightSection>
              <Request.ImageStackWrapper>
                <VideoRecorder {...this.props} />
              </Request.ImageStackWrapper>
            </Request.RightSection>
          </Request>
        </Request.Content>
      </Request.Wrapper>
    );
  }
}
