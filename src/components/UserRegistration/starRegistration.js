import React from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import GroupStyled from './styled';
import StarDetailsEntry from './modules/starDetailsEntry';
import ProfileUpload from './modules/profileUpload';
import CoverUpload from './modules/coverUpload';
import { imageSizes } from '../../constants/imageSizes';
import QAVideoRecorder from '../QAVideoRecorder';
import { recorder } from '../../constants/videoRecorder';
/* Import Actions */
import { saveImage } from '../../store/shared/actions/imageViewer';
import { startRecording, stopRecording, playVideo, reRecord, clearStreams } from '../../store/shared/actions/videoRecorder';
import { saveVideo, uploadVideo } from '../../store/shared/actions/videoUploader';
import { fetchUserDetails } from '../../store/shared/actions/getUserDetails';
import { updateUserDetails, resetUserDetails } from '../../store/shared/actions/saveSettings';
import { updateNotification, resetNotification } from '../../store/shared/actions/updateNotification';
import { updateProfilePhoto, resetProfilePhoto } from '../../store/shared/actions/updateProfilePhoto';
import { changePassword, resetChangePassord } from '../../store/shared/actions/changePassword';
import { logOutUser } from '../../store/shared/actions/login';

class starRegistrationComponent extends React.Component {
  state = {
    celebrityDetails: null,
    featuredImage: {
      fileName: null,
      image: null,
    },
    profileImage: {
      fileName: null,
      image: null,
    },
  }

  setProfileImage = (fileName, image) => {
    this.setState({
      profileImage: {
        ...this.state.profileImage,
        fileName,
        image,
      },
    });
    this.props.changeStep(this.props.currentStep + 1);
  }

  setCoverImage = (imagetype, fileName, image) => {
    this.setState({
      [imagetype]: {
        ...this.state[imagetype],
        fileName,
        image,
      },
    });
  }

  submitAccountDetails = (celebrityDetails) => {
    this.setState({ celebrityDetails });
    this.props.changeStep(this.props.currentStep + 1);
  };

  imageUpload = (secondaryImages) => {
    const secondaryFileNames = secondaryImages.map((item) => {
      if (item.fileName) {
        return item.fileName;
      }
    });
    const profileImage = {
      avatar_photo: this.state.profileImage.fileName,
      images: [this.state.profileImage.fileName, ...secondaryFileNames],
    };
    if (this.state.featuredImage.fileName) {
      profileImage['featured_image'] = this.state.featuredImage.fileName;
      profileImage.images = [...profileImage.images, this.state.featuredImage.fileName];
    }
    this.props.updateProfilePhoto(profileImage)
      .then(() => {
        this.props.fetchUserDetails(this.props.userDetails.settings_userDetails.id);
      });
    this.props.changeStep(this.props.currentStep + 1);
  }

  render() {
    return (
      <GroupStyled>
        <Scrollbars autoHide={false}>
          <GroupStyled.ContentWrapper>
            {
              this.props.currentStep === 2 && (
                <StarDetailsEntry
                  submitAccountDetails={this.submitAccountDetails}
                />
            )}
            {
              this.props.currentStep === 3 && (
                <ProfileUpload
                  onComplete={(fileName, image) => this.setProfileImage(fileName, image)}
                />
              )
            }
            {
              this.props.currentStep === 4 && (
                <CoverUpload
                  profileImage={this.state.profileImage.image}
                  imageRatio={imageSizes.featured}
                  groupName={this.props.userDetails.first_name}
                  onComplete={(imageType, fileName, image) => this.setCoverImage(imageType, fileName, image)}
                  onImageUpload={secondaryImages => this.imageUpload(secondaryImages)}
                />
              )
            }
            {
              this.props.currentStep === 5 && (
                <QAVideoRecorder {...this.props} duration={recorder.signUpTimeOut} onSubmit={this.handleBooking} />
              )
            }
          </GroupStyled.ContentWrapper>
        </Scrollbars>
      </GroupStyled>
    );
  }
}

const mapStateToProps = state => ({
  imageViewer: state.imageViewer,
  userDetails: state.userDetails,
  videoRecorder: state.videoRecorder,
  videoUploader: state.videoUploader,
  settingsSave: state.saveSettings,
  stripeRegistration: state.stripeRegistration,
  changePasswordData: state.changePassword,
  profileUploadStatus: state.photoUpload.profileUploadStatus,
});

const mapDispatchToProps = dispatch => ({
  fetchUserDetails: id => dispatch(fetchUserDetails(id)),
  resetUserDetails: () => dispatch(resetUserDetails()),
  resetNotification: () => dispatch(resetNotification()),
  resetProfilePhoto: () => dispatch(resetProfilePhoto()),
  onStartRecording: () => dispatch(startRecording()),
  onStopRecording: recordedVideo => dispatch(stopRecording(recordedVideo)),
  onPlayVideo: () => dispatch(playVideo()),
  onRerecord: () => dispatch(reRecord()),
  onClearStreams: () => dispatch(clearStreams()),
  onSaveVideo: videoFile => dispatch(saveVideo(videoFile)),
  uploadVideo: () => dispatch(uploadVideo()),
  onSaveImage: imageData => dispatch(saveImage(imageData)),
  updateUserDetails: (id, obj) => dispatch(updateUserDetails(id, obj)),
  updateNotification: obj => dispatch(updateNotification(obj)),
  updateProfilePhoto: obj => dispatch(updateProfilePhoto(obj)),
  changePassword: data => dispatch(changePassword(data)),
  logOut: () => dispatch(logOutUser()),
  resetChangePassord: () => dispatch(resetChangePassord()),
});

export const StarRegistration =  connect(mapStateToProps, mapDispatchToProps)(starRegistrationComponent);
