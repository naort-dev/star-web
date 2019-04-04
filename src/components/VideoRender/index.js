import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { requestTypeTitle } from '../../constants/requestTypes';
import VideoPlayer from '../VideoPlayer';
import VideoRenderDiv from './styled';

export default class VideoRender extends React.Component {
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
  getTitle = () => {
    const { bookingType, occasion } = this.props;
    let bookingTitle = '';
    if (bookingType === 3) { // Q&A video
      bookingTitle =`Q&A ${requestTypeTitle[bookingType]}`;
    } else {
      bookingTitle = `${occasion} ${requestTypeTitle[bookingType]}`;
    }
    if (bookingTitle.length > this.charLimit) {
      bookingTitle = bookingTitle.substring(0, this.charLimit) + '...';
    }
    return bookingTitle;
  }
  renderVideoDetails = (text) => {
    let splicedText = text;
    if (text.length > this.charLimit) {
      splicedText = text.substring(0, this.charLimit) + '...';
    }
    return splicedText;
  }
  render() {
    const { props } = this;
    return (
      <VideoRenderDiv onClick={props.enableVideoPopup}>
        <VideoRenderDiv.Container varibleWidth={props.variableWidth} variableHeight={props.variableHeight}>
          <VideoRenderDiv.Content imageUrl={this.state.coverImage}>
            <VideoPlayer
              primarySrc="assets/Footboys.mp4"

            />
          </VideoRenderDiv.Content>
        </VideoRenderDiv.Container>
        {/* <VideoRenderDiv.ImageSection
          height={props.imageHeight}
          imageUrl={this.state.coverImage}
        >
          <VideoRenderDiv.ProfileImageWrapper>
            <VideoRenderDiv.ProfileImage
              imageUrl={this.state.profileImage}
            />
          </VideoRenderDiv.ProfileImageWrapper>
        </VideoRenderDiv.ImageSection>
        <VideoRenderDiv.ProfileContent>
          <VideoRenderDiv.Span>
            <VideoRenderDiv.StarName>
              {props.starName}
            </VideoRenderDiv.StarName>
            <VideoRenderDiv.StarDetails>{this.getTitle()}</VideoRenderDiv.StarDetails>
          </VideoRenderDiv.Span>
        </VideoRenderDiv.ProfileContent> */}
      </VideoRenderDiv>
    );
  }
}

