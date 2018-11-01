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
      itemSelected: false,
    };
    this.coverImage = new Image();
    this.profileImage = new Image();
    this.mounted = true;
    this.charLimit = 50;
    this.requestType = requestTypes;
    this.openColor = '#EA57A1';
    this.completedColor = '#64C937';
    this.cancelledColor = '#363636';
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

  getQaVideoData = (requestVideo) => {
    let videoPlayerProps = {};
    requestVideo.forEach((video) => {
      if (video.video_status === 4) {
        videoPlayerProps = {
          ...videoPlayerProps,
          primaryCover: video.s3_thumbnail_url ? video.s3_thumbnail_url : '',
          primarySrc: video.s3_video_url ? video.s3_video_url : '',
          ratio: video.width / video.height,
        };
      } else if (video.video_status === 5) {
        videoPlayerProps = {
          ...videoPlayerProps,
          secondaryCover: video.s3_thumbnail_url ? video.s3_thumbnail_url : '',
          secondarySrc: video.s3_video_url ? video.s3_video_url : '',
          ratio: video.width / video.height,
        };
      }
    });
    return videoPlayerProps;
  }

  getStatusColor = (status) => {
    if (status === 'Open') {
      return this.openColor;
    } else if (status === 'Completed') {
      return this.completedColor;
    }
    return this.cancelledColor;
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

  activateVideo = () => {
    const { requestVideo, requestType } = this.props;
    if (requestVideo && requestVideo.length) {
      const videoPlayerProps = requestType === 3 ? this.getQaVideoData(requestVideo) : {
        primaryCover: requestVideo[0].s3_thumbnail_url ? requestVideo[0].s3_thumbnail_url : '',
        primarySrc: requestVideo[0].s3_video_url ? requestVideo[0].s3_video_url : '',
        ratio: requestVideo[0].width / requestVideo[0].height,
      };
      this.setState({
        videoPlayerProps,
      });
    }
  }
  closeVideo = () => {
    this.setState({ videoPlayerProps: null });
  }

  selectItem = () => {
    this.setState({ itemSelected: !this.state.itemSelected });
    this.props.selectItem();
  }
  renderVideoDetails = (text) => {
    let splicedText = text;
    if (text.length > this.charLimit) {
      splicedText = text.substring(0, this.charLimit) + '...';
    }
    return splicedText;
  }

  renderSecondaryControlButton = () => {
    const { starMode, requestStatus } = this.props;
    if (requestStatus !== 5 && (starMode || !openStatusList.indexOf(requestStatus) > -1)) {
      if (starMode && celebOpenStatusList.indexOf(requestStatus) > -1) {
        return <VideoRenderDiv.ControlButton onClick={() => this.props.selectItem(true)}>Respond</VideoRenderDiv.ControlButton>;
      }
      return <VideoRenderDiv.ShareButton>Share</VideoRenderDiv.ShareButton>;
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
        {/* <VideoRenderDiv.ImageSection
          onClick={this.activateVideo}
          height={props.imageHeight}
          imageUrl={this.state.coverImage}
        >
          {this.state.coverImage ? <VideoRenderDiv.PlayButton /> : null}
          {this.renderTime()}
        </VideoRenderDiv.ImageSection> */}
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
               color={this.getStatusColor(props.starMode ? celebRequestStatusList[props.requestStatus] : requestStatusList[props.requestStatus])}
               highlight={props.starMode ? celebOpenStatusList.indexOf(props.requestStatus) > -1 : openStatusList.indexOf(props.requestStatus) > -1}
              >
                {props.starMode ? celebRequestStatusList[props.requestStatus] : requestStatusList[props.requestStatus]}
              </VideoRenderDiv.RequestStatus>
              {this.renderTime()}
            </VideoRenderDiv.StatusDetails>
            <VideoRenderDiv.ControlWrapper>
              <VideoRenderDiv.ControlButton onClick={this.selectItem} alternate>
                {this.state.itemSelected ? 'Hide details' : 'View details'}
              </VideoRenderDiv.ControlButton>
              {
                this.renderSecondaryControlButton()
              }
            </VideoRenderDiv.ControlWrapper>
          </VideoRenderDiv.StatusDetailsWrapper>
        </VideoRenderDiv.ProfileContent>
      </VideoRenderDiv>
    );
  }
}

