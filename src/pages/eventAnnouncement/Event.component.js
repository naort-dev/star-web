import React from 'react';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import * as qs from 'query-string';
import { Request, HeaderSection } from '../../pages/eventAnnouncement/styled';
import { ImageStack } from '../../components/ImageStack';
import './event';
import EventAnnouncementSteps from '../../components/EventAnnouncementSteps';

export default class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: '',
    };
  }
  componentWillMount() {
    this.props.fetchCelebDetails(this.props.match.params.id);
    this.props.fetchOccasionlist(2);
    const parsedQuery = qs.parse(this.props.location.search)
    this.setState({step: parsedQuery});
  }
  componentWillUnmount() {
    this.props.resetCelebDetails();
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
    <option key={eventNames.id}>{eventNames.title}</option>
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
                  <Request.Questionwraps>
                    <Request.Ask>
                      {
                        !Object.keys(parsedQuery).length ?
                          <Request.EventStep1>
                            <Request.InputFieldsWrapper>
                              <Request.InputWrapper>
                                <Request.Label>Event Type</Request.Label>
                                <Request.WrapsInput>
                                  <Request.Select>
                                    {optionItems}
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
                            <Request.InputFieldsWrapper>
                              <Request.InputWrapper>
                                <Request.Label>Event Type</Request.Label>
                                <Request.WrapsInput>
                                  <EventAnnouncementSteps />
                                  <Request.ErrorMsg></Request.ErrorMsg>
                                </Request.WrapsInput>   
                              </Request.InputWrapper>
                            </Request.InputFieldsWrapper>
                          </Request.EventStep2>
                        : null
                      }
                    </Request.Ask>
                  </Request.Questionwraps>
                </Scrollbars>
                <Request.PaymentControllerWrapper>
                  <Request.ContinueButton>
                    <Link to={`/${this.props.match.params.id}/request/event?step=1`}>Continue</Link>
                  </Request.ContinueButton>
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
