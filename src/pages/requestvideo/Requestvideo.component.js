import React from 'react';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { Request, HeaderSection } from '../../pages/requestvideo/styled';
import { ImageStack } from '../../components/ImageStack';
import { PaymentFooterController } from '../../components/PaymentFooterController';
import { RequestVideoOption } from '../../components/RequestVideoOptions';
import { AskQuestion } from '../../components/AskQuestion';
import { PersonalizedShoutout } from '../../components/PersonalizedShoutout';
import EventAnnouncement from '../../components/EventAnnouncement';

export default class Requestvideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      footer: false,
      RequestVideoOption: true,
      askQuestion: false,
      personalizedShout: false,
      eventAnnouncement: false,
    };
  }
  componentWillMount() {
    this.props.fetchCelebDetails(this.props.match.params.id);
  }
  componentWillUnmount() {
    this.props.resetCelebDetails();
  }
  // for checking the option and choose which option user selected
  checkOptions = (selectedOption) => {
    switch (selectedOption) {
      case 'ask':
        this.setState({
          footer: true,
          RequestVideoOption: false,
          askQuestion: true,
          personalizedShout: false,
          eventAnnouncement: false,
        });
        break;
      case 'personalized':
        this.setState({
          footer: false,
          RequestVideoOption: false,
          askQuestion: false,
          personalizedShout: true,
          eventAnnouncement: false,
        });
        this.props.fetchOccasionlist(1);
        break;
      case 'event':
        this.setState({
          footer: false,
          RequestVideoOption: false,
          askQuestion: false,
          personalizedShout: false,
          eventAnnouncement: true,
        });
        this.props.fetchOccasionlist(2);
        break;
      default:
        this.setState({
          footer: false,
          RequestVideoOption: true,
          askQuestion: false,
          personalizedShout: false,
          eventAnnouncement: false,
        });
    }
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
    console.log(this.props.eventDetails);
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
                  { this.state.RequestVideoOption ?
                    <RequestVideoOption
                      optionSelector={this.checkOptions} 
                    />
                    :
                    null

                  }
                  
                  {this.state.askQuestion ?
                    <AskQuestion />
                    :
                    null
                  }
                  {this.state.personalizedShout ?
                    <PersonalizedShoutout />
                    :
                    null
                  }
                  {
                    this.state.eventAnnouncement ?
                      <EventAnnouncement eventDetails={this.props.eventsDetails} />
                    :
                    null
                  }
                </Scrollbars>      
              </Request.ComponentWrapper>
              {this.state.footer ?
                <Request.PaymentControllerWrapper>
                  <PaymentFooterController
                    rate={rate}
                    remainingBookings={remainingBookings}
                  />
                </Request.PaymentControllerWrapper>
              :
              null
              }
              
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
