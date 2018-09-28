import React from 'react';
import EXIF from 'exif-js';
import { awsImageUpload } from '../../../services/awsImageUpload';
import { imageSizes } from '../../../constants/imageSizes';
import ImageCropper from '../../ImageCropper';
import GroupStyled from '../styled';

export default class CoverUpload extends React.Component {

  state = {
    cropImage: null,
    cropMode: false,
    finalImage: null,
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
        await this.getImageData(file);
      } else {
        this.setState({ imageError: { sizeError: true } });
      }
    }
  }

  getCroppedImage = (file, image) => {
    this.setState({ finalImage: image });
    awsImageUpload(file, this.state.extension)
    .then((resp) => {
      this.props.onComplete('featuredImage', resp, image);
    })
  }

  async getImageData(file) {
    const extension = file.type.split('/')[1];
    const reader = new FileReader();
    const exif = await this.getExif(file);
    this.currentExif = exif;
    reader.onload = () => {
      this.setState({ cropMode: true, cropImage: reader.result, extension });
    };
    if (file) {
      reader.readAsDataURL(file);
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
      <GroupStyled.ContentWrapper>
        <GroupStyled.HeadingWrapper>
          <GroupStyled.InnerHeading>
            Pick your profile cover
          </GroupStyled.InnerHeading>
          <GroupStyled.InnerDescription>
            Supporters who visit your profile will see it. Showcase your best visuals.
          </GroupStyled.InnerDescription>
        </GroupStyled.HeadingWrapper>
        <GroupStyled.CoverLayout>
          <GroupStyled.CoverImage imageUrl={this.state.finalImage}>
            {
              !this.state.finalImage &&
                <GroupStyled.ProfileInputWrapper>
                  <GroupStyled.UploadInput accept=".png, .jpeg, .jpg" id="profile" onChange={() => this.onFileChange()} type="file" />
                </GroupStyled.ProfileInputWrapper>
            }
            <GroupStyled.ProfileImage imageUrl={this.props.profileImage} />
          </GroupStyled.CoverImage> 
        </GroupStyled.CoverLayout>
        {
          this.state.cropMode && this.state.cropImage &&
            <ImageCropper
              exifData={this.currentExif}
              aspectRatio={imageSizes.groupCover}
              afterCrop={this.getCroppedImage}
              closeCropper={() => this.closeCropper()}
              cropImage={this.state.cropImage}
            />
        }
        <GroupStyled.ControlWrapper>
          <GroupStyled.ControlButton
            onClick={() => this.props.onImageUpload()}
          >
            Continue
          </GroupStyled.ControlButton>
        </GroupStyled.ControlWrapper>
      </GroupStyled.ContentWrapper>
    );
  }
}
