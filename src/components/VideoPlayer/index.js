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
      videoWrapperRef: null,
      videoHeight: null,
    };
  }

  componentDidMount() {
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
    // this.setVideoHeight();
  }

  setVideoHeight = () => {
    let videoHeight;
    if (this.state.videoWrapperRef) {
      videoHeight = this.state.videoWrapperRef.clientWidth / this.props.ratio;
    }
    this.setState({ videoHeight });
  }

  setVideoWrapperRef = (node) => {
    if (!this.state.videoWrapperRef) {
      this.setState({ videoWrapperRef: node }, () => {
        this.setVideoHeight();
      });
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.primarySrc !== prevState.primarySrc) {
      return {
        ...prevState,
        primarySrc: nextProps.primarySrc,
        primary: {
          thumbnail: nextProps.primaryCover,
          video: nextProps.primarySrc,
        },
        secondary: {
          thumbnail: nextProps.secondaryCover,
          video: nextProps.secondarySrc,
        },
        videoHeight: prevState.videoWrapperRef.clientWidth / nextProps.ratio,
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
    return (
      <VideoRenderDiv
        innerRef={node => this.setVideoWrapperRef(node)}
        height={`${this.state.videoHeight}px`}
      >
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
            // aspectRatio="auto"
            autoPlay={this.state.primary.video === this.props.secondarySrc || this.props.autoPlay}
            
          >
            <LoadingSpinner />
            <BigPlayButton position="center" />
          </Player>
        </div>
      </VideoRenderDiv>
    );
  }
}

