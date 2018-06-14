import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Scrollbars } from 'react-custom-scrollbars';
import ListStyled from './styled';
import VideoRender from '../VideoRender';
import ImageRender from '../ImageRender';
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
            celebId={item.celebrity_id}
            videoId={item.booking_id}
            profile={item.avatar_photo && item.avatar_photo.thumbnail_url}
            starName={this.props.starsPage ? this.getVideoType(item.booking_type) : item.full_name}
            details={item.booking_title}
          />
        </ListStyled.listVideos>
      ));
    }
    return this.props.dataList.map((item, index) => {
      let coverPhoto;
      let profilePhoto;
      if (item.avatar_photo) {
        coverPhoto = item.avatar_photo.image_url && item.avatar_photo.image_url;
        profilePhoto = item.avatar_photo.thumbnail_url && item.avatar_photo.thumbnail_url;
      } else {
        coverPhoto = item.images && item.images[0] && item.images[0].image_url;
        profilePhoto = item.images && item.images[0] && item.images[0].thumbnail_url;
      }
      return (
        <ListStyled.listItem key={index}>
          <ImageRender
            id={item.user_id}
            cover={coverPhoto}
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
        <Scrollbars
          renderView={props => <div {...props} className="view" id="scrollable-target" />}
        >
          <InfiniteScroll
            dataLength={this.props.dataList.length}
            next={this.props.finite ? () => {} : this.fetchMoreData}
            scrollableTarget="scrollable-target"
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
            loader={this.props.dataList.length ? <Loader /> : null}
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
        </Scrollbars>
      </ListStyled>
    );
  }
}
