import React from 'react';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import Header from '../../components/Header';
import Tabs from '../../components/Tabs';
import { Detail } from '../starProfile/styled';
import Loader from '../../components/Loader';
import VideoPlayer from '../../components/VideoPlayer';
import { AboutContent } from '../../components/AboutContent';
import { RequestController } from '../../components/RequestController';
import ScrollList from '../../components/ScrollList';
import { ComponentLoading } from '../../components/ComponentLoading';
import { ImageStack } from '../../components/ImageStack';

export default class Starprofile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
      selectedTab: 'All',
      tabList: [],
      videoActive: props.match.params.videoId ? true : false,
      selectedVideoItem: {},
      relatedVideos: [],
    };
  }
  componentWillMount() {
    this.props.fetchCelebDetails(this.props.match.params.id);
    this.props.fetchCelebVideosList(0, true, this.props.match.params.id);
    window.addEventListener('resize', this.handleWindowResize);
    this.setTabList();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.props.fetchCelebDetails(nextProps.match.params.id);
      this.props.fetchCelebVideosList(0, true, nextProps.match.params.id);
    }
    if (this.props.isLoggedIn !== nextProps.isLoggedIn) {
      this.props.fetchCelebDetails(nextProps.match.params.id);
    }
    if (!nextProps.match.params.videoId) {
      this.setState({ videoActive: false, selectedVideoItem: {}, relatedVideos: [] });
    }
    if (nextProps.match.params.videoId !== this.props.match.params.videoId) {
      if (!nextProps.match.params.videoId) {
        this.setState({ videoActive: false, selectedVideoItem: {}, relatedVideos: [] });
      } else {
        this.setState({ videoActive: true });
        this.findVideoItem(nextProps.videosList.data, nextProps.match.params.videoId);
      }
    }
    if (this.state.videoActive && nextProps.videosList.data.length) {
      this.findVideoItem(nextProps.videosList.data, nextProps.match.params.videoId);
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }
  setTabList = () => {
    if (window.outerWidth < 1025) {
      this.setState({ tabList: ['All', 'Q&A', 'Events', 'About'] });
    } else {
      this.setState({ tabList: ['All', 'Q&A', 'Events'] });
    }
  }
  findVideoItem = (dataList, bookingId) => {
    dataList.forEach((item) => {
      if (item.booking_id === bookingId) {
        this.setState({ selectedVideoItem: item });
      }
    });
    const relatedVideos = dataList.filter((item) => {
      return item.booking_id !== bookingId;
    });
    this.setState({ relatedVideos: [] }, () => {
      this.setState({ relatedVideos });
    });
  }
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
      default: break;
    }
    this.props.fetchCelebVideosList(0, true, this.props.match.params.id, requestId);
  }
  handleWindowResize = (e) => {
    if (this.state.selectedTab === 'About' && window.outerWidth >= 1025) {
      this.setState({ selectedTab: 'All' }, () => {
        this.props.fetchCelebVideosList(0, true, this.props.match.params.id);
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
          fetchData={(offset, refresh) => this.props.fetchCelebVideosList(offset, refresh, this.props.match.params.id)}
        />
      );
    }
    let imageList = [];
    let firstImage;
    let secondImage;
    if (this.props.userDetails.images && this.props.userDetails.images.length) {
      firstImage = this.props.userDetails.images[0] ? this.props.userDetails.images[0].image_url : null;
      secondImage = this.props.userDetails.images[1] ? this.props.userDetails.images[1].image_url : null;
      imageList = [firstImage, secondImage];
    }
    if (window.outerWidth >= 1025) {
      return (
        <ImageStack
          featureImage={this.props.userDetails.avatar_photo && this.props.userDetails.avatar_photo.image_url}
          imageList={imageList}
        />
      );
    }
    return (
      <Detail.NoData> <strong>No Data</strong> </Detail.NoData>
    );
  }
  render() {
    let coverPhoto;
    let profilePhoto;
    let fullName = '';
    const rate = this.props.celebrityDetails.rate ? this.props.celebrityDetails.rate: 0;
    if (this.props.userDetails.first_name && this.props.userDetails.last_name) {
      fullName = `${this.props.userDetails.first_name} ${this.props.userDetails.last_name}`;
    }
    if (this.props.userDetails.avatar_photo) {
      coverPhoto = this.props.userDetails.avatar_photo.image_url && this.props.userDetails.avatar_photo.image_url;
      profilePhoto = this.props.userDetails.avatar_photo.thumbnail_url && this.props.userDetails.avatar_photo.thumbnail_url;
    } else {
      coverPhoto = this.props.userDetails.images && this.props.userDetails.images[0] && this.props.userDetails.images[0].image_url;
      profilePhoto = this.props.userDetails.images && this.props.userDetails.images[0] && this.props.userDetails.images[0].thumbnail_url;
    }
    console.log(this.state.selectedVideoItem)
    return (
      <Detail.Wrapper>
        {
          this.props.detailsLoading?
            <ComponentLoading />
          :
            <Detail.Content>
              <Header
                menuActive={this.state.menuActive}
                enableMenu={this.activateMenu}
                disableMenu
              />
              <Detail>
                <Detail.LeftSection>
                  <Detail.SmallScreenLayout>
                    <Detail.ImageRenderDiv>
                      <Detail.ImageSection
                        imageUrl={coverPhoto}
                      >
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
                    <AboutContent
                      profilePhoto={profilePhoto}
                      description={this.props.celebrityDetails.description ? this.props.celebrityDetails.description : ''}
                      charity={this.props.celebrityDetails.charity ? this.props.celebrityDetails.charity : ''}
                      fullName={fullName}
                      starDetails={this.generateStarDetails()}
                    />
                  </Detail.LargeScreenLayout>
                  <Detail.RequestControllerWrapper>
                    <RequestController rate={rate} />
                  </Detail.RequestControllerWrapper>
                </Detail.LeftSection>
                <Detail.RightSection>
                  {
                    this.state.videoActive ?
                      <Detail.VideoPlayWrapper>
                        <Link to={`/starDetail/${this.props.match.params.id}`}>
                          <Detail.CloseButton />
                        </Link>
<<<<<<< HEAD
                        <Detail.VideoPlayer
                          videoWidth={this.state.selectedVideoItem.width ? this.state.selectedVideoItem.width: '100%'}
                          videoHeight={this.state.selectedVideoItem.height ? this.state.selectedVideoItem.height: '100%'}
                        >
                          <VideoPlayer
                            cover={this.state.selectedVideoItem.s3_thumbnail_url ? this.state.selectedVideoItem.s3_thumbnail_url : ''}
                            src={this.state.selectedVideoItem.s3_video_url ? this.state.selectedVideoItem.s3_video_url : ''}
                          />
                        </Detail.VideoPlayer>
                        <Detail.VideoContent>
                          <Detail.VideoTitle>
                            {this.state.selectedVideoItem.booking_title ? this.state.selectedVideoItem.booking_title : ''}
                          </Detail.VideoTitle>
                        </Detail.VideoContent>
                        <Detail.RelatedVideos>
                          <ScrollList
                            dataList={this.state.relatedVideos}
                            finite
                            videos
                            starsPage
                            limit={this.props.videosList.limit}
                            totalCount={this.props.videosList.count}
                            offset={this.props.videosList.offset}
                            loading={this.props.videosList.loading}
                            fetchData={(offset, refresh) => this.props.fetchCelebVideosList(offset, refresh, this.props.match.params.id)}
                          />
                        </Detail.RelatedVideos>
=======
                        <Detail.VideoPlayerSection>
                          <Scrollbars
                            autoHide
                          >
                            <Detail.VideoPlayerContent>
                              <Detail.VideoPlayer
                                videoWidth={this.state.selectedVideoItem.width ? this.state.selectedVideoItem.width: '100%'}
                                videoHeight={this.state.selectedVideoItem.height ? this.state.selectedVideoItem.height: '100%'}
                              >
                                <video
                                  autoPlay
                                  controls
                                  width='100%'
                                  height='100%'
                                  src={this.state.selectedVideoItem.s3_video_url ? this.state.selectedVideoItem.s3_video_url : ''}
                                  poster={this.state.selectedVideoItem.s3_thumbnail_url ? this.state.selectedVideoItem.s3_thumbnail_url : ''}
                                />
                              </Detail.VideoPlayer>
                              <Detail.VideoContent>
                                <Detail.VideoTitle>
                                  {this.state.selectedVideoItem.booking_title ? this.state.selectedVideoItem.booking_title : ''}
                                </Detail.VideoTitle>
                                <Detail.VideoRequester>
                                  <Detail.VideoRequestImage
                                    imageUrl={this.state.selectedVideoItem.fan_avatar_photo &&
                                       this.state.selectedVideoItem.fan_avatar_photo.thumbnail_url
                                    }
                                  />
                                  <Detail.VideoRequestName>
                                    {this.state.selectedVideoItem.fan_name ? this.state.selectedVideoItem.fan_name : ''}
                                  </Detail.VideoRequestName>
                                </Detail.VideoRequester>
                              </Detail.VideoContent>
                              <Detail.RelatedVideos>
                                <ScrollList
                                  dataList={this.state.relatedVideos}
                                  finite
                                  videos
                                  starsPage
                                  limit={this.props.videosList.limit}
                                  totalCount={this.props.videosList.count}
                                  offset={this.props.videosList.offset}
                                  loading={this.props.videosList.loading}
                                  fetchData={(offset, refresh) => this.props.fetchCelebVideosList(offset, refresh, this.props.match.params.id)}
                                />
                              </Detail.RelatedVideos>
                            </Detail.VideoPlayerContent>
                          </Scrollbars>
                        </Detail.VideoPlayerSection>
>>>>>>> Removed scrollbars for stars page
                      </Detail.VideoPlayWrapper>
                    : null
                  }
                  {
                    !this.props.videosList.data.length && !this.props.videosList.loading && window.outerWidth > 1025 ?
                      null
                    :
                      <Tabs
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
        }
      </Detail.Wrapper>
    );
  }
}
