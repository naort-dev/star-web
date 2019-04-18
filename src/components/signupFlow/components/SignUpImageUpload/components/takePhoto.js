import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EXIF from 'exif-js';
import { faUpload, faCamera } from '@fortawesome/free-solid-svg-icons';
import { ImageUpload } from '../styled';
import { detectUserMedia } from '../../../../../utils/detectCamera';

export default class TakePhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
    };
    this.constraints = {
      video: true,
      audio: true,
    };
    this.recordedBlobs = [];
    this.videoRef = React.createRef();
    this.options = {
      mimeType: 'video/webm;codecs=vp8',
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 128000,
      bitsPerSecond: 128000,
    };
  }

  componentWillMount() {
    this.detectCameraMedia();
  }

  getVideoStream = () => {
    if (detectUserMedia()) {
      return navigator.mediaDevices.getUserMedia(this.constraints)
        .then((stream) => {
          this.videoRef.current.srcObject = stream;
          this.setState({ stream });
          return stream;
        }).catch((e) => {
        });
    }
  }

  handleDataAvailable = (event) => {
    if (event.data && event.data.size > 0) {
      this.recordedBlobs.push(event.data);
    }
  }

  detectCameraMedia = async () => {
    const stream = await this.getVideoStream();
    this.setState({ recording: true });
  }

  getExif = (file) => {
    return new Promise((resolve, reject) => {
      EXIF.getData(file, function () {
        const exif = EXIF.getTag(this, "Orientation")
        switch (exif) {
          case 3:
            resolve(3)
            break;
          case 4:
            resolve(4);
            break;
          case 5:
            resolve(5);
            break;
          case 6:
            resolve(6);
            break;
          case 7:
            resolve(7);
            break;
          case 8:
            resolve(8);
            break;
          default:
            resolve(9);
        }
      })

    })
  }

  takeScreenshot = () => {
    const canvas = document.createElement('canvas');
    const video = this.videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const base64Image = canvas.toDataURL('image/jpeg');
    canvas.toBlob(async (file) => {
      const exif = await this.getExif(file);
      const extension = file.type.split('/')[1];
      this.props.onPictureCapture(base64Image, exif, extension);
    }, 'image/jpeg');
  }

  render() {
    return (
      <ImageUpload.TakePhotoWrapper>
        <React.Fragment>
          <ImageUpload.TakePhoto takePhoto={this.props.takePicture}>
            <ImageUpload.VideoElement autoPlay innerRef={this.videoRef} muted />
          </ImageUpload.TakePhoto>
          <ImageUpload.PhotoButtonWrapper>
            <ImageUpload.CropperButton onClick={this.takeScreenshot}>Capture photo</ImageUpload.CropperButton>
          </ImageUpload.PhotoButtonWrapper>
        </React.Fragment>
      </ImageUpload.TakePhotoWrapper>
    );
  }
}
