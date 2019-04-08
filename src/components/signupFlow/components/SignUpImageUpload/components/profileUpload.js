import React from 'react';
import EXIF from 'exif-js';
import { awsImageUpload } from '../../../../../services/awsImageUpload';
import { imageSizes } from '../../../../../constants/imageSizes';
import ImageCropper from '../../../../ImageCropper';
import Loader from '../../../../Loader';
import { GroupStyled } from '../styled';

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
      <GroupStyled.DetailsWrapper>
        {
          this.state.imageLoading ?
            <Loader />
            :
            <React.Fragment>
              <GroupStyled.ProfileInputButton>
                <GroupStyled.ProfileImageWrapper
                  imageUrl={this.state.finalImage}
                >
                  <GroupStyled.UploadInput accept=".png, .jpeg, .jpg" id="profile" onChange={() => this.onFileChange()} type="file" />
                  <GroupStyled.ProfileInputContainer>
                    <GroupStyled.ProfileInputWrapper noImage={this.state.finalImage} />
                    {!this.state.finalImage ? <GroupStyled.UploadText>Upload profile picture</GroupStyled.UploadText> : null}
                  </GroupStyled.ProfileInputContainer>
                </GroupStyled.ProfileImageWrapper>
                <GroupStyled.ProfileImageWrapper
                  imageUrl={this.state.finalImage}
                >
                  <GroupStyled.UploadInput accept=".png, .jpeg, .jpg" id="profile" onChange={() => this.onFileChange()} type="file" />
                  <GroupStyled.ProfileInputContainer>
                    <GroupStyled.ProfileInputWrapper noImage={this.state.finalImage} />
                    {!this.state.finalImage ? <GroupStyled.UploadText>Take a profile picture</GroupStyled.UploadText> : null}
                  </GroupStyled.ProfileInputContainer>
                </GroupStyled.ProfileImageWrapper>
              </GroupStyled.ProfileInputButton>
              {
                this.state.cropMode && this.state.cropImage &&
                <GroupStyled.CropWrapper>
                  <GroupStyled.Heading>Crop your photo</GroupStyled.Heading>
                  <ImageCropper
                    exifData={this.currentExif}
                    aspectRatio={imageSizes.profile}
                    afterCrop={this.getCroppedImage}
                    closeCropper={() => this.closeCropper()}
                    cropImage={this.state.cropImage}
                  />
                </GroupStyled.CropWrapper>
              }
              <GroupStyled.ControlWrapper>
                <GroupStyled.ControlButton
                  disabled={!this.state.finalImage}
                  onClick={this.onComplete}
                >
                  Continue
                </GroupStyled.ControlButton>
              </GroupStyled.ControlWrapper>
            </React.Fragment>
        }
      </GroupStyled.DetailsWrapper>
    );
  }
}
