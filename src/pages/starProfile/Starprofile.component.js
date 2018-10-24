import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
import Header from '../../components/Header';
import AppBanner from '../../components/AppBanner';
import Tabs from '../../components/Tabs';
import { Detail, HeaderSection } from '../starProfile/styled';
import Loader from '../../components/Loader';
import { AboutContent } from '../../components/AboutContent';
import { RequestController } from '../../components/RequestController';
import ScrollList from '../../components/ScrollList';
import { setMetaTags } from '../../utils/setMetaTags';
import { ImageStack } from '../../components/ImageStack';
import Popup from '../../components/Popup';
import { fetch } from '../../services/fetch';

export default class Starprofile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
      selectedTab: 'All',
      tabList: [],
      showPopup: null,
      showAppBanner: true,
      defaultTabSelect: false,
    };
  }

  componentWillMount() {
    this.props.resetCelebDetails();
    this.props.fetchCelebDetails(this.getUserId(this.props));
    if (!this.isMyStarPage()) {
      this.props.history.replace(`/${this.props.match.params.id.toLowerCase()}`)
    }
    this.props.fetchCelebVideosList(0, true, this.getUserId(this.props));
    window.addEventListener('resize', this.handleWindowResize);
    this.setTabList();
  }
  componentWillReceiveProps(nextProps) {
    if (this.getUserId(this.props) !== this.getUserId(nextProps)) {
      this.props.resetCelebDetails();
      this.props.fetchCelebDetails(this.getUserId(nextProps));
      this.setState({
        selectedTab: 'All',
      });
      this.props.fetchCelebVideosList(0, true, this.getUserId(nextProps));
    }
    if (this.props.isLoggedIn !== nextProps.isLoggedIn) {
      if (nextProps.isLoggedIn && nextProps.requestFlowDetails) {
        this.props.toggleRequestFlow(true);
      }
      this.props.fetchCelebDetails(this.getUserId(nextProps));
    }
    if (this.state.selectedTab === 'All' && document.body.getBoundingClientRect().width < 1025 && !nextProps.videosList.data.length && !nextProps.videosList.loading && this.state.defaultTabSelect === false) {
      this.setState({
        selectedTab: 'About',
        defaultTabSelect: true,
      });
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  getUserId = (props) => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (this.isMyStarPage()) {
      if (userDetails) {
        return userDetails.user.user_id;
      }
      this.props.toggleLogin(true);
    }
    return props.match.params.id.toLowerCase();
  }

  setTabList = () => {
    if (document.body.getBoundingClientRect().width < 1025) {
      this.setState({ tabList: ['All', 'Shout-outs', 'Events', 'Q&A', 'About'] });
    } else {
      this.setState({ tabList: ['All', 'Shout-outs', 'Events', 'Q&A'] });
    }
  }

  isMyStarPage = () => this.props.location.pathname.includes('myStar')

  switchTab = (tab) => {
    this.setState({ selectedTab: tab });
    let requestId;
    switch (tab) {
      case 'Q&A':
        requestId = 3;
        break;
      case 'Events':
        requestId = 2;
        break;
      case 'Shout-outs':
        requestId = 1;
        break;
      default: break;
    }
    this.props.fetchCelebVideosList(0, true, this.getUserId(this.props), requestId);
  }
  handleWindowResize = (e) => {
    if (this.state.selectedTab === 'About' && document.body.getBoundingClientRect().width >= 1025) {
      this.setState({ selectedTab: 'All' }, () => {
        this.props.fetchCelebVideosList(0, true, this.props.userDetails.id);
      });
    }
    this.setTabList();
  }
  activateMenu = () => {
    this.setState({ menuActive: !this.state.menuActive });
  }
  generateStarDetails = () => {
    let string = '';
    if (this.props.celebrityDetails.profession_details) {
      this.props.celebrityDetails.profession_details.forEach((professions, index) => {
        if (index === this.props.celebrityDetails.profession_details.length - 1) {
          string += `${professions.title}`;
        } else {
          string += `${professions.title}\xa0|\xa0`;
        }
      });
    }
    return string;
  }

  handleRequest = () => {
    if (this.props.celebrityDetails.availability && this.props.celebrityDetails.remaining_limit > 0) {
      if (!this.props.loading && this.props.userDetails.user_id) {
        this.props.setRequestFlow(this.props.userDetails.user_id);
        // this.props.history.push(`/${this.props.userDetails.user_id}/request`);
      }
    } else if (!this.props.isLoggedIn) {
      this.props.toggleLogin(true);
    } else {
      fetch.post('user/alert_fan/', {
        celebrity: this.props.userDetails.id,
      })
        .then((response) => {
          if (response.status == 200) {
            this.setState({ showPopup: true });
          }
        });
    }
  }


  renderList = () => {
    if (this.props.videosList.data.length) {
      return (
        <ScrollList
          dataList={this.props.videosList.data}
          videos
          starsPage
          limit={this.props.videosList.limit}
          totalCount={this.props.videosList.count}
          offset={this.props.videosList.offset}
          loading={this.props.videosList.loading}
          fetchData={(offset, refresh) => this.props.fetchCelebVideosList(offset, refresh, this.getUserId(this.props))}
        />
      );
    }
    let imageList = [];
    let firstImage;
    let secondImage;
    let featuredImage;
    if (this.props.userDetails.images && this.props.userDetails.images.length) {
      firstImage = this.props.userDetails.images[0] ? this.props.userDetails.images[0].image_url : null;
      secondImage = this.props.userDetails.images[1] ? this.props.userDetails.images[1].image_url : null;
      imageList = [firstImage, secondImage];
    }
    if (this.props.userDetails.featured_photo) {
      featuredImage = this.props.userDetails.featured_photo.image_url && this.props.userDetails.featured_photo.image_url;
    } else {
      featuredImage = this.props.userDetails.images && this.props.userDetails.images[0] && this.props.userDetails.images[0].image_url;
    }
    if (document.body.getBoundingClientRect().width >= 1025 && this.state.selectedTab === 'All') {
      return (
        <ImageStack
          featureImage={featuredImage}
          imageList={imageList}
        />
      );
    }
    return (
      <Detail.NoData> <strong>Be the first to get this type of video!</strong> </Detail.NoData>
    );
  }
  render() {
    let coverPhoto;
    let profilePhoto;
    let fullName = '';
    const rate = this.props.celebrityDetails.rate ? this.props.celebrityDetails.rate : 0;
    const remainingBookings = this.props.celebrityDetails.remaining_limit != null || this.props.celebrityDetails.remaining_limit != undefined ? this.props.celebrityDetails.remaining_limit : 1;
    if (this.props.userDetails.nick_name || this.props.userDetails.first_name || this.props.userDetails.last_name) {
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
    if (this.props.detailsError === '404' || Object.keys(this.props.detailsError).length) {
      return <Redirect to="/not-found" />;
    }
    return (
      <Detail.Wrapper>
        {
          this.state.showAppBanner && !this.isMyStarPage() && Object.keys(this.props.userDetails).length && Object.keys(this.props.celebrityDetails).length ?
            <AppBanner
              androidUrl={`profile/${this.props.match.params.id.toLowerCase()}`}
              iosUrl={`profile/?profile_id=${this.props.match.params.id.toLowerCase()}`}
              hideAppBanner={() => this.setState({ showAppBanner: false })}
            />
          : null
        }
        {
          !this.isMyStarPage() &&
            <Helmet
              title={fullName}
              meta={[...setMetaTags(
                fullName,
                profilePhoto,
                `Get your personalized video from ${fullName}`,
              ),
              { property: 'al:ios:app_store_id', content: env('iosAppId') },
              { property: 'al:ios:url', content: `${env('androidAppId')}://profile/?profile_id=${this.props.match.params.id.toLowerCase()}` },
              { property: 'al:ios:app_name', content: 'Starsona' },
              { property: 'al:android:package', content: env('androidAppId') },
              { property: 'al:android:url', content: `${env('androidAppId')}://profile/${this.props.match.params.id.toLowerCase()}` },
              { property: 'al:android:app_name', content: 'Starsona' },
              ]}
            />
        }
        {this.state.showPopup ?
          <Popup
            smallPopup
            closePopUp={() => this.setState({ showPopup: false })}
          >
            <Detail.PopupWrapper>
              <Detail.PopupLabel>
                We'll let you know immediately when the star is accepting booking requests
              </Detail.PopupLabel>
              <Detail.PopupButton onClick={() => this.setState({ showPopup: false })}>Ok</Detail.PopupButton>
            </Detail.PopupWrapper>
          </Popup> : null}
        <Detail.Content>
          <Header
            menuActive={this.state.menuActive}
            enableMenu={this.activateMenu}
            disableMenu
            history={this.props.history}
          />
          <Detail>
            <Detail.LeftSection>
              <Detail.SmallScreenLayout>
                <Detail.ImageRenderDiv>
                  <HeaderSection.Small>
                    <HeaderSection.HeaderNavigationMobile onClick={() => this.props.history.goBack()} />
                  </HeaderSection.Small>
                  <Detail.ImageSection imageUrl={coverPhoto}>
                    <Detail.CoverImage alt="" src={coverPhoto} />
                    {this.isMyStarPage() &&
                    <Link
                      to="/settings?star=true"
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        zIndex: 2,
                        color: '#FFF',
                        textDecoration: 'underline',
                      }}
                    >
                      Edit Profile
                    </Link>
                  }
                    <Detail.ProfileImageWrapper>
                      <Detail.ProfileImage
                        imageUrl={profilePhoto}
                      />
                    </Detail.ProfileImageWrapper>
                    {/* <Detail.FavoriteButton /> */}
                  </Detail.ImageSection>
                  <Detail.ProfileContent>
                    <Detail.Span>
                      <Detail.StarName>
                        {fullName}
                      </Detail.StarName>
                      <Detail.StarDetails>
                        {
                          this.generateStarDetails()
                        }
                      </Detail.StarDetails>
                    </Detail.Span>
                  </Detail.ProfileContent>
                </Detail.ImageRenderDiv>
              </Detail.SmallScreenLayout>
              <Detail.LargeScreenLayout>
                <HeaderSection>
                  <HeaderSection.HeaderNavigation onClick={() => this.props.history.goBack()} />
                </HeaderSection>
                <AboutContent
                  profilePhoto={profilePhoto}
                  loading={this.props.detailsLoading}
                  description={this.props.celebrityDetails.description ? this.props.celebrityDetails.description : ''}
                  charity={this.props.celebrityDetails.charity ? this.props.celebrityDetails.charity : ''}
                  fullName={fullName}
                  showEdit={this.isMyStarPage()}
                  starDetails={this.generateStarDetails()}
                />
              </Detail.LargeScreenLayout>
              <Detail.RequestControllerWrapper>
                <RequestController
                  rate={rate}
                  remainingBookings={remainingBookings}
                  availability={this.props.celebrityDetails.availability}
                  handleRequest={this.handleRequest}
                />
              </Detail.RequestControllerWrapper>
            </Detail.LeftSection>
            <Detail.RightSection isNotEmpty={this.props.videosList.data.length}>
              {
                (!this.props.videosList.data.length || this.props.videosList.loading) && document.body.getBoundingClientRect().width >= 1025 && this.state.selectedTab === 'All' ?
                  null
                  :
                  <Tabs
                    starsPage
                    labels={this.state.tabList}
                    selected={this.state.selectedTab}
                    disableFilter
                    switchTab={this.switchTab}
                  />
              }
              {
                this.state.selectedTab !== 'About' ?
                  <Detail.ScrollListWrapper>
                    {
                      !this.props.videosList.data.length && this.props.videosList.loading ?
                        <Loader />
                        :
                        this.renderList()
                    }
                  </Detail.ScrollListWrapper>
                  :
                  <Detail.AboutDetailsWrapper>
                    {
                      this.props.celebrityDetails.description && this.props.celebrityDetails.description !== '' ?
                        <div>
                          <Detail.AboutDetailHeading>About</Detail.AboutDetailHeading>
                          <Detail.AboutDetailContent>
                            {this.props.celebrityDetails.description}
                          </Detail.AboutDetailContent>
                        </div>
                        : null
                    }
                    {
                      this.props.celebrityDetails.charity && this.props.celebrityDetails.charity !== '' ?
                        <div>
                          <Detail.AboutDetailHeading>My videos support a charity</Detail.AboutDetailHeading>
                          <Detail.AboutDetailContent>
                            {this.props.celebrityDetails.charity}
                          </Detail.AboutDetailContent>
                        </div>
                        : null
                    }
                  </Detail.AboutDetailsWrapper>
              }
            </Detail.RightSection>
          </Detail>
        </Detail.Content>
      </Detail.Wrapper>
    );
  }
}
