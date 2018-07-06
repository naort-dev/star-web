import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Scrollbars } from 'react-custom-scrollbars';
import ListStyled from './styled';
import VideoRender from '../VideoRender';
import ImageRender from '../ImageRender';
import RequestDetails from '../RequestDetails';
import Loader from '../Loader';

export default class ScrollList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: true,
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
        loader={this.props.dataList.length ? <Loader /> : <ListStyled.NoDataText>{this.props.NoDataText}</ListStyled.NoDataText>}
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

  renderStarProfessions = (list) => {
    let string = '';
    list.forEach((professions, index) => {
      if (index === list.length - 1) {
        string += `${professions.title}`;
      } else {
        string += `${professions.title}\xa0|\xa0`;
      }
    });
    return string;
  }

  renderList() {
    if (this.props.videos) {
      return this.props.dataList.map((item, index) => (
        <ListStyled.listVideos starsPage={this.props.starsPage} videos={this.props.videos} key={index}>
          <VideoRender
            cover={item.s3_thumbnail_url}
            videoUrl={item.s3_video_url}
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
        <ListStyled.listVideos videos={this.props.videos} key={index}>
          <RequestDetails
            cover={item.request_video[0] && item.request_video[0].s3_thumbnail_url}
            celebId={item.celebrity_id}
            videoId={item.booking_id}
            profile={item.avatar_photo && item.avatar_photo.thumbnail_url}
            starName={item.celebrity}
            details={item.booking_title}
            requestStatus={item.request_status}
            requestType={item.request_type}
            createdDate={item.created_date}
            selectItem={() => this.props.selectItem(item)}
          />
        </ListStyled.listVideos>
      ));
    }
    return this.props.dataList.map((item, index) => {
      let coverPhoto;
      let profilePhoto;
      if (item.avatar_photo) {
        profilePhoto = item.avatar_photo.thumbnail_url && item.avatar_photo.thumbnail_url;
      } else {
        profilePhoto = item.images && item.images[0] && item.images[0].thumbnail_url;
      }
      if (item.featured_photo) {
        coverPhoto = item.featured_photo.thumbnail_url && item.featured_photo.thumbnail_url;
      } else if (item.images && Object.keys(item.images[0]).length) {
        coverPhoto = item.images && item.images[0] && item.images[0].image_url;
      } else {
        coverPhoto = item.avatar_photo.thumbnail_url && item.avatar_photo.thumbnail_url;
      }
      return (
        <ListStyled.listItem key={index}>
          <ImageRender
            id={item.user_id}
            dbId={item.id}
            cover={coverPhoto}
            celebrityFollow={item.celebrity_follow}
            celebrityProfessions={item.celebrity_profession}
            profile={profilePhoto}
            starName={item.get_short_name}
            details={this.renderStarProfessions(item.celebrity_profession)}
          />
        </ListStyled.listItem>
      );
    });
  }

  render() {
    return (
      <ListStyled>
        {
          this.props.scrollTarget ?
            this.infiniteScrollList(this.props.scrollTarget)
          :
            <Scrollbars
              renderView={props => <div {...props} className="view" id="scrollable-target" />}
            >
              {
                this.infiniteScrollList('scrollable-target')
              }
            </Scrollbars>
        }
      </ListStyled>
    );
  }
}
