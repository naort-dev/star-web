import React from 'react';
import EXIF from 'exif-js';
import Cropper from 'cropperjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCamera } from '@fortawesome/free-solid-svg-icons';
import 'cropperjs/dist/cropper.css';
import Button from 'components/PrimaryButton';
import CropperStyled from './styled';

export default class ImageCropper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isMobile: false, cropImage: props.cropImage };
    this.cropImage = React.createRef();
    this.cropper = null;
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeCapture);
    this.resizeCapture();
    this.initializeCropper();
  }

  componentDidUpdate(prevProps, prevState) {
    if ((this.state.isMobile !== prevState.isMobile || this.state.cropImage !== prevState.cropImage) && this.cropper) {
      this.cropper.destroy();
      this.initializeCropper();
    }
  }

  componentWillUnmount() {
    if (this.cropper) {
      this.cropper.destroy()
    }
    window.removeEventListener('resize', this.resizeCapture);
  }

  initializeCropper = () => {
    this.cropper = new Cropper(this.cropImage.current, {
      aspectRatio: 1,
      viewMode: 3,
    })
  };

  resizeCapture = () => {
    if (
      document.body.getBoundingClientRect().width <= 832 ||
      window.innerWidth <= 832
    ) {
      this.setState({ isMobile: true });
    } else {
      this.setState({ isMobile: false });
    }
  };

  handleCrop = () => {
    const cropperCanvas = this.cropper.getCroppedCanvas({
      width: 1024,
      height: 1024,
    });
    const base64Image = cropperCanvas.toDataURL('image/jpeg');
    cropperCanvas.toBlob(file => {
      this.props.afterCrop(file, base64Image);
      this.props.closeCropper();
    }, 'image/jpeg');
  };

  uploadImage = () => {
    this.inputRef.current.click();
  }

  async onFileChange() {
    this.setState({ imageError: false })
    const file = document.getElementById('profile').files[0];
    const allowedExtensions = /((\.jpeg)|(\.jpg)|(\.png))$/i;
    if (!allowedExtensions.exec(document.getElementById('profile').value)) {
      this.setState({ imageError: { extensionError: true } });
    } else if (file) {
      this.setState({ imageLoading: true });
      await this.getImageData(file);
    }
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

  async getImageData(file) {
    const extension = file.type.split('/')[1];
    const reader = new FileReader();
    const exif = await this.getExif(file);
    this.currentExif = exif;
    reader.onload = () => {
      this.setState({ cropImage: reader.result });
      this.props.onUploadComplete(reader.result, exif, extension);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  render() {
    return (
      <CropperStyled>
        <CropperStyled.CropperWrapper>
          <img ref={this.cropImage} alt='cropper' style={{maxwidth: '100%'}} src={this.state.cropImage} />
        </CropperStyled.CropperWrapper>
        <CropperStyled.ButtonWrapper>
          <CropperStyled.CropperLightButton onClick={this.props.onTakePicture}>
            <FontAwesomeIcon icon={faCamera} />
            Take Picture
          </CropperStyled.CropperLightButton>
          <Button onClick={this.handleCrop} className="button">
            I like it, continue
          </Button>
          <CropperStyled.CropperLightButton onClick={this.uploadImage}>
            <input className='upload-button' ref={this.inputRef} accept=".png, .jpeg, .jpg" id="profile" onChange={() => this.onFileChange()} type="file" />
            <FontAwesomeIcon icon={faUpload} />
            Upload Picture
          </CropperStyled.CropperLightButton>
        </CropperStyled.ButtonWrapper>
      </CropperStyled>
    );
  }
}
