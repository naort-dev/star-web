import React from 'react';
import ColumnLayout from '../../components/ColumnLayout';
import Loader from '../../components/Loader';
import ScrollList from '../../components/ScrollList';
import OrderDetails from '../../components/OrderDetails';
import InnerTabs from '../../components/InnerTabs';
import ActionLoader from '../../components/ActionLoader';
import { ROLES } from '../../constants/usertype';
import RequestsStyled from './styled';
import { requestStatusList, celebRequestStatusList, celebOpenStatusList, openStatusList, celebCompletedStatusList, completedStatusList } from '../../constants/requestStatusList';

const moment = require('moment');

export default class Requests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'All',
      innerLinks: [],
      requestStatus: 'all',
      recordMode: false,
      currentUserRole: props.userDetails.settings_userDetails.role_details && props.userDetails.settings_userDetails.role_details.role_code === ROLES.star,
      orderDetails: {},
      scrollTarget: '',
    };
    this.requestType = {
      3: 'Q&A',
      2: 'Event',
      1: 'Shout-outs',
    };
    this.role = props.starMode ? 'celebrity_id' : 'fan_id';
  }
  componentDidMount() {
    this.props.myVideosListReset();
    this.props.fetchMyVideosList(0, true, this.role, this.state.requestStatus);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let { innerLinks } = prevState;
    const userRoleCode = nextProps.userDetails.settings_userDetails.role_details ? nextProps.userDetails.settings_userDetails.role_details.role_code : null ;
    if (nextProps.starMode && !prevState.innerLinks.length) {
      innerLinks = [
        { linkName: 'Requests', selectedName: 'requests', url: '/user/bookings' },
        { linkName: 'Earnings', selectedName: 'earnings', url: '/user/earnings' },
        { linkName: 'Settings', selectedName: 'settings', url: '/settings' },
      ];
    } else if (!prevState.innerLinks.length) {
      innerLinks = [
        { linkName: 'My videos', selectedName: 'myVideos', url: '/user/myVideos' },
        { linkName: 'Settings', selectedName: 'settings', url: '/settings' },
      ];
    }
    if (userRoleCode === ROLES.star && !nextProps.starMode && prevState.currentUserRole !== userRoleCode) {
      innerLinks = [...innerLinks, { linkName: 'Requests', selectedName: 'requests', url: '/user/bookings' }];
    }
    return ({ innerLinks, currentUserRole: userRoleCode });
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
  showRequest = (data, actionType) => {
    let { recordMode } = this.state;
    if (actionType === 'respond') {
      recordMode = this.props.starMode;
    } else if (actionType === 'edit') {
      console.log('hi');
    }
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

  updateScrollTarget = (target) => {
    this.setState({ scrollTarget: target });
  }

  renderBookings = () => {
    return (
      <ScrollList
        dataList={this.props.myVideosList.data}
        scrollTarget={this.state.scrollTarget !== '' ? this.state.scrollTarget : null}
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
    );
  }

  renderCenterSection = () => {
    return (
      <React.Fragment>
        <InnerTabs
          labels={['All', 'Open', 'Completed', 'Cancelled']}
          switchTab={this.switchTab}
          selected={this.state.selectedTab}
        />
        <RequestsStyled.ContentWrapper>
          {
            (!this.props.myVideosList.data.length && this.props.myVideosList.loading) ?
              <RequestsStyled.loaderWrapper>
                <Loader />
              </RequestsStyled.loaderWrapper>
            : this.renderBookings()
          }
        </RequestsStyled.ContentWrapper>
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
        <ColumnLayout
          selectedSideBarItem={this.props.starMode ? 'requests' : 'myVideos'}
          history={this.props.history}
          innerLinks={this.state.innerLinks}
          renderCenterSection={this.renderCenterSection}
          getScrollTarget={this.updateScrollTarget}
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
