import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SubHeader from '../../../SubHeader';
import { TextInput } from '../../../TextField';
import ProfileUpload from '../../../signupFlow/components/SignUpImageUpload/components/profileUpload';
import TakePhoto from '../../../signupFlow/components/SignUpImageUpload/components/takePhoto';
import { imageSizes } from '../../../../constants/imageSizes';
import ImageCropper from '../../../ImageCropper';
import { awsImageUpload } from '../../../../services/awsImageUpload';
import {
  updateProfilePhoto,
  setProfilePicToState,
} from '../../../../store/shared/actions/updateProfilePhoto';
import { updateUserDetails } from '../../../../store/shared/actions/saveSettings';
import { BackArrow, CloseButton } from '../../../../styles/CommonStyled';
import PrimaryButton from '../../../../components/PrimaryButton';
import { UploadContainer, ImageUpload, Layout } from './styled';

class NameAndPhoto extends React.Component {
  state = {
    name: this.props.userDetails.settings_userDetails.nick_name
      ? this.props.userDetails.settings_userDetails.nick_name
      : '',
    currentExif: null,
    verificationDisable: false,
    cropper: false,
    finalImage: this.props.userDetails.settings_userDetails.avatar_photo
      .thumbnail_url,
    finalFile: null,
    cropImage: null,
    extension: null,
    takePicture: false,
    isContinue: false,
  };

  setTakePicture = () => {
    // this.props.scrollRef.scrollTop = 0;
    this.setState({ takePicture: true, cropper: false });
  };

  setProfileImage = (imageResult, exif, extension) => {
    // this.props.scrollRef.scrollTop = 0;
    this.setState({
      cropper: true,
      currentExif: exif,
      cropImage: imageResult,
      extension,
      takePicture: false,
    });
  };

  getCroppedImage = (file, image) => {
    this.setState({ finalImage: image, finalFile: file });
  };

  uploadImage = () => {
    const file = this.state.finalFile;
    const finalUserDetails = {
      celebrity_details: {},
      user_details: {
        nick_name: this.state.name && this.state.name.trim(''),
        show_nick_name:
          this.state.name && this.state.name.trim('') ? true : false,
      },
    };
    if (this.state.extension) {
      awsImageUpload(file, this.state.extension)
        .then(resp => {
          const fileName = {
            images: [resp],
            avatar_photo: resp,
            featured_image: '',
          };
          this.props.updateProfilePhoto(fileName).then(resp => {
            if (resp.avatar_photo) {
              // this.props.setSignupFlow({
              //   profileImage: resp.avatar_photo.image_url,
              // })
            }
          });
          const fileURL = URL.createObjectURL(file);
          this.props.setProfilePicToState(fileURL);
        })
        .catch(() => {});
    }
    this.props.updateUserDetails(
      this.props.userDetails.settings_userDetails.id,
      finalUserDetails,
    );
  };

  handleFieldChange = (fieldType, fieldValue) => {
    this.setState({
      [fieldType]: fieldValue,
    });
  };

  closeCropper = () => {
    // this.props.scrollRef.scrollTop = 0;
    this.setState({
      cropImage: null,
      cropper: false,
      takePicture: false,
      showBrowseCategory: false,
    });
  };

  primaryButtonClick = () => {
    this.uploadImage();
  };
  render() {
    return (
      <Layout>
<section className="name-photo-wrap">

        <Layout.SubheaderWrap>
          <SubHeader
            className="subheader"
            size="24px"
            headercolor="orangePink"
            heading="Name & Photo"
            onClick={this.props.goBack}
          />
        </Layout.SubheaderWrap>
        <Layout.InputWrap>
          <span className="name-text">Name that is shown on your profile</span>
          <TextInput
            placeholder="Nick Name"
            value={this.state.name}
            fullWidth={true}
            type="text"
            name="name"
            onChange={event => {
              this.handleFieldChange('name', event.target.value);
            }}
          />
        </Layout.InputWrap>
        {this.state.cropper && (
          <UploadContainer.CropperContainer>
            <BackArrow className="action-buttons" onClick={this.onBack} />
            <CloseButton className="action-buttons" onClick={this.onBack} />
            <ImageUpload.CropWrapper className="cropper-Wrapper">
              <ImageCropper
                onTakePicture={this.setTakePicture}
                onUploadComplete={this.setProfileImage}
                exifData={this.state.currentExif}
                aspectRatio={imageSizes.profile}
                afterCrop={this.getCroppedImage}
                closeCropper={this.closeCropper}
                cropImage={this.state.cropImage}
              />
            </ImageUpload.CropWrapper>
          </UploadContainer.CropperContainer>
        )}
        {this.state.takePicture && (
          <UploadContainer.CropperContainer>
            <ImageUpload.CropWrapper>
              <BackArrow className="action-buttons" onClick={this.onBack} />
              <CloseButton className="action-buttons" onClick={this.onBack} />
              <ImageUpload.Heading>Take your photo</ImageUpload.Heading>
              <TakePhoto
                takePicture={this.state.takePicture}
                onPictureCapture={this.setProfileImage}
              />
            </ImageUpload.CropWrapper>
          </UploadContainer.CropperContainer>
        )}

        {!this.state.takePicture && !this.state.cropper && (
          <UploadContainer.ProfileUploadWrap>
            <ProfileUpload
              starMode
              onTakePicture={this.setTakePicture}
              onComplete={this.setProfileImage}
              image={this.state.finalImage}
              updateProfilePhoto={this.props.updateProfilePhoto}
              multiline={true}
              className="profileupload"
            />
          </UploadContainer.ProfileUploadWrap>
        )}
        <Layout.ButtonWrapper className="align-center">
          <PrimaryButton
            className="save-button"
            onClick={this.primaryButtonClick}
          >
            Save
          </PrimaryButton>
        </Layout.ButtonWrapper>

</section>
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  userDetails: state.userDetails,
});

const mapDispatchToProps = dispatch => ({
  updateProfilePhoto: obj => dispatch(updateProfilePhoto(obj)),
  setProfilePicToState: obj => dispatch(setProfilePicToState(obj)),
  updateUserDetails: (id, obj) => dispatch(updateUserDetails(id, obj)),
});

NameAndPhoto.propTypes = {};
const NameAndPhotoRoot = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NameAndPhoto);
export { NameAndPhotoRoot };

// export { NameAndPhoto };
