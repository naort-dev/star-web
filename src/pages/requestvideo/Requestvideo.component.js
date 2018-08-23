import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import RequestFlowPopup from "../../components/RequestFlowPopup";
import { Request, HeaderSection } from "../../pages/requestvideo/styled";
import { ImageStack } from "../../components/ImageStack";
import { Askquestion } from "../../pages/askQuestion";
import { Event } from "../../pages/eventAnnouncement";
import { Personal } from "../../pages/personalizedAnnouncement";
import "./styling";

export default class Requestvideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepCount: props.stepCount ? props.stepCount : 0,
      selectedRequest: null,
      requestType: "",
      requestTypeStatus: false
    };
    this.personal = 4;
    this.event = 4;
    this.ask = 3;
  }
  componentWillMount() {
    // const location = this.props.location;
    // if (!this.props.isLoggedIn && location.pathname === `/${this.props.celebId}/request/ask`) {
    //   this.props.toggleLogin(true);
    // }
    // if (!Object.keys(this.props.celebrityDetails).length || !Object.keys(this.props.celebrityDetails).userDetails) {
    //   this.props.fetchCelebDetails(this.props.celebId);
    // }
  }
  componentDidUpdate(prevProps) {
    if (this.props.isLoggedIn && this.state.selectedRequest) {
      // this.props.history.push(this.state.selectedRequest);
      this.props.setRequestFlow(
        this.props.celebId,
        this.props.requestType,
        this.props.stepCount
      );
    }
  }
  goBack = () => {
    this.props.history.goBack();
  };

  changeStep = (step) => {
    const newStep = step ? step : props.stepCount;
    this.props.setRequestFlow(
      this.props.celebId,
      this.props.requestType,
      newStep,
    );
  };

  requestFlowCheck = (requestType) => {
    if (this.props.isLoggedIn) {
      this.props.setRequestFlow(this.props.celebId, requestType, 1);
      // this.props.history.push(`/${this.props.celebId}/request${requestType}`);
    } else if (requestType === "ask") {
      this.props.setRequestFlow(this.props.celebId, requestType, 1);
      this.redirectToLogin();
    } else {
      // this.props.history.push(`/${this.props.celebId}/request${requestType}`);
      this.props.setRequestFlow(this.props.celebId, requestType, 1);
    }
  };

  redirectToLogin = () => {
    // this.props.history.replace(`/${this.props.celebId}/request`);
    this.props.toggleRequestFlow(false);
    this.props.toggleLogin(true);
  };

  closeRequestFlow = () => {
    this.clearStream();
    this.props.resetRequestFlow();
    this.props.cancelBookingDetails();
    this.props.clearAll();
  };

  clearStream = () => {
    if (window.stream) {
      const tracks = window.stream.getTracks();
      tracks.forEach(track => {
        track.stop();
      });
    }
    this.props.onClearStreams();
  };
  setRequestType = (value) => {
    this.setState({ requestType: value, requestTypeStatus: true });
  };

  renderRequest = () => {
    if (this.props.requestType === "personal") {
      return (
        <Personal
          redirectToLogin={this.redirectToLogin}
          changeStep={this.changeStep}
          currentStepCount={this.props.stepCount}
        />
      );
    } else if (this.props.requestType === "event") {
      return (
        <Event
          redirectToLogin={this.redirectToLogin}
          changeStep={this.changeStep}
          currentStepCount={this.props.stepCount}
        />
      );
    }
    return (
      <Askquestion
        redirectToLogin={this.redirectToLogin}
        changeStep={this.changeStep}
        currentStepCount={this.props.stepCount}
      />
    );
  };

  render() {
    let coverPhoto;
    let imageList = [];
    let profilePhoto;
    let fullName = "";
    let featuredImage;
    let firstImage;
    let secondImage;
    const rate = this.props.celebrityDetails.rate
      ? this.props.celebrityDetails.rate
      : 0;
    const remainingBookings = this.props.celebrityDetails.remaining_limit
      ? this.props.celebrityDetails.remaining_limit
      : 0;
    if (this.props.userDetails.first_name && this.props.userDetails.last_name) {
      fullName = this.props.userDetails.nick_name
        ? this.props.userDetails.nick_name
        : `${this.props.userDetails.first_name} ${
            this.props.userDetails.last_name
          }`;
    }
    if (this.props.userDetails.avatar_photo) {
      profilePhoto =
        this.props.userDetails.avatar_photo.thumbnail_url &&
        this.props.userDetails.avatar_photo.thumbnail_url;
    } else {
      profilePhoto =
        this.props.userDetails.images &&
        this.props.userDetails.images[0] &&
        this.props.userDetails.images[0].thumbnail_url;
    }
    if (this.props.userDetails.featured_photo) {
      coverPhoto =
        this.props.userDetails.featured_photo.image_url &&
        this.props.userDetails.featured_photo.image_url;
    } else {
      coverPhoto =
        this.props.userDetails.images &&
        this.props.userDetails.images[0] &&
        this.props.userDetails.images[0].image_url;
    }
    if (this.props.userDetails.images && this.props.userDetails.images.length) {
      firstImage = this.props.userDetails.images[0]
        ? this.props.userDetails.images[0].image_url
        : null;
      secondImage = this.props.userDetails.images[1]
        ? this.props.userDetails.images[1].image_url
        : null;
      imageList = [firstImage, secondImage];
    }
    if (this.props.userDetails.featured_photo) {
      featuredImage =
        this.props.userDetails.featured_photo.image_url &&
        this.props.userDetails.featured_photo.image_url;
    } else {
      featuredImage =
        this.props.userDetails.images &&
        this.props.userDetails.images[0] &&
        this.props.userDetails.images[0].image_url;
    }
    return (
      <RequestFlowPopup
        dotsCount={this.props.requestType ? this[this.props.requestType] : 0}
        selectedDot={this.props.requestType ? this.props.stepCount : 0}
        closePopUp={this.closeRequestFlow}
        smallPopup
      >
        {!this.props.requestType ? (
          <Request.Wrapper>
            <Request.Content>
              <Request>
                <Request.LeftSection>
                  {/* <HeaderSection>
                      <HeaderSection.HeaderNavigation onClick={() => this.goBack()} />
                      <HeaderSection.MiddleDiv> {fullName} </HeaderSection.MiddleDiv>
                      <Link to={`/${this.props.celebId}`}>
                        <HeaderSection.RightDiv>Cancel</HeaderSection.RightDiv>
                      </Link>
                    </HeaderSection>                */}
                  <Request.ComponentWrapper>
                    <Request.ComponentWrapperScroll
                      renderView={props => (
                        <div
                          {...props}
                          className="component-wrapper-scroll-wrapper"
                        />
                      )}
                    >
                      <Request.OptionWrapper>
                        <Request.HeaderText>
                          What kind of video would you like to request?
                        </Request.HeaderText>
                        <Request.ButtonWrapper>
                          <div className="round-radio">
                            <ul className="list">
                              <li className="list">
                                <div>
                                  <input
                                    type="radio"
                                    id="f-option"
                                    name="selector"
                                    value="personal"
                                    onClick={event =>
                                      this.setRequestType(event.target.value)
                                    }
                                  />
                                  <label htmlFor="f-option">
                                    Personalized Shout-Out
                                    <div className="request_content">
                                      Celebrate everyday moments with a
                                      personalized video greeting from{" "}
                                      {fullName}. Birthdays, encouragement,
                                      graduations… you pick.
                                    </div>
                                  </label>
                                  <div className="check" />
                                </div>
                              </li>

                              <li className="list">
                                <div>
                                  <input
                                    type="radio"
                                    id="s-option"
                                    name="selector"
                                    value="event"
                                    onClick={event =>
                                      this.setRequestType(event.target.value)
                                    }
                                  />
                                  <label htmlFor="s-option">
                                    Event Announcement
                                    <div className="request_content">
                                      Have {fullName} invite everyone over for
                                      your book club, the big game, fundraiser,
                                      bachelor/ette party, reunion… any event.
                                    </div>
                                  </label>
                                  <div className="check" />
                                </div>
                              </li>

                              <li className="list">
                                <div>
                                  <input
                                    type="radio"
                                    id="t-option"
                                    name="selector"
                                    value="ask"
                                    onClick={event =>
                                      this.setRequestType(event.target.value)
                                    }
                                  />
                                  <label htmlFor="t-option">
                                    Ask a Question
                                    <div className="request_content">
                                      Video yourself asking {fullName} a
                                      question. When they respond, we’ll stitch
                                      the two videos together so you get a great
                                      Q&A interaction.
                                    </div>
                                  </label>
                                  <div className="check" />
                                </div>
                              </li>
                            </ul>
                          </div>
                          {/* <Request.Button onClick={() => this.requestFlowCheck('personal')} >Personalized Shout-Out</Request.Button>
                            <Request.Button onClick={() => this.requestFlowCheck('event')}>Event Announcement</Request.Button>
                            <Request.Button onClick={() => this.requestFlowCheck('ask')}>Ask a Question</Request.Button> */}
                        </Request.ButtonWrapper>
                      </Request.OptionWrapper>
                    </Request.ComponentWrapperScroll>
                    <Request.PaymentControllerWrapper>
                      {this.state.requestTypeStatus ? (
                        <Request.ContinueButton
                          onClick={() =>
                            this.requestFlowCheck(this.state.requestType)
                          }
                        >
                          Next
                        </Request.ContinueButton>
                      ) : (
                        <Request.DiasableButton disabled>
                          Next
                        </Request.DiasableButton>
                      )}
                    </Request.PaymentControllerWrapper>
                  </Request.ComponentWrapper>
                </Request.LeftSection>
                {/* <Switch>
                    <Route
                      path="/:id/request/ask"
                      render={props => (
                        <RequestFlowPopup
                          dotsCount={this.askSteps}
                          selectedDot={this.state.stepCount}
                          closePopUp={this.closeRequestFlow}
                          smallPopup
                        >
                          <Askquestion {...props} redirectToLogin={this.redirectToLogin} changeStep={this.changeStep} currentStepCount={this.state.stepCount} />
                        </RequestFlowPopup>
                      )}
                    />
                    <Route
                      path="/:id/request/event"
                      render={props => (
                        <RequestFlowPopup
                          dotsCount={this.eventSteps}
                          selectedDot={this.state.stepCount}
                          closePopUp={this.closeRequestFlow}
                          smallPopup
                        >
                          <Event {...props} redirectToLogin={this.redirectToLogin} changeStep={this.changeStep} currentStepCount={this.state.stepCount} />
                        </RequestFlowPopup>
                      )}
                    />
                    <Route
                      path="/:id/request/personal"
                      render={props => (
                        <RequestFlowPopup
                          dotsCount={this.personalSteps}
                          selectedDot={this.state.stepCount}
                          closePopUp={this.closeRequestFlow}
                          smallPopup
                        >
                          <Personal {...props} redirectToLogin={this.redirectToLogin} changeStep={this.changeStep} currentStepCount={this.state.stepCount} />
                        </RequestFlowPopup>
                      )}
                    />
                  </Switch> */}
                {/* <Request.RightSection>
                    <Request.ImageStackWrapper>
                      <ImageStack
                        featureImage={featuredImage}
                        imageList={imageList}
                      />
                    </Request.ImageStackWrapper>
                  </Request.RightSection> */}
              </Request>
            </Request.Content>
          </Request.Wrapper>
        ) : (
          this.renderRequest()
        )}
      </RequestFlowPopup>
    );
  }
}
