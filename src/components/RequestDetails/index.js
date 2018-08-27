import React from 'react';
import VideoRenderDiv from './styled';
import { requestTypes } from '../../constants/requestTypes'

export default class RequestDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coverImage: false,
      profileImage: false,
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
    this.profileImage.src = this.props.profile;
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
    let timeString = 'Requested';
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
        timeString = diffHrs === 1 ? `${timeString} ${diffHrs} hour ago` : timeString = `${timeString} ${diffHrs} hours ago`;
      } else if (diffMins >= 1) {
        timeString = diffMins === 1 ? `${timeString} ${diffMins} minute ago` : `${timeString} ${diffMins} minutes ago`;
      } else {
        timeString = `${timeString} just now`;
      }
    }
    return timeString;
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
  render() {
    const { props } = this;
    return (
      <VideoRenderDiv onClick={() => this.props.selectItem()}>
        <VideoRenderDiv.ImageSection
          height={props.imageHeight}
          imageUrl={this.state.coverImage}
        >
          {
            !this.props.starMode &&
              <VideoRenderDiv.ProfileImageWrapper>
                <VideoRenderDiv.ProfileImage
                  imageUrl={this.state.profileImage}
                />
              </VideoRenderDiv.ProfileImageWrapper>
          }
          {/* <VideoRenderDiv.FavoriteButton /> */}
        </VideoRenderDiv.ImageSection>
        <VideoRenderDiv.ProfileContent>
          <VideoRenderDiv.DetailWrapper>
            <VideoRenderDiv.StarName>
              {props.starMode ? this.requestType[props.requestType] : props.starName}
            </VideoRenderDiv.StarName>
            <VideoRenderDiv.StarDetails>{this.renderVideoDetails(props.details)}</VideoRenderDiv.StarDetails>
            {this.renderRequestDetails()}
          </VideoRenderDiv.DetailWrapper>
        </VideoRenderDiv.ProfileContent>
        {/* </Link> */}
      </VideoRenderDiv>
    );
  }
}

