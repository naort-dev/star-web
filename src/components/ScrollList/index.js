import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Scrollbars } from 'react-custom-scrollbars';
import ListStyled from './styled';
// import ImageCollection from '../ImageCollection';
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
    if (!this.props.loading) {
      this.setState({ hasMore: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    const endOfList = nextProps.dataList.length !== 0 && nextProps.dataList.length >= nextProps.totalCount;
    if (endOfList) {
      this.setState({ hasMore: false });
    }
    else {
      this.setState({ hasMore: true });
    }
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
      this.props.fetchData(this.props.offset + 20);
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
    // console.log(this.props.dataList)
    if (this.props.videos) {
      return this.props.dataList.map((item, index) => (
        <ListStyled.listVideos videos={this.props.videos} key={index}>
          <VideoRender
            cover={item.s3_thumbnail_url}
            profile={item.avatar_photo && item.avatar_photo.thumbnail_url}
            starName={item.full_name}
            details={item.booking_title}
          />
        </ListStyled.listVideos>
      ));
    }
    return this.props.dataList.map((item, index) => (
      <ListStyled.listItem key={index}>
        <ImageRender
          cover={item.avatar_photo && item.avatar_photo.image_url}
          profile={item.avatar_photo && item.avatar_photo.thumbnail_url}
          starName={`${item.first_name} ${item.last_name}`}
          details={this.renderStarProfessions(item.celebrity_profession)}
        />
      </ListStyled.listItem>
    ));
  }

  render() {
    return (
      <ListStyled>
        <Scrollbars
          renderView={props => <div {...props} className="view" id="scrollable-target" />}
        >
          <InfiniteScroll
            dataLength={this.props.dataList.length}
            next={this.fetchMoreData}
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
