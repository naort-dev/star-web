import React from 'react'
import { ReactMic } from 'react-mic';
import { AudioRecorderDiv } from './styled';
import { getMobileOperatingSystem, checkMediaRecorderSupport } from '../../utils/checkOS'
import { playerActions } from 'video-react';

export default class AudioRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: false,
      play: false,
      resume: false,
    };
    this.audio = null;
  }

  onStop = (recordedBlob) => {
    this.props.saveAudioRecording(this.props.audioRecorder.target, { recordedBlob: recordedBlob.blob, recordedUrl: recordedBlob.blobURL });
  }

  stopRecording = () => {
    this.props.stopAudioRecording();
    this.setState({ start: false})
  }

  startRecording = () => {
    this.setState({ start: true})
    this.props.startAudioRecording(this.props.target);
  }

  deleteRecording(target) {
    this.props.resetRecording(target);
  }

  playRecording(target) {
    this.url = this.props.audioRecorder.recorded[target].recordedUrl
    this.audio = new Audio(this.url);
    this.audio.play();
    this.setState({ play: true})
  }

  toggleMic(callbackFunction) {
    if(this.props.audioRecorder.start[this.props.target]){
     return (
      <AudioRecorderDiv.RippleButton onClick={callbackFunction} type="button"></AudioRecorderDiv.RippleButton>
     )
    }
    else {
      return (
        <AudioRecorderDiv.Button onClick={callbackFunction} type="button"></AudioRecorderDiv.Button>
      )
    }
  }

  pauseRecording() {
    this.audio.pause();
    this.setState({ play: false, resume: true});
  }

  render() {
    const target = this.props.target
    const callbackFunction = this.props.audioRecorder.start[target] ? this.stopRecording : this.startRecording
    return (
      <AudioRecorderDiv>
        {checkMediaRecorderSupport() ?
          <React.Fragment>
            <div style={{ display: "none" }}>
              <ReactMic
                id="react-mic"
                record={this.props.audioRecorder.start[target] ? this.props.audioRecorder.start[target] : false}
                className="sound-wave"
                onStop={this.onStop}
                strokeColor="white"
                backgroundColor="#FF6C58"
                save={this.props.audioRecorder.stop}
              />
            </div>
            <AudioRecorderDiv.ControlWrapper>
              {this.toggleMic(callbackFunction)}
              { (this.props.audioRecorder.recorded[target] && this.props.audioRecorder.recorded[target].recordedBlob) && !this.state.start  ?
                <React.Fragment>
                  {!this.state.play ? 
                  <AudioRecorderDiv.PlayButton onClick={() => this.playRecording(target)} />
                  : 
                  <AudioRecorderDiv.PauseButton onClick={() => this.pauseRecording()} />
                  }
                   <AudioRecorderDiv.CloseButton onClick={() => this.deleteRecording(target)} />
                   </React.Fragment> : 
              null}
            </AudioRecorderDiv.ControlWrapper>

          </React.Fragment>
          :
          null
        }
      </AudioRecorderDiv>
    );
  }
}
