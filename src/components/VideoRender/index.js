import React from 'react';
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
      <VideoRenderDiv>
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
          <VideoRenderDiv.Span>
            <VideoRenderDiv.StarName>
              {props.starName}
            </VideoRenderDiv.StarName>
            <VideoRenderDiv.StarDetails>{this.renderVideoDetails(props.details)}</VideoRenderDiv.StarDetails>
          </VideoRenderDiv.Span>
        </VideoRenderDiv.ProfileContent>
      </VideoRenderDiv>
    )
  }
}

