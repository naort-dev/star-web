import React from 'react';
import { Redirect } from 'react-router-dom';
import * as qs from 'query-string';
import moment from 'moment';
import { Request, HeaderSection } from '../../pages/personalizedAnnouncement/styled';
import { ImageStack } from '../../components/ImageStack';
import './personal';
import RequestTemplates from '../../components/RequestTemplates';
import { PaymentFooterController } from '../../components/PaymentFooterController';
import AudioRecorder from '../../components/AudioRecorder';


export default class Personal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: props.bookingData.selectedValue ? props.bookingData.selectedValue : '0',
      steps: true,
      selectedPersonal: props.bookingData.selectedPersonal ? props.bookingData.selectedPersonal : '0',
      templateType: props.bookingData.occasionType ? props.bookingData.occasionType : '',
      relationship: props.bookingData.relationshipArray ? props.bookingData.relationshipArray : [],
      eventName: props.bookingData.eventName ? props.bookingData.eventName : '',
      hostName: props.bookingData.hostName ? props.bookingData.hostName : '',
      userName: props.bookingData.userName ? props.bookingData.userName : '',
      relationshipValue: props.bookingData.relationshipValue ? props.bookingData.relationshipValue : 0,
      relationshipObjName: '',
      specification: props.bookingData.specification ? props.bookingData.specification : '',
      importantinfo: props.bookingData.importantinfo ? props.bookingData.importantinfo : '',
      date: moment(),
      eventdetailName: props.bookingData.eventdetailName ? props.bookingData.eventdetailName : '',
      selectEventerror: false,
      selectVideoerror: false,
      whoIsfor: false,
      whoIsfrom: false,
      eventTitle: false,
      eventDate: false,
      otherRelationValue: props.bookingData.otherRelationValue === '' ? '' : props.bookingData.otherRelationValue,
    };
  }
  componentWillMount() {
    // 1 is used to specify the request was personal announcement
    this.props.fetchOccasionlist(1);
    const parsedQuery = qs.parse(this.props.location.search)
    this.setState({ step: parsedQuery });
    if (this.props.isLoggedIn) {
      this.setLoginUserName();
    }
  }

  setLoginUserName = () => {
    let userNameValue;
    if (this.props.loginDetails.show_nick_name && this.props.loginDetails.nick_name !== '') {
      userNameValue = this.props.loginDetails.nick_name;
    } else if (!this.props.loginDetails.show_nick_name) {
      userNameValue = this.props.loginDetails.first_name + ' ' + this.props.loginDetails.last_name;
    } else {
      userNameValue = 'Myself';
    }
    this.setState({ userName: userNameValue });
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
  handleBooking = () => {
    const hostNameValid = this.checkRequiredHostName();
    const userNameValid = this.checkRequiredUserName();
    if (!hostNameValid && !userNameValid) {
      const bookObj = this.createBookingObject(this.state);
      if (bookObj) {
        if (localStorage) {
          localStorage.setItem('bookingData', JSON.stringify(bookObj));
        }
        this.props.setBookingDetails(bookObj);
        this.props.history.push(`/${this.props.match.params.id}/request/confirm`);
      }
    }
  }
  checkRequiredHostName = () => {
    let whoIsforValue;
    if (this.state.selectedPersonal === '2') {
      whoIsforValue = this.state.hostName === '' ? true : false;
    } else {
      whoIsforValue = false;
    }
    this.setState({ whoIsfor: whoIsforValue });
    return whoIsforValue;
  }
  checkRequiredUserName = () => {
    let whoIsfromValue;
    if (this.state.selectedPersonal === '2') {
      whoIsfromValue = this.state.userName === '' ? true : false;
    } else {
      whoIsfromValue = false;
    }
    this.setState({ whoIsfrom: whoIsfromValue });
    return whoIsfromValue;
  }
  checkMyself = (stateName) => {
    let myselfValue;
    if (this.state.selectedPersonal === '1' && this.state[stateName] === '') {
      myselfValue = 'Myself';
    } else {
      myselfValue = this.state[stateName];
    }
    return myselfValue;
  }
  createBookingObject = (obj) => {
    const relationshipValue = obj.relationship;
    let relationsShipTitle = '';
    let relationshipName = relationshipValue.find((find) => {
      return find.id == obj.relationshipValue;
    });
    if (relationshipName && relationshipName.title) {
      relationsShipTitle = relationshipName.title;
    }
    if (this.state.relationshipValue === 'otherRelation') {
      relationshipName = this.props.otherRelationData
    }
    const userNameValue = this.checkMyself('userName');
    const hostNameValue = this.checkMyself('hostName');
    const bookingData = {
      starDetail: this.props.userDetails,
      starPrice: this.props.celebrityDetails,
      eventName: this.state.eventName,
      hostName: hostNameValue,
      userName: userNameValue,
      specification: this.state.specification,
      importantinfo: this.state.importantinfo,
      eventdetailName: this.state.eventdetailName,
      relationship: relationsShipTitle,
      relationshipArray: this.state.relationship,
      relationshipValue: this.state.relationshipValue,
      requestRelationshipData: relationshipName,
      date: this.state.date.format('MMM DD,YYYY'),
      type: 1,
      occasionType: this.state.templateType,
      selectedValue: this.state.selectedValue,
      selectedPersonal: this.state.selectedPersonal,
      otherRelationValue: this.state.otherRelationValue,
    };
    return bookingData;
  }
  otherRelationship = () => {
    this.props.postOtherRelation(this.state.otherRelationValue);
  }
  handleChangePersonal = (e) => {
    this.setState({ selectedPersonal: e.target.value });

    this.emptyTemplateDetails();
  }
  steps = () => {
    if (this.state.selectedValue === '0') {
      this.setState({ selectEventerror: true });
    } else {
      this.setState({ selectEventerror: false });
    }
    if (this.state.selectedPersonal === '0') {
      this.setState({ selectVideoerror: true });
    } else {
      this.setState({ selectVideoerror: false });
    }
    if (this.state.selectedValue !== '0' && this.state.selectedPersonal !== '0') {
      this.setState({ steps: false }, () => {
        this.props.history.push(`/${this.props.match.params.id}/request/personal?step=1`);
      });
    }
  }
  emptyTemplateDetails = () => {
    if (this.props.isLoggedIn) {
      this.setLoginUserName();
    }
    this.setState({
      hostName: '',
      relationshipValue: 0,
      relationshipObjName: '',
      specification: '',
      importantinfo: '',
      eventdetailName: '',
    });
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
  goBack = () => {
    this.setState({ steps: true });
    this.props.history.goBack();
  }
  cancel = () => {
    if (localStorage && localStorage.getItem('bookingData')) {
      localStorage.removeItem('bookingData');
    }
    this.props.cancelBookingDetails();
    this.props.history.push(`/starDetail/${this.props.match.params.id}`);
  }



  render() {
    // console.log("props", <AudioRecorder /> )
    let coverPhoto;
    let imageList = [];
    let profilePhoto;
    let fullName = '';
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
    const eventNames = this.props.eventsDetails;
    const parsedQuery = qs.parse(this.props.location.search)
    const optionItems = eventNames.map((eventNames) =>
      <option value={eventNames.id} key={eventNames.id}>{eventNames.title}</option>
    );
    if (parsedQuery.step && (this.state.selectedValue === '0' || this.state.selectedPersonal === '0')) {
      return <Redirect to="/" />;
    }
    return (
      <Request.Wrapper>
        <Request.Content>
          <Request>
            <Request.LeftSection>
              <HeaderSection>
                <HeaderSection.HeaderNavigation onClick={() => this.goBack()} />
                <HeaderSection.MiddleDiv> {fullName}</HeaderSection.MiddleDiv>
                <HeaderSection.RightDiv onClick={() => this.cancel()}>Cancel</HeaderSection.RightDiv>
              </HeaderSection>
              <Request.ComponentWrapper>
                <Request.ComponentWrapperScroll
                  autoHide
                  renderView={props => <div {...props} className="component-wrapper-scroll-wrapper" />}
                >
                  <Request.Heading>What is the event</Request.Heading>
                  <Request.Questionwraps>
                    <Request.Ask>
                      {
                        !Object.keys(parsedQuery).length ?
                          <Request.EventStep1>
                            <Request.InputFieldsWrapper>
                              <Request.InputWrapper>
                                <Request.Label>Event Type</Request.Label>
                                <Request.WrapsInput>
                                  <Request.Select
                                    value={this.state.selectedValue}
                                    onChange={this.handleChange}
                                  >
                                    <option value="0" key="0">Choose One</option>
                                    {optionItems}
                                  </Request.Select>
                                  {this.state.selectEventerror ?
                                    <Request.ErrorMsg>Please select an option</Request.ErrorMsg>
                                    :
                                    null
                                  }

                                </Request.WrapsInput>
                              </Request.InputWrapper>
                              <Request.InputWrapper>
                                <Request.Label>Who is the video for ?</Request.Label>
                                <Request.WrapsInput>
                                  <Request.Select
                                    value={this.state.selectedPersonal}
                                    onChange={this.handleChangePersonal}
                                  >
                                    <option value="0" key="0">Choose One</option>
                                    <option value="1" key="1">Myself</option>
                                    <option value="2" key="2">For someone else</option>
                                  </Request.Select>
                                  {this.state.selectVideoerror ?
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
                        parsedQuery.step === '1' ?
                          <Request.EventStep2>
                            <RequestTemplates
                              type={this.state.templateType}
                              relationship={this.state.relationship}
                              user={this.state.selectedPersonal}
                              eventName={this.state.eventName}
                              handleChange={this.handleInput}
                              hostName={this.state.hostName}
                              userName={this.state.userName}
                              relationshipValue={this.state.relationshipValue}
                              specification={this.state.specification}
                              importantinfo={this.state.importantinfo}
                              date={this.state.date}
                              eventdetailName={this.state.eventdetailName}
                              checkRequiredHostName={this.checkRequiredHostName}
                              checkRequiredUserName={this.checkRequiredUserName}
                              whoIsfor={this.state.whoIsfor}
                              whoIsfrom={this.state.whoIsfrom}
                              eventTitle={this.state.eventTitle}
                              eventDate={this.state.eventDate}
                              starName={fullName}
                              otherRelationship={this.otherRelationship}
                              otherRelationValue={this.state.otherRelationValue}
                              {...this.props}
                            />
                          </Request.EventStep2>
                          : null
                      }
                    </Request.Ask>
                  </Request.Questionwraps>
                </Request.ComponentWrapperScroll>
                <Request.PaymentControllerWrapper>
                  {parsedQuery.step === '1' ?
                    <PaymentFooterController
                      rate={rate}
                      remainingBookings={remainingBookings}
                      buttonName="Book"
                      handleBooking={this.handleBooking}
                    />
                    :
                    <Request.ContinueButton onClick={() => this.steps()}>
                      Continue
                    </Request.ContinueButton>
                  }
                </Request.PaymentControllerWrapper>
              </Request.ComponentWrapper>
            </Request.LeftSection>
            <Request.RightSection>
              {this.props.audioRecorder.showRecorder ?
                <AudioRecorder {...this.props} />
                :
                <Request.ImageStackWrapper>
                  <ImageStack
                    featureImage={featuredImage}
                    imageList={imageList}
                  />
                </Request.ImageStackWrapper>}
            </Request.RightSection>
          </Request>
        </Request.Content>
      </Request.Wrapper>
    );
  }
}
