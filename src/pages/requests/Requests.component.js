import React from 'react';
import ColumnLayout from '../../components/ColumnLayout';
import ScrollList from '../../components/ScrollList';
import RequestDetails from '../../components/RequestDetails';
import SubmitView from '../../components/SubmitView';
import VideoRecorder from './components/VideoRecorder';
import DeclineView from './components/DeclineView';
import ShareView from '../../components/ShareView';
import RateView from './components/RateView';
import ReactionView from './components/ReactionView';
import AlertView from '../../components/AlertView';
import RequestFlowPopup from '../../components/RequestFlowPopup';
import Popup from '../../components/Popup';
import InnerTabs from '../../components/InnerTabs';
import ActionLoader from '../../components/ActionLoader';
import { getRequestDetails } from '../../services/request';
import RequestsStyled from './styled';
import { celebOpenStatusList, openStatusList, celebCompletedStatusList, completedStatusList } from '../../constants/requestStatusList';

export default class Requests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'All',
      requestAction: '',
      showActionPopup: false,
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
    const params = window.location.search && window.location.search.split('?')[1];
    const finalParams = params && params.split('&');
    if (!this.props.starMode && finalParams) {
      finalParams.forEach((data) => {
        if (data.split('=')[0] === 'requestid') {
          getRequestDetails(data.split('=')[1])
            .then((requestDetails) => {
              if (requestDetails.success &&
                requestDetails.data &&
                requestDetails.data.stargramz_response &&
                !requestDetails.data.stargramz_response.fan_rating
              ) {
                this.requestAction(requestDetails.data.stargramz_response, 'rate');
              }
            });
        }
      });
    }
    this.props.fetchMyVideosList(0, true, this.role, 'all');
  }

  onVideoUpload = (success) => {
    this.props.onClearStreams();
    this.props.deleteVideo();
    if (window.stream) {
      const tracks = window.stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    }
    if (success) {
      this.requestAction(this.state.orderDetails, 'respondSuccess');
    } else {
      this.requestAction(this.state.orderDetails, 'respondFail');
    }
  }

  getPopupContent = (requestAction) => {
    const { orderDetails } = this.state;
    const { request_video: requestVideo, fan } = orderDetails;
    const finalVideo = requestVideo.filter(video => video.video_status === 1)[0]; // find completed video
    switch (requestAction) {
      case 'share':
        return <ShareView iconSize={50} title={orderDetails.booking_title} shareUrl={`https://${finalVideo.video_url}`} />;
      case 'respond':
        return <VideoRecorder onComplete={this.onVideoUpload} orderDetails={this.state.orderDetails} {...this.props} />;
      case 'report':
        return (
          <SubmitView
            heading="Report abuse"
            onSubmit={data => this.props.reportAbuse({
              celebrity: orderDetails.celebrity_id,
              abuse_comment: data.comment,
            })}
            successMessage="The message has been sent."
            closePopup={this.closePopup}
          />
        );
      case 'contact':
        return (
          <SubmitView
            heading="Contact support"
            onSubmit={data => this.props.contactSupport({ comments: data.comment })}
            closePopup={this.closePopup}
            successMessage="The message has been sent."
          />
        );
      case 'rate':
        return (
          <RateView
            onSubmit={data => this.props.rateCelebrity({
              celebrity: orderDetails.celebrity_id,
              fan_rate: data.rating.toString(),
              starsona: orderDetails.id,
              comments: data.comment,
            })}
            orderDetails={orderDetails}
            onSuccess={this.fetchVideosList}
            closePopup={this.closePopup}
          />
        );
      case 'reaction':
        return (
          <ReactionView
            fanProfile={orderDetails.fan_photo && orderDetails.fan_photo.thumbnail_url}
            orderDetails={orderDetails}
            closePopup={this.closePopup}
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
        );
      case 'respondSuccess':
        return (
          <AlertView
            message={`Thank you! Your Starsona has been sent to ${fan}`}
            closePopup={this.closePopup}
          />
        );
      case 'respondFail':
        return (
          <AlertView
            message="Something went wrong"
            closePopup={this.closePopup}
          />
        );
      default: return null;
    }
  }

  fetchVideosList = () => {
    this.props.fetchMyVideosList(0, true);
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
      || actionType === 'respondSuccess'
      || actionType === 'respondFail'
      || actionType === 'reaction'
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
    this.setState({ showActionPopup: false });
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
        updateVideosList={this.props.updateVideosList}
        selectItem={type => this.requestAction(request, type)}
      />
    )
  }

  renderBookings = () => {
    return (
      <ScrollList
        dataList={this.props.requestsList}
        scrollTarget={this.state.scrollTarget !== '' ? this.state.scrollTarget : null}
        requestDetails
        renderFunction={this.renderRequests}
        starMode={this.props.starMode}
        limit={this.props.requestsLimit}
        totalCount={this.props.requestsCount}
        offset={this.props.requestsOffset}
        loading={this.props.requestsLoading}
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
            this.renderBookings()
          }
        </RequestsStyled.ContentWrapper>
      </React.Fragment>
    );
  }
  render() {
    const { requestAction, showActionPopup } = this.state;
    return (
      <div>
        <ColumnLayout
          selectedSideBarItem={this.props.starMode ? 'requests' : 'myVideos'}
          history={this.props.history}
          getScrollTarget={this.updateScrollTarget}
        >
          {this.renderCenterSection()}
        </ColumnLayout>
        {
          this.props.orderDetailsLoading ?
            <ActionLoader />
          : null
        }
        {
          showActionPopup && (requestAction === 'respond' || requestAction === 'rate' || requestAction === 'reaction') &&
            <RequestFlowPopup
              dotsCount={0}
              smallPopup
              autoWidth
              closePopUp={this.closePopup}
            >
              { this.getPopupContent(requestAction) }
            </RequestFlowPopup>
        }
        {
          showActionPopup && requestAction !== 'respond' && requestAction !== 'rate' && requestAction !== 'reaction' &&
            <Popup
              smallPopup
              closePopUp={this.closePopup}
            >
              { this.getPopupContent(requestAction) }
            </Popup>
        }
      </div>
    );
  }
}
