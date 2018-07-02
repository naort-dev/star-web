import React from 'react';
import { Link } from 'react-router-dom';
import VideoRenderDiv from './styled';

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
    const currentDate = new Date();
    const createdDate = new Date(this.props.createdDate);
    const timeDiff = currentDate - createdDate;
    const diffDays = Math.floor(timeDiff / 86400000); // days
    const diffHrs = Math.floor((timeDiff % 86400000) / 3600000); // hours
    const diffMins = Math.round(((timeDiff % 86400000) % 3600000) / 60000); // minutes
    if (diffDays === 1) {
      timeString = `${timeString} ${diffDays} day ago`;
    } else if (diffDays > 1) {
      timeString = `${timeString} ${diffDays} days ago`;
    } else if (diffHrs === 1) {
      timeString = `${timeString} ${diffHrs} hour ago`;
    } else if (diffHrs >= 1) {
      timeString = `${timeString} ${diffHrs} hours ago`;
    } else if (diffMins === 1) {
      timeString = `${timeString} ${diffMins} minute ago`;
    } else if (diffMins >= 1) {
      timeString = `${timeString} ${diffMins} minutes ago`;
    } else {
      timeString = `${timeString} just now`;
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
        return (
          <VideoRenderDiv.RequestDetails>
            <VideoRenderDiv.RequestStatus>
              Completed
            </VideoRenderDiv.RequestStatus>
            <VideoRenderDiv.EventType>
              Event
            </VideoRenderDiv.EventType>
          </VideoRenderDiv.RequestDetails>
        );
      case 5:
        return (
          <VideoRenderDiv.RequestDetails>
            <VideoRenderDiv.RequestStatus>
              Cancelled
            </VideoRenderDiv.RequestStatus>
            <VideoRenderDiv.EventType>
              Event
            </VideoRenderDiv.EventType>
          </VideoRenderDiv.RequestDetails>
        );
      case 2:
      case 3:
        return (
          <VideoRenderDiv.RequestDetails>
            <VideoRenderDiv.RequestStatus>
              {this.findTime()}
            </VideoRenderDiv.RequestStatus>
            <VideoRenderDiv.EventType>
              Event
            </VideoRenderDiv.EventType>
          </VideoRenderDiv.RequestDetails>
        );
      default: return null;
    }
  }
  render() {
    const { props } = this;
    return (
      <VideoRenderDiv>
        <Link to={`/starDetail/${props.celebId}/${props.videoId}`} onClick={e => this.checkRoute(e)}>
          <VideoRenderDiv.ImageSection
            height={props.imageHeight}
            imageUrl={this.state.coverImage}
          >
            <VideoRenderDiv.ProfileImageWrapper>
              <VideoRenderDiv.ProfileImage
                imageUrl={this.state.profileImage}
              />
            </VideoRenderDiv.ProfileImageWrapper>
            {/* <VideoRenderDiv.FavoriteButton /> */}
          </VideoRenderDiv.ImageSection>
          <VideoRenderDiv.ProfileContent>
            <VideoRenderDiv.DetailWrapper>
              <VideoRenderDiv.StarName>
                {props.starName}
              </VideoRenderDiv.StarName>
              <VideoRenderDiv.StarDetails>{this.renderVideoDetails(props.details)}</VideoRenderDiv.StarDetails>
              {this.renderRequestDetails()}
            </VideoRenderDiv.DetailWrapper>
          </VideoRenderDiv.ProfileContent>
        </Link>
      </VideoRenderDiv>
    );
  }
}

