import React from 'react';
import { Player, BigPlayButton } from 'video-react';
import './video';
import VideoRenderDiv from './styled';

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    console.log(this.props.src);
    const { props } = this;
    return (
      <VideoRenderDiv>
        <div id="player">
          <Player   
            poster={this.props.cover}
            src={this.props.src}
          >
            <BigPlayButton disabled />
          </Player>
        </div>
      </VideoRenderDiv>
    );
  }
}

