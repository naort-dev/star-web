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
      items: Array.from({ length: 20 }),
      hasMore: true,
    };
  }

  refresh = () => {
    this.setState({ items: Array.from({ length: 20 }) });
  }

  fetchMoreData = () => {
    if (this.state.items.length >= 500) {
      this.setState({ hasMore: false });
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 20 })),
      });
    }, 3000);
  };

  renderList() {
    return this.state.items.map((i, index) => (
      <ListStyled.listItem key={index}>
        <ImageRender />
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
            dataLength={this.state.items.length}
            next={this.fetchMoreData}
            scrollableTarget="scrollable-target"
            refreshFunction={this.refresh}
            pullDownToRefresh
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
