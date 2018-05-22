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
      page: 0,
    };
  }
  componentWillMount() {
    if (!this.props.dataList.data.length) {
      this.props.fetchData(this.state.page);
      this.setState({ page: this.state.page + 1 });
    }
  }

  refresh = () => {
    // this.setState({ items: Array.from({ length: 20 }) });
  }

  fetchMoreData = () => {
    if (this.props.dataList.data.length >= 100) {
      this.setState({ hasMore: false });
      return;
    }
    if(!this.props.dataList.loading) {
      this.props.fetchData(this.state.page);
      this.setState({ page: this.state.page + 1 });
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    // setTimeout(() => {
    //   this.setState({
    //     items: this.state.items.concat(Array.from({ length: 20 })),
    //   });
    // }, 3000);
  };

  renderList() {
    return this.props.dataList.data.map((item, index) => (
      <ListStyled.listItem key={index}>
        <ImageRender data={item} />
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
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
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
