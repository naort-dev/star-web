import React from 'react';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import * as qs from 'query-string';
import moment from 'moment';
import { Request, HeaderSection } from '../../pages/personalizedAnnouncement/styled';
import { ImageStack } from '../../components/ImageStack';
import './personal';
import RequestTemplates from '../../components/RequestTemplates';
import { PaymentFooterController } from '../../components/PaymentFooterController';

export default class Personal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: '0',
      steps: true,
      selectedPersonal: '0',
      templateType: '',
      relationship: [],
      eventName: '',
      hostName: '',
      userName: '',
      relationshipValue: 0,
      specification: '',
      importantinfo: '',
      date: moment(),
      eventdetailName: '',
      selectEventerror: false,
      selectVideoerror: false,
    };
  }
  componentWillMount() {
    this.props.fetchOccasionlist(1);
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
  handleChangePersonal = (e) => {
    this.setState({ selectedPersonal: e.target.value });
  }
  steps =() => {
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
  handleInput = (event, type) => {
    switch (type) {
      case 'hostName':
        this.setState({ hostName: event.target.value });
        break;
      case 'userName':
        this.setState({ userName: event.target.value });
        break;
      case 'relationship':
        this.setState({ relationshipValue: event.target.value });
        break;
      case 'specification':
        this.setState({ specification: event.target.value });
        break;
      case 'important':
        this.setState({ importantinfo: event.target.value });
        break;
      case 'date':
        this.setState({ date: event });
        break;
      case 'eventDetailName':
        this.setState({ eventdetailName: event.target.value });
        break;
      default:
        this.props.history.push(`/${this.props.match.params.id}/request/personal`);
    }
  }
  goBack = () => {
    this.props.history.goBack();
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
    const eventNames = this.props.eventsDetails;
    const parsedQuery = qs.parse(this.props.location.search)
    const optionItems = eventNames.map((eventNames) => 
      <option value={eventNames.id} key={eventNames.id}>{eventNames.title}</option>
    );
    return (
      <Request.Wrapper>
        <Request.Content>
          <Request>
            <Request.LeftSection>
              <HeaderSection>
                <HeaderSection.HeaderNavigation onClick={() => this.goBack()} />
                <HeaderSection.MiddleDiv> {fullName}</HeaderSection.MiddleDiv>
                <Link to={`/starDetail/${this.props.match.params.id}`}>
                  <HeaderSection.RightDiv>Cancel</HeaderSection.RightDiv>
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
                            />
                          </Request.EventStep2>
                        : null
                      }
                    </Request.Ask>
                  </Request.Questionwraps>
                </Scrollbars>
                <Request.PaymentControllerWrapper>
                  {this.state.steps ?
                    <Request.ContinueButton onClick={() => this.steps()}>
                      Continue
                    </Request.ContinueButton>
                    :
                   
                    <PaymentFooterController
                      rate={rate}
                      remainingBookings={remainingBookings}
                    />
                
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
