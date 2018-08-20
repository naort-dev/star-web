import React from 'react';
import Cropper, { makeAspectCrop } from 'react-image-crop';
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
    this.state = { avatar: { image: this.props.image, file: null }, cropMode: false, avatarUploading: false };
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

  onFileChange() {
    const file = document.getElementById('avatar').files[0];
    const extension = file.type.split('/')[1];
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ cropMode: true, cropImage: reader.result, extension });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
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
        {  this.props.celebrity ? null
        :
        <AvatarContainer.FullScreenUploadInput accept=".png, .jpeg, .jpg" id="avatar" onChange={() => this.onFileChange()} type="file" />
        }
      </AvatarContainer.FullScreenUploadWrapper>
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
        {
          this.state.cropMode && this.renderCropper()
        }
        <AvatarContainer.Avatar imageType="avatar" image={this.state.avatar.image}>
          {this.state.avatar.image != null ?
            this.FullscreenUploader() :
            <AvatarContainer.UploadWrapper>
              <AvatarContainer.UploadButton style={{ visibility: 'hidden' }} onClick={() => { }} />
              {  this.props.celebrity ? null
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

