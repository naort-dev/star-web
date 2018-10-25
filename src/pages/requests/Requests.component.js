import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import ThreeColumnLayout from '../../components/ThreeColumnLayout';
import Loader from '../../components/Loader';
import ScrollList from '../../components/ScrollList';
import OrderDetails from '../../components/OrderDetails';
import InnerTabs from '../../components/InnerTabs';
import RequestDetails from '../../components/RequestDetails';
import ActionLoader from '../../components/ActionLoader';
import RequestsStyled from './styled';
import { requestStatusList, celebRequestStatusList, celebOpenStatusList, openStatusList, celebCompletedStatusList, completedStatusList } from '../../constants/requestStatusList';

const moment = require('moment');

export default class Requests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
      filterSelected: false,
      selectedTab: 'All',
      innerLinks: [],
      tabsClientHeight: 0,
      requestStatus: 'all',
      recordMode: false,
      orderDetails: {},
    };
    this.requestType = {
      3: 'Q&A',
      2: 'Event',
      1: 'Shout-outs',
    };
    this.role = props.starMode ? 'celebrity_id' : 'fan_id';
  }
  componentWillMount() {
    this.props.fetchMyVideosList(0, true, this.role, this.state.requestStatus);
    let innerLinks;
    if (this.props.starMode) {
      innerLinks = [
        { linkName: 'Requests', selectedName: 'requests', url: '/user/bookings' },
        { linkName: 'Earnings', selectedName: 'earnings', url: '/user/earnings' },
      ];
    } else {
      innerLinks = [
        { linkName: 'Favorited stars', selectedName: 'favorites', url: '/user/favorites' },
        { linkName: 'My videos', selectedName: 'myVideos', url: '/user/myVideos' },
      ];
    }
    this.setState({ innerLinks });
  }
  setScrollHeight = () => {
    this.setState({ tabsClientHeight: this.state.tabsRef.clientHeight });
  }

  switchTab = (item) => {
    const openStatuses = this.props.starMode ? celebOpenStatusList : openStatusList;
    const completedStatus = this.props.starMode ? celebCompletedStatusList : completedStatusList;
    switch (item) {
      case 'Open':
        this.props.fetchMyVideosList(0, true, this.role, openStatuses.toString());
        break;
      case 'Cancelled':
        this.props.fetchMyVideosList(0, true, this.role, 5);
        break;
      case 'Completed':
        this.props.fetchMyVideosList(0, true, this.role, completedStatus.toString());
        break;
      default:
        this.props.fetchMyVideosList(0, true, this.role, 'all');
    }
    this.setState({ selectedTab: item });
  }
  showRequest = (data, recordModeValue) => {
    const recordMode = this.props.starMode ? recordModeValue : false;
    this.setState({ orderDetails: data, recordMode });
  }
  hideRequest = () => {
    this.props.onClearStreams();
    this.props.deleteVideo();
    if (window.stream) {
      const tracks = window.stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    }
    this.setState({ orderDetails: {}, recordMode: false });
  }
  findRequestVideo = (list, videoStatus) => {
    let requestVideo = {};
    requestVideo = list.find((videoItem) => {
      return videoItem.video_status === videoStatus;
    });
    return requestVideo;
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

  renderSectionHeader = () => {
    if (this.state.selectedTab === 'Open') {
      return this.props.starMode ? 'Pending fan requests' : 'Pending requests';
    } else if (this.state.selectedTab === 'Cancelled') {
      return this.props.starMode ? 'Cancelled fan requests' : 'Cancelled requests';
    }
    return this.props.starMode ? 'Completed fan requests' : 'Completed requests';
  }

  renderRequestList = (status, starMode) => {
    let statusList;
    if (status === 'Open') {
      statusList = starMode ? celebOpenStatusList : openStatusList;
    } else if (status === 'Completed') {
      statusList = starMode ? celebCompletedStatusList : completedStatusList;
    } else {
      statusList = [5];
    }
    if (this.props.myVideosList.data.length) {
      const list = this.props.myVideosList.data.map((request, index) => {
        if (statusList.indexOf(request.request_status) > -1) {
          return (
            <RequestsStyled.RequestItem key={index}>
              <RequestDetails
                starMode={this.props.starMode}
                cover={this.findRequestVideoThumbnail(request.request_video)}
                celebId={request.celebrity_id}
                orderId={request.order_details ? request.order_details.order : ''}
                videoId={request.booking_id}
                profile={request.avatar_photo && request.avatar_photo.thumbnail_url}
                fanProfile={request.fan_photo && request.fan_photo.thumbnail_url}
                starName={request.celebrity}
                fanName={request.fan}
                details={request.booking_title}
                requestVideo={request.request_video}
                requestStatus={request.request_status}
                requestType={request.request_type}
                createdDate={request.created_date}
                selectItem={recordMode => this.showRequest(request, recordMode)}
              />
            </RequestsStyled.RequestItem>
          );
        }
      });
      return list.length ? list : <span>No requests</span>;
    }
    return null;
  }

  renderBookings = () => {
    switch (this.state.selectedTab) {
      case 'All':
        return (
          <React.Fragment>
            <RequestsStyled.StatusTypeWrapper >
              <Scrollbars>
                <RequestsStyled.SectionHeaderWrapper>
                  <RequestsStyled.SectionHeader>{this.props.starMode ? 'Pending fan requests' : 'Pending requests'}</RequestsStyled.SectionHeader>
                  <RequestsStyled.SectionDescription>Lorem Ipsum</RequestsStyled.SectionDescription>
                </RequestsStyled.SectionHeaderWrapper>
                <RequestsStyled.ListWrapper autoHeight>
                  {this.renderRequestList('Open', this.props.starMode)}
                </RequestsStyled.ListWrapper>
                <RequestsStyled.SectionHeaderWrapper>
                  <RequestsStyled.SectionHeader>{this.props.starMode ? 'Completed fan requests' : 'Completed requests'}</RequestsStyled.SectionHeader>
                  <RequestsStyled.SectionDescription>Lorem Ipsum</RequestsStyled.SectionDescription>
                </RequestsStyled.SectionHeaderWrapper>
                <RequestsStyled.ListWrapper autoHeight>
                  {this.renderRequestList('Completed', this.props.starMode)}
                </RequestsStyled.ListWrapper>
              </Scrollbars>
            </RequestsStyled.StatusTypeWrapper>
          </React.Fragment>
        );
      default:
        return (
          <React.Fragment>
            {
              this.props.myVideosList.data.length ?
                <RequestsStyled.SectionHeaderWrapper>
                  <RequestsStyled.SectionHeader>{this.renderSectionHeader()}</RequestsStyled.SectionHeader>
                  <RequestsStyled.SectionDescription>Lorem Ipsum</RequestsStyled.SectionDescription>
                </RequestsStyled.SectionHeaderWrapper>
              : null
            }
            <RequestsStyled.ListWrapper>
              <ScrollList
                dataList={this.props.myVideosList.data}
                requestDetails
                starMode={this.props.starMode}
                limit={this.props.myVideosList.limit}
                totalCount={this.props.myVideosList.count}
                offset={this.props.myVideosList.offset}
                loading={this.props.myVideosList.loading}
                selectItem={this.showRequest}
                noDataText="No requests"
                fetchData={(offset, refresh) => this.props.fetchMyVideosList(offset, refresh)}
              />
            </RequestsStyled.ListWrapper>
          </React.Fragment>
        );
    }
  }

  renderCenterSection = () => {
    return (
      <React.Fragment>
        <InnerTabs
          labels={['All', 'Open', 'Completed', 'Cancelled']}
          switchTab={this.switchTab}
          selected={this.state.selectedTab}
        />
        {
          (!this.props.myVideosList.data.length && this.props.myVideosList.loading) ?
            <RequestsStyled.loaderWrapper style={this.state.tabsRef && {height: `calc(100% - ${this.state.tabsClientHeight}px)` }}>
              <Loader />
            </RequestsStyled.loaderWrapper>
          : this.renderBookings()
        }
      </React.Fragment>
    );
  }

  render() {
    let requestStatus, orderId, requestType, requestVideo, createdDate, price, isPrivate, requestTypeId;
    let occasionDate, relationShip;
    let requestStatusId;
    if (Object.keys(this.state.orderDetails).length) {
      requestStatusId = this.state.orderDetails.request_status;
      if (Object.keys(requestStatusList).indexOf(requestStatusId+"") > -1) {
        if (this.state.orderDetails.request_type === 3 && requestStatusId === 6) { // completed video and Q&A video
          requestVideo = this.findRequestVideo(this.state.orderDetails.request_video, 1);
        } else if (requestStatusId !== 6) {
          requestVideo = this.findRequestVideo(this.state.orderDetails.request_video, 4);
        } else {
          requestVideo = this.findRequestVideo(this.state.orderDetails.request_video, 1);
        }
      }
      requestStatus = this.props.starMode ? celebRequestStatusList[requestStatusId] : requestStatusList[requestStatusId];
      orderId = this.state.orderDetails.order_details ? this.state.orderDetails.order_details.order : '';
      requestType = this.requestType[this.state.orderDetails.request_type];
      createdDate = moment(this.state.orderDetails.created_date).format('LL');
      price = this.state.orderDetails.order_details ? this.state.orderDetails.order_details.amount : '';
      isPrivate = this.state.orderDetails.public_request ? 'No' : 'Yes';
      if (this.state.orderDetails.request_details) {
        occasionDate = this.state.orderDetails.request_details.date ? moment(this.state.orderDetails.request_details.date).format('LL') : '';
        if (this.state.orderDetails.request_details.relationship) {
          relationShip = this.state.orderDetails.request_details.relationship.title ? this.state.orderDetails.request_details.relationship.title : '';
        } else {
          relationShip = '';
        }
      } else {
        occasionDate = '';
        relationShip = '';
      }
    }
    return (
      <div>
        <ThreeColumnLayout
          selectedSideBarItem={this.props.starMode ? 'requests' : 'myVideos'}
          history={this.props.history}
          innerLinks={this.state.innerLinks}
          renderCenterSection={this.renderCenterSection}
        />
        {
          this.props.orderDetailsLoading ?
            <ActionLoader />
          : null
        }
        {
          Object.keys(this.state.orderDetails).length ?
            <OrderDetails
              {...this.props}
              recordMode={this.state.recordMode}
              orderDetails={this.state.orderDetails}
              requestStatus={requestStatus}
              requestStatusId={requestStatusId}
              orderId={orderId}
              requestType={requestType}
              hideRequest={this.hideRequest}
              requestVideo={requestVideo}
              createdDate={createdDate}
              price={price}
              isPrivate={isPrivate}
              relationShip={relationShip}
              occasionDate={occasionDate}
              rateCelebrity={this.props.rateCelebrity}
              contactSupport={this.props.contactSupport}
              reportAbuse={this.props.reportAbuse}
            />
          : null
        }
      </div>
    );
  }
}
