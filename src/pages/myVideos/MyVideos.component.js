import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import ThreeColumnLayout from '../../components/ThreeColumnLayout';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Loader from '../../components/Loader';
import ScrollList from '../../components/ScrollList';
import FilterSection from '../../components/filterSection';
import OrderDetails from '../../components/OrderDetails';
import Tabs from '../../components/Tabs';
import ActionLoader from '../../components/ActionLoader';
import MyVideosStyled from './styled';
import { requestStatusList, celebRequestStatusList } from '../../constants/requestStatusList';

const moment = require('moment');

export default class MyVideos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
      filterSelected: false,
      tabsClientHeight: 0,
      requestStatus: 'all',
      starAvailability: props.starAvailability,
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
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.starAvailability !== nextProps.starAvailability && nextProps.starAvailability !== this.state.starAvailability) {
      this.setState({ starAvailability: nextProps.starAvailability });
    }
  }
  setScrollHeight = () => {
    this.setState({ tabsClientHeight: this.state.tabsRef.clientHeight });
  }
  activateMenu = () => {
    this.setState({ menuActive: !this.state.menuActive });
  }
  toggleFilterSection = () => {
    this.setState({ filterSelected: !this.state.filterSelected }, () => {
      this.setScrollHeight();
    });
  }
  updateRequestStatus = (requestStatus) => {
    this.setState({ requestStatus }, () => {
      this.props.fetchMyVideosList(0, true, this.role, this.state.requestStatus);
    });
  }
  showRequest = (data) => {
    this.setState({ orderDetails: data });
  }
  changeAvailability = () => {
    const userId = this.props.userDetails.settings_userDetails.id;
    const userDetailsData = {
      user_details: {},
      celebrity_details: {
        ...this.props.userDetails.settings_celebrityDetails,
        availability: !this.props.starAvailability,
      },
    };
    this.setState({ starAvailability: !this.state.starAvailability });
    this.props.updateUserDetails(userId, userDetailsData);
  }
  hideRequest = () => {
    this.props.onClearStreams();
    this.props.deleteVideo();
    if (window.stream) {
      const tracks = window.stream.getTracks();
      tracks.forEach(track => {
        track.stop();
      });
    }
    this.setState({ orderDetails: {} });
  }
  findRequestVideo = (list, videoStatus) => {
    let requestVideo = {};
    requestVideo = list.find((videoItem) => {
      return videoItem.video_status === videoStatus;
    });
    return requestVideo;
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
        <ThreeColumnLayout />
        {
          this.props.orderDetailsLoading ?
            <ActionLoader />
          : null
        }
        {
          Object.keys(this.state.orderDetails).length ?
            <OrderDetails
              {...this.props}
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
        <MyVideosStyled style={{ display: Object.keys(this.state.orderDetails).length ? 'none' : 'block' }}>
          <Header
            menuActive={this.state.menuActive}
            enableMenu={this.activateMenu}
            history={this.props.history}
          />
          <MyVideosStyled.sectionWrapper>
            <MyVideosStyled.sideSection menuActive={this.state.menuActive}>
              <Scrollbars
                renderView={props => <div {...props} className="view" />}
              >
                <Sidebar
                  list={this.props.professionsList}
                  history={this.props.history}
                  selectedCategory={this.props.selectedSideBarItem}
                  menuActive={this.state.menuActive}
                  toggleMenu={this.activateMenu}
                />
              </Scrollbars>
            </MyVideosStyled.sideSection>
            <MyVideosStyled.mainSection menuActive={this.state.menuActive}>
              <div
                ref={node => !this.state.tabsRef && this.setState({ tabsRef: node, tabsClientHeight: node.clientHeight })}
              >
                <Tabs
                  labels={['Stars', 'Videos']}
                  disableTabs
                  leftCheckSelection={this.state.starAvailability}
                  changeleftCheckSelection={this.changeAvailability}
                  starMode={this.props.starMode}
                  heading={this.props.starMode ? 'Accepting Requests' : 'My Videos'}
                  toggleFilter={this.toggleFilterSection}
                />
                {
                  this.state.filterSelected &&
                    <FilterSection
                      starMode={this.props.starMode}
                      requestStatus
                      filterSelected={this.state.filterSelected}
                      toggleFilter={this.toggleFilterSection}
                      selectedRequestStatus={this.state.requestStatus}
                      updateRequestStatus={this.updateRequestStatus}
                    />
                }
              </div>
              {
                (!this.props.myVideosList.data.length && this.props.myVideosList.loading) ?
                  <MyVideosStyled.loaderWrapper style={this.state.tabsRef && {height: `calc(100% - ${this.state.tabsClientHeight}px)` }}>
                    <Loader />
                  </MyVideosStyled.loaderWrapper>
                :
                  <div style={this.state.tabsRef && {height: `calc(100% - ${this.state.tabsClientHeight}px)` }}>
                    <ScrollList
                      dataList={this.props.myVideosList.data}
                      requestDetails
                      starMode={this.props.starMode}
                      limit={this.props.myVideosList.limit}
                      totalCount={this.props.myVideosList.count}
                      offset={this.props.myVideosList.offset}
                      loading={this.props.myVideosList.loading}
                      selectItem={data => this.showRequest(data)}
                      fetchData={(offset, refresh) => this.props.fetchMyVideosList(offset, refresh)}
                    />
                  </div>
              }
            </MyVideosStyled.mainSection>
          </MyVideosStyled.sectionWrapper>
        </MyVideosStyled>
      </div>
    )
  }
};
