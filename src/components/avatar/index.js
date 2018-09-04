import React from 'react';
import Cropper, { makeAspectCrop } from 'react-image-crop';
import EXIF from 'exif-js';
import { AvatarContainer } from './styled';
import { getAWSCredentials } from '../../utils/AWSUpload';
import Loader from '../Loader';
import Popup from '../Popup';
import Api from '../../lib/api';
import { fetch } from '../../services/fetch';
import axios from 'axios';

export default class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { avatar: { image: this.props.image, file: null }, cropMode: false, avatarUploading: false, imageError: false };
    this.currentExif = null;
    this.originalHeight = null;
    this.originalWidth = null;
  }


  setCropImage = (image) => {
    this.image = image;
    const crop = makeAspectCrop({
      x: 0,
      y: 20,
      aspect: 1,
      width: image.width,
    }, image.width / image.height);
    const pixelCrop = {
      x: Math.round(image.naturalWidth * (crop.x / 100)),
      y: Math.round(image.naturalHeight * (crop.y / 100)),
      width: Math.round(image.naturalWidth * (crop.width / 100)),
      height: Math.round(image.naturalHeight * (crop.height / 100))
    };
    this.setState({
      cropValues: crop,
    });
    this.onCropChange(crop, pixelCrop);
  }

  handleCrop = () => {
    const canvas = document.createElement('canvas');
    canvas.width = this.pixelCrop.width;
    canvas.height = this.pixelCrop.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      this.image,
      this.pixelCrop.x,
      this.pixelCrop.y,
      this.pixelCrop.width,
      this.pixelCrop.height,
      0,
      0,
      this.pixelCrop.width,
      this.pixelCrop.height,
    );
    const base64Image = canvas.toDataURL('image/jpeg');
    canvas.toBlob(file => {
      this.setState({ avatar: { ...this.state.avatar, file: file } })
      if (this.props.autoUpload) {
        this.setState({ avatarUploading: true });
        this.uploadImage(file, this.state.extension)
          .then(() => {
            this.setState({
              avatarUploading: false,
            })
          })
      }
    }, 'image/jpeg');
    this.setState({ avatar: { ...this.state.avatar, image: base64Image }, cropMode: false });
  }


  onCropChange = (cropValues, pixelCrop) => {
    this.pixelCrop = pixelCrop;
    this.setState({ cropValues: { ...cropValues, aspect: 1 } });
  }

  renderCropper = () => {
    if (this.state.cropImage) {
      return (
        <Popup
          closePopUp={() => this.setState({ cropMode: false })}
        >
          <AvatarContainer.CropperWrapper>
            <Cropper
              src={this.state.cropImage}
              crop={this.state.cropValues}
              keepSelection
              onImageLoaded={this.setCropImage}
              onChange={this.onCropChange}
            />
            <AvatarContainer.CropperButton onClick={this.handleCrop}>Crop</AvatarContainer.CropperButton>
          </AvatarContainer.CropperWrapper>
        </Popup>
      );
    }
    return null;
  }

  async onFileChange() {
    this.setState({ imageError: false })
    const file = document.getElementById('avatar').files[0];
    const allowedExtensions = /((\.jpeg)|(\.jpg)|(\.png))$/i;
    if (!allowedExtensions.exec(document.getElementById('avatar').value)) {
      this.setState({ imageError: { extensionError: true } });
    }

    else {
      if (file) {
        const correctResolution = await this.checkResolution(file);
        if (correctResolution) {
          await this.getImageData(file)
        } else {
          this.setState({ imageError: { sizeError: true } });
        }
      }
    }
  }



  async getImageData(file) {
    const extension = file.type.split('/')[1];
    const reader = new FileReader();
    const exif = await this.getExif(file);
    this.currentExif = exif;
    reader.onload = () => {
      this.convertBeforeCrop(reader.result);
      this.setState({ cropMode: true, extension });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
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

  convertBeforeCrop = (imageURL) => {
    const image = new Image();
    image.onload = function () {
      let imageRatio = this.originalWidth/this.originalHeight;
      const width = 500; // Fixed width for image crop view
      const height = 500/imageRatio;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      switch (this.currentExif) {
        case 2:
          ctx.translate(height, 0);
          ctx.scale(-1, 1);
          break;

        case 3:
          ctx.translate(width, height);
          ctx.rotate(180 * Math.PI / 180);
          break;

        case 4:
          ctx.translate(0, height);
          ctx.scale(1, -1);
          break;

        case 5:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(90 * Math.PI / 180);
          ctx.scale(1, -1);
          break;

        case 6:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(90 * Math.PI / 180);
          ctx.translate(0, -height);
          break;

        case 7:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(-90 * Math.PI / 180);
          ctx.translate(-width, height);
          ctx.scale(1, -1);
          break;

        case 8:
          canvas.width = height;
          canvas.height = width;
          ctx.translate(0, width);
          ctx.rotate(-90 * Math.PI / 180);
          break;
      }
      ctx.drawImage(
        image,
        0,
        0,
        width,
        height,
      );
      const base64Image = canvas.toDataURL('image/jpeg');
      this.setState({ cropImage: base64Image })
    }.bind(this);
    image.src = imageURL;
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

  uploadImage(file, extension) {
    return fetch(Api.getImageCredentials(extension), {
      'headers': { 'Authorization': `token ${this.props.session.auth_token.authentication_token}` }
    })
      .then(response => {
        let filename = response.data.data.fields.key.split('/');

        filename = filename[2];
        if (localStorage) {
          localStorage.setItem('avatarName', filename);
        }
        const formData = new FormData()
        formData.append('success_action_status', response.data.data.fields.success_action_status);
        formData.append('signature', response.data.data.fields.signature);
        formData.append('x-amz-security-token', response.data.data.fields["x-amz-security-token"]);
        formData.append('acl', response.data.data.fields.acl);
        formData.append('Access-Control-Allow-Origin', response.data.data.fields["Access-Control-Allow-Origin"]);
        formData.append('policy', response.data.data.fields.policy);
        formData.append('key', response.data.data.fields.key);
        formData.append('AWSAccessKeyId', response.data.data.fields.AWSAccessKeyId);
        formData.append('file', file);
        return { formData, url: response.data.data.url }
      })
      .then(response => axios.post(response.url, response.formData));
  }

  FullscreenUploader = () => {
    const borderRadius = '100px';
    return (
      <AvatarContainer.FullScreenUploadWrapper >
        <AvatarContainer.Image src={this.state.avatar.image} style={{ borderRadius }} />
        <AvatarContainer.FullScreenUploadButton onClick={() => { }} />
        {this.props.celebrity ? null
          :
          <AvatarContainer.FullScreenUploadInput accept=".png, .jpeg, .jpg" id="avatar" onChange={() => this.onFileChange()} type="file" />
        }
      </AvatarContainer.FullScreenUploadWrapper>
    );
  }

  renderErrorPopup = () => {
    let errorMessage;
    if (this.state.imageError.extensionError) {
      errorMessage = "Invalid file format. Please upload image in .png, .jpg, or .jpeg format."
    }
    else {
      errorMessage = "Please check the image dimension displayed and upload an image with minimum required dimension."
    }
    return (
      <Popup
        smallPopup
        closePopUp={() => this.setState({ imageError: false })}
      >
        <AvatarContainer.PopupErrorText> {errorMessage} </AvatarContainer.PopupErrorText>
      </Popup>
    );
  }
  render() {
    return (
      <AvatarContainer.AvatarContainer>
        {
          this.state.avatarUploading &&
          <AvatarContainer.loaderWrapper>
            <Loader />
          </AvatarContainer.loaderWrapper>
        }
        {this.state.imageError.extensionError || this.state.imageError.sizeError ?
          this.renderErrorPopup()
          : null
        }
        {
          this.state.cropMode && this.renderCropper()
        }
        <AvatarContainer.Avatar imageType="avatar" image={this.state.avatar.image}>
          {this.state.avatar.image != null ?
            this.FullscreenUploader() :
            <AvatarContainer.UploadWrapper>
              <AvatarContainer.UploadButton style={{ visibility: 'hidden' }} onClick={() => { }} />
              {this.props.celebrity ? null
                :
                <AvatarContainer.UploadInput accept=".png, .jpeg, .jpg" id="avatar" onChange={() => this.onFileChange()} type="file" />}

            </AvatarContainer.UploadWrapper>
          }
        </AvatarContainer.Avatar>
        <AvatarContainer.HeadingWrapper>
          <AvatarContainer.CaptionText>At least 100x100 </AvatarContainer.CaptionText>
        </AvatarContainer.HeadingWrapper>
      </AvatarContainer.AvatarContainer>
    )
  }
}

