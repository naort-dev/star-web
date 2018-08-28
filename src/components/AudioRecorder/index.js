import React from 'react'
import { ReactMic } from 'react-mic';
import { AudioRecorderDiv } from './styled';
import { checkMediaRecorderSupport } from '../../utils/checkOS'

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
    this.saveRecording = this.saveRecording.bind(this)
  }

  componentDidMount() {
    this.audio.addEventListener('ended', this.onAudioEnded);
  }

  onAudioEnded() {
    this.setState({ play: false });
  }

  stopRecording = () => {
    this.setState({ stop: true, start: false, status: 'completed' })
  }

  startRecording = () => {
    this.setState({ start: true, stop: false, active: true });
  }

  deleteRecording(target) {
    this.props.resetRecording(target);
  }

  playRecording(target) {
    this.url = this.props.audioRecorder.recorded[target].recordedUrl
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
    this.props.saveAudioRecording(this.user, { recordedBlob: recordedBlob.blob, recordedUrl: recordedBlob.blobURL });
  }

  renderAudio = (target) => {
    if (checkMediaRecorderSupport()) {
      return (
        <React.Fragment>
          {
            this.state.active &&
            <div style={{ display: 'none' }}>
              <ReactMic
                record={this.state.start}
                className="sound-wave"
                onStop={this.saveRecording}
                strokeColor="white"
                backgroundColor="#FF6C58"
                save={this.state.stop && this.state.status == 'completed'}
              />
            </div>
          }
          <AudioRecorderDiv.ControlWrapper>
            {this.state.start ?

              <AudioRecorderDiv.RippleButton onClick={() => this.stopRecording()} type="button" />

              :
              <AudioRecorderDiv.Button onClick={() => this.startRecording()} type="button" />

            }
            {(this.props.audioRecorder.recorded[target] && this.props.audioRecorder.recorded[target].recordedBlob) || (this.props.audioRecorder.recorded[target] && this.props.audioRecorder.recorded[target].recordedUrl) ?
              <React.Fragment>
                {!this.state.play || this.audio.ended ?
                  <AudioRecorderDiv.PlayButton onClick={() => this.playRecording(target)} />
                  :
                  <AudioRecorderDiv.PauseButton onClick={() => this.pauseRecording()} />
                }
                <AudioRecorderDiv.CloseButton onClick={() => this.deleteRecording(target)} />
              </React.Fragment> :
              null}
          </AudioRecorderDiv.ControlWrapper>

        </React.Fragment>
      );
    }
     
    return null;
  }

  render() {
    const target = this.user;
    return (
      <AudioRecorderDiv>
        {this.renderAudio(target)}
      </AudioRecorderDiv>
    );
  }
}
