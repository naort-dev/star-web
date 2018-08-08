import React from 'react'
import { ReactMic } from 'react-mic';
import { AudioRecorderDiv } from './styled';
import { getMobileOperatingSystem, checkMediaRecorderSupport } from '../../utils/checkOS'
import { playerActions } from 'video-react';

export default class AudioRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      recordedBlob: null,
      save: false,
    };
  }

  onStop = (recordedBlob) => {
    this.props.saveAudioRecording(this.props.audioRecorder.target, { recordedBlob: recordedBlob.blob, recordedUrl: recordedBlob.blobURL });
  }

  stopRecording = () => {
    this.props.stopAudioRecording();
  }

  startRecording = () => {
    this.props.startAudioRecording();
  }

  render() {
 
    const target = this.props.audioRecorder.target;
    const playbackURL = this.props.audioRecorder.recorded[target] != null ? this.props.audioRecorder.recorded[target].recordedUrl : null
    const callbackFunction = this.props.audioRecorder.start ? this.stopRecording : this.startRecording

    return (
      <AudioRecorderDiv>
        {checkMediaRecorderSupport() && this.props.audioRecorder.showRecorder ?
          <React.Fragment>
            <AudioRecorderDiv.Label>{this.props.audioRecorder.label}</AudioRecorderDiv.Label>
            <ReactMic
              id="react-mic"
              record={this.props.audioRecorder.start ? this.props.audioRecorder.start : false}
              className="sound-wave"
              onStop={this.onStop}
              strokeColor="white"
              backgroundColor="#FF6C58"
              save={this.props.audioRecorder.stop}
            />
            <AudioRecorderDiv.Audio id="audio-rec" src={playbackURL} controls controlsList="nodownload" />
            {this.props.audioRecorder.start ?
              <AudioRecorderDiv.CloseButton onClick={callbackFunction} type="button"></AudioRecorderDiv.CloseButton>
              : <AudioRecorderDiv.Button onClick={callbackFunction} type="button"></AudioRecorderDiv.Button>}
          </React.Fragment>
          :
          null 
        }
      </AudioRecorderDiv>
    );
  }
}
