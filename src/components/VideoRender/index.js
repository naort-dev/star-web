import React from 'react';
import { Link } from 'react-router-dom';
import VideoPlayer from '../VideoPlayer';
import Popup from '../Popup';
import VideoRenderDiv from './styled';

export default class VideoRender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coverImage: false,
      profileImage: false,
      videoActive: false,
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

  showVideoPopup = () => {
    return (
      <Popup
        closePopUp={() => this.setState({ videoActive: false })}
      >
        <VideoRenderDiv.VideoContentWrapper>
          <VideoRenderDiv.VideoContent>
            <VideoRenderDiv.VideoRequester>
              <VideoRenderDiv.VideoRequestImage
                imageUrl={this.state.profileImage}
              />
              <VideoRenderDiv.VideoRequestName>
                {this.props.starName}
                <VideoRenderDiv.VideoTitle>
                  {this.props.celebProfessions}
                </VideoRenderDiv.VideoTitle>
              </VideoRenderDiv.VideoRequestName>
            </VideoRenderDiv.VideoRequester>
          </VideoRenderDiv.VideoContent>
          <VideoRenderDiv.VideoPlayer>
            <VideoPlayer
              cover={this.state.videoCover ? this.state.videoCover : ''}
              src={this.props.videoUrl ? this.props.videoUrl : ''}
            />
          </VideoRenderDiv.VideoPlayer>
        </VideoRenderDiv.VideoContentWrapper>
      </Popup>
    );
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
      <VideoRenderDiv onClick={() => this.setState({ videoActive: true })}>
        {
          this.state.videoActive && this.showVideoPopup()
        }
        <VideoRenderDiv.ImageSection
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
            <VideoRenderDiv.StarDetails>{this.renderVideoDetails(props.details)}</VideoRenderDiv.StarDetails>
          </VideoRenderDiv.Span>
        </VideoRenderDiv.ProfileContent>
      </VideoRenderDiv>
    );
  }
}

