import React from 'react';
import { Player, BigPlayButton, LoadingSpinner, ControlBar } from 'video-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { CheckInViewport } from '../../utils/domUtils';
import './video';
import VideoRenderDiv from './styled';

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      primarySrc: props.primarySrc,
      primary: {
        thumbnail: props.primaryCover,
        video: props.primarySrc,
      },
      secondary: {
        thumbnail: props.secondaryCover,
        video: props.secondarySrc,
      },
      videoWrapperRef: null,
      videoHeight: null,
      isPlaying: false,
    };
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.checkInViewPort();
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
    window.addEventListener('scroll', this.checkInViewPort);
  }

  componentDidUpdate(prevProps) {
    if (this.props.pauseVideo !== prevProps.pauseVideo && this.props.pauseVideo) {
      this.player.pause();
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    let { videoHeight } = prevState;
    if (nextProps.ratio && prevState.videoWrapperRef) {
      videoHeight = prevState.videoWrapperRef.clientWidth / nextProps.ratio;
    }
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
        videoHeight,
      };
    }
    return null;
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkInViewPort);
  }

  checkInViewPort = () => {
    const videoElement = this.videoRef.current;
    const { player } = this.player.getState();
    const visible = CheckInViewport(videoElement);
    if (
      visible &&
      player.paused
    ) {
      this.toggleVideoPlay();
    }
  }

  pauseAllVideos = () => {
    const videoElements = Array.prototype.slice.call(document.getElementsByTagName('video'));
    videoElements.forEach((video) => {
      video.pause();
    });
  }

  toggleVideoPlay = () => {
    const { player } = this.player.getState();
    this.pauseAllVideos();
    if (player.paused) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }

  handleStateChange = (state, prevState) => {
    if (state.ended && this.state.primary.video === this.props.primarySrc && this.state.secondary.video) {
      this.swapVideos();
    } else if (prevState.ended !== state.ended && state.ended && this.state.primary.video === this.props.secondarySrc) {
      if (this.props.onVideoEnded) {
        this.props.onVideoEnded();
      }
    } else if (prevState.ended !== state.ended && state.ended && this.state.primary.video === this.props.primarySrc && !this.state.secondary.video) {
      if (this.props.onVideoEnded) {
        this.props.onVideoEnded();
      }
    }
    if (prevState.hasStarted !== state.hasStarted && state.hasStarted && this.props.onVideoStart) {
      this.props.onVideoStart();
    }
    this.setState({
      isPlaying: !state.paused,
    });
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
    }, () => {
      this.player.play();
    });
    setTimeout(() => this.setState({ primary, secondary, fullScreen: false }), 500);
  }

  render() {
    const { props } = this;
    const { isPlaying } = this.state;
    return (
      <VideoRenderDiv
        onClick={this.toggleVideoPlay}
        innerRef={this.videoRef}
      >
        {this.state.secondary.thumbnail && <VideoRenderDiv.answerVideo
          onClick={this.swapVideos}
          src={this.state.secondary.thumbnail}
          fullScreen={this.state.fullScreen}
        />}
        <div className="player">
          <Player
            playsInline
            ref={player => this.player = player}
            poster={this.state.primary.thumbnail}
            src={this.state.primary.video}
            fluid
            {...this.props}
          >
            <LoadingSpinner />
            <ControlBar autoHide={false} disabled={!props.controls} />
            <BigPlayButton position="center-bottom" disabled />
          </Player>
          <VideoRenderDiv.ControlIconWrapper>
            <VideoRenderDiv.ControlIcon>
              <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
            </VideoRenderDiv.ControlIcon>
          </VideoRenderDiv.ControlIconWrapper>
        </div>
      </VideoRenderDiv>
    );
  }
}

