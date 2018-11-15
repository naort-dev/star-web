import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import VideoRecorderDiv from './styled';
import { getMobileOperatingSystem, checkMediaRecorderSupport } from '../../utils/checkOS';
import VideoPlayer from '../VideoPlayer';
import Loader from '../Loader';

export default class RequestVideoRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streamed: null,
      error: null,
      startUpload: false,
      browserSupport: false,
      showBookingDetails: false,
      play: false,
      deviceSupport: true,
      isVideoPaused: true,
      recordedBlob: false,
    };
    this.mediaRecorder = "";
    this.recordedBlobs = [];
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
              if (!props.src) {
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
      if (file) {
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
      this.setState({ play: false, showBookingDetails: false });
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

  playPauseVideo = () => {
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

  submitVideo() {
    if (this.previewVideo) {
      this.setState({ isVideoPaused: true });
      this.previewVideo.pause();
    }
    this.props.onSubmit();
  }

  toggleBookingDetails = () => {
    this.setState({ showBookingDetails: !this.state.showBookingDetails });
  }

  renderUploader = () => {
    if (this.props.videoUploader.savedFile && this.state.play) {
      return (
        <VideoRecorderDiv.ControlWrapper>
          {this.state.showBookingDetails && <VideoRecorderDiv.Overlay />}
          <VideoRecorderDiv.Wrapper>
            <VideoRecorderDiv.VideoHeading selected={this.state.showBookingDetails} onClick={this.toggleBookingDetails}>
              Booking Details
            </VideoRecorderDiv.VideoHeading>
          </VideoRecorderDiv.Wrapper>
          {
            this.state.showBookingDetails &&
              <VideoRecorderDiv.BookingDetailsWrapper>
                <Scrollbars>
                  {this.props.overlayData()}
                </Scrollbars>
              </VideoRecorderDiv.BookingDetailsWrapper>
          }
          <VideoRecorderDiv.Video id='preview-video' innerRef={(node) => { this.previewVideo = node; }} src={this.state.src} />
          <VideoRecorderDiv.ControlButton paused={this.state.isVideoPaused} onClick={this.playPauseVideo} />
          <VideoRecorderDiv.ActionButton>
            <VideoRecorderDiv.UploadWrapper>
              <VideoRecorderDiv.RerecordButton onClick={() => this.startRecording(true)} />
            </VideoRecorderDiv.UploadWrapper>
            <VideoRecorderDiv.SubmitButton title="Save and continue" onClick={() => this.submitVideo()} />
          </VideoRecorderDiv.ActionButton>
        </VideoRecorderDiv.ControlWrapper>
      );
    }

    if (this.props.videoUploader.url) {
      return (
        <VideoRecorderDiv.ControlWrapper>
          {this.state.showBookingDetails && <VideoRecorderDiv.Overlay />}
          <VideoRecorderDiv.Wrapper>
            <VideoRecorderDiv.VideoHeading selected={this.state.showBookingDetails} onClick={this.toggleBookingDetails}>
              Booking Details
            </VideoRecorderDiv.VideoHeading>
          </VideoRecorderDiv.Wrapper>
          {
            this.state.showBookingDetails &&
              <VideoRecorderDiv.BookingDetailsWrapper>
                <Scrollbars>
                  {this.props.overlayData()}
                </Scrollbars>
              </VideoRecorderDiv.BookingDetailsWrapper>
          }
          <VideoRecorderDiv.Video id='preview-video' onEnded={() => this.endVideo()} innerRef={(node) => { this.previewVideo = node; }} src={this.props.videoUploader.url} />
          <VideoRecorderDiv.ControlButton paused={this.state.isVideoPaused} onClick={this.playPauseVideo} />
          <VideoRecorderDiv.ActionButton>
            <VideoRecorderDiv.UploadWrapper>
              <VideoRecorderDiv.RerecordButton onClick={() => this.startRecording(true)} />
            </VideoRecorderDiv.UploadWrapper>
            <VideoRecorderDiv.SubmitButton title="Save and continue" onClick={() => this.submitVideo()} />
          </VideoRecorderDiv.ActionButton>
        </VideoRecorderDiv.ControlWrapper>
      );
    }

    if (this.props.src && !this.state.play) {
      return (
        <VideoRecorderDiv.ControlWrapper>
          {this.state.showBookingDetails && <VideoRecorderDiv.Overlay />}
          <VideoRecorderDiv.Wrapper>
            <VideoRecorderDiv.VideoHeading selected={this.state.showBookingDetails} onClick={this.toggleBookingDetails}>
              Booking Details
            </VideoRecorderDiv.VideoHeading>
          </VideoRecorderDiv.Wrapper>
          {
            this.state.showBookingDetails &&
              <VideoRecorderDiv.BookingDetailsWrapper>
                <Scrollbars>
                  {this.props.overlayData()}
                </Scrollbars>
              </VideoRecorderDiv.BookingDetailsWrapper>
          }
          <VideoRecorderDiv.Video id='preview-video' onEnded={() => this.endVideo()} innerRef={(node) => { this.previewVideo = node; }} src={this.props.src} />
          <VideoRecorderDiv.ControlButton paused={this.state.isVideoPaused} onClick={this.playPauseVideo} />
          <VideoRecorderDiv.ActionButton>
            <VideoRecorderDiv.UploadWrapper>
              <VideoRecorderDiv.RerecordButton onClick={() => this.startRecording(true)} />
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
                <VideoRecorderDiv.VideoHeading selected={this.state.showBookingDetails} onClick={this.toggleBookingDetails}>
                  Booking Details
                 </VideoRecorderDiv.VideoHeading>
               </VideoRecorderDiv.UploadTextWrapper>
               {
                this.state.showBookingDetails &&
                  <VideoRecorderDiv.BookingDetailsWrapper>
                    <Scrollbars>
                      {this.props.overlayData()}
                    </Scrollbars>
                  </VideoRecorderDiv.BookingDetailsWrapper>
              }
              {
                !this.state.showBookingDetails &&
                  <React.Fragment>
                    <VideoRecorderDiv.InfoText>Your browser doesn't support video recording or media capturing devices were not found. Please upload your video</VideoRecorderDiv.InfoText>
                    <VideoRecorderDiv.UploadActionButton>
                      <VideoRecorderDiv.UploadWrapper>
                        <VideoRecorderDiv.NoVideoButton />
                        <VideoRecorderDiv.UploadInput title="Upload video" id="default-uploader" accept=".mp4, .MOV" onChange={() => this.fileUpload()} type="file" />
                      </VideoRecorderDiv.UploadWrapper>
                    </VideoRecorderDiv.UploadActionButton>
                  </React.Fragment>
              }
            </VideoRecorderDiv.UploadControlWrapper>
          )
        }
      }
    }
  }

  renderPreview() {
    if (!this.props.videoRecorder.recordedBlob && this.props.videoRecorder.start) {
      return (
        <VideoRecorderDiv.ControlWrapper>
          <VideoRecorderDiv.IndicationText>Recording</VideoRecorderDiv.IndicationText>
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
          {this.state.showBookingDetails && <VideoRecorderDiv.Overlay />}
          <VideoRecorderDiv.Wrapper>
            <VideoRecorderDiv.VideoHeading selected={this.state.showBookingDetails} onClick={this.toggleBookingDetails}>
              Booking Details
            </VideoRecorderDiv.VideoHeading>
          </VideoRecorderDiv.Wrapper>
          {
            this.state.showBookingDetails &&
              <VideoRecorderDiv.BookingDetailsWrapper>
                <Scrollbars>
                  {this.props.overlayData()}
                </Scrollbars>
              </VideoRecorderDiv.BookingDetailsWrapper>
          }
          <VideoRecorderDiv.Video innerRef={(node) => { this.previewVideo = node; }} id='preview-video' src={this.props.videoRecorder.recordedBlob} />
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
        {this.state.showBookingDetails && <VideoRecorderDiv.Overlay />}
        <VideoRecorderDiv.Wrapper>
          <VideoRecorderDiv.VideoHeading selected={this.state.showBookingDetails} onClick={this.toggleBookingDetails}>
            Booking Details
          </VideoRecorderDiv.VideoHeading>
          <VideoRecorderDiv.RecordInfoButton> Ready to record </VideoRecorderDiv.RecordInfoButton>
        </VideoRecorderDiv.Wrapper>
        {
          this.state.showBookingDetails &&
            <VideoRecorderDiv.BookingDetailsWrapper>
              <Scrollbars>
                {this.props.overlayData()}
              </Scrollbars>
            </VideoRecorderDiv.BookingDetailsWrapper>
        }
        <VideoRecorderDiv.Video id="video-player" autoPlay muted="muted" />
        <VideoRecorderDiv.ActionButton>
          <VideoRecorderDiv.Button title="Start recording" onClick={this.startRecording.bind(this)} />
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
              { !this.state.streamed && (!this.props.videoRecorder.recordedBlob && !this.props.videoUploader.url) ? <Loader/> :  
                this.renderPreview() }
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
