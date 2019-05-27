import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { checkMediaRecorderSupport } from '../../utils/checkOS';
import { Progress } from './styled';
import { PlayButton } from '../../styles/CommonStyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Button from '../PrimaryButton';

class VideoRecorder extends Component {
  constructor(props) {
    super(props);
    this.mounted = true;
    this.mediaRecorder = '';
    this.timerID = null;
    this.recordedBlobs = [];
    this.superBuffer = null;
    this.videoSrc = null;
    this.isStoped = false;
    this.recordingDate = null;
    this.state = {
      progress: false,
      mediaControls: false,
      remainingTime: {
        minutes: 0,
        seconds: 0,
      },
      recordedTime: {
        minutes: 0,
        seconds: 0,
      },
    };
  }

  componentDidMount() {
    this.fetchStream();
    if (this.props.videoSrc) {
      this.initialLoad();
    }
  }

  componentDidUpdate(prevProps) {
    if (checkMediaRecorderSupport()) {
      if (
        this.props.shouldRecord !== prevProps.shouldRecord &&
        this.props.shouldRecord
      ) {
        this.recordMedia();
        this.setState({ progress: true, mediaControls: false });
      } else if (
        this.props.shouldRecord !== prevProps.shouldRecord &&
        !this.props.shouldRecord &&
        !this.isStoped &&
        this.props.forceStop
      ) {
        this.setState({
          recordingTime: {
            minutes: 0,
            seconds: 0,
          },
        });
        this.stopRecording();
      }
    }

    if (this.props.videoSrc && this.props.videoSrc !== prevProps.videoSrc) {
      this.initialLoad();
    }
  }

  componentWillUnmount() {
    if (this.props.shouldRecord) this.props.recordTrigger();
    if (this.props.playPauseMedia) this.props.playPauseMediaAction();
    this.closeStream();
  }

  initialLoad = () => {
    this.videoSrc = this.props.videoSrc;
    this.setState({ mediaControls: true });
    const videoElem = this.video;
    videoElem.src = this.videoSrc;
    videoElem.load();
  };

  fetchStream = () => {
    if (checkMediaRecorderSupport()) {
      //check
    }
  };

  recordMedia = () => {
    this.isStoped = false;
    this.superBuffer = null;
    this.videoSrc = null;
    this.recordedBlobs = [];
    const videoElem = this.video;
    videoElem.srcObject = null;
    videoElem.src = null;
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then(stream => {
        if (this.mounted) {
          this.setState({ progress: false });
        }
        if (this.props.startStreamingCallback) {
          this.props.startStreamingCallback();
        }
        videoElem.srcObject = stream;
        const options = {
          mimeType: 'video/webm;codecs=vp8',
          audioBitsPerSecond: 128000,
          videoBitsPerSecond: 128000,
          bitsPerSecond: 128000,
        };
        try {
          this.recordingDate = new Date();
          this.mediaRecorder = new MediaRecorder(stream, options);
          this.mediaRecorder.ondataavailable = this.handleDataAvailable;
          this.mediaRecorder.start(100);
          this.timerID = setTimeout(() => {
            if (this.mounted) {
              this.stopRecording();
              this.storeUpdate();
            }
          }, this.props.duration);
        } catch (e) {
          if (this.mounted) {
            if (this.props.errorHandler) this.props.errorHandler();
          }
        }
      })
      .catch(() => {
        if (this.mounted) {
          this.setState({ progress: false });
          if (this.props.errorHandler) this.props.errorHandler();
        }
      });
  };

  handleDataAvailable = event => {
    if (event.data && event.data.size > 0) {
      let { remainingTime, recordedTime } = this.state;
      const finalTime = this.recordingDate.getTime() + this.props.duration;
      const recordingTime = this.recordingDate.getTime();
      const currentTime = new Date().getTime();
      const remainingSeconds = parseInt((finalTime - currentTime) / 1000) % 60;
      const remainingMinutes =
        parseInt((finalTime - currentTime) / (1000 * 60)) % 60;
      const recordedSeconds =
        parseInt((currentTime - recordingTime) / 1000) % 60;
      const recordedMinutes =
        parseInt((currentTime - recordingTime) / (1000 * 60)) % 60;
      remainingTime = {
        ...remainingTime,
        minutes: remainingMinutes,
        seconds: remainingSeconds,
      };
      recordedTime = {
        ...recordedTime,
        minutes: recordedMinutes,
        seconds: recordedSeconds,
      };
      this.setState({ remainingTime, recordedTime });
      const remainingTimeString = `${
        remainingTime.minutes > 9
          ? remainingTime.minutes
          : `0${remainingTime.minutes}`
      } : ${
        remainingTime.seconds > 9
          ? remainingTime.seconds
          : `0${remainingTime.seconds}`
      }`;
      // const recordedTimeString = `${recordedTime.minutes > 9 ? recordedTime.minutes : `0${recordedTime.minutes}`} : ${recordedTime.seconds > 9 ? recordedTime.seconds : `0${recordedTime.seconds}`}`;
      if (this.props.getRecordTime) {
        this.props.getRecordTime(remainingTimeString);
      }
      this.recordedBlobs.push(event.data);
    }
  };

