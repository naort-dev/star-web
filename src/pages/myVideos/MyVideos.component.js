import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Loader from '../../components/Loader';
import ScrollList from '../../components/ScrollList';
import FilterSection from '../../components/filterSection';
import OrderDetails from '../../components/OrderDetails';
import Tabs from '../../components/Tabs';
import MyVideosStyled from './styled';

const moment = require('moment');

export default class MyVideos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
      filterSelected: false,
      tabsClientHeight: 0,
      requestStatus: 'all',
      orderDetails: {},
    };
    this.requestType = {
      3: 'Q&A',
      2: 'Event',
      1: 'Shout-outs',
    };
  }
  componentWillMount() {
    this.props.fetchMyVideosList(0, true);
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
      this.props.fetchMyVideosList(0, true, this.state.requestStatus);
    });
  }
  showRequest = (data) => {
    this.setState({ orderDetails: data });
  }
  hideRequest = () => {
    this.setState({ orderDetails: {} });
  }
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
  render() {
    let requestStatus, orderId, requestType, requestVideo, starPhoto, starProfessions, createdDate, occasion, price, isPrivate, from, requestTypeId;
    let occasionDate, to, relationShip, importantInfo, eventTitle, celebrity, eventHost, honoringFor, eventGuestHonor, specificallyFor;
    if (Object.keys(this.state.orderDetails).length) {
      if (this.state.orderDetails.request_status === 2 || this.state.orderDetails.request_status === 3) {
        requestStatus = 'Open';
      } else if (this.state.orderDetails.request_status === 5) {
        requestStatus = 'Cancelled';
      } else if (this.state.orderDetails.request_status === 6) {
        requestStatus = 'Completed';
      }
      orderId = this.state.orderDetails.order_details ? this.state.orderDetails.order_details.order : '';
      requestType = this.requestType[this.state.orderDetails.request_type];
      requestTypeId = this.state.orderDetails.request_type;
      requestVideo = this.state.orderDetails.request_video ? this.state.orderDetails.request_video[0] : {};
      starPhoto = this.state.orderDetails.avatar_photo && this.state.orderDetails.avatar_photo.thumbnail_url;
      starProfessions = this.renderStarProfessions(this.state.orderDetails.professions);
      createdDate = moment(this.state.orderDetails.created_date).format('LL');
      occasion = this.state.orderDetails.occasion;
      celebrity = this.state.orderDetails ? this.state.orderDetails.celebrity : '';
      price = this.state.orderDetails.order_details ? this.state.orderDetails.order_details.amount : '';
      isPrivate = this.state.orderDetails.public_request ? 'No' : 'Yes';
      if (this.state.orderDetails.request_details) {
        from = this.state.orderDetails.request_details.stargramfrom ? this.state.orderDetails.request_details.stargramfrom : '';
        occasionDate = this.state.orderDetails.request_details.date ? moment(this.state.orderDetails.request_details.date).format('LL') : '';
        to = this.state.orderDetails.request_details.stargramto ? this.state.orderDetails.request_details.stargramto : '';
        importantInfo = this.state.orderDetails.request_details.important_info ? this.state.orderDetails.request_details.important_info : '';
        eventTitle = this.state.orderDetails.request_details.event_title ? this.state.orderDetails.request_details.event_title : '';
        eventHost = this.state.orderDetails.request_details.event_host ? this.state.orderDetails.request_details.event_host : '';
        honoringFor = this.state.orderDetails.request_details.honoring_for ? this.state.orderDetails.request_details.honoring_for : '';
        eventGuestHonor = this.state.orderDetails.request_details.event_guest_honor ? this.state.orderDetails.request_details.event_guest_honor : '';
        specificallyFor = this.state.orderDetails.request_details.specifically_for ? this.state.orderDetails.request_details.specifically_for : '';
        if (this.state.orderDetails.request_details.relationship) {
          relationShip = this.state.orderDetails.request_details.relationship.title ? this.state.orderDetails.request_details.relationship.title : '';
        } else {
          relationShip = '';
        }
      } else {
        from = '';
        occasionDate = '';
        to = '';
        importantInfo = '';
        relationShip = '';
      }
    }
    return (
      <div>
        <div style={{ display: Object.keys(this.state.orderDetails).length ? 'block' : 'none' }}>
          <OrderDetails
            history={this.props.history}
            requestStatus={requestStatus}
            orderId={orderId}
            celebrity={celebrity}
            requestType={requestType}
            requestTypeId={requestTypeId}
            hideRequest={this.hideRequest}
            requestVideo={requestVideo}
            starPhoto={starPhoto}
            starProfessions={starProfessions}
            createdDate={createdDate}
            occasion={occasion}
            price={price}
            isPrivate={isPrivate}
            from={from}
            to={to}
            relationShip={relationShip}
            importantInfo={importantInfo}
            occasionDate={occasionDate}
            eventTitle={eventTitle}
            eventHost={eventHost}
            honoringFor={honoringFor}
            eventGuestHonor={eventGuestHonor}
            specificallyFor={specificallyFor}
          />
        </div>
        <MyVideosStyled style={{ display: Object.keys(this.state.orderDetails).length ? 'none' : 'block' }}>
          <Header
            menuActive={this.state.menuActive}
            enableMenu={this.activateMenu}
            history={this.props.history}
          />
          <MyVideosStyled.sectionWrapper>
            <MyVideosStyled.sideSection menuActive={this.state.menuActive}>
              <Scrollbars
                autoHide
                renderView={props => <div {...props} className="view" />}
              >
                <Sidebar
                  list={this.props.professionsList}
                  history={this.props.history}
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
                  heading="My Videos"
                  toggleFilter={this.toggleFilterSection}
                />
                {
                  this.state.filterSelected &&
                    <FilterSection
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
