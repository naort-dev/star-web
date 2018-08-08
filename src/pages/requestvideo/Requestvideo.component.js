import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import RequesFlowPopup from '../../components/RequestFlowPopup';
import { Request, HeaderSection } from '../../pages/requestvideo/styled';
import { ImageStack } from '../../components/ImageStack';
import { Askquestion } from '../../pages/askQuestion';
import { Event } from '../../pages/eventAnnouncement';
import { Personal } from '../../pages/personalizedAnnouncement';

export default class Requestvideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginRedirect: false,
    };
  }
  goBack = () => {
    this.props.history.goBack();
  }
  requestFlowCheck = (url) => { 
    if (this.props.isLoggedIn) {
    this.props.history.push(`/${this.props.match.params.id}/request${url}`);
    } else{
      this.props.setRedirectUrls(this.props.location.pathname);
      this.setState({ loginRedirect: true });
    }
  }

  closeRequestFlow = () => {
    this.props.history.replace(`/${this.props.match.params.id}/request`);
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
    if (this.state.loginRedirect) {
      return <Redirect to="/login" />;
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
              <Request.ComponentWrapper>
                <Request.ComponentWrapperScroll
                  autoHide
                  renderView={props => <div {...props} className="component-wrapper-scroll-wrapper" />}
                >
                  <Request.OptionWrapper>
                    <Request.HeaderText>
                      What kind of video would you like to request?
                    </Request.HeaderText>
                    <Request.ButtonWrapper>
                      <Request.Button onClick={() => this.requestFlowCheck('/personal')} >Personalized Shout-Out</Request.Button>
                      <Request.Button onClick={() => this.requestFlowCheck('/event')}>Event Announcement</Request.Button>
                      <Request.Button onClick={() => this.requestFlowCheck('/ask')}>Ask a Question</Request.Button>
                    </Request.ButtonWrapper>
                  </Request.OptionWrapper>
                </Request.ComponentWrapperScroll>
              </Request.ComponentWrapper>
            </Request.LeftSection>
            <Switch>
              <Route path="/:id/request/ask" component={Askquestion} />
              <Route path="/:id/request/event" component={Event} />
              <Route
                path="/:id/request/personal"
                render={props => (
                  <RequesFlowPopup
                    closePopUp={this.closeRequestFlow}
                    smallPopup
                  >
                    <Personal {...props} />
                  </RequesFlowPopup>
                )}
              />
            </Switch>
            <Request.RightSection>
              <Request.ImageStackWrapper>
                <ImageStack
                  featureImage={featuredImage}
                  imageList={imageList}
                />
              </Request.ImageStackWrapper>
            </Request.RightSection>
          </Request>
        </Request.Content>
      </Request.Wrapper>
    );
  }
}