  stopRecording = () => {
    let { recordedTime } = this.state;
    if (this.timerID != null) {
      clearTimeout(this.timerID);
    }
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
    }
    this.closeStream();
    this.superBuffer = new Blob(this.recordedBlobs, { type: 'video/webm' });
    this.videoSrc = window.URL.createObjectURL(this.superBuffer);
    const recordedTimeString = `${
      recordedTime.minutes > 9
        ? recordedTime.minutes
        : `0${recordedTime.minutes}`
    } : ${
      recordedTime.seconds > 9
        ? recordedTime.seconds
        : `0${recordedTime.seconds}`
    }`;
    this.props.updateMediaStore({
      videoSrc: this.videoSrc,
      superBuffer: this.superBuffer,
      recordedTime: recordedTimeString,
      recorded: true,
    });
    const videoElem = this.video;
    videoElem.src = this.videoSrc;
    videoElem.load();
    this.isStoped = true;
    this.setState({ mediaControls: true });
  };

  storeUpdate = () => {
    if (this.props.stopRecordHandler) {
      this.props.stopRecordHandler();
    }
  };

  closeStream = () => {
    const stream = this.video.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => {
        track.stop();
      });
    }
    this.video.srcObject = null;
  };

  checkVideoOver = () => {
    this.setState({ mediaControls: true });
    this.props.playPauseMediaAction();
  };

  videoClick = () => {
    if (!this.props.shouldRecord && this.props.videoSrc !== null) {
      this.setState({ mediaControls: true });
      this.video.pause();
      this.props.playPauseMediaAction();
    }
  };

  playPauseClick = event => {
    event.stopPropagation();
    this.props.playPauseMediaAction();
    this.video.play();
    this.setState({ mediaControls: false });
  };

  retryRecordHandler = () => {
    if (this.props.retryRecordHandler) {
      this.props.retryRecordHandler();
    }
    if (this.props.headerUpdate) {
      this.props.headerUpdate(`Ask ${this.props.starNM} something!`);
    }
    this.props.recordTrigger();
    this.props.playPauseMediaAction();
    this.setState({ mediaControls: false });
  };
  getRetryBtn = () => {
    if (this.props.uploader && !this.props.recorded) {
      return (
        <label id="upload" htmlFor="fileUpload" className="retry uploadBtn">
          <input
            type="file"
            id="fileUpload"
            className="hidden"
            accept="video/*"
            onChange={this.props.uploadHandler}
          />
          Upload different video
        </label>
      );
    }
    return (
      <Button className="retry" onClick={this.retryRecordHandler}>
        Try Again
      </Button>
    );
  };

  render() {
    return (
      <React.Fragment>
        <video
          ref={video => {
            this.video = video;
          }}
          autoPlay={this.props.playPauseMedia}
          id="video-player_tag"
          onEnded={this.checkVideoOver}
          onClick={this.videoClick}
          muted={this.props.shouldRecord}
          className="videoElm"
        >
          <track kind="captions" />
        </video>
        {this.state.progress && <Progress />}

        {this.state.mediaControls && (
          <React.Fragment>
            <PlayButton className="playButton" onClick={this.playPauseClick}>
              <FontAwesomeIcon icon={faPlay} />
            </PlayButton>
            {this.getRetryBtn()}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

VideoRecorder.propTypes = {
  shouldRecord: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
  errorHandler: PropTypes.func,
  updateMediaStore: PropTypes.func.isRequired,
  stopRecordHandler: PropTypes.func,
  playPauseMediaAction: PropTypes.func.isRequired,
  retryRecordHandler: PropTypes.func.isRequired,
  recordTrigger: PropTypes.func.isRequired,
  playPauseMedia: PropTypes.bool.isRequired,
  forceStop: PropTypes.bool.isRequired,
  videoSrc: PropTypes.string,
  startStreamingCallback: PropTypes.func,
  getRecordTime: PropTypes.func,
  headerUpdate: PropTypes.func,
  starNM: PropTypes.string,
  uploadHandler: PropTypes.func,
  recorded: PropTypes.bool,
  uploader: PropTypes.bool,
};

VideoRecorder.defaultProps = {
  errorHandler: () => {},
  stopRecordHandler: () => {},
  videoSrc: '',
  getRecordTime: () => {},
  startStreamingCallback: () => {},
  headerUpdate: () => {},
  starNM: '',
  uploadHandler: () => {},
  recorded: false,
  uploader: false,
};

function mapStateToProps(state) {
  return {
    shouldRecord: state.commonReducer.shouldRecord,
    playPauseMedia: state.commonReducer.playPauseMedia,
    videoSrc: state.commonReducer.videoSrc,
  };
}

export default connect(
  mapStateToProps,
  null,
)(VideoRecorder);
