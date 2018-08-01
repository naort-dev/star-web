import React from 'react';
import { AvatarContainer } from './styled';
import { getAWSCredentials } from '../../utils/AWSUpload';
import Api from '../../lib/api';
import { fetch } from '../../services/fetch';
import axios from 'axios';

export default class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { avatar: { image: this.props.image, file: null } };
  }

  onFileChange() {
    const file = document.getElementById('avatar').files[0];
    const extension = file.type.split('/')[1];
    if(this.props.autoUpload){
      this.uploadImage(file, extension);
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ avatar: { ...this.state.avatar, image: reader.result, file } });
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
        if(localStorage){
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
        <AvatarContainer.FullScreenUploadInput accept=".png, .jpeg, .jpg" id="avatar" onChange={() => this.onFileChange()} type="file" />
      </AvatarContainer.FullScreenUploadWrapper>
    );
  }

  render() {
    return (
      <AvatarContainer.AvatarContainer>
        <AvatarContainer.Avatar imageType="avatar" image={this.state.avatar.image}>
          {this.state.avatar.image != null ?
            this.FullscreenUploader() :
            <AvatarContainer.UploadWrapper>
              <AvatarContainer.UploadButton style={{ visibility: 'hidden' }} onClick={() => { }} />
              <AvatarContainer.UploadInput accept=".png, .jpeg, .jpg" id="avatar" onChange={() => this.onFileChange()} type="file" />
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

