import React from 'react';
import ColumnLayout from '../../components/ColumnLayout';
import Loader from '../../components/Loader';
import ScrollList from '../../components/ScrollList';
import RequestDetails from '../../components/RequestDetails';
import SubmitView from '../../components/SubmitView';
import VideoRecorder from './components/VideoRecorder';
import DeclineView from './components/DeclineView';
import ShareView from '../../components/ShareView';
import RequestFlowPopup from '../../components/RequestFlowPopup';
import Popup from '../../components/Popup';
import InnerTabs from '../../components/InnerTabs';
import ActionLoader from '../../components/ActionLoader';
import RequestsStyled from './styled';
import { celebOpenStatusList, openStatusList, celebCompletedStatusList, completedStatusList } from '../../constants/requestStatusList';

export default class Requests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'All',
      innerLinks: [],
      requestStatus: 'all',
      requestAction: '',
      showActionPopup: false,
      isCelebrity: null,
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
    const isCelebrity = nextProps.userDetails.settings_userDetails.celebrity;
    if (nextProps.starMode && !prevState.innerLinks.length) {
      innerLinks = [
        { linkName: 'Requests', selectedName: 'requests', url: '/user/bookings' },
        { linkName: 'Earnings', selectedName: 'earnings', url: '/user/earnings' },
        { linkName: 'Settings', selectedName: 'settings', url: '/settings' },
      ];
    } else if (!prevState.innerLinks.length) {
      innerLinks = [
        ...innerLinks,
        { linkName: 'My videos', selectedName: 'myVideos', url: '/user/myVideos' },
        { linkName: 'Settings', selectedName: 'settings', url: '/settings' },
      ];
    }
    if (isCelebrity && isCelebrity !== prevState.isCelebrity && !nextProps.starMode) {
      innerLinks = [...innerLinks, { linkName: 'Requests', selectedName: 'requests', url: '/user/bookings' }];
    }
    return ({ innerLinks, isCelebrity });
  }

  getPopupContent = (requestAction) => {
    const { orderDetails } = this.state;
    const { request_video: requestVideo } = orderDetails;
    const finalVideo = requestVideo.filter(video => video.video_status === 1)[0]; // find completed video
    switch (requestAction) {
      case 'share':
        return <ShareView iconSize={50} title={orderDetails.booking_title} shareUrl={`https://${finalVideo.video_url}`} />;
      case 'respond':
        return <VideoRecorder orderDetails={this.state.orderDetails} {...this.props} />;
      case 'report':
        return (
          <SubmitView
            heading="Report abuse"
            onSubmit={data => this.props.reportAbuse({
              celebrity: orderDetails.celebrity_id,
              abuse_comment: data.comment,
            })}
            closePopup={this.closePopup}
          />
        );
      case 'contact':
        return (
          <SubmitView
            heading="Contact support"
            onSubmit={data => this.props.contactSupport({ comments: data.comment })}
            closePopup={this.closePopup}
          />
        );
      case 'rate':
        return (
          <SubmitView
            heading="Rate video"
            onSubmit={data => this.props.rateCelebrity({
              celebrity: orderDetails.celebrity_id,
              fan_rate: data.rating.toString(),
              starsona: orderDetails.id,
              comments: data.comment,
            })}
            closePopup={this.closePopup}
            onRatingSuccess={this.closePopup}
          />
        );
      case 'cancel':
      case 'decline':
        return (
          <DeclineView
            changeRequestStatus={reason => this.changeRequestStatus(orderDetails.id, 5, reason)} // to cancel a request
            starMode={this.props.starMode}
            closePopup={this.closePopup}
            requestType={orderDetails.request_type}
          />
        )
      default: return null;
    }
  }

  changeRequestStatus = (requestId, requestStatus, reason) => {
    this.props.changeRequestStatus(requestId, requestStatus, reason);
    this.closePopup();
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

  editRequest = (orderDetails) => {
    let bookingData = {
      edit: true,
      requestId: orderDetails.id,
      hostName: orderDetails.request_details.stargramto,
      userName: orderDetails.request_details.stargramfrom,
      date: orderDetails.request_details.date,
    };
    this.props.fetchCelebDetails(orderDetails.celebrity_id);
    let selectedRequestType = '';
    if (orderDetails.request_type === 1) { // Shout Outs
      bookingData = {
        ...bookingData,
        eventName: orderDetails.occasion,
        relationshipValue: orderDetails.request_details.relationship && orderDetails.request_details.relationship.id,
        otherRelationValue: orderDetails.request_details.relationship && orderDetails.request_details.relationship.title,
        type: 1,
        publicRequest: orderDetails.public_request,
        occasionType: orderDetails.occasion_type,
        selectedValue: orderDetails.occasion_id,
        selectedPersonal: orderDetails.request_details.stargramto !== 'Myself' ? '2' : '1',
        specification: orderDetails.request_details.specifically_for,
        importantinfo: orderDetails.request_details.important_info,
        from_audio_file: orderDetails.from_audio_file,
        to_audio_file: orderDetails.to_audio_file,
      };
      this.props.saveAudioRecording('from', { recordedBlob: null, recordedUrl: orderDetails.from_audio_file }); // update from audio in request flow
      this.props.saveAudioRecording('for', { recordedBlob: null, recordedUrl: orderDetails.to_audio_file }); // update to audio in request flow
      selectedRequestType = 'personal';
    } else if (orderDetails.request_type === 2) { // events
      bookingData = {
        ...bookingData,
        eventName: orderDetails.occasion,
        relationshipValue: orderDetails.request_details.relationship && orderDetails.request_details.relationship.id,
        type: 1,
        publicRequest: orderDetails.public_request,
        occasionType: orderDetails.occasion_type,
        selectedValue: orderDetails.occasion_id,
        selectedPersonal: orderDetails.request_details.stargramfrom !== 'Myself' ? '2' : '1',
        specification: orderDetails.request_details.specifically_for,
        importantinfo: orderDetails.request_details.important_info,
        // otherRelationValue:undefined,
        from_audio_file: orderDetails.from_audio_file,
        to_audio_file: orderDetails.from_whereto_audio_file,
      };
      selectedRequestType = 'event';
    } else if (orderDetails.request_type === 3) { // Q&A
      bookingData = {
        ...bookingData,
        question: orderDetails.booking_title,
        requestVideo: orderDetails.request_video
      };
      selectedRequestType = 'ask';
    }
    this.props.setBookingDetails(bookingData);
    this.props.setRequestFlow(orderDetails.celebrity_id, selectedRequestType, 1);
  }

  requestAction = (data, actionType) => {
    let { requestAction, showActionPopup } = this.state;
    if (actionType === 'edit') {
      this.editRequest(data);
    } else if (actionType === 'share'
      || actionType === 'respond'
      || actionType === 'report'
      || actionType === 'contact'
      || actionType === 'rate'
      || actionType === 'decline'
      || actionType === 'cancel'
    ) {
      showActionPopup = true;
    }
    requestAction = actionType;
    this.setState({ orderDetails: data, requestAction, showActionPopup });
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

  updateScrollTarget = (target) => {
    this.setState({ scrollTarget: target });
  }

  closePopup = () => {
    this.setState({ showActionPopup: false })
  }

  renderRequests = (request) => {
    return (
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
        orderDetails={request}
        details={request.booking_title}
        requestStatus={request.request_status}
        requestVideo={request.request_video}
        requestType={request.request_type}
        createdDate={request.created_date}
        selectItem={type => this.requestAction(request, type)}
      />
    )
  }

  renderBookings = () => {
    return (
      <ScrollList
        dataList={this.props.myVideosList.data}
        scrollTarget={this.state.scrollTarget !== '' ? this.state.scrollTarget : null}
        requestDetails
        renderFunction={this.renderRequests}
        starMode={this.props.starMode}
        limit={this.props.myVideosList.limit}
        totalCount={this.props.myVideosList.count}
        offset={this.props.myVideosList.offset}
        loading={this.props.myVideosList.loading}
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
    console.log(this.state.requestAction);
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
          this.state.showActionPopup && this.state.requestAction === 'respond' &&
            <RequestFlowPopup
              dotsCount={0}
              smallPopup
              closePopUp={this.closePopup}
            >
              { this.getPopupContent(this.state.requestAction) }
            </RequestFlowPopup>
        }
        {
          this.state.showActionPopup && this.state.requestAction !== 'respond' &&
            <Popup
              smallPopup
              closePopUp={this.closePopup}
            >
              { this.getPopupContent(this.state.requestAction) }
            </Popup>
        }
      </div>
    );
  }
}
