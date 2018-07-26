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
    this.props.saveAudioRecording(recordedBlob.blobURL);
  }

  stopRecording = () => {
    this.props.stopAudioRecording();
  }

  startRecording = () => {
    this.props.startAudioRecording();
  }

  render() {
    console.log("props", this.props)
    const func = this.props.audioRecorder.start ? this.stopRecording : this.startRecording
    return (
      <AudioRecorderDiv>
        {checkMediaRecorderSupport() ?
          <React.Fragment>
            <AudioRecorderDiv.Label>{this.props.audioRecorder.label}</AudioRecorderDiv.Label>
            <ReactMic
              record={this.props.audioRecorder.start ? this.props.audioRecorder.start : false}
              className="sound-wave"
              onStop={this.onStop}
              strokeColor="white"
              backgroundColor="#FF6C58"
              save={this.props.audioRecorder.stop}
            />
            <audio src={this.props.audioRecorder.recordedBlob} controls />
            <AudioRecorderDiv.Button onClick={func} type="button"></AudioRecorderDiv.Button>
          </React.Fragment>
          :
          <React.Fragment>
            <audio controls/>
              <button onClick={() => { }}> Upload Pronounciation </button> 
        </React.Fragment>
            }
      </AudioRecorderDiv>
    );
      }
    }
