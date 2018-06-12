import React from 'react';
import Header from '../../components/Header';
import ImageRender from '../../components/ImageRender';
import Tabs from '../../components/Tabs';
import { Detail } from '../starProfile/styled';
import Loader from '../../components/Loader';
import { AboutContent } from '../../components/AboutContent';
import { RequestController } from '../../components/RequestController';
import ScrollList from '../../components/ScrollList';
import { ComponentLoading } from '../../components/ComponentLoading';

export default class Starprofile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
      selectedTab: 'All',
      tabList: [],
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
    if (this.state.selectedTab === 'About') {
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
  render() {
    let coverPhoto;
    let profilePhoto;
    let fullName = '';
    let rate = this.props.celebrityDetails.rate ? this.props.celebrityDetails.rate: 0;
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
                      fullName={fullName}
                      starDetails={this.generateStarDetails()}
                    />
                  </Detail.LargeScreenLayout>
                  <Detail.RequestControllerWrapper>
                    <RequestController rate={rate} />
                  </Detail.RequestControllerWrapper>
                </Detail.LeftSection>
                <Detail.RightSection>
                  <Tabs
                    labels={this.state.tabList}
                    selected={this.state.selectedTab}
                    disableFilter
                    switchTab={this.switchTab}
                  />
                  {
                    this.state.selectedTab !== 'About' ?
                      <Detail.ScrollListWrapper>
                        {
                          !this.props.videosList.data.length && this.props.videosList.loading ?
                            <Loader />
                          :
                            <ScrollList
                              dataList={this.props.videosList.data}
                              videos
                              limit={this.props.videosList.limit}
                              totalCount={this.props.videosList.count}
                              offset={this.props.videosList.offset}
                              loading={this.props.videosList.loading}
                              fetchData={(offset, refresh) => this.props.fetchCelebVideosList(offset, refresh, this.props.match.params.id)}
                            />
                        }
                      </Detail.ScrollListWrapper>
                    :
                      <Detail.AboutDetailsWrapper>
                        <Detail.AboutDetailHeading>About</Detail.AboutDetailHeading>
                        <Detail.AboutDetailContent>
                          {
                            this.props.celebrityDetails.description ?
                              this.props.celebrityDetails.description
                            : null
                          }
                        </Detail.AboutDetailContent>
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
