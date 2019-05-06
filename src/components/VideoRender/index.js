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

  renderCustomText = () => {
    if (this.props.customText) {
      return (
        <VideoRenderDiv.CustomText>
          {
            this.props.customText
          }
        </VideoRenderDiv.CustomText>
      )
    }
  }

  render() {
    const { props } = this;
    return (
      <VideoRenderDiv variableWidth={props.variableWidth} variableHeight={props.variableHeight} onClick={props.enableVideoPopup}>
        <VideoRenderDiv.Container
          noBorder={props.noBorder}
          variableWidth={props.variableWidth}
          variableHeight={props.variableHeight}
        >
          <VideoRenderDiv.Content imageUrl={this.state.coverImage}>
            <VideoPlayer
              renderCustomText={this.renderCustomText}
              autoPlay={this.props.autoPlay}
              onError={this.props.onVideoError}
              primarySrc={props.videoSrc}
            />
          </VideoRenderDiv.Content>
        </VideoRenderDiv.Container>
      </VideoRenderDiv>
    );
  }
}

