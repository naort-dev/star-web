import React from 'react';
import moment from 'moment';
import { Request, HeaderSection } from '../../pages/eventAnnouncement/styled';
import './event';
import RequestTemplates from '../../components/RequestTemplates';
import { Confirm } from '../confirmBooking';

export default class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: props.bookingData.selectedValue ? props.bookingData.selectedValue : '0', // for default state (choose one)
      templateType: props.bookingData.occasionType ? props.bookingData.occasionType : '',
      relationship: [],
      eventName: props.bookingData.eventName ? props.bookingData.eventName : '',
      hostName: props.bookingData.hostName ? props.bookingData.hostName : '',
      userName: props.bookingData.userName ? props.bookingData.userName : '',
      relationshipValue: 0,
      relationshipName: '',
      specification: props.bookingData.specification ? props.bookingData.specification : '',
      importantinfo: props.bookingData.importantinfo ? props.bookingData.importantinfo : '',
      date: props.bookingData.date ? moment(props.bookingData.date) : moment(),
      eventdetailName: props.bookingData.eventdetailName ? props.bookingData.eventdetailName : '',
      selectEventerror: false,
      whoIsfor: false,
      whoIsfrom: false,
      eventTitle: false,
      eventDate: false,
    };
  }
  componentWillMount() {
    // 2 is used to specify the request was event announcement
    this.props.fetchOccasionlist(2);
  }
  handleChange = (event) => {
    const occasionList = this.props.eventsDetails;
    const result = occasionList.find((find) => {
      return find.id == event.target.value;
    });

    this.setState({
      selectedValue: event.target.value,
      templateType: result ? result.type : '0',
      relationship: result ? result.relationships : '0',
      eventName: result ? result.title : 'Choose One',
    });
    this.emptyTemplateDetails();
  }
  steps = () => {
    if (this.state.selectedValue === '0') {
      this.setState({ selectEventerror: true });
    } else {
      this.setState({ selectEventerror: false });
    }
    if (this.state.selectedValue !== '0') {
      this.props.changeStep(this.props.currentStepCount + 1);
    }
  }
  handleInput = (data, type) => {
    /*
      expected types:
      hostName,
      userName,
      relationshipValue,
      specification,
      importantinfo,
      date,
      eventdetailName
    */
    this.setState({ [type]: data });
  }
  handleBooking = () => {
    const hostNameValid = this.checkRequiredHostName();
    const userNameValid = this.checkRequiredUserName();
    const dateValid = this.checkRequiredDate();
    const eventTitleValid = this.checkRequiredTitle();
    if (!hostNameValid && !userNameValid && !dateValid && !eventTitleValid) {
      const bookObj = this.createBookingObject(this.state);
      if (bookObj) {
        localStorage.setItem('bookingData', JSON.stringify(bookObj));
        this.props.setBookingDetails(bookObj);
        this.props.changeStep(this.props.currentStepCount + 1);
      }
    }
  }
  checkRequiredHostName = () => {
    let whoIsforValue;
    if (this.state.templateType === 7) {
      whoIsforValue = this.state.hostName === '' ? true : false;
    } else {
      whoIsforValue = false;
    }
    this.setState({ whoIsfor: whoIsforValue });
    return whoIsforValue;
  }
  checkRequiredUserName = () => {
    const whoIsfromValue = this.state.userName === '' ? true : false;
    this.setState({ whoIsfrom: whoIsfromValue });
    return whoIsfromValue;
  }
  checkRequiredTitle = () => {
    let eventTitleValue;
    if (this.state.templateType === 6) {
      eventTitleValue = this.state.eventdetailName === '' ? true : false;
    } else {
      eventTitleValue = false;
    }
    this.setState({ eventTitle: eventTitleValue });
    return eventTitleValue;
  }
  checkRequiredDate = () => {
    const dateValue = this.state.date === '' ? true : false;
    this.setState({ eventDate: dateValue });
    return dateValue;
  }
  createBookingObject = () => {

    const bookingData = {
      starDetail: this.props.userDetails,
      starPrice: this.props.celebrityDetails,
      eventName: this.state.eventName,
      hostName: this.state.hostName,
      userName: this.state.userName,
      specification: this.state.specification,
      importantinfo: this.state.importantinfo,
      eventdetailName: this.state.eventdetailName,
      date: this.state.date,
      type: 2,
      occasionType: this.state.templateType,
      selectedValue: this.state.selectedValue,
    };
    return bookingData;
  }
  emptyTemplateDetails = () => {
    this.setState({
      hostName: '',
      userName: '',
      relationshipValue: 0,
      relationshipObjName: '',
      specification: '',
      importantinfo: '',
      eventdetailName: '',
    });
  }
  goBack = () => {
    // if (this.state.steps === true) {
    //   this.props.cancelBookingDetails();
    // }
    this.props.changeStep(this.props.currentStepCount - 1);
  }
  cancel = () => {
    if (localStorage && localStorage.getItem('bookingData')) {
      localStorage.removeItem('bookingData');
    }
    this.props.cancelBookingDetails();
    this.props.history.push(`/${this.props.match.params.id}`);
  }
  render() {
    let fullName = '';
    if (this.props.userDetails.first_name && this.props.userDetails.last_name) {
      fullName = this.props.userDetails.show_nick_name && this.props.userDetails.nick_name ? this.props.userDetails.nick_name
        : `${this.props.userDetails.first_name} ${this.props.userDetails.last_name}`;
    }
    const eventNames = this.props.eventsDetails;
    const optionItems = eventNames.map(eventNamesItem =>
      <option value={eventNamesItem.id} key={eventNamesItem.id}>{eventNamesItem.title}</option>
    );
    return (
      <React.Fragment>
        {
          this.props.currentStepCount >=3 ?
            <Confirm {...this.props} changeStep={this.props.changeStep} currentStepCount={this.props.currentStepCount} />
          :
        
        <Request.Wrapper>
          <Request.Content>
            <Request>
              <Request.LeftSection>
                {
                  this.props.currentStepCount === 2 &&
                    <HeaderSection>
                      <HeaderSection.HeaderNavigation onClick={this.goBack} />
                    </HeaderSection>
                }
                <Request.ComponentWrapper>
                  <Request.Heading>
                    {
                      this.props.currentStepCount === 1 ?
                        'What is your event?'
                      : 'Tell us about your event'
                    }
                  </Request.Heading>
                  <Request.Questionwraps>
                    <Request.Ask>
                      {
                        this.props.currentStepCount === 1 ?
                          <Request.EventStep1>
                            <Request.InputFieldsWrapper>
                              <Request.InputWrapper>
                                <Request.Label>Event type</Request.Label>
                                <Request.WrapsInput>
                                  <Request.Select
                                    value={this.state.selectedValue}
                                    onChange={this.handleChange}
                                  >
                                    <option value="0" key="0">Choose one</option>
                                    {optionItems}
                                  </Request.Select>
                                  {this.state.selectEventerror ?
                                    <Request.ErrorMsg>Please select an option</Request.ErrorMsg>
                                    :
                                    null
                                  }
                                </Request.WrapsInput>
                              </Request.InputWrapper>
                            </Request.InputFieldsWrapper>
                          </Request.EventStep1>
                          : null
                      }
                      {
                        this.props.currentStepCount === 2 ?
                          <Request.EventStep2>
                            <RequestTemplates
                              type={this.state.templateType}
                              relationship={this.state.relationship}
                              eventName={this.state.eventName}
                              handleChange={this.handleInput}
                              hostName={this.state.hostName}
                              userName={this.state.userName}
                              relationshipValue={this.state.relationshipValue}
                              specification={this.state.specification}
                              importantinfo={this.state.importantinfo}
                              date={this.state.date}
                              eventdetailName={this.state.eventdetailName}
                              whoIsfor={this.state.whoIsfor}
                              whoIsfrom={this.state.whoIsfrom}
                              eventTitle={this.state.eventTitle}
                              eventDate={this.state.eventDate}
                              starName={fullName}
                              checkRequiredHostName={this.checkRequiredHostName}
                              checkRequiredUserName={this.checkRequiredUserName}
                              checkRequiredTitle={this.checkRequiredTitle}
                              checkRequiredDate={this.checkRequiredDate}
                              {...this.props}

                            />
                          </Request.EventStep2>
                          : null
                      }
                    </Request.Ask>
                  </Request.Questionwraps>
                  <Request.PaymentControllerWrapper>
                    {this.props.currentStepCount === 2 ?
                      <Request.ContinueButton onClick={() => this.handleBooking()}>
                        Book
                      </Request.ContinueButton>
                      :
                      <Request.ContinueButton onClick={() => this.steps()}>
                        Next
                      </Request.ContinueButton>
                    }
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
