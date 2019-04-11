import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkMediaRecorderSupport } from '../../utils/checkOS';

class VideoRecorder extends Component {
  constructor(props) {
    super(props);
    this.mediaRecorder = '';
    this.timerID = null;
    this.recordedBlobs = [];
    this.superBuffer = null;
    this.videoSrc = null;
    this.isStoped = false;
  }

  componentDidMount() {
    this.fetchStream();
  }

  componentWillReceiveProps(newProps) {
    if (
      this.props.shouldRecord !== newProps.shouldRecord &&
      newProps.shouldRecord
    ) {
      this.recordMedia();
    } else if (
      this.props.shouldRecord !== newProps.shouldRecord &&
      !newProps.shouldRecord &&
      !this.isStoped
    ) {
      this.stopRecording();
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
    const videoElem = document.getElementById('video-player');
    videoElem.srcObject = null;
    videoElem.src = null;
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
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
        }
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
    this.mediaRecorder.stop();
    this.closeStream();
    this.superBuffer = new Blob(this.recordedBlobs, { type: 'video/webm' });
    this.videoSrc = window.URL.createObjectURL(this.superBuffer);
    const videoElem = document.getElementById('video-player');
    videoElem.src = this.videoSrc;
    videoElem.load();
    this.isStoped = true;
  };

  storeUpdate = () => {
    if (this.props.stopRecordHandler) {
      this.props.stopRecordHandler();
    }
    this.props.updateMediaStore({
      videoSrc: this.videoSrc,
      superBuffer: this.superBuffer,
    });
  };

  closeStream = () => {
    const stream = document.getElementById('video-player').srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    document.getElementById('video-player').srcObject = null;
  };

  checkVideoOver = () => {
    if (this.props.checkPlayFinish) this.props.checkPlayFinish();
  };

  videoClick = () => {
    if (this.props.videoClick) this.props.videoClick();
  };
  render() {
    return (
      <video
        autoPlay={this.props.playPauseMedia}
        id="video-player"
        onEnded={this.checkVideoOver}
        onClick={this.videoClick}
      >
        <track kind="captions" />
      </video>
    );
  }
}

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
