import React from 'react';
import VideoRecorderDiv from './styled';
import { getMobileOperatingSystem, checkMediaRecorderSupport } from '../../utils/checkOS';
export default class VideoRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streamed: null,
      error: null,
      startUpload: false,
      browserSupport: false,
      play: false
    };
    this.mediaSource = 'MediaSource' in window ? new MediaSource() : null;
    this.mediaRecorder = null;
    this.recordedBlobs = [];
    this.handleDataAvailable = this.handleDataAvailable.bind(this);
    this.stopRecording = this.stopRecording.bind(this)
    this.timerID = null;
    this.stream = null;
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
    const liveVideo = document.getElementById('video-player');
    liveVideo.srcObject = stream;
    this.stream = stream;
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
    this.setState({ extensionError: false, play: false });
    const file = document.getElementById('default-uploader').files[0];
    const reader = new FileReader();
    const allowedExtensions = /((\.mp4)|(\.MOV))$/i;
    if (!allowedExtensions.exec(document.getElementById('default-uploader').value)) {
      this.setState({ extensionError: true });
    }
    else {
      const fileURL = URL.createObjectURL(file);
      if (checkMediaRecorderSupport() && !getMobileOperatingSystem()){
        this.setState({ play: true }, function () {
          document.getElementById('video-player').src = fileURL;
        });
      }
      else {
        this.setState({ play: true }, function () {
          document.getElementById('fallback-video').src = fileURL;
        });
      }
      
      this.props.onSaveVideo({ videoFile: file, extension: file.type.split('/')[1] })
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
      video: {
        width: { min: 640, ideal: 1920 },
        height: { min: 400, ideal: 1080 },
        aspectRatio: { ideal: 1.7777777778 },
      },
    })
      .then(() => {
        let options = {
          mimeType: 'video/webm',
          audioBitsPerSecond: 128000,
          videoBitsPerSecond: 128000,
          bitsPerSecond: 128000,
        };
        if (!MediaRecorder.isTypeSupported('video/mp4;codecs=h264')) {
          options = {
            mimeType: 'video/webm;codecs=vp9 ',
            audioBitsPerSecond: 128000,
            videoBitsPerSecond: 128000,
            bitsPerSecond: 128000,
          };
        }
        else if (!MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
          options = {
            mimeType: 'video/webm;codecs=vp8',
            audioBitsPerSecond: 128000,
            videoBitsPerSecond: 128000,
            bitsPerSecond: 128000,
          };
        }

        try {
          this.mediaRecorder = new MediaRecorder(this.stream, options);
          this.mediaRecorder.ondataavailable = this.handleDataAvailable;
          this.mediaRecorder.start(100);
          this.timerID = setTimeout(() => {
            this.stopRecording();
          }, 61000);

        }
        catch (e) {
          this.setState({ error: true });
        }
      });
  }

  render() {
    return (
      <React.Fragment>
        { checkMediaRecorderSupport() && !getMobileOperatingSystem() ?
          <VideoRecorderDiv>
            <VideoRecorderDiv.VideoContainer>
              {this.props.videoRecorder.start == null ?
                <VideoRecorderDiv.Video id="video-player" autoPlay controls={this.state.play} />
               :
                (!this.props.videoRecorder.recordedBlob ?
                  <VideoRecorderDiv.Video id="video-player" autoPlay muted="muted" />
                  :
                  <VideoRecorderDiv.Video id="video-player" src={this.props.videoRecorder.recordedBlob} controls width="100%" />
                )
              }
            </VideoRecorderDiv.VideoContainer>
            {this.state.error ?
              <h4> Unable to Record Video. Kindly refresh your browser </h4> :
              this.props.videoRecorder.start == null ?
                <VideoRecorderDiv.Wrapper>
                  <VideoRecorderDiv.Button onClick={this.startRecording.bind(this)}> Record </VideoRecorderDiv.Button>
                  <VideoRecorderDiv.UploadWrapper>
                    <VideoRecorderDiv.NoVideoButton> upload video </VideoRecorderDiv.NoVideoButton>
                    <VideoRecorderDiv.UploadInput id="default-uploader" accept=".mp4, .MOV" onChange={() => this.fileUpload()} type="file" />
                  </VideoRecorderDiv.UploadWrapper>
                  </VideoRecorderDiv.Wrapper>
                : (this.props.videoRecorder.start == true ?
                  <VideoRecorderDiv.Button onClick={this.stopRecording}> Stop Recording </VideoRecorderDiv.Button> :
                  <VideoRecorderDiv.Wrapper>
                    <VideoRecorderDiv.UploadWrapper>
                    <VideoRecorderDiv.Button onClick={this.startRecording.bind(this, true)}> Re Record </VideoRecorderDiv.Button>
                    </VideoRecorderDiv.UploadWrapper>
                    <VideoRecorderDiv.UploadWrapper>
                      <VideoRecorderDiv.NoVideoButton> upload video </VideoRecorderDiv.NoVideoButton>
                      <VideoRecorderDiv.UploadInput id="default-uploader" accept=".mp4, .MOV" onChange={() => this.fileUpload()} type="file" />
                    </VideoRecorderDiv.UploadWrapper>
                    </VideoRecorderDiv.Wrapper>)
            }
          </VideoRecorderDiv>
          :
          <VideoRecorderDiv>
            <VideoRecorderDiv.VideoContainer>
              {this.state.play ? <VideoRecorderDiv.Video id="fallback-video" controls /> : (
                this.state.extensionError ? <VideoRecorderDiv.InfoText>Invalid file format</VideoRecorderDiv.InfoText> : <VideoRecorderDiv.InfoText>Please upload your video</VideoRecorderDiv.InfoText>
              )}
            </VideoRecorderDiv.VideoContainer>
            <VideoRecorderDiv.UploadWrapper>
              <VideoRecorderDiv.NoVideoButton> upload video </VideoRecorderDiv.NoVideoButton>
              <VideoRecorderDiv.UploadInput id="default-uploader" accept=".mp4, .MOV" onChange={() => this.fileUpload()} type="file" />
            </VideoRecorderDiv.UploadWrapper>
          </VideoRecorderDiv>
        }
      </React.Fragment>
    );
  }
}
