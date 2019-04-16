import React from 'react';
import EXIF from 'exif-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCamera } from '@fortawesome/free-solid-svg-icons';
import { awsImageUpload } from '../../../../../services/awsImageUpload';
import { imageSizes } from '../../../../../constants/imageSizes';
import ImageCropper from '../../../../ImageCropper';
import Loader from '../../../../Loader';
import { ImageUpload } from '../styled';

export default class ProfileUpload extends React.Component {

  state = {
    cropImage: null,
    cropMode: false,
    imageLoading: false,
    finalImage: null,
    finalFile: null,
  }

  async onFileChange() {
    this.setState({ imageError: false })
    const file = document.getElementById('profile').files[0];
    const allowedExtensions = /((\.jpeg)|(\.jpg)|(\.png))$/i;
    if (!allowedExtensions.exec(document.getElementById('profile').value)) {
      this.setState({ imageError: { extensionError: true } });
    } else if (file) {
      const correctResolution = await this.checkResolution(file);
      if (correctResolution) {
        this.setState({ imageLoading: true });
        await this.getImageData(file);
      } else {
        this.setState({ imageError: { sizeError: true }, imageLoading: false });
      }
    }
  }

  onComplete = () => {
    this.setState({ imageLoading: true });
    awsImageUpload(this.state.finalFile, this.state.extension)
      .then((resp) => {
        this.setState({ imageLoading: false });
        this.props.onComplete(resp, this.state.finalImage);
      });
  }

  async getImageData(file) {
    const extension = file.type.split('/')[1];
    const reader = new FileReader();
    const exif = await this.getExif(file);
    this.currentExif = exif;
    reader.onload = () => {
      this.props.onComplete(true, reader.result, extension, false, exif);
      this.setState({ cropMode: true, cropImage: reader.result, extension, imageLoading: false });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  getCroppedImage = (file, image) => {
    this.setState({ finalImage: image, finalFile: file });
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

  checkResolution(file) {
    let correctResolution = false;
    const img = new Image();
    img.src = window.URL.createObjectURL(file);
    return new Promise((resolve, reject) => {
      img.onload = function () {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        this.originalHeight = img.height;
        this.originalWidth = img.width;
        window.URL.revokeObjectURL(img.src);
        if (width >= 100 && height >= 100) {
          correctResolution = true;
        }
        resolve(correctResolution)
      }.bind(this);
    });
  }

  closeCropper = () => {
    this.setState({ cropImage: null, cropMode: false })
  }

  render() {
    return (
      <ImageUpload.DetailsWrapper>
        {
          this.state.imageLoading ?
            <Loader />
            :
            <React.Fragment>
              <ImageUpload.ProfileInputButton>
                <ImageUpload.ProfileImageWrapper
                  imageUrl={this.state.finalImage}
                >
                  <ImageUpload.UploadInput accept=".png, .jpeg, .jpg" id="profile" onChange={() => this.onFileChange()} type="file" />
                  <ImageUpload.ProfileInputContainer>
                    <ImageUpload.ProfileInputWrapper noImage={this.state.finalImage}>
                      <FontAwesomeIcon icon={faUpload} />
                    </ImageUpload.ProfileInputWrapper>
                    {!this.state.finalImage ? <ImageUpload.UploadText>Upload profile picture</ImageUpload.UploadText> : null}
                  </ImageUpload.ProfileInputContainer>
                </ImageUpload.ProfileImageWrapper>
                <ImageUpload.ProfileImageWrapper
                  imageUrl={this.state.finalImage}
                >
                  <ImageUpload.UploadInput accept=".png, .jpeg, .jpg" id="profile" onChange={() => this.onFileChange()} type="file" />
                  <ImageUpload.ProfileInputContainer>
                    <ImageUpload.ProfileInputWrapper noImage={this.state.finalImage}>
                      <FontAwesomeIcon icon={faCamera} />
                    </ImageUpload.ProfileInputWrapper>
                    {!this.state.finalImage ? <ImageUpload.UploadText>Take a profile picture</ImageUpload.UploadText> : null}
                  </ImageUpload.ProfileInputContainer>
                </ImageUpload.ProfileImageWrapper>
              </ImageUpload.ProfileInputButton>
              {/* {
                this.state.cropMode && this.state.cropImage &&
                <ImageUpload.CropWrapper>
                  <ImageUpload.Heading>Crop your photo</ImageUpload.Heading>
                  <ImageCropper
                    exifData={this.currentExif}
                    aspectRatio={imageSizes.profile}
                    afterCrop={this.getCroppedImage}
                    closeCropper={() => this.closeCropper()}
                    cropImage={this.state.cropImage}
                  />
                </ImageUpload.CropWrapper>
              } */}
              {/* <ImageUpload.ControlWrapper>
                <ImageUpload.ControlButton
                  disabled={!this.state.finalImage}
                  onClick={this.onComplete}
                >
                  Continue
                </ImageUpload.ControlButton>
              </ImageUpload.ControlWrapper> */}
            </React.Fragment>
        }
      </ImageUpload.DetailsWrapper>
    );
  }
}
