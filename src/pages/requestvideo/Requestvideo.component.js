import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import RequesFlowPopup from '../../components/RequestFlowPopup';
import { Request, HeaderSection } from '../../pages/requestvideo/styled';
import { ImageStack } from '../../components/ImageStack';
import { Askquestion } from '../../pages/askQuestion';
import { Event } from '../../pages/eventAnnouncement';
import { Personal } from '../../pages/personalizedAnnouncement';

export default class Requestvideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepCount: 1,
      selectedRequest: null,
    };
    this.personalSteps = 4;
    this.eventSteps = 4;
    this.askSteps = 3;
  }
  componentWillMount() {
    const location = this.props.location;
    if (!this.props.isLoggedIn && location.pathname === `/${this.props.match.params.id}/request/ask`) {
      this.props.toggleLogin(true);
    }
    if (!Object.keys(this.props.celebrityDetails).length || !Object.keys(this.props.celebrityDetails).userDetails) {
      this.props.fetchCelebDetails(this.props.match.params.id);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.isLoggedIn && this.state.selectedRequest) {
      this.props.history.push(this.state.selectedRequest);
      this.setState({ selectedRequest: null });
    }
  }
  goBack = () => {
    this.props.history.goBack();
  }

  changeStep = (step) => {
    const newStep = step ? step : this.state.stepCount;
    this.setState({ stepCount: newStep });
  }

  requestFlowCheck = (url) => { 
    if (this.props.isLoggedIn) {
      this.props.history.push(`/${this.props.match.params.id}/request${url}`);
      this.setState({ selectedRequest: `/${this.props.match.params.id}/request${url}` })
    } else if (url === '/ask') {
      this.setState({ selectedRequest: `/${this.props.match.params.id}/request${url}` })
      this.props.toggleLogin(true);
    } else {
      this.props.history.push(`/${this.props.match.params.id}/request${url}`);
      this.setState({ selectedRequest: `/${this.props.match.params.id}/request${url}` })
    }
  }

  redirectToLogin = () => {
    this.props.history.replace(`/${this.props.match.params.id}/request`);
    this.props.toggleLogin(true);
  }

  closeRequestFlow = () => {
    this.props.history.replace(`/${this.props.match.params.id}/request`);
    this.props.cancelBookingDetails();
    this.props.clearAll();
    this.setState({ stepCount: 1 });
  }

  render() {
    let coverPhoto;
    let imageList = [];
    let profilePhoto;
    let fullName = '';
    let featuredImage;
    let firstImage;
    let secondImage;
    const rate = this.props.celebrityDetails.rate ? this.props.celebrityDetails.rate: 0;
    const remainingBookings = this.props.celebrityDetails.remaining_limit ? this.props.celebrityDetails.remaining_limit: 0;
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
      <Request.Wrapper>
        <Request.Content>
          <Request>
            <Request.LeftSection>
              <HeaderSection>
                <HeaderSection.HeaderNavigation onClick={() => this.goBack()} />
                <HeaderSection.MiddleDiv> {fullName} </HeaderSection.MiddleDiv>
                <Link to={`/${this.props.match.params.id}`}>
                  <HeaderSection.RightDiv>Cancel</HeaderSection.RightDiv>
                </Link>
              </HeaderSection>               
              <Request.ComponentWrapper>
                <Request.ComponentWrapperScroll
                  renderView={props => <div {...props} className="component-wrapper-scroll-wrapper" />}
                >
                  <Request.OptionWrapper>
                    <Request.HeaderText>
                      What kind of video would you like to request?
                    </Request.HeaderText>
                    <Request.ButtonWrapper>
                      <Request.Button onClick={() => this.requestFlowCheck('/personal')} >Personalized Shout-Out</Request.Button>
                      <Request.Button onClick={() => this.requestFlowCheck('/event')}>Event Announcement</Request.Button>
                      <Request.Button onClick={() => this.requestFlowCheck('/ask')}>Ask a Question</Request.Button>
                    </Request.ButtonWrapper>
                  </Request.OptionWrapper>
                </Request.ComponentWrapperScroll>
              </Request.ComponentWrapper>
            </Request.LeftSection>
            <Switch>
              <Route
                path="/:id/request/ask"
                render={props => (
                  <RequesFlowPopup
                    dotsCount={this.askSteps}
                    selectedDot={this.state.stepCount}
                    closePopUp={this.closeRequestFlow}
                    smallPopup
                  >
                    <Askquestion {...props} redirectToLogin={this.redirectToLogin} changeStep={this.changeStep} currentStepCount={this.state.stepCount} />
                  </RequesFlowPopup>
                )}
              />
              <Route
                path="/:id/request/event"
                render={props => (
                  <RequesFlowPopup
                    dotsCount={this.eventSteps}
                    selectedDot={this.state.stepCount}
                    closePopUp={this.closeRequestFlow}
                    smallPopup
                  >
                    <Event {...props} redirectToLogin={this.redirectToLogin} changeStep={this.changeStep} currentStepCount={this.state.stepCount} />
                  </RequesFlowPopup>
                )}
              />
              <Route
                path="/:id/request/personal"
                render={props => (
                  <RequesFlowPopup
                    dotsCount={this.personalSteps}
                    selectedDot={this.state.stepCount}
                    closePopUp={this.closeRequestFlow}
                    smallPopup
                  >
                    <Personal {...props} redirectToLogin={this.redirectToLogin} changeStep={this.changeStep} currentStepCount={this.state.stepCount} />
                  </RequesFlowPopup>
                )}
              />
            </Switch>
            <Request.RightSection>
              <Request.ImageStackWrapper>
                <ImageStack
                  featureImage={featuredImage}
                  imageList={imageList}
                />
              </Request.ImageStackWrapper>
            </Request.RightSection>
          </Request>
        </Request.Content>
      </Request.Wrapper>
    );
  }
}
