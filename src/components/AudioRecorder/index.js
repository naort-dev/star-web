import React from 'react'
import { ReactMic } from 'react-mic';
import { AudioRecorderDiv } from './styled';
import { getMobileOperatingSystem, checkMediaRecorderSupport } from '../../utils/checkOS'

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
    this.props.saveAudioRecording(this.props.audioRecorder.target, { recordedBlob, recordedUrl: recordedBlob.blobURL });
  }

  stopRecording = () => {
    this.props.stopAudioRecording();
  }

  startRecording = () => {
    this.props.startAudioRecording();
  }

  audioUploader = (target) => {
    const url = this.props.audioRecorder.file[target] ? URL.createObjectURL(this.props.audioRecorder.file[target]) : null
    return (
      <React.Fragment>
        <AudioRecorderDiv.Audio id="uploaded-audio" controls />
        <AudioRecorderDiv.UploadWrapper>
          <AudioRecorderDiv.TextButton >
            Upload Pronounication
        </AudioRecorderDiv.TextButton>
          <AudioRecorderDiv.UploadInput type="file" id={target} onChange={() => this.fileHandler(target)} accept="audio/*;capture=microphone" />
        </AudioRecorderDiv.UploadWrapper>
      </React.Fragment>
    );
  };

  fileHandler(target) {
    const file = document.getElementById(target).files[0];
    const reader = new FileReader();
    const fileURL = URL.createObjectURL(file);
    document.getElementById('uploaded-audio').src = fileURL;
    this.props.saveAudioFile({ [target]: file });
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  render() {
    const target = this.props.audioRecorder.target;
    const playbackURL = this.props.audioRecorder.recorded[target] ? this.props.audioRecorder.recorded[target].recordedUrl : null
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
            <AudioRecorderDiv.Audio id="audio-rec" src={playbackURL} controls />
            {this.props.audioRecorder.start ?
              <AudioRecorderDiv.CloseButton onClick={callbackFunction} type="button"></AudioRecorderDiv.CloseButton>
              : <AudioRecorderDiv.Button onClick={callbackFunction} type="button"></AudioRecorderDiv.Button>}
          </React.Fragment>
          :
          this.audioUploader(target)
        }
      </AudioRecorderDiv>
    );
  }
}
