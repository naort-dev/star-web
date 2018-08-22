import React from 'react';
import VideoRecorderDiv from './styled';
import { getMobileOperatingSystem, checkMediaRecorderSupport } from '../../utils/checkOS';
import VideoPlayer from '../VideoPlayer';
import Loader from '../Loader';

export default class QAVideoRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streamed: null,
      error: null,
      startUpload: false,
      browserSupport: false,
      play: false,
      deviceSupport: true,
    };
    this.mediaRecorder = "";
    this.recordedBlobs = [];
    this.handleDataAvailable = this.handleDataAvailable.bind(this);
    this.stopRecording = this.stopRecording.bind(this)
    this.timerID = null;
    this.stream = null;
  }

  componentDidMount() {
      this.fetchStream();
  }

  fetchStream() {
    if (checkMediaRecorderSupport() && !getMobileOperatingSystem()) {
      if (!this.props.videoRecorder.recordedBlob || this.props.videoUploader.savedFile) {
        this.setState({ streamed: false})
        return window.navigator.mediaDevices.getUserMedia({ audio: true, video: true })
          .then(stream => {
            window.stream = stream
            if(!this.props.src){
              this.setState({ streamed: true }, () =>  document.getElementById('video-player').srcObject = window.stream)
            }
            else {
            this.setState({ streamed: true })
            }
          })
          .catch((err) => {
            console.log
            this.setState({ deviceSupport: false, streamed: true });
          });
      }
    }
  }


  componentWillUnmount() {
    if (!getMobileOperatingSystem() && checkMediaRecorderSupport()) {
      if (!this.props.videoRecorder.recordedBlob && this.props.videoRecorder.start) {
        this.closeStream();
        this.props.onClearStreams();
        window.stream = null;
      }
    }
  }

  handleDataAvailable(event) {
    if (event.data && event.data.size > 0) {
      this.recordedBlobs.push(event.data);
    }
  }

  captureUserMedia(mediaConstraints) {
    return window.navigator.mediaDevices.getUserMedia(mediaConstraints)
      .then(stream => this.successCallback(stream))
      .catch(() => {
        this.setState({ browserSupport: false });
      });
  }

  successCallback(stream) {
    this.setState({ stream });
  }

  stopRecording() {
    if (this.timerID != null) {
      clearTimeout(this.timerID);
    }
    const superBuffer = new Blob(this.recordedBlobs, { type: 'video/webm' });
    const videoSrc = window.URL.createObjectURL(superBuffer);
    this.props.onStopRecording({ videoSrc, superBuffer });
    this.mediaRecorder.stop();
    this.closeStream();
  }

  closeStream() {
    const stream = document.getElementById('video-player').srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    document.getElementById('video-player').srcObject = null;
  }

  fileUpload() {
    this.props.onClearStreams();
    this.setState({ extensionError: false, play: false });
    const file = document.getElementById('default-uploader').files[0];
    const reader = new FileReader();
    const allowedExtensions = /((\.mp4)|(\.MOV))$/i;
    if (!allowedExtensions.exec(document.getElementById('default-uploader').value)) {
      this.setState({ extensionError: true });
    }

    else {
      const fileURL = URL.createObjectURL(file);
      this.setState({ play: true, src: fileURL });
      this.props.onSaveVideo({ videoFile: file, url: fileURL, extension: file.type.split('/')[1] });
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }

  async startRecording(rerecord = false) {
    if (rerecord === true) {
      this.props.onRerecord();
      this.recordedBlobs = [];
    }
    this.props.onStartRecording();
    return this.captureUserMedia({
      audio: true,
      video: true,
    })
      .then(() => {
        const videoElem = document.getElementById('video-player');
        if(this.props.src){
          videoElem.src = null;
        }
        videoElem.srcObject = this.state.stream;
        const options = {
          mimeType: 'video/webm;codecs=vp8',
          audioBitsPerSecond: 128000,
          videoBitsPerSecond: 128000,
          bitsPerSecond: 128000,
        };
        try {
          this.mediaRecorder = new MediaRecorder(this.state.stream, options);
          this.mediaRecorder.ondataavailable = this.handleDataAvailable;
          this.mediaRecorder.start(100);
          this.timerID = setTimeout(() => {
            this.stopRecording();
          }, this.props.duration);

        }
        catch (e) {
          this.setState({ error: true });
        }
      });
  }

  editVideo = () => {
    if (this.props.src) {
      return <VideoPlayer fill primarySrc={this.props.src} />
    }
    else {
      return
      (
        <VideoRecorderDiv.Video id="video-player" autoPlay muted="muted" />
      )
    }
  }



  renderUploader = () => {
    if (this.props.videoUploader.savedFile && this.state.play) {
      return (
        <VideoRecorderDiv.ControlWrapper>
          <VideoRecorderDiv.Video id="video-player" controls src={this.state.src} />
          <VideoRecorderDiv.ActionButton>
          <VideoRecorderDiv.UploadWrapper>
                  <VideoRecorderDiv.RerecordButton />
                  <VideoRecorderDiv.UploadInput title="Upload video" id="default-uploader" accept=".mp4, .MOV" onChange={() => this.fileUpload()} type="file" />
                </VideoRecorderDiv.UploadWrapper>
            <VideoRecorderDiv.SubmitButton title="Save video" onClick={() => this.props.onSubmit()} />
          </VideoRecorderDiv.ActionButton>
        </VideoRecorderDiv.ControlWrapper>
      );
    }

    if (this.props.src && !this.state.play) {
      return (
        <VideoRecorderDiv.ControlWrapper>
          <VideoRecorderDiv.Video id="video-player" controls src={this.props.src} />
          <VideoRecorderDiv.ActionButton>
          <VideoRecorderDiv.UploadWrapper>
                  <VideoRecorderDiv.RerecordButton />
                  <VideoRecorderDiv.UploadInput title="Upload video" id="default-uploader" accept=".mp4, .MOV" onChange={() => this.fileUpload()} type="file" />
                </VideoRecorderDiv.UploadWrapper>
            <VideoRecorderDiv.SubmitButton title="Save video" onClick={() => this.props.onSubmit()} />
          </VideoRecorderDiv.ActionButton>
        </VideoRecorderDiv.ControlWrapper>
      );
    }
    else {
      if (this.state.play) {
        return (
          <VideoPlayer fill id="video-player" primarySrc={this.state.src} />
        )
      }
      else {
        if (this.state.extensionError) {
          return (
            <VideoRecorderDiv.InfoText>Invalid file format</VideoRecorderDiv.InfoText>
          )
        }
        else {
          return (
            <VideoRecorderDiv.UploadControlWrapper>
                <VideoRecorderDiv.UploadTextWrapper>
          <VideoRecorderDiv.VideoHeading> What's your question to {this.props.star}  </VideoRecorderDiv.VideoHeading>
        </VideoRecorderDiv.UploadTextWrapper>
              <VideoRecorderDiv.InfoText>Your browser doesn't support video recording or media capturing devices are not found. Please upload your video</VideoRecorderDiv.InfoText>
              <VideoRecorderDiv.UploadActionButton>
                <VideoRecorderDiv.UploadWrapper>
                  <VideoRecorderDiv.NoVideoButton />
                  <VideoRecorderDiv.UploadInput title="Upload video" id="default-uploader" accept=".mp4, .MOV" onChange={() => this.fileUpload()} type="file" />
                </VideoRecorderDiv.UploadWrapper>
              </VideoRecorderDiv.UploadActionButton>
            </VideoRecorderDiv.UploadControlWrapper>
          )
        }
      }
    }
  }

  renderEditPreview(){
    if (this.props.src && !this.props.videoRecorder.recordedBlob && this.props.videoRecorder.start) {
      return (
        <VideoRecorderDiv.ControlWrapper>
          <VideoRecorderDiv.IndicationText>Recording</VideoRecorderDiv.IndicationText>
          <VideoRecorderDiv.Video id="video-player" autoPlay muted="muted" />
          <VideoRecorderDiv.ActionButton>
            <VideoRecorderDiv.Button title="Stop recording" stop onClick={this.stopRecording} />
          </VideoRecorderDiv.ActionButton>
        </VideoRecorderDiv.ControlWrapper>
      );
    }

    if (this.props.src && this.props.videoRecorder.recordedBlob && !this.props.videoRecorder.start) {
      return (
        <VideoRecorderDiv.ControlWrapper>
          <VideoRecorderDiv.Video src={this.props.videoRecorder.recordedBlob} controls />
          <VideoRecorderDiv.ActionButton>
            <VideoRecorderDiv.RerecordButton title="Re record" onClick={() => this.startRecording(true)} />
            <VideoRecorderDiv.SubmitButton title="Save video" onClick={() => this.props.onSubmit()} />
          </VideoRecorderDiv.ActionButton>
        </VideoRecorderDiv.ControlWrapper>
      );
    }


if (this.props.src && !this.props.videoRecorder.recordedBlob && !this.props.videoRecorder.start) {
    return (
      <VideoRecorderDiv.ControlWrapper>
        <VideoRecorderDiv.Wrapper>
          <VideoRecorderDiv.VideoHeading> What's your question to {this.props.star}  </VideoRecorderDiv.VideoHeading>
        </VideoRecorderDiv.Wrapper>
        <VideoRecorderDiv.Video id="video-player" src={this.props.src} controls />
        <VideoRecorderDiv.ActionButton>
            <VideoRecorderDiv.RerecordButton title="Re record" onClick={() => this.startRecording(true)} />
            <VideoRecorderDiv.SubmitButton title="Save video" onClick={() => this.props.onSubmit()} />
          </VideoRecorderDiv.ActionButton>
      </VideoRecorderDiv.ControlWrapper>
    );
  }
}
  
  renderPreview() {
    if (!this.props.videoRecorder.recordedBlob && this.props.videoRecorder.start) {
      return (
        <VideoRecorderDiv.ControlWrapper>
          <VideoRecorderDiv.IndicationText>Recording</VideoRecorderDiv.IndicationText>
          <VideoRecorderDiv.Video id="video-player" autoPlay muted="muted" />
          <VideoRecorderDiv.ActionButton>
            <VideoRecorderDiv.Button title="Stop recording" stop onClick={this.stopRecording} />
          </VideoRecorderDiv.ActionButton>
        </VideoRecorderDiv.ControlWrapper>
      );
    }

    if (this.props.videoRecorder.recordedBlob && !this.props.videoRecorder.start) {
      return (
        <VideoRecorderDiv.ControlWrapper>
          <VideoRecorderDiv.Video src={this.props.videoRecorder.recordedBlob} controls />
          <VideoRecorderDiv.ActionButton>
            <VideoRecorderDiv.RerecordButton title="Re record" onClick={() => this.startRecording(true)} />
            <VideoRecorderDiv.SubmitButton title="Save video" onClick={() => this.props.onSubmit()} />
          </VideoRecorderDiv.ActionButton>
        </VideoRecorderDiv.ControlWrapper>
      );
    }

    return (
      <VideoRecorderDiv.ControlWrapper>
        <VideoRecorderDiv.Wrapper>
            <VideoRecorderDiv.VideoHeading> What's your question to {this.props.star} </VideoRecorderDiv.VideoHeading>
          <VideoRecorderDiv.RecordInfoButton> Ready to record </VideoRecorderDiv.RecordInfoButton>
        </VideoRecorderDiv.Wrapper>
        <VideoRecorderDiv.Video id="video-player" autoPlay muted="muted" />
        <VideoRecorderDiv.ActionButton>
          <VideoRecorderDiv.Button title="Record video" onClick={this.startRecording.bind(this)} />
        </VideoRecorderDiv.ActionButton>
      </VideoRecorderDiv.ControlWrapper>
    );
  }

  render() {
    return (
      <React.Fragment>
        {(checkMediaRecorderSupport() && !getMobileOperatingSystem()) && this.state.deviceSupport ?
          <VideoRecorderDiv>
            <VideoRecorderDiv.VideoContainer>

              { !this.state.streamed ? <Loader/> : 
              
                (this.props.src ? this.renderEditPreview() : this.renderPreview()) }
            </VideoRecorderDiv.VideoContainer>
          </VideoRecorderDiv>
          :
          <VideoRecorderDiv.UploadContainer>
            <VideoRecorderDiv.VideoContainer>
              {this.renderUploader()}
            </VideoRecorderDiv.VideoContainer>
          </VideoRecorderDiv.UploadContainer>
        }
      </React.Fragment>
    );
  }
}
