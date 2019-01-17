import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Scrollbars } from 'react-custom-scrollbars';
import Header from '../../components/Header';
import AppBanner from '../../components/AppBanner';
import Loader from '../../components/Loader';
import Sidebar from '../../components/Sidebar';
import ScrollList from '../../components/ScrollList';
import VideoPopup from '../../components/VideoPopup';
import Popup from '../../components/Popup';
import { getStarsonaVideo } from '../../services';
import { requestTypes } from '../../constants/requestTypes';
import { fetch } from '../../services/fetch';
import { checkPrerender } from '../../utils/checkOS';
import StarProfileStyled from '../starProfile/styled';
import { setMetaTags } from '../../utils/setMetaTags';
import { starProfessionsDotFormater } from '../../utils/dataToStringFormatter';
import HorizontalScrollList from '../../components/HorizontalScrollList';
import ShareView from '../../components/ShareView';

export default class Starprofile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
      favouriteSelected: props.userDetails.is_follow || false,
      showPopup: null,
      videoActive: false,
      selectedVideo: null,
      showAppBanner: true,
      offsetValue: 0,
      sharePopup: false,
    };
    this.coverImage = new Image();
  }

  componentWillMount() {
    this.props.resetCelebDetails();
    // if (!this.isMyStarPage()) {
    //   this.props.history.replace(`/${this.props.match.params.id.toLowerCase()}`)
    // }
    const params = this.props.location.search && this.props.location.search.split('?')[1];
    const finalParams = params && params.split('&');
    if (finalParams) {
      if (!finalParams.find(data => data.split('=')[0] === 'video_id')) {
        this.props.fetchCelebDetails(this.getUserId(this.props));
      }
      finalParams.forEach((data) => {
        if (data.split('=')[0] === 'video_id') {
          getStarsonaVideo(data.split('=')[1])
            .then((resp) => {
              this.props.fetchCelebDetails(this.getUserId(this.props));
              if (resp.success) {
                const starsonaVideo = resp.data.starsona_video.find(video => video.video_status === 1);
                let videoTitle = '';
                if (requestTypes[starsonaVideo.booking_type] === 'Shout-out') {
                  videoTitle = `Watch this video shout-out from ${starsonaVideo.full_name}`;
                } else if (requestTypes[starsonaVideo.booking_type] === 'Event') {
                  videoTitle = `Check out my video announcement courtesy of ${starsonaVideo.full_name}`;
                } else if (requestTypes[starsonaVideo.booking_type] === 'Shout-out') {
                  videoTitle = `${starsonaVideo.full_name} answers my fan question!`;
                }
                this.setState({
                  videoActive: true,
                  selectedVideo: { ...resp.data.starsona_video[0], videoTitle },
                });
              }
            });
        }
      });
    } else {
      this.props.fetchCelebDetails(this.getUserId(this.props));
    }

    this.props.fetchCelebVideosList(this.state.offsetValue, true, this.getUserId(this.props));
  }
  componentWillReceiveProps(nextProps) {
    if (this.getUserId(this.props) !== this.getUserId(nextProps)) {
      this.props.resetCelebDetails();
      this.props.fetchCelebDetails(this.getUserId(nextProps));
      this.props.fetchCelebVideosList(this.state.offsetValue, true, this.getUserId(nextProps));
    }
    if (nextProps.userDetails.is_follow !== this.state.favouriteSelected) {
      this.setState({ favouriteSelected: nextProps.userDetails.is_follow });
    }
    if (this.props.isLoggedIn !== nextProps.isLoggedIn) {
      this.setState({ offsetValue: 0 });
      this.props.fetchCelebVideosList(0, true, this.getUserId(nextProps));
      if (nextProps.isLoggedIn && nextProps.requestFlowDetails) {
        this.props.toggleRequestFlow(true);
      }
      this.props.fetchCelebDetails(this.getUserId(nextProps));
    }
    if (nextProps.videosList.offset != this.state.offsetValue) {
      this.setState({
        offsetValue: nextProps.videosList.offset,
      });
    }
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

  isMyStarPage = () => this.props.location.pathname.includes('myStar')

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

  toggleDescription = (flag) => {
    this.setState({
      readMoreFlag: flag,
    });
  }

  socialMedia = (icon) => {
    return (
      icon.social_link_value !== '' ?
        <a href={`${icon.social_link_value}`} className={icon.social_link_key} target="_blank"></a>
        : ''
    );
  }

  updateFavouriteSelection = (event) => {
    if (this.props.isLoggedIn) {
      this.props.followCelebrity(this.props.userDetails.id, this.props.celebrityDetails.profession_details, !this.state.favouriteSelected);
      this.setState({ favouriteSelected: !this.state.favouriteSelected });
    } else {
      this.props.updateFavouritesQueue(this.props.userDetails.id, this.props.celebrityDetails.profession_details, !this.state.favouriteSelected);
      this.props.toggleLogin(true);
    }
  }
  
  seeAllVideosAction = (offset) => {
    const { count } = this.props.videosList;
    const newOffset = offset + 6;
    this.setState({
      offsetValue: newOffset,
    });
    if (newOffset < count) {
      this.props.fetchCelebVideosList(newOffset, true, this.getUserId(this.props));
    }
  }

  enableVideoPopup = (selectedVideo) => {
    this.setState({ videoActive: true, selectedVideo });
  }

  vf = () => {
    const rate = this.props.celebrityDetails.rate ? this.props.celebrityDetails.rate : 0;
    let firstName = '';
    if (this.props.userDetails.nick_name || this.props.userDetails.first_name || this.props.userDetails.last_name) {
      firstName = this.props.userDetails.nick_name ? this.props.userDetails.nick_name.split(' ')[0]
        : this.props.userDetails.first_name + ' ' + this.props.userDetails.last_name;
    }
    return (
      <React.Fragment>
        <span>${rate}</span>
        <span className="bookButton"> Book {firstName}</span>
      </React.Fragment>
    );
  }

  shareProfileAction = () => {
    this.setState({
      sharePopup: true,
    });
  }

  getPreviewImage() {
    if (this.state.selectedVideo && this.state.selectedVideo.s3_thumbnail_url) {
      return this.state.selectedVideo.s3_thumbnail_url;
    } else if (this.props.userDetails.avatar_photo) {
      return this.props.userDetails.avatar_photo.image_url;
    }
    return '../../assets/images/profile.png';
  }

  closePopup = () => {
    this.setState({ sharePopup: false });
  }

  renderItem = (item) => {
    return (
      <li className="videoItem">
        <StarProfileStyled.ImageSection
          onClick={() => this.enableVideoPopup(item)}
          imageUrl={item.s3_thumbnail_url}
          count={this.props.videosList.count > 2 ? 3 : this.props.videosList.count}
        >
          {item.s3_thumbnail_url ? <StarProfileStyled.PlayButton isVisible /> : null}
          <div className="videoDetails">{item.booking_title}</div>
        </StarProfileStyled.ImageSection>
      </li>
    );
  };

  renderMobItem = (item, index) => {
    return (
      <li className="videoItem" key={index}>
        <StarProfileStyled.ImageSection
          onClick={() => this.enableVideoPopup(item)}
          imageUrl={item.s3_thumbnail_url}
          count={3}
        >
          {item.s3_thumbnail_url ? <StarProfileStyled.PlayButton isVisible /> : null}
          <div className="videoDetails">{item.booking_title}</div>
        </StarProfileStyled.ImageSection>
      </li>
    );
  };

  renderVideoList = () => {
    if (this.props.videosList.data.length && !checkPrerender()) {
      return (
        <ScrollList
          dataList={this.props.videosList.data}
          starVideos
          starsPage
          renderFunction={this.renderItem}
          limit={this.props.videosList.limit}
          totalCount={this.props.videosList.count}
          offset={this.props.videosList.offset}
          loading={this.props.videosList.loading}
          fetchData={(offset, refresh) => this.props.fetchCelebVideosList(offset, refresh, this.getUserId(this.props))}
        />
      );
    }
    return (
      <StarProfileStyled.NoData> <strong>Be the first to get this type of video!</strong> </StarProfileStyled.NoData>
    );
  }

  render() {
    const images = [];
    const remainingBookings = this.props.celebrityDetails.remaining_limit != null || this.props.celebrityDetails.remaining_limit != undefined ? this.props.celebrityDetails.remaining_limit : 1;
    const rate = this.props.celebrityDetails.rate ? this.props.celebrityDetails.rate : 0;
    const descriptionClass = this.state.readMoreFlag ? 'groupFullDescription' : 'groupDescription';
    let fullName = '';
    if (this.props.userDetails.nick_name || this.props.userDetails.first_name || this.props.userDetails.last_name) {
      fullName = this.props.userDetails.nick_name ? this.props.userDetails.nick_name
        : `${this.props.userDetails.first_name} ${this.props.userDetails.last_name}`;
    }
    let firstName = '';
    if (this.props.userDetails.nick_name || this.props.userDetails.first_name || this.props.userDetails.last_name) {
      firstName = this.props.userDetails.nick_name ? this.props.userDetails.nick_name.split(' ')[0] : this.props.userDetails.first_name;
    }
    if (this.props.userDetails && this.props.userDetails.featured_photo) {
      const { featured_photo: { image_url } } = this.props.userDetails;
      images.push({ original: image_url });
    }
    const descriptionLength = this.props.celebrityDetails.description ?
      this.props.celebrityDetails.description.length : 0;
    if (this.props.detailsError) {
      return <Redirect to="/not-found" />;
    }
    return (
      <StarProfileStyled>
        {
          this.state.videoActive &&
          <VideoPopup
            noDisableScroll
            videoPopupLoading={this.state.videoPopupLoading}
            noSlider
            selectedVideo={this.state.selectedVideo}
            closePopUp={() => this.setState({ videoActive: false })}
          />
        }
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
            title={this.state.selectedVideo && this.state.selectedVideo.videoTitle ? this.state.selectedVideo.videoTitle : fullName}
            meta={[...setMetaTags(
              this.state.selectedVideo && this.state.selectedVideo.videoTitle ? this.state.selectedVideo.videoTitle : fullName,
              this.getPreviewImage(),
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
            <StarProfileStyled.PopupWrapper>
              <StarProfileStyled.PopupLabel>
                We'll let you know immediately when the star is accepting booking requests
              </StarProfileStyled.PopupLabel>
              <StarProfileStyled.PopupButton onClick={() => this.setState({ showPopup: false })}>Ok</StarProfileStyled.PopupButton>
            </StarProfileStyled.PopupWrapper>
          </Popup> : null}

        {
          this.state.sharePopup &&
          <Popup
            smallPopup
            closePopUp={this.closePopup}
          >
            <ShareView iconSize={50} title={fullName} shareUrl={this.props.userDetails.share_url} />
          </Popup>
        }

        {/* <Header
          menuActive={this.state.menuActive}
          enableMenu={this.activateMenu}
          history={this.props.history}
        /> */}
        {this.props.userDetails && !this.props.detailsLoading &&
          <StarProfileStyled.sectionWrapper>
            {/* <StarProfileStyled.sideSection menuActive={this.state.menuActive}>
              <Scrollbars
                autoHide
                renderView={props => <div {...props} className="view" />}
              >
                <Sidebar 
                  list={this.props.professionsList}
                />
              </Scrollbars>
            </StarProfileStyled.sideSection> */}
            <StarProfileStyled.mainSection>
              <Scrollbars>
                <ImageGallery
                  items={images}
                  showThumbnails={false}
                  showFullscreenButton={false}
                  useBrowserFullscreen={false}
                  showPlayButton={false}
                  autoPlay={true}
                  slideInterval={8000}
                />
                <StarProfileStyled.profileWrapper>
                  <div className="profileImageContainer">
                    <StarProfileStyled.profileImage src={this.props.userDetails && this.props.userDetails.avatar_photo ? this.props.userDetails.avatar_photo.image_url : '../../assets/images/profile.png'} alt="Profile" />
                  </div>
                  <div className="profileDetails">
                    <div className="groupDetailsContainer">
                      <h1>
                        {fullName}
                        <StarProfileStyled.FavoriteButton
                          onClick={e => this.updateFavouriteSelection(e)}
                          selected={this.state.favouriteSelected}
                        />
                        {this.props.userDetails.share_url && <StarProfileStyled.shareButton onClick={() => { this.shareProfileAction(); }}></StarProfileStyled.shareButton>}
                      </h1>
                      <div className="professionDetails">{starProfessionsDotFormater(this.props.celebrityDetails.profession_details)}</div>
                      <p className={descriptionClass}>{this.props.celebrityDetails.description ? this.props.celebrityDetails.description : ''}</p>
                      { descriptionLength > 390 ? <p className="readMore" onClick={() => { this.toggleDescription(!this.state.readMoreFlag); }}>{!this.state.readMoreFlag ? 'read more' : 'read less'}</p> : ''}
                    </div>

                    <div className="socialMediaIcons">
                      <StarProfileStyled.ButtonWrapper>
                        <StarProfileStyled.getStartedButton onClick={() => this.handleRequest()}>
                          {this.props.celebrityDetails.availability && remainingBookings > 0 ? this.vf() : 'Alert Me'}
                        </StarProfileStyled.getStartedButton>
                        
                      </StarProfileStyled.ButtonWrapper>
                      {this.props.userDetails.social_links &&
                        this.props.userDetails.social_links.map(data => this.socialMedia(data))}
                    </div>

                    <div className="videoListing">
                      <h2>Starsona videos from {fullName}</h2>
                      <StarProfileStyled.ScrollListWrapper count={this.props.videosList.count > 2 ? 3 : this.props.videosList.count}>
                        {
                          !this.props.videosList.data.length && this.props.videosList.loading ?
                            <Loader />
                            :
                            <div>
                              <ul>{this.props.videosList.data.map(data => this.renderItem(data))}</ul>
                              { this.props.videosList.loading ? <Loader /> : null}
                              {
                                this.props.videosList.count > 6 &&
                                (this.state.offsetValue + 6) < this.props.videosList.count &&
                                <p className="seeAllVideos" onClick={() => this.seeAllVideosAction(this.state.offsetValue)}>See more videos</p>
                              }
                            </div>
                    }
                        {this.props.videosList.count === 0 && <div>Be the first to get this type of video!</div>}
                      </StarProfileStyled.ScrollListWrapper>
                      <StarProfileStyled.ScrollMobWrapper count={this.props.videosList.count > 2 ? 3 : this.props.videosList.count}>
                        <div className="videoMobScroll">
                          <Scrollbars>
                            <HorizontalScrollList
                              noDataText="Be the first to get this type of video!"
                              starVideos
                              starsPage
                              renderFunction={this.renderMobItem}
                              dataList={this.props.videosList.data}
                              limit={this.props.videosList.limit}
                              totalCount={this.props.videosList.count}
                              offset={this.props.videosList.offset}
                              loading={this.props.videosList.loading}
                              fetchData={(offset, refresh) => this.props.fetchCelebVideosList(offset, refresh, this.getUserId(this.props))}
                            />
                          </Scrollbars>
                        </div>
                      </StarProfileStyled.ScrollMobWrapper>
                    </div>
                  </div>
                </StarProfileStyled.profileWrapper>
              </Scrollbars>
            </StarProfileStyled.mainSection>
          </StarProfileStyled.sectionWrapper>}
        {this.props.detailsLoading && <Loader />}
      </StarProfileStyled>
    );
  }
}
