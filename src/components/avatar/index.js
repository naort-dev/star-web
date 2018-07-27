import React from 'react';
import { AvatarContainer } from './styled';

export default class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { avatar: { image: this.props.image, file: null } };
  }

  onFileChange() {
    const file = document.getElementById('avatar').files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ avatar: { ...this.state.avatar, image: reader.result, file } });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
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

