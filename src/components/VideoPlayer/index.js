import React from 'react';
import { Player, BigPlayButton, LoadingSpinner } from 'video-react';
import './video';
import VideoRenderDiv from './styled';

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const { props } = this;
    return (
      <VideoRenderDiv>
        <div id="player">
          <Player
            playsInline
            poster={this.props.cover}
            src={this.props.src}
            aspectRatio="4:3"
            autoPlay
          >
            <LoadingSpinner />
            <BigPlayButton disabled />
          </Player>
        </div>
      </VideoRenderDiv>
    );
  }
}

