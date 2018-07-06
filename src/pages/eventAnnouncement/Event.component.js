import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import moment from 'moment';
import * as qs from 'query-string';
import { Request, HeaderSection } from '../../pages/eventAnnouncement/styled';
import { ImageStack } from '../../components/ImageStack';
import './event';
import RequestTemplates from '../../components/RequestTemplates';
import { PaymentFooterController } from '../../components/PaymentFooterController';

export default class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: props.bookingData.selectedValue ? props.bookingData.selectedValue : '0', // for default state (choose one)
      steps: true,
      templateType: props.bookingData.occasionType ? props.bookingData.occasionType : '',
      relationship: [],
      eventName: props.bookingData.eventName ? props.bookingData.eventName : '',
      hostName: props.bookingData.hostName ? props.bookingData.hostName : '',
      userName: props.bookingData.userName ? props.bookingData.userName : '',
      relationshipValue: 0,
      relationshipName: '',
      specification: props.bookingData.specification ? props.bookingData.specification : '',
      importantinfo: props.bookingData.importantinfo ? props.bookingData.importantinfo : '',
      date: moment(),
      eventdetailName: props.bookingData.eventdetailName ? props.bookingData.eventdetailName : '',
      selectEventerror: false,
      whoIsfor: false,
      eventTitle: false,
      eventDate: false,
    };
  }
  componentWillMount() {
    // 2 is used to specify the request was event announcement
    this.props.fetchOccasionlist(2);
    const parsedQuery = qs.parse(this.props.location.search)
    this.setState({ step: parsedQuery });
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
  }
  steps = () => {
    if (this.state.selectedValue === '0') {
      this.setState({ selectEventerror: true });
    } else {
      this.setState({ selectEventerror: false });
    }
    if (this.state.selectedValue !== '0') {
      this.setState({ steps: false }, () => {
        this.props.history.push(`/${this.props.match.params.id}/request/event?step=1`);
      });
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
    if (!this.state.eventTitle && !this.state.eventDate) {
      const bookObj = this.createBookingObject(this.state);
      if (bookObj) {
        localStorage.setItem('bookingData', JSON.stringify(bookObj));
        this.props.setBookingDetails(bookObj);
        this.props.history.push(`/${this.props.match.params.id}/request/confirm`);
      }
    }
  }
  checkRequired = (event, arg) => {
    if (arg === '1') {
      if (event === '') {
        this.setState({ whoIsfor: true });
      } else {
        this.setState({ whoIsfor: false });
      }
    } else if (arg === '2') {
      if (event === '') {
        this.setState({ eventTitle: true });
      } else {
        this.setState({ eventTitle: false });
      }
    } else if (arg === '3') {
      if (event === '') {
        this.setState({ eventDate: true });
      } else {
        this.setState({ eventDate: false });
      }
    } else {
      this.setState({
        whoIsfor: false,
        eventTitle: false,
        eventDate: false,
      });
    }
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
      date: this.state.date.format('MMM DD,YYYY'),
      type: 2,
      occasionType: this.state.templateType,
      selectedValue: this.state.selectedValue,
    };
    return bookingData;
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
    if (parsedQuery.step && (this.state.selectedValue === '0')) {
      return <Redirect to="/" />;
    }
    return (
      <Request.Wrapper>
        <Request.Content>
          <Request>
            <Request.LeftSection>
              <HeaderSection>
                <HeaderSection.HeaderNavigation onClick={() => this.goBack()} />
                <HeaderSection.MiddleDiv> {fullName} </HeaderSection.MiddleDiv>
                <HeaderSection.RightDiv onClick={() => this.cancel()}>Cancel</HeaderSection.RightDiv>
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
                              eventName={this.state.eventName}
                              handleChange={this.handleInput}
                              hostName={this.state.hostName}
                              userName={this.state.userName}
                              relationshipValue={this.state.relationshipValue}
                              specification={this.state.specification}
                              importantinfo={this.state.importantinfo}
                              date={this.state.date}
                              eventdetailName={this.state.eventdetailName}
                              checkRequired={this.checkRequired}
                              whoIsfor={this.state.whoIsfor}
                              eventTitle={this.state.eventTitle}
                              eventDate={this.state.eventDate}
                            />
                          </Request.EventStep2>
                          : null
                      }
                    </Request.Ask>
                  </Request.Questionwraps>
                </Scrollbars>
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
              <ImageStack
                featureImage={featuredImage}
                imageList={imageList}
              />
            </Request.RightSection>
          </Request>
        </Request.Content>
      </Request.Wrapper>
    );
  }
}
