import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { faMicrophone } from '@fortawesome/pro-solid-svg-icons';
import { AudioRecorderDiv } from './styled';
import { checkMediaRecorderSupport } from '../../utils/checkOS';
import { audioRecordHandler } from '../../store/shared/actions/commonActions';

class AudioRecorder extends React.Component {
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
    this.props.audioRecordHandler({ recording: false, playing: false });
  }

  stopRecording = () => {
    this.setState({ stop: true, start: false, status: 'completed' });
    this.props.audioRecordHandler({ recording: false, playing: false });
  };

  startRecording = () => {
    if (!this.props.audioFlags.recording && !this.props.audioFlags.playing) {
      this.setState({ start: true, stop: false, active: true });
      this.props.audioRecordHandler({ recording: true, playing: false });
    }
  };

  deleteRecording(target) {
    this.props.resetRecording(target);
  }

  playRecording(target) {
    if (!this.props.audioFlags.recording && !this.props.audioFlags.playing) {
      this.url = this.props.audioRecorder.recorded[target].recordedUrl;
      this.audio.src = this.url;
      this.audio.play();
      this.setState({ play: true });
      this.props.audioRecordHandler({ recording: false, playing: true });
    }
  }

  pauseRecording() {
    this.audio.pause();
    this.setState({ play: false });
    this.props.audioRecordHandler({ recording: false, playing: false });
  }

  saveRecording(recordedBlob) {
    this.setState({ active: false });
    this.props.saveAudioRecording(this.user, {
      recordedBlob: recordedBlob.blob,
      recordedUrl: recordedBlob.blobURL,
    });
  }

  handleRecorder = () => {
    this.state.start ? this.stopRecording() : this.startRecording();
  };

  reRecording(target) {
    this.deleteRecording(target);
  }
  renderAudio = target => {
    const audio = this.props.audioRecorder.recorded;
    if (checkMediaRecorderSupport()) {
      return (
        <React.Fragment>
          {/* {this.state.start && <Ripple onClick={this.handleRecorder} />} */}
          {this.state.active && this.ReactMic && (
            <div style={{ display: 'none' }}>
              <this.ReactMic
                record={this.state.start}
                onStop={this.saveRecording}
                strokeColor="white"
                backgroundColor="#2e819b"
                save={this.state.stop && this.state.status === 'completed'}
              />
            </div>
          )}
          <AudioRecorderDiv.ControlWrapper
            className={this.state.start && 'recording'}
            recording={
              this.props.audioFlags.playing || this.props.audioFlags.recording
            }
          >
            {(audio[target] && audio[target].recordedBlob) ||
            (audio[target] && audio[target].recordedUrl) ? (
              <React.Fragment>
                {!this.state.play || this.audio.ended ? (
                  <React.Fragment>
                    <AudioRecorderDiv.PlayButton
                      onClick={() => this.playRecording(target)}
                      playing={
                        this.props.audioFlags.playing ||
                        this.props.audioFlags.recording
                      }
                    >
                      Play Back
                    </AudioRecorderDiv.PlayButton>
                    |
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <AudioRecorderDiv.PauseButton
                      onClick={() => this.pauseRecording()}
                    >
                      Stop
                    </AudioRecorderDiv.PauseButton>
                    |
                  </React.Fragment>
                )}
                <AudioRecorderDiv.Rerecord
                  onClick={() => this.reRecording(target)}
                  recording={
                    this.props.audioFlags.playing ||
                    this.props.audioFlags.recording
                  }
                >
                  Record
                </AudioRecorderDiv.Rerecord>{' '}
                |
                <AudioRecorderDiv.CloseButton
                  onClick={() => this.deleteRecording(target)}
                >
                  Delete
                </AudioRecorderDiv.CloseButton>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {this.state.start ? (
                  <span
                    className="voice-progress"
                    onClick={this.handleRecorder}
                    role="presentation"
                  ></span>
                ) : (
                  <div
                    onClick={this.handleRecorder}
                    type="button"
                    role="presentation"
                  >
                    <AudioRecorderDiv.Icon
                      icon={faMicrophone}
                      recording={
                        this.props.audioFlags.playing ||
                        this.props.audioFlags.recording
                      }
                    />
                  </div>
                )}
              </React.Fragment>
            )}

            {!this.state.start &&
              !(audio[target] && audio[target].recordedUrl) && (
                <span
                  className="recText"
                  onClick={this.handleRecorder}
                  role="presentation"
                >
                  Pronounce Name
                </span>
              )}
            {this.state.start && (
              <AudioRecorderDiv.PauseButton
                onClick={() => this.handleRecorder()}
              >
                Stop Recording
              </AudioRecorderDiv.PauseButton>
            )}
          </AudioRecorderDiv.ControlWrapper>
        </React.Fragment>
      );
    }

    return null;
  };

  render() {
    const target = this.user;

    return (
      <AudioRecorderDiv
        recorded={
          this.props.audioRecorder.recorded[target] &&
          this.props.audioRecorder.recorded[target].recordedUrl
        }
      >
        {this.renderAudio(target)}
      </AudioRecorderDiv>
    );
  }
}

AudioRecorder.propTypes = {
  audioFlags: PropTypes.object,
  audioRecordHandler: PropTypes.func.isRequired,
  audioRecorder: PropTypes.object,
  saveAudioRecording: PropTypes.func,
  resetRecording: PropTypes.func,
};

AudioRecorder.defaultProps = {
  audioFlags: {},
  audioRecorder: {},
  saveAudioRecording: () => {},
  resetRecording: () => {},
};

const mapStateToProps = state => ({
  audioFlags: state.commonReducer.audioFlags,
});

function mapDispatchToProps(dispatch) {
  return {
    audioRecordHandler: audioFlags => {
      dispatch(audioRecordHandler(audioFlags));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AudioRecorder);
