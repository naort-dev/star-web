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
    this.mediaRecorder = '';
    this.timerID = null;
    this.recordedBlobs = [];
    this.superBuffer = null;
    this.videoSrc = null;
    this.isStoped = false;
    this.state = { progress: false, mediaControls: false };
  }

  componentDidMount() {
    this.fetchStream();
  }

  componentWillReceiveProps(newProps) {
    if (checkMediaRecorderSupport()) {
      if (
        this.props.shouldRecord !== newProps.shouldRecord &&
        newProps.shouldRecord
      ) {
        this.recordMedia();
        this.setState({ progress: true, mediaControls: false });
      } else if (
        this.props.shouldRecord !== newProps.shouldRecord &&
        !newProps.shouldRecord &&
        !this.isStoped
      ) {
        this.stopRecording();
      }
    }
  }

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
    const videoElem = document.getElementById('video-player_tag');
    videoElem.srcObject = null;
    videoElem.src = null;
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        this.setState({ progress: false });
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
            this.stopRecording();
            this.storeUpdate();
          }, this.props.duration);
        } catch (e) {
          this.setState({ error: true });
          if (this.props.errorHandler) this.props.errorHandler();
        }
      })
      .catch((error) => {
        this.setState({ progress: false });
        if (this.props.errorHandler) this.props.errorHandler();
      });
  };

  handleDataAvailable = (event) => {
    if (event.data && event.data.size > 0) {
      this.recordedBlobs.push(event.data);
    }
  };

  stopRecording = () => {
    if (this.timerID != null) {
      clearTimeout(this.timerID);
    }
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
    }
    this.closeStream();
    this.superBuffer = new Blob(this.recordedBlobs, { type: 'video/webm' });
    this.videoSrc = window.URL.createObjectURL(this.superBuffer);
    this.props.updateMediaStore({
      videoSrc: this.videoSrc,
      superBuffer: this.superBuffer,
    });
    const videoElem = document.getElementById('video-player_tag');
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
    const stream = document.getElementById('video-player_tag').srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    }
    document.getElementById('video-player_tag').srcObject = null;
  };

  checkVideoOver = () => {
    this.setState({ mediaControls: true });
    this.props.playPauseMediaAction();
  };

  videoClick = () => {
    this.setState({ mediaControls: true });
    document.getElementById('video-player_tag').pause();
    this.props.playPauseMediaAction();
  };

  playPauseClick = (event) => {
    event.stopPropagation();
    this.props.playPauseMediaAction();
    document.getElementById('video-player_tag').play();
    this.setState({ mediaControls: false });
  };

  retryRecordHandler = () => {
    if (this.props.retryRecordHandler) {
      this.props.retryRecordHandler();
    }
    this.props.recordTrigger();
    this.props.playPauseMediaAction();
    this.setState({ mediaControls: false });
  };

  render() {
    return (
      <React.Fragment>
        <video
          autoPlay={this.props.playPauseMedia}
          id="video-player_tag"
          onEnded={this.checkVideoOver}
          onClick={this.videoClick}
        />
        {this.state.progress && <Progress />}

        {this.state.mediaControls && (
          <React.Fragment>
            <PlayButton className="playButton" onClick={this.playPauseClick}>
              <FontAwesomeIcon icon={faPlay} />
            </PlayButton>
            <Button className="retry" onClick={this.retryRecordHandler}>
              Try Again
            </Button>
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
};

VideoRecorder.defaultProps = {
  errorHandler: () => {},
  stopRecordHandler: () => {},
};

function mapStateToProps(state) {
  return {
    shouldRecord: state.commonReducer.shouldRecord,
    playPauseMedia: state.commonReducer.playPauseMedia,
  };
}

export default connect(
  mapStateToProps,
  null,
)(VideoRecorder);
