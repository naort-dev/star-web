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
      isVideoPaused: true,
      recordedBlob: false,
      recordingTime: {
        minutes: 0,
        seconds: 0,
      },
    };
    this.mediaRecorder = "";
    this.recordedBlobs = [];
    this.recordingDate = null;
    this.handleDataAvailable = this.handleDataAvailable.bind(this);
    this.stopRecording = this.stopRecording.bind(this)
    this.timerID = null;
    this.stream = null;
    this.mounted = true;
  }

  componentDidMount() {
    if (!this.props.videoRecorder.recordedBlob && !this.props.videoUploader.url) {
      this.fetchStream();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.videoRecorder.recordedBlob && !nextProps.videoRecorder.recordedBlob) {
      this.fetchStream(nextProps);
    }
  }

  componentDidUpdate() {
    if (this.previewVideo) {
      this.previewVideo.focus();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    if (!getMobileOperatingSystem() && checkMediaRecorderSupport()) {
      if (!this.props.videoRecorder.recordedBlob && this.props.videoRecorder.start) {
        this.closeStream();
        this.props.onClearStreams();
        window.stream = null;
      }
    }
  }

  stopStream = () => window.stream.getTracks().forEach(track => track.stop())

  fetchStream(props = this.props) {
    if (checkMediaRecorderSupport() && !getMobileOperatingSystem()) {
      if (!props.videoRecorder.recordedBlob || props.videoUploader.savedFile) {
        this.setState({ streamed: false})
        return window.navigator.mediaDevices.getUserMedia({ audio: true, video: true })
          .then((stream) => {
            if (this.mounted) {
              window.stream = stream;
              if (!props.src || this.state.disableEdit) {
                this.setState({ streamed: true }, () => { document.getElementById('video-player').srcObject = window.stream; });
              } else {
                this.setState({ streamed: true });
              }
            }
          })
          .catch((err) => {
            this.setState({ deviceSupport: false, streamed: true });
          });
      } else {
        this.setState({ streamed: true });
      }
    }
  }

  handleDataAvailable(event) {
    if (event.data && event.data.size > 0) {
      let { recordingTime } = this.state;
      const finalTime = this.recordingDate.getTime() + this.props.duration;
      const currentTime = new Date().getTime();
      const recordSeconds = parseInt((finalTime - currentTime) / 1000) % 60;
      const recordMinutes = parseInt((finalTime - currentTime) / (1000* 60)) % 60;
      recordingTime = {
        ...recordingTime,
        minutes: recordMinutes,
        seconds: recordSeconds,
      };
      this.setState({ recordingTime });
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
    this.stopStream();
  }

  closeStream = () => {
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
    } else {
      const fileURL = URL.createObjectURL(file);
      this.setState({ play: true, src: fileURL });
      this.props.onSaveVideo({ videoFile: file, url: fileURL, extension: file.type.split('/')[1] });
      if (file){
        reader.readAsDataURL(file);
      }
    }
  }

  async startRecording(rerecord = false) {
    if (rerecord === true) {
      this.props.deleteVideo();
      this.props.onRerecord();
      this.fetchStream();
      this.recordedBlobs = [];
      this.setState({ play: false, disableEdit: true });
      return;
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
          this.recordingDate = new Date();
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

  playPauseVideo = () => {
    this.previewVideo.onEnded = () => {
      this.endVideo();
    };
    if (this.state.isVideoPaused) {
      this.previewVideo.play();
      this.setState({
        isVideoPaused: false,
      });
    } else {
      this.previewVideo.pause();
      this.setState({
        isVideoPaused: true,
      });
    }
  }

  endVideo() {
    this.previewVideo.pause();
    this.setState({
      isVideoPaused: true,
    });
  }

  submitVideo(noEdit) {
    if (this.previewVideo) {
      this.setState({ isVideoPaused: true });
      this.previewVideo.pause();
    }
    this.props.onSubmit(noEdit);
  }

  renderUploader = () => {
    if (this.props.videoUploader.savedFile && this.state.play) {
      return (
        <VideoRecorderDiv.ControlWrapper>
          <VideoRecorderDiv.Video id='preview-video' onEnded={() => this.endVideo()} innerRef={(node) => { this.previewVideo = node; }}src={this.state.src} />
          <VideoRecorderDiv.ControlButton paused={this.state.isVideoPaused} onClick={this.playPauseVideo} />
          <VideoRecorderDiv.ActionButton>
            <VideoRecorderDiv.UploadWrapper>
              <VideoRecorderDiv.RerecordButton onClick={() => this.startRecording(true)} />
              {/* <VideoRecorderDiv.UploadInput title="Upload video" id="default-uploader" accept=".mp4, .MOV" onChange={() => this.fileUpload()} type="file" /> */}
            </VideoRecorderDiv.UploadWrapper>
            <VideoRecorderDiv.SubmitButton title="Save and continue" onClick={() => this.submitVideo()} />
          </VideoRecorderDiv.ActionButton>
        </VideoRecorderDiv.ControlWrapper>
      );
    }

    if (this.props.videoUploader.url) {
      return (
        <VideoRecorderDiv.ControlWrapper>
          <VideoRecorderDiv.Video id='preview-video' onEnded={() => this.endVideo()} innerRef={(node) => { this.previewVideo = node; }} src={this.props.videoUploader.url} />
          <VideoRecorderDiv.ControlButton paused={this.state.isVideoPaused} onClick={this.playPauseVideo} />
          <VideoRecorderDiv.ActionButton>
            <VideoRecorderDiv.UploadWrapper>
              <VideoRecorderDiv.RerecordButton onClick={() => this.startRecording(true)} />
              {/* <VideoRecorderDiv.UploadInput title="Upload video" id="default-uploader" accept=".mp4, .MOV" onChange={() => this.fileUpload()} type="file" /> */}
            </VideoRecorderDiv.UploadWrapper>
            <VideoRecorderDiv.SubmitButton title="Save and continue" onClick={() => this.submitVideo()} />
          </VideoRecorderDiv.ActionButton>
        </VideoRecorderDiv.ControlWrapper>
      );
    }

    if (this.props.src && !this.state.play && !this.state.disableEdit) {
      return (
        <VideoRecorderDiv.ControlWrapper>
          <VideoRecorderDiv.Video id='preview-video' onEnded={() => this.endVideo()} innerRef={(node) => { this.previewVideo = node; }} src={this.props.src} />
          <VideoRecorderDiv.ControlButton paused={this.state.isVideoPaused} onClick={this.playPauseVideo} />
          <VideoRecorderDiv.ActionButton>
            <VideoRecorderDiv.UploadWrapper>
              <VideoRecorderDiv.RerecordButton onClick={() => this.startRecording(true)} />
              {/* <VideoRecorderDiv.UploadInput title="Upload video" id="default-uploader" accept=".mp4, .MOV" onChange={() => this.fileUpload()} type="file" /> */}
            </VideoRecorderDiv.UploadWrapper>
            <VideoRecorderDiv.SubmitButton title="Save and continue" onClick={() => this.submitVideo()} />
          </VideoRecorderDiv.ActionButton>
        </VideoRecorderDiv.ControlWrapper>
      );
    }

    else {
      if (this.state.play) {
        return (
          <VideoPlayer fill id="video-player" onEnded={() => this.endVideo()} primarySrc={this.state.src} />
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
          <VideoRecorderDiv.VideoHeading>
            {
              this.props.responseMode ?
                this.props.recordTitle()
              : `What's your question to ${this.props.star}?` 
            }
          </VideoRecorderDiv.VideoHeading>
        </VideoRecorderDiv.UploadTextWrapper>
              <VideoRecorderDiv.InfoText>Your browser doesn't support video recording or media capturing devices were not found. Please upload your video</VideoRecorderDiv.InfoText>
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
          <VideoRecorderDiv.Video id="video-player" onEnded={() => this.endVideo()} autoPlay muted="muted" />
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
            <VideoRecorderDiv.SubmitButton title="Delete & re-record" onClick={() => this.submitVideo(true)} />
          </VideoRecorderDiv.ActionButton>
        </VideoRecorderDiv.ControlWrapper>
      );
    }


  if (this.props.src && !this.props.videoRecorder.recordedBlob && !this.props.videoRecorder.start) {
    return (
      <VideoRecorderDiv.ControlWrapper>
        <VideoRecorderDiv.Wrapper>
          <VideoRecorderDiv.VideoHeading>
            {
              this.props.responseMode ?
                this.props.recordTitle()
              : `What's your question to ${this.props.star}?` 
            }
          </VideoRecorderDiv.VideoHeading>
        </VideoRecorderDiv.Wrapper>
        <VideoRecorderDiv.Video id="video-player" onEnded={() => this.endVideo()} src={this.props.src} controls />
        <VideoRecorderDiv.ActionButton>
            <VideoRecorderDiv.RerecordButton title="Re record" onClick={() => this.startRecording(true)} />
            <VideoRecorderDiv.SubmitButton title="Save and continue" onClick={() => this.submitVideo(true)} />
          </VideoRecorderDiv.ActionButton>
      </VideoRecorderDiv.ControlWrapper>
    );
  }
    return (
      <VideoRecorderDiv.ControlWrapper>
        <VideoRecorderDiv.Wrapper>
          <VideoRecorderDiv.VideoHeading>
            {
              this.props.responseMode ?
                this.props.recordTitle()
              : `What's your question to ${this.props.star}?` 
            }
          </VideoRecorderDiv.VideoHeading>
          <VideoRecorderDiv.RecordInfoButton> Ready to record </VideoRecorderDiv.RecordInfoButton>
        </VideoRecorderDiv.Wrapper>
        <VideoRecorderDiv.Video id="video-player" autoPlay muted="muted" />
        <VideoRecorderDiv.ActionButton>
          <VideoRecorderDiv.Button title={this.props.recordPlaceHolder ? this.props.recordPlaceHolder : 'Record your question'} onClick={this.startRecording.bind(this)} />
          <VideoRecorderDiv.UploadWrapper>
            <VideoRecorderDiv.NoVideoButton />
            <VideoRecorderDiv.UploadInput title="Upload video" id="default-uploader" accept=".mp4, .MOV" onChange={() => this.fileUpload()} type="file" />
          </VideoRecorderDiv.UploadWrapper>
        </VideoRecorderDiv.ActionButton>
      </VideoRecorderDiv.ControlWrapper>
    );
}
  renderPreview() {
    if (!this.props.videoRecorder.recordedBlob && this.props.videoRecorder.start) {
      return (
        <VideoRecorderDiv.ControlWrapper>
          <VideoRecorderDiv.IndicationText>
            Recording
            {
              <VideoRecorderDiv.RecordDuration>
                { this.state.recordingTime.minutes !== 0 &&
                  this.state.recordingTime.minutes > 9 ? this.state.recordingTime.minutes : `0${this.state.recordingTime.minutes}` }
                :{this.state.recordingTime.seconds > 9 ? this.state.recordingTime.seconds : `0${this.state.recordingTime.seconds}` }
              </VideoRecorderDiv.RecordDuration>
            }
          </VideoRecorderDiv.IndicationText>
          <VideoRecorderDiv.Video innerRef={(node) => { this.previewVideo = node; }} onEnded={() => this.endVideo()} id="video-player" autoPlay muted="muted" />
          <VideoRecorderDiv.ActionButton>
            <VideoRecorderDiv.Button title="Stop recording" stop onClick={this.stopRecording} />
          </VideoRecorderDiv.ActionButton>
        </VideoRecorderDiv.ControlWrapper>
      );
    }

    if (this.props.videoRecorder.recordedBlob && !this.props.videoRecorder.start) {
      return (
        <VideoRecorderDiv.ControlWrapper>
          <VideoRecorderDiv.Video innerRef={(node) => { this.previewVideo = node; }} onEnded={() => this.endVideo()} id='preview-video' src={this.props.videoRecorder.recordedBlob} />
          <VideoRecorderDiv.ControlButton paused={this.state.isVideoPaused} onClick={this.playPauseVideo} />
          <VideoRecorderDiv.ActionButton>
            <VideoRecorderDiv.RerecordButton title="Re record" onClick={() => this.startRecording(true)} />
            <VideoRecorderDiv.SubmitButton title="Save and continue" onClick={() => this.submitVideo()} />
          </VideoRecorderDiv.ActionButton>
        </VideoRecorderDiv.ControlWrapper>
      );
    }

    if (this.props.videoUploader.savedFile || this.props.videoUploader.url) {
      return this.renderUploader();
    }

    return (
      <VideoRecorderDiv.ControlWrapper>
        <VideoRecorderDiv.Wrapper>
          <VideoRecorderDiv.VideoHeading>
            {
              this.props.responseMode ?
                this.props.recordTitle()
              : `What's your question to ${this.props.star}?` 
            }
          </VideoRecorderDiv.VideoHeading>
          <VideoRecorderDiv.RecordInfoButton> Ready to record </VideoRecorderDiv.RecordInfoButton>
        </VideoRecorderDiv.Wrapper>
        <VideoRecorderDiv.Video id="video-player" autoPlay muted="muted" />
        <VideoRecorderDiv.ActionButton>
          <VideoRecorderDiv.Button title={this.props.recordPlaceHolder ? this.props.recordPlaceHolder : 'Record your question'} onClick={this.startRecording.bind(this)} />
          <VideoRecorderDiv.UploadWrapper>
            <VideoRecorderDiv.NoVideoButton />
            <VideoRecorderDiv.UploadInput title="Upload video" id="default-uploader" accept=".mp4, .MOV" onChange={() => this.fileUpload()} type="file" />
          </VideoRecorderDiv.UploadWrapper>
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
              { !this.state.streamed && (!this.props.videoRecorder.recordedBlob && !this.props.videoUploader.url) ?
                <VideoRecorderDiv.LoaderWrapper>
                  <Loader />
                </VideoRecorderDiv.LoaderWrapper> :              
                (this.props.src && !this.state.disableEdit ? this.renderEditPreview() : this.renderPreview()) }
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
