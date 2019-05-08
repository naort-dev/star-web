import React from 'react';
// import { ReactMic } from 'react-mic';
import { faMicrophone } from '@fortawesome/pro-solid-svg-icons';
import { AudioRecorderDiv, Ripple } from './styled';
import { checkMediaRecorderSupport } from '../../utils/checkOS';

export default class AudioRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      start: false,
      stop: true,
      status: null,
      active: false,
    };
    this.audio = new Audio();
    this.user = props.target;
    this.onAudioEnded = this.onAudioEnded.bind(this);
    this.saveRecording = this.saveRecording.bind(this);
  }

  componentWillMount() {
    if (
      !window.navigator.userAgent.indexOf('MSIE ') > -1 ||
      window.navigator.userAgent.indexOf('Trident/') > -1
    ) {
      const { ReactMic } = require('react-mic');
      this.ReactMic = ReactMic;
    }
  }

  componentDidMount() {
    this.audio.addEventListener('ended', this.onAudioEnded);
  }

  onAudioEnded() {
    this.setState({ play: false });
  }

  stopRecording = () => {
    this.setState({ stop: true, start: false, status: 'completed' });
  };

  startRecording = () => {
    this.setState({ start: true, stop: false, active: true });
  };

  deleteRecording(target) {
    this.props.resetRecording(target);
  }

  playRecording(target) {
    this.url = this.props.audioRecorder.recorded[target].recordedUrl;
    this.audio.src = this.url;
    this.audio.play();
    this.setState({ play: true });
  }

  pauseRecording() {
    this.audio.pause();
    this.setState({ play: false });
  }

  saveRecording(recordedBlob) {
    this.setState({ active: false });
    this.props.saveAudioRecording(this.user, {
      recordedBlob: recordedBlob.blob,
      recordedUrl: recordedBlob.blobURL,
    });
  }

  handleRecorder() {
    this.state.start ? this.stopRecording() : this.startRecording();
  }

  reRecording(target) {
    this.deleteRecording(target);
  }
  renderAudio = target => {
    if (checkMediaRecorderSupport()) {
      return (
        <React.Fragment>
          {this.state.active && this.ReactMic && (
            <Ripple>
              <div style={{ display: 'none' }}>
                <this.ReactMic
                  record={this.state.start}
                  onStop={this.saveRecording}
                  className="dfsdfsd"
                  strokeColor="white"
                  backgroundColor="#2e819b"
                  save={this.state.stop && this.state.status == 'completed'}
                />
              </div>
            </Ripple>
          )}
          <AudioRecorderDiv.ControlWrapper>
            {(this.props.audioRecorder.recorded[target] &&
              this.props.audioRecorder.recorded[target].recordedBlob) ||
            (this.props.audioRecorder.recorded[target] &&
              this.props.audioRecorder.recorded[target].recordedUrl) ? (
              <React.Fragment>
                {!this.state.play || this.audio.ended ? (
                  <AudioRecorderDiv.PlayButton
                    onClick={() => this.playRecording(target)}
                  >
                    {' '}
                    Play Back
                  </AudioRecorderDiv.PlayButton>
                ) : (
                  <AudioRecorderDiv.PauseButton
                    onClick={() => this.pauseRecording()}
                  >
                    {' '}
                    Record{' '}
                  </AudioRecorderDiv.PauseButton>
                )}
                <AudioRecorderDiv.Rerecord
                  onClick={() => this.reRecording(target)}
                >
                  {' '}
                  Record{' '}
                </AudioRecorderDiv.Rerecord>
                <AudioRecorderDiv.CloseButton
                  onClick={() => this.deleteRecording(target)}
                >
                  Delete
                </AudioRecorderDiv.CloseButton>
              </React.Fragment>
            ) : (
              <AudioRecorderDiv.Button
                onClick={() => this.handleRecorder()}
                type="button"
              >
                <AudioRecorderDiv.Icon icon={faMicrophone} />
              </AudioRecorderDiv.Button>
            )}
          </AudioRecorderDiv.ControlWrapper>
        </React.Fragment>
      );
    }

    return null;
  };

  render() {
    const target = this.user;
    return <AudioRecorderDiv>{this.renderAudio(target)}</AudioRecorderDiv>;
  }
}
