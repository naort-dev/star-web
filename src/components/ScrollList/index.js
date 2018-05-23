import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Scrollbars } from 'react-custom-scrollbars';
import ListStyled from './styled';
// import ImageCollection from '../ImageCollection';
import { ImageRender } from '../ImageRender';

export default class ScrollList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: true,
    };
  }
  componentWillMount() {
    if (!this.props.dataList.data.length) {
      this.props.fetchData(this.props.dataList.offset+1);
    }
  }

  componentWillReceiveProps(nextProps) {
    const endOfList = nextProps.dataList.data.length!=0 && nextProps.dataList.data.length >= nextProps.dataList.count
    if(endOfList) {
      this.setState({ hasMore: false });
    }
    else {
      this.setState({ hasMore: true });
    }
  }

  refresh = () => {
    // this.setState({ items: Array.from({ length: 20 }) });
  }

  fetchMoreData = () => {
    if (this.props.dataList.data.length >= this.props.dataList.count) {
      this.setState({ hasMore: false });
      return;
    }
    if(!this.props.dataList.loading) {
      this.props.fetchData(this.props.dataList.offset+20);
    }
  };

  renderStarProfessions = (list) => {
    let string = '';
    list.forEach((professions) => {
      string += `${professions.title}\xa0\xa0\xa0`;
    });
    return string;
  }

  renderList() {
    return this.props.dataList.data.map((item, index) => (
      <ListStyled.listItem key={index}>
        <ImageRender 
          data={item}
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
            dataLength={this.props.dataList.data.length}
            next={this.fetchMoreData}
            scrollableTarget="scrollable-target"
            // refreshFunction={this.refresh}
            // pullDownToRefresh
            hasMore={this.state.hasMore}
            loader={<h4 style={{ textAlign: 'center' }}><img alt="" height="50" src="assets/images/loading-icon.gif" /></h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>End of list</b>
              </p>
            }
          >
            <ListStyled.listWrapper>
              {this.renderList()}
            </ListStyled.listWrapper>
          </InfiniteScroll>
        </Scrollbars>
      </ListStyled>
    );
  }
}
