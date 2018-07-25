import React from 'react'
import { ReactMic } from 'react-mic';
import { AudioRecorderDiv } from './styled';

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
    this.props.saveAudioRecording(recordedBlob.blobURL);
  }

  stopRecording = () => {
    this.props.stopAudioRecording();
  }

  startRecording = () => {
    this.props.startAudioRecording();
  }

  render() {
    console.log("this", this.reactMic)
    const func = this.props.audioRecorder.start ? this.stopRecording : this.startRecording
    const buttonText = this.props.audioRecorder.start ? "Stop" : "Start"
    return (
      <AudioRecorderDiv>
        <React.Fragment>
          <ReactMic
            record={this.props.audioRecorder.start ? this.props.audioRecorder.start : false}
            className="sound-wave"
            onStop={this.onStop}
            strokeColor="white"
            backgroundColor="#FF6C58"
            save={this.props.audioRecorder.stop}
          />
          <audio style={{height}} src={this.props.audioRecorder.recordedBlob} controls />
          <AudioRecorderDiv.Button onClick={func} type="button">{buttonText}</AudioRecorderDiv.Button>
        </React.Fragment>
      </AudioRecorderDiv>
    );
  }
}
