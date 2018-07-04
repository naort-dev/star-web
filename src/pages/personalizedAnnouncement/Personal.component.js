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
      selectedValue: '',
      steps: true,
      selectedPersonal: '',
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
    };
  }
  componentWillMount() {
    this.props.fetchCelebDetails(this.props.match.params.id);
    this.props.fetchOccasionlist(1);
    const parsedQuery = qs.parse(this.props.location.search)
    this.setState({ step: parsedQuery });
  }
  componentWillUnmount() {
    this.props.resetCelebDetails();
  }
  handleChange = (e) => {
    const occasionList = this.props.eventsDetails;
    const result = occasionList.find((find) => { 
      return find.id == e.target.value;
    });
    this.setState({
      selectedValue: e.target.value,
      templateType: result.type,
      relationship: result.relationships,
      eventName: result.title,
    });
  }
  handleChangePersonal = (e) => {
    this.setState({ selectedPersonal: e.target.value });
  }
  steps =() => {
    this.setState({ steps: false });
  }
  handleInput = (e, type) => {
    switch (type) {
      case 'hostName':
        this.setState({ hostName: e.target.value });
        break;
      case 'userName':
        this.setState({ userName: e.target.value });
        break;
      case 'relationship':
        this.setState({ relationshipValue: e.target.value });
        break;
      case 'specification':
        this.setState({ specification: e.target.value });
        break;
      case 'important':
        this.setState({ importantinfo: e.target.value });
        break;
      case 'date':
        this.setState({ date: e });
        break;
      case 'eventDetailName':
        this.setState({ eventdetailName: e.target.value });
        break;
      default:
        console.log(this.state);
    }
  }
  render() {
    console.log(this.state);
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
                <HeaderSection.HeaderNavigation />
                <HeaderSection.MiddleDiv> The Weekend</HeaderSection.MiddleDiv>
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
                                  <Request.ErrorMsg></Request.ErrorMsg>
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
                                  <Request.ErrorMsg></Request.ErrorMsg>
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
                    <Link to={`/${this.props.match.params.id}/request/personal?step=1`}>
                      <Request.ContinueButton onClick={() => this.steps()}>
                       Continue
                      </Request.ContinueButton>
                    </Link>
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
