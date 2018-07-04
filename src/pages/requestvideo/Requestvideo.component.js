import React from 'react';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { Request, HeaderSection } from '../../pages/requestvideo/styled';
import { ImageStack } from '../../components/ImageStack';


export default class Requestvideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentWillMount() {
    this.props.fetchCelebDetails(this.props.match.params.id);
  }
  componentWillUnmount() {
    this.props.resetCelebDetails();
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
    return (
      <Request.Wrapper>
        <Request.Content>
          <Request>
            <Request.LeftSection>
              <HeaderSection>
                <HeaderSection.HeaderNavigation onClick={() => this.goBack()} />
                <HeaderSection.MiddleDiv> {fullName} </HeaderSection.MiddleDiv>
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
                  <Request.OptionWrapper>
                    <Request.HeaderText>
                      What kind of video would you like to request?
                    </Request.HeaderText>
                    <Request.ButtonWrapper>
                      <Link to={`/${this.props.match.params.id}/request/ask`}>
                        <Request.Button>Ask a Question</Request.Button>
                      </Link>
                      <Link to={`/${this.props.match.params.id}/request/personal`}>
                        <Request.Button >Personalized Shout-Out</Request.Button>
                      </Link>
                      <Link to={`/${this.props.match.params.id}/request/event/`}>
                        <Request.Button >Event Announcement</Request.Button>
                      </Link>
                    </Request.ButtonWrapper>    
                  </Request.OptionWrapper>
                </Scrollbars>  
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
