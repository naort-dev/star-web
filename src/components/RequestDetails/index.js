import React from 'react';
import VideoRenderDiv from './styled';
import VideoPlayer from '../VideoPlayer';
import RequestFlowPopup from '../RequestFlowPopup';
import { requestTypes } from '../../constants/requestTypes';
import { celebRequestStatusList, requestStatusList, openStatusList, celebOpenStatusList } from '../../constants/requestStatusList';

export default class RequestDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coverImage: false,
      profileImage: false,
      videoPlayerProps: null,
    };
    this.coverImage = new Image();
    this.profileImage = new Image();
    this.mounted = true;
    this.charLimit = 50;
    this.requestType = requestTypes;
  }
  componentWillMount() {
    this.coverImage.onload = () => {
      if (this.mounted) {
        this.setState({ coverImage: this.coverImage.src });
      }
    };
    this.coverImage.src = this.props.cover;
    this.profileImage.onload = () => {
      if (this.mounted) {
        this.setState({ profileImage: this.profileImage.src });
      }
    };
    this.profileImage.src = this.props.starMode ? this.props.fanProfile : this.props.profile;
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  checkRoute = (e) => {
    if (this.props.requestStatus != 6) {
      e.preventDefault();
    }
  }
  findTime = () => {
    let timeString = '';
    if (this.props.starMode && this.props.requestStatus === 4) { // Processing Videos
      timeString = 'Completed';
    } else {
      const currentDate = new Date();
      const createdDate = new Date(this.props.createdDate);
      const timeDiff = currentDate - createdDate;
      const diffDays = Math.floor(timeDiff / 86400000); // days
      const diffHrs = Math.floor((timeDiff % 86400000) / 3600000); // hours
      const diffMins = Math.round(((timeDiff % 86400000) % 3600000) / 60000); // minutes
      if (diffDays >= 1) {
        timeString = diffDays === 1 ? `${timeString} ${diffDays} day ago` : `${timeString} ${diffDays} days ago`;
      } else if (diffHrs >= 1) {
        timeString = diffHrs === 1 ? `${timeString} ${diffHrs} hour ago` : `${timeString} ${diffHrs} hours ago`;
      } else if (diffMins >= 1) {
        timeString = diffMins === 1 ? `${timeString} ${diffMins} minute ago` : `${timeString} ${diffMins} minutes ago`;
      } else {
        timeString = `${timeString} just now`;
      }
    }
    return timeString;
  }

  getQaVideoData = (requestVideo) => {
    let videoPlayerProps = {};
    requestVideo.forEach((video) => {
      if (video.video_status === 4) {
        videoPlayerProps = {
          ...videoPlayerProps,
          primaryCover: video.s3_thumbnail_url ? video.s3_thumbnail_url : '',
          primarySrc: video.s3_video_url ? video.s3_video_url : '',
        };
      } else if (video.video_status === 5) {
        videoPlayerProps = {
          ...videoPlayerProps,
          secondaryCover: video.s3_thumbnail_url ? video.s3_thumbnail_url : '',
          secondarySrc: video.s3_video_url ? video.s3_video_url : '',
        };
      }
    });
    return videoPlayerProps;
  }
  activateVideo = () => {
    const { requestVideo, requestType } = this.props;
    if (requestVideo && requestVideo.length) {
      const videoPlayerProps = requestType === 3 ? this.getQaVideoData(requestVideo) : {
        primaryCover: requestVideo[0].s3_thumbnail_url ? requestVideo[0].s3_thumbnail_url : '',
        primarySrc: requestVideo[0].s3_video_url ? requestVideo[0].s3_video_url : '',
      };
      this.setState({
        videoPlayerProps,
      });
    }
  }
  closeVideo = () => {
    this.setState({ videoPlayerProps: null });
  }
  renderVideoDetails = (text) => {
    let splicedText = text;
    if (text.length > this.charLimit) {
      splicedText = text.substring(0, this.charLimit) + '...';
    }
    return splicedText;
  }
  renderRequestDetails = () => {
    switch (this.props.requestStatus) {
      case 6:
        // completed
        return (
          <VideoRenderDiv.RequestDetails>
            <VideoRenderDiv.RequestStatus>
              Completed
            </VideoRenderDiv.RequestStatus>
            <VideoRenderDiv.EventType>
              {this.props.starMode ? `#${this.props.orderId}` : this.requestType[this.props.requestType]}
            </VideoRenderDiv.EventType>
          </VideoRenderDiv.RequestDetails>
        );
      case 5:
        // Cancelled
        return (
          <VideoRenderDiv.RequestDetails>
            <VideoRenderDiv.RequestStatus>
              Cancelled
            </VideoRenderDiv.RequestStatus>
            <VideoRenderDiv.EventType>
              {this.props.starMode ? `#${this.props.orderId}` : this.requestType[this.props.requestType]}
            </VideoRenderDiv.EventType>
          </VideoRenderDiv.RequestDetails>
        );
      case 4:
      case 3:
      case 2:
      case 1:
        // open
        return (
          <VideoRenderDiv.RequestDetails>
            <VideoRenderDiv.RequestStatus>
              {this.findTime()}
            </VideoRenderDiv.RequestStatus>
            <VideoRenderDiv.EventType>
              {this.props.starMode ? `#${this.props.orderId}` : this.requestType[this.props.requestType]}
            </VideoRenderDiv.EventType>
          </VideoRenderDiv.RequestDetails>
        );
      default: return null;
    }
  }

  renderSecondaryControlButton = () => {
    const { starMode, requestStatus } = this.props;
    if (requestStatus !== 5 && !(!starMode && openStatusList.indexOf(requestStatus) > -1)) {
      if (starMode && celebOpenStatusList.indexOf(requestStatus) > -1) {
        return <VideoRenderDiv.ControlButton onClick={() => this.props.selectItem(true)}>Respond</VideoRenderDiv.ControlButton>;
      }
    }
    return null;
  }

  renderTime = () => {
    const { starMode, requestStatus } = this.props;
    const isOpenRequest = (starMode && celebOpenStatusList.indexOf(requestStatus) > -1) || (!starMode && openStatusList.indexOf(requestStatus) > -1);
    if (isOpenRequest) {
      return <VideoRenderDiv.RequestTime>{this.findTime()}</VideoRenderDiv.RequestTime>;
    }
    return null;
  }

  render() {
    const { props } = this;
    return (
      <VideoRenderDiv>
        {
          this.state.videoPlayerProps ?
            <RequestFlowPopup
              dotsCount={0}
              closePopUp={this.closeVideo}
              smallPopup
            >
              <VideoRenderDiv.VideoPlayerWrapper>
                <VideoPlayer {...this.state.videoPlayerProps} />                
              </VideoRenderDiv.VideoPlayerWrapper>
            </RequestFlowPopup>
          : null
        }
        <VideoRenderDiv.ImageSection
          onClick={this.activateVideo}
          height={props.imageHeight}
          imageUrl={this.state.coverImage}
        >
          {this.state.coverImage ? <VideoRenderDiv.PlayButton /> : null}
          {this.renderTime()}
        </VideoRenderDiv.ImageSection>
        <VideoRenderDiv.ProfileContent>
          <VideoRenderDiv.ProfileDetailWrapper>
            <VideoRenderDiv.ProfileImageWrapper>
              <VideoRenderDiv.ProfileImage
                imageUrl={this.state.profileImage}
              />
            </VideoRenderDiv.ProfileImageWrapper>
            <VideoRenderDiv.DetailWrapper>
              <VideoRenderDiv.StarName>
                {props.starMode ? props.fanName : props.starName }
              </VideoRenderDiv.StarName>
              <VideoRenderDiv.StarDetails>{this.renderVideoDetails(props.details)}</VideoRenderDiv.StarDetails>
            </VideoRenderDiv.DetailWrapper>
          </VideoRenderDiv.ProfileDetailWrapper>
          <VideoRenderDiv.StatusDetailsWrapper>
            <VideoRenderDiv.StatusDetails>
              <VideoRenderDiv.StarDetails>Status</VideoRenderDiv.StarDetails>
              <VideoRenderDiv.RequestStatus
               highlight={props.starMode ? celebOpenStatusList.indexOf(props.requestStatus) > -1 : openStatusList.indexOf(props.requestStatus)}
              >{props.starMode ? celebRequestStatusList[props.requestStatus] : requestStatusList[props.requestStatus]}</VideoRenderDiv.RequestStatus>
            </VideoRenderDiv.StatusDetails>
          </VideoRenderDiv.StatusDetailsWrapper>
          {/* {this.renderRequestDetails()} */}
        </VideoRenderDiv.ProfileContent>
        <VideoRenderDiv.ControlWrapper>
          {
            this.renderSecondaryControlButton()
          }
          <VideoRenderDiv.ControlButton onClick={() => this.props.selectItem()} alternate>View</VideoRenderDiv.ControlButton>
        </VideoRenderDiv.ControlWrapper>
      </VideoRenderDiv>
    );
  }
}

