import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Scrollbars } from 'react-custom-scrollbars';
import { locations } from '../../constants/locations';
import ListStyled from './styled';
import VideoRender from '../VideoRender';
import ImageRender from '../ImageRender';
import VideoPlayer from '../VideoPlayer';
import { starProfessionsFormater } from '../../utils/dataToStringFormatter';
import Popup from '../Popup';
import RequestDetails from '../RequestDetails';
import EarningsList from '../EarningsList';
import ReferralList from '../ReferralList';
import Loader from '../Loader';
import VideoPopup from '../VideoPopup';

export default class ScrollList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: true,
      videoActive: false,
      bannerVideo: false,
      selectedVideoIndex: null,
      videoPopupLoading: false,
    };
  }

  componentWillMount() {
    const endOfList = this.props.dataList.length !== 0 && this.props.dataList.length >= this.props.totalCount;
    if ((!this.props.loading && endOfList) || this.props.finite) {
      this.setState({ hasMore: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.finite) {
      const endOfList = nextProps.dataList.length !== 0 && nextProps.dataList.length >= nextProps.totalCount;
      if (endOfList) {
        this.setState({ hasMore: false });
      } else {
        this.setState({ hasMore: true });
      }
    }
    if (this.state.videoActive && this.props.loading !== nextProps.loading && !nextProps.loading) {
      this.setState({ videoPopupLoading: false })
    }
  }

  getVideoType = (bookingType) => {
    let videoType;
    switch (bookingType) {
      case 3:
        videoType = 'Q&A';
        break;
      case 2:
        videoType = 'Event';
        break;
      case 1:
        videoType = 'Shoutout';
        break;
      default:
        videoType = '';
    }
    return videoType;
  }

  refresh = () => {
    this.props.fetchData(0, true);
  }

  fetchMoreData = () => {
    if (this.props.dataList.length >= this.props.totalCount) {
      this.setState({ hasMore: false });
      return;
    }
    if (!this.props.loading) {
      this.props.fetchData(this.props.offset + this.props.limit);
    }
  };

  changeVideo = (videoIndex) => {
    if (this.props.dataList.length - videoIndex <= 10) {
      this.fetchMoreData();
    }
    if (videoIndex < this.props.dataList.length && videoIndex >= 0) {
      this.setState({ selectedVideoIndex: videoIndex, videoPopupLoading: false });
    } else if (videoIndex === this.props.dataList.length && videoIndex < this.props.totalCount) {
      this.setState({ videoPopupLoading: true });
    }
  }

  infiniteScrollList = (scrollTarget) => {
    return (
      <InfiniteScroll
        dataLength={this.props.dataList.length}
        next={this.fetchMoreData}
        scrollableTarget={scrollTarget}
        refreshFunction={this.refresh}
        // pullDownToRefresh
        // pullDownToRefreshContent={
        //   <h4 style={{ textAlign: 'center' }}><img alt="" height="50" src="assets/images/loading-icon.gif" /></h4>
        // }
        // releaseToRefreshContent={
        //   <h4 style={{ textAlign: 'center' }}><img alt="" height="50" src="assets/images/loading-icon.gif" /></h4>
        // }
        scrollThreshold={0.5}
        hasMore={this.state.hasMore}
        loader={this.props.dataList.length ? <Loader /> : <ListStyled.NoDataText>{this.props.noDataText}</ListStyled.NoDataText>}
        // endMessage={
        //   <p style={{ textAlign: 'center' }}>
        //     <b>End of list</b>
        //   </p>
        // }
      >
        <ListStyled.listWrapper videos={this.props.videos}>
          {this.renderList()}
        </ListStyled.listWrapper>
      </InfiniteScroll>
    );
  }

  enableVideoPopup = (index) => {
    this.setState({ videoActive: true, selectedVideoIndex: index });
  }

  findRequestVideoThumbnail = (requestVideo) => {
    let completedVideo;
    let questionVideo;
    requestVideo.forEach((video) => {
      if (video.video_status === 1) {
        completedVideo = video;
      } else if (video.video_status === 4) {
        questionVideo = video;
      }
    })
    if (completedVideo) {
      return completedVideo.s3_thumbnail_url;
    } else if (questionVideo) {
      return questionVideo.s3_thumbnail_url;
    }
    return null;
  }

  renderList() {
    if (this.props.videos) {
      return this.props.dataList.map((item, index) => (
        <ListStyled.listVideos starsPage={this.props.starsPage} videos={this.props.videos} key={index}>
          <VideoRender
            videoList={this.props.dataList}
            index={index}
            enableVideoPopup={() => this.enableVideoPopup(index)}
            cover={item.s3_thumbnail_url}
            fanName={item.fan_name}
            fanPhoto={item.fan_avatar_photo && item.fan_avatar_photo.thumbnail_url}
            celebProfessions={starProfessionsFormater(item.professions)}
            videoUrl={item.s3_video_url}
            videoCover={item.s3_thumbnail_url}
            celebId={item.user_id}
            videoId={item.booking_id}
            profile={item.avatar_photo && item.avatar_photo.thumbnail_url}
            starName={this.props.starsPage ? this.getVideoType(item.booking_type) : item.full_name}
            details={item.booking_title}
          />
        </ListStyled.listVideos>
      ));
    }
    else if (this.props.requestDetails) {
      return this.props.dataList.map((item, index) => (
        <ListStyled.listRequests videos={this.props.videos} key={index}>
          <RequestDetails
            starMode={this.props.starMode}
            cover={this.findRequestVideoThumbnail(item.request_video)}
            celebId={item.celebrity_id}
            orderId={item.order_details ? item.order_details.order : ''}
            videoId={item.booking_id}
            profile={item.avatar_photo && item.avatar_photo.thumbnail_url}
            fanProfile={item.fan_photo && item.fan_photo.thumbnail_url}
            starName={item.celebrity}
            fanName={item.fan}
            details={item.booking_title}
            requestStatus={item.request_status}
            requestType={item.request_type}
            createdDate={item.created_date}
            selectItem={() => this.props.selectItem(item)}
          />
        </ListStyled.listRequests>
      ));
    } else if (this.props.earnings) {
      return this.props.dataList.map((item, index) => (
        <EarningsList
          item={item}
          index={index}
          key={item.created_date}
        />
      ));
    } else if (this.props.referralList) {
      return this.props.dataList.map((item, index) => (
        <ReferralList
          data={item}
          index={index}
          key={index}
        />
      ));
    }
    return this.props.dataList.map((item, index) => {
      let coverPhoto;
      let profilePhoto;
      if (item.avatar_photo) {
        profilePhoto = item.avatar_photo && item.avatar_photo.thumbnail_url && item.avatar_photo.thumbnail_url;
      } else {
        profilePhoto = item.images && item.images[0] && item.images[0].thumbnail_url;
      }
      if (item.featured_photo) {
        coverPhoto = item.featured_photo.thumbnail_url && item.featured_photo.thumbnail_url;
      } else if (item.images && item.images[0] && Object.keys(item.images[0]).length) {
        coverPhoto = item.images && item.images[0] && item.images[0].image_url;
      } else {
        coverPhoto = item.avatar_photo && item.avatar_photo.thumbnail_url && item.avatar_photo.thumbnail_url;
      }
      return (
        <ListStyled.listItem key={index}>
          <ImageRender
            id={item.user_id}
            menuActive={this.props.menuActive}
            dbId={item.id}
            rate={item .celebrity_user && item.celebrity_user.rate}
            cover={coverPhoto}
            celebrityFollow={item.celebrity_follow}
            celebrityProfessions={item.celebrity_profession}
            profile={profilePhoto}
            starName={item.get_short_name}
            details={starProfessionsFormater(item.celebrity_profession)}
          />
        </ListStyled.listItem>
      );
    });
  }

  render() {
    return (
      <ListStyled>
        {
          this.state.videoActive &&
            <VideoPopup
              videoPopupLoading={this.state.videoPopupLoading}
              selectedVideo={this.props.dataList[this.state.selectedVideoIndex]}
              selectedVideoIndex={this.state.selectedVideoIndex}
              changeVideo={this.changeVideo}
              closePopUp={() => this.setState({ videoActive: false })}
            />
        }
        {
          this.state.bannerVideo &&
            <Popup closePopUp={() => this.setState({ bannerVideo: false })}>
              <ListStyled.VideoPlayer>
                <VideoPlayer
                  autoPlay
                  primarySrc={locations.bannerVideo}
                />
              </ListStyled.VideoPlayer>
            </Popup>
        }
        {
          this.props.scrollTarget ?
            this.infiniteScrollList(this.props.scrollTarget)
          :
            <Scrollbars
              renderView={props => <div {...props} className="view" id="scrollable-target" />}
            >
              {
                this.props.banner &&
                  <ListStyled.Banner
                    onClick={() => this.setState({ bannerVideo: true })}
                  >
                    <ListStyled.BannerHeading>
                      Personalized Video Shout-Outs
                      <ListStyled.BannerSubHeading>to Celebrate Everyday Moments</ListStyled.BannerSubHeading>
                    </ListStyled.BannerHeading>
                    <ListStyled.BannerPlayButton
                      alt="banner-video"
                      src="assets/images/play-button.png"
                    />
                  </ListStyled.Banner>
              }
              {
                this.infiniteScrollList('scrollable-target')
              }
            </Scrollbars>
        }
      </ListStyled>
    );
  }
}
