import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Scrollbars } from 'react-custom-scrollbars';
import ListStyled from './styled';

const style = {
  margin: 6,
  padding: 8,
};

export default class ScrollList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: Array.from({ length: 20 }),
      hasMore: true,
    };
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
            hasMore={this.state.hasMore}
            loader={<h4>Loading...</h4>}

            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {this.state.items.map((i, index) => (
              <div style={style} key={index}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <img alt="" width="200px" height="200px" src="https://media.istockphoto.com/photos/plant-growing-picture-id510222832?k=6&m=510222832&s=612x612&w=0&h=Pzjkj2hf9IZiLAiXcgVE1FbCNFVmKzhdcT98dcHSdSk=" />
                  <img alt="" width="200px" height="200px" src="https://media.istockphoto.com/photos/plant-growing-picture-id510222832?k=6&m=510222832&s=612x612&w=0&h=Pzjkj2hf9IZiLAiXcgVE1FbCNFVmKzhdcT98dcHSdSk=" />
                  <img alt="" width="200px" height="200px" src="https://media.istockphoto.com/photos/plant-growing-picture-id510222832?k=6&m=510222832&s=612x612&w=0&h=Pzjkj2hf9IZiLAiXcgVE1FbCNFVmKzhdcT98dcHSdSk=" />
                </div>
              </div>
            ))}
          </InfiniteScroll>
        </Scrollbars>
      </ListStyled>
    );
  }
}
