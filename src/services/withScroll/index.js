import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Scrollbars } from 'react-custom-scrollbars';
import styled from 'styled-components';
import Loader from '../../components/Loader';

export const withScroll = (WrappedComponent) => {

  const ListStyled = styled.section`
    width: 100%;
    height: 100%;
    min-height: 300px;
    ${props => props.loading && (`
      display: flex;
      align-items: center;
      justify-content: center;
    `)}
    .loader {
      position: static;
      z-index: initial;
      background: transparent;
      opacity: initial;
    }
  `;

  const NoDataText = styled.span`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        hasMore: true,
      };
    }
    componentWillMount() {
      const endOfList = this.props.dataList && this.props.dataList.length !== 0 && this.props.dataList.length >= this.props.totalCount;
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
  
    refresh = () => {
      this.props.fetchData(0, true);
    }
  
    fetchMoreData = () => {
      if (this.props.dataList.length >= this.props.totalCount) {
        this.setState({ hasMore: false });
        return;
      }
      if (!this.props.loading) {
        this.props.fetchData(this.props.offset + this.props.limit, false);
      }
    }

    infiniteScrollList = (scrollTarget) => {
      return (
        <InfiniteScroll
          dataLength={this.props.dataList.length}
          next={this.fetchMoreData}
          scrollableTarget={scrollTarget}
          refreshFunction={this.refresh}
          scrollThreshold={0.5}
          hasMore={this.state.hasMore}
          loader={this.props.dataList.length ? <Loader class="loader" /> : <NoDataText>{this.props.noDataText}</NoDataText>}
        >
          <WrappedComponent {...this.props} />
        </InfiniteScroll>
      );
    }

    renderList = () => {
      if (this.props.noScroll && this.props.loading) {
        return <Loader class="loader" />;
      } else if (this.props.noScroll) {
        return <WrappedComponent {...this.props} />;
      } else if (this.props.scrollTarget) {
        return this.infiniteScrollList(this.props.scrollTarget)
      }
      return (
        // <Scrollbars
        //   renderView={props => <div {...props} className="view" id="scrollable-target" />}
        // >
        //   {
            this.infiniteScrollList('scrollable-target')
        //   }
        // </Scrollbars>
      );
    }

    render() {
      return (
        <ListStyled loading={this.props.loading}>
          {
            !this.props.dataList.length && this.props.loading ?
              <Loader class="loader" />
            :
              this.renderList()
          }
        </ListStyled>
      );
    }
  };
};

withScroll.defaultProps = {
  dataList: [],
};

withScroll.propsTypes = {
  dataList: PropTypes.array.isRequired,
};
