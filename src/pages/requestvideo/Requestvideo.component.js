import React from 'react';
import { isEmpty } from 'lodash'
import RequestFlowPopup from '../../components/RequestFlowPopup';
import { Request } from '../../pages/requestvideo/styled';
import { Askquestion } from '../../pages/askQuestion';
import { Event } from '../../pages/eventAnnouncement';
import { Personal } from '../../pages/personalizedAnnouncement';

export default class Requestvideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepCount: props.stepCount ? props.stepCount : 0,
      selectedRequest: null,
      requestType: '',
      requestTypeStatus: false
    };
    this.personal = 5;
    this.event = 5;
    this.ask = 4;
  }
  componentDidMount() {
    const fetchCelebDetails = (isEmpty(this.props.celebrityDetails) || isEmpty(this.props.userDetails)) && this.props.celebId;
    if (fetchCelebDetails) {
      this.props.fetchCelebDetails(this.props.celebId);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.isLoggedIn && this.state.selectedRequest) {
      this.props.setRequestFlow(
        this.props.celebId,
        this.props.requestType,
        this.props.stepCount
      );
    }
  }

  setRequestType = (value) => {
    this.setState({ requestType: value, requestTypeStatus: true });
  };

  requestFlowCheck = (requestType) => {
    if (this.props.isLoggedIn) {
      this.props.setRequestFlow(this.props.celebId, requestType, 1);
    } else if (requestType === "ask") {
      this.props.setRequestFlow(this.props.celebId, requestType, 1);
      this.redirectToLogin();
    } else {
      this.props.setRequestFlow(this.props.celebId, requestType, 1);
    }
  };

  redirectToLogin = () => {
    this.props.toggleRequestFlow(false);
    this.props.toggleLogin(true);
  };

  closeRequestFlow = () => {
    if (this[this.state.requestType] === this.props.stepCount) {
      this.props.fetchCelebDetails(this.props.userDetails.user_id)
    }
    this.clearStream();
    this.props.resetRequestFlow();
    this.props.resetPaymentDetails();
    this.props.cancelBookingDetails();
    this.props.clearAll();
  };

  clearStream = () => {
    if (window.stream) {
      const tracks = window.stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    }
    this.props.onClearStreams();
    this.props.deleteVideo();
  };

  changeStep = (step) => {
    const newStep = step ? step : this.props.stepCount;
    this.props.setRequestFlow(
      this.props.celebId,
      this.props.requestType,
      newStep,
    );
  };

  renderRequest = () => {
    if (this.props.requestType === 'personal') {
      return (
        <Personal
          redirectToLogin={this.redirectToLogin}
          changeStep={this.changeStep}
          currentStepCount={this.props.stepCount}
        />
      );
    } else if (this.props.requestType === 'event') {
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
    let fullName = "";
    if (this.props.userDetails.first_name && this.props.userDetails.last_name) {
      fullName = this.props.userDetails.nick_name
        ? this.props.userDetails.nick_name
        : `${this.props.userDetails.first_name} ${
          this.props.userDetails.last_name
        }`;
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
                  <Request.ComponentWrapper>
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
                                  <div className="option-content">
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
                                  <div className="option-content">
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
                                  <div className="option-content">
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
                      </Request.ButtonWrapper>
                    </Request.OptionWrapper>
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
                        <Request.DisableButton disabled>
                          Next
                        </Request.DisableButton>
                      )}
                    </Request.PaymentControllerWrapper>
                  </Request.ComponentWrapper>
                </Request.LeftSection>
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
