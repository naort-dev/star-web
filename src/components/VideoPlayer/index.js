import React from 'react';
import { Player, BigPlayButton, LoadingSpinner } from 'video-react';
import './video';
import VideoRenderDiv from './styled';

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      primarySrc: this.props.primarySrc,
      primary: {
        thumbnail: this.props.primaryCover,
        video: this.props.primarySrc,
      },
      secondary: {
        thumbnail: this.props.secondaryCover,
        video: this.props.secondarySrc,
      },
    };
  }

  componentDidMount() {
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.primarySrc !== prevState.primarySrc) {
      return {
        primarySrc: nextProps.primarySrc,
        primary: {
          thumbnail: nextProps.primaryCover,
          video: nextProps.primarySrc,
        },
        secondary: {
          thumbnail: nextProps.secondaryCover,
          video: nextProps.secondarySrc,
        },
      };
    }
    return null;
  }

  handleStateChange = (state) => {
    if (state.ended && this.state.primary.video === this.props.primarySrc && this.state.secondary.video) this.swapVideos();
  }

  swapVideos = () => {
    const primary = this.state.secondary;
    const secondary = this.state.primary;
    this.setState({
      primary: {
        thumbnail: '',
        video: '',
      },
      fullScreen: true,
    });
    setTimeout(() => this.setState({ primary, secondary, fullScreen: false }), 500);
  }

  render() {
    console.log("fill")
    return (
      <VideoRenderDiv>
        {this.state.secondary.thumbnail && <VideoRenderDiv.answerVideo
          onClick={this.swapVideos}
          src={this.state.secondary.thumbnail}
          fullScreen={this.state.fullScreen}
        />}
        <div id="player">
          <Player
            playsInline
            ref={player => this.player = player}
            poster={this.state.primary.thumbnail}
            src={this.state.primary.video}
            fluid
            aspectRatio="auto"
            autoPlay={this.state.primary.video === this.props.secondarySrc}
            
          >
            <LoadingSpinner />
            <BigPlayButton position="center" />
          </Player>
        </div>
      </VideoRenderDiv>
    );
  }
}

