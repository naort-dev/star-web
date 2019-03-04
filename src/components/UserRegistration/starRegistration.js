import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import GroupStyled from './styled';
import { celebritySignupProfile, updateSocialLinks } from '../../services/userRegistration';

/*   Modules   */
import StarDetailsEntry from './modules/starDetailsEntry';
import ProfileUpload from './modules/profileUpload';
import CoverUpload from './modules/coverUpload';
import StarNotifications from './modules/starNotifications';
import AddRepresentative from './modules/addRepresentative';
/*             */
import { imageSizes } from '../../constants/imageSizes';
import QAVideoRecorder from '../QAVideoRecorder';
import { recorder } from '../../constants/videoRecorder';
import getAWSCredentials from '../../utils/AWSUpload';
import { locations } from '../../constants/locations';
import Loader from '../Loader';
/* Import Actions */
import { saveImage } from '../../store/shared/actions/imageViewer';
import { celebrityFollowStatus } from '../../store/shared/actions/followGroupCelebrity';
import { fetchAllProfessions } from '../../store/shared/actions/getProfessions';
import { startRecording, stopRecording, playVideo, reRecord, clearStreams } from '../../store/shared/actions/videoRecorder';
import { saveVideo, uploadVideo, deleteVideo } from '../../store/shared/actions/videoUploader';
import { fetchUserDetails } from '../../store/shared/actions/getUserDetails';
import { updateUserDetails, resetUserDetails } from '../../store/shared/actions/saveSettings';
import { updateProfilePhoto, resetProfilePhoto } from '../../store/shared/actions/updateProfilePhoto';
import { updateNotification } from '../../store/shared/actions/updateNotification';

class starRegistrationComponent extends React.Component {
  state = {
    celebrityDetails: null,
    videoUrl: null,
    professionsArray: [],
    followedGroups: '',
    featuredImage: {
      fileName: null,
      image: null,
    },
    profileImage: {
      fileName: null,
      image: null,
    },
    verificationDisable: false,
  }

  componentWillMount() {
    this.props.fetchAllProfessions();
  }

  setProfileImage = (fileName, image) => {
    this.setState({
      profileImage: {
        ...this.state.profileImage,
        fileName,
        image,
      },
    });
    this.goToStep('next');
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

  getVideo = () => {
    this.setState({ loader: true });
    let uploadVideoFile;
    if (this.props.videoUploader.savedFile != null) {
      uploadVideoFile = this.props.videoUploader.savedFile;
      this.setState({ videoUrl: this.props.videoUploader.url });
    } else {
      uploadVideoFile = new File([this.props.videoRecorder.recordedBuffer], 'profile.mp4');
      this.setState({ videoUrl: this.props.videoRecorder.recordedBlob });
    }
    getAWSCredentials(locations.getAwsVideoCredentials, this.props.session.auth_token.authentication_token, uploadVideoFile)
      .then((response) => {
        if (response && response.filename) {
          axios.post(response.url, response.formData).then(() => {
            const celebrityProfileData = {
              ...this.state.celebrityDetails,
              profile_video: response.filename,
            };
            celebritySignupProfile(celebrityProfileData)
              .then((success) => {
                this.setState({ loader: false });
                if (success) {
                  this.goToStep('next');
                }
              })
              .catch(() => {
                this.setState({ loader: false });
              });
          })
            .catch(() => {
              this.setState({ loader: false });
            });
        }
      })
      .catch(() => {
        this.setState({ loader: false });
      });
  }

  closeSignupFlow = () => {
    const { followedGroups } = this.state;
    this.props.onClearStreams();
    this.props.deleteVideo();
    if (window.stream) {
      const tracks = window.stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    }
    if (followedGroups.length) {
      this.props.celebrityFollowStatus(followedGroups);
    }
    if (this.props.closeSignupFlow) {
      this.props.closeSignupFlow();
    }
  }

  imageUpload = (secondaryImages, skip) => {
    const secondaryFileNames = secondaryImages.map((item) => {
      if (item.fileName) {
        return item.fileName;
      }
    });
    const profileImage = {
      avatar_photo: this.state.profileImage.fileName,
      images: [this.state.profileImage.fileName],
    };
    if (!skip) {
      profileImage.images = [...profileImage.images, ...secondaryFileNames];
      if (this.state.featuredImage.fileName) {
        profileImage['featured_image'] = this.state.featuredImage.fileName;
        profileImage.images = [...profileImage.images, this.state.featuredImage.fileName];
      }
    }
    this.props.updateProfilePhoto(profileImage)
      .then(() => {
        this.props.fetchUserDetails(this.props.userDetails.settings_userDetails.id);
      });
      this.goToStep('next');
  }

  submitOTPForm = () => {
    this.goToStep('next');
  }

  submitNotifications = (notifications) => {
    const { notification_settings: currentNotifications } = this.props.userDetails.settings_userDetails;
    let newNotifications = {
      ...currentNotifications,
    };
    newNotifications = {
      ...newNotifications,
      email_notification: notifications.email_notification,
      mobile_notification: notifications.mobile_notification,
      secondary_email: notifications.secondary_email,
      mobile_number: notifications.mobile_number,
      mobile_country_code: notifications.mobile_country_code,
    };

    return this.props.updateNotification(newNotifications)
      .then((resp) => {
        if (resp.status == 200) {
          this.goToStep('next');
        }
      });
  }

  noRecordCallback = async () => {
    const { verificationDisable } = this.state;
    const celebrityProfileData = {
      ...this.state.celebrityDetails,
      profile_video: 'sample.mp4', // random file name
    };
    this.setState({ loader: true });
    try {
      await celebritySignupProfile(celebrityProfileData);
    } catch (e) {
      this.setState({ loader: false });
    }
    this.setState({ loader: false });
    if (!verificationDisable) {
      this.goToStep('next');
      this.setState({ verificationDisable: true });
    }
  }

  goToStep = (type) => {
    const { verificationDisable } = this.state;
    if (type === 'prev') {
      if (verificationDisable && this.props.currentStep === 8) {
        this.props.changeStep(this.props.currentStep - 2);
      } else {
        this.props.changeStep(this.props.currentStep - 1);
      }
    } else if (verificationDisable && this.props.currentStep === 6) {
      this.props.changeStep(this.props.currentStep + 2);
    } else {
      this.props.changeStep(this.props.currentStep + 1);
    }
  }

  submitAccountDetails = async (celebrityDetails, userDetails, socialLinks, groupIds) => {
    const professionsArray = celebrityDetails.profession;
    const newCelebrityDetails = {
      ...celebrityDetails,
      profession: celebrityDetails.profession.map(profession => profession.id.toString()),
    };
    const finalUserDetails = {
      celebrity_details: {},
      user_details: userDetails,
    };
    this.setState({ followedGroups: groupIds, loader: true });
    try {
      await updateSocialLinks(socialLinks);
      await this.props.updateUserDetails(this.props.userDetails.settings_userDetails.id, finalUserDetails);
    } catch (e) {
      this.setState({ loader: false });
    }
    this.setState({ celebrityDetails: newCelebrityDetails, professionsArray, loader: false });
    this.goToStep('next');
  }

  render() {
    const { verificationDisable } = this.state;
    return (
      <GroupStyled>
        {
          this.props.currentStep >= 3 &&
            <GroupStyled.BackButton
              onClick={() => this.goToStep('prev')}
            />
        }
        {
          this.state.loader &&
            <GroupStyled.MainLoaderWrapper>
              <Loader />
            </GroupStyled.MainLoaderWrapper>
        }
        <GroupStyled.ContentWrapper hide={this.state.loader}>
          <GroupStyled.StepWrapper visible={this.props.currentStep === 2}>
            <StarDetailsEntry
              inAppPriceList={this.props.inAppPriceList}
              submitAccountDetails={this.submitAccountDetails}
              closeSignupFlow={this.closeSignupFlow}
            />
          </GroupStyled.StepWrapper>
          <GroupStyled.StepWrapper visible={this.props.currentStep === 3}>
            <ProfileUpload
              starMode
              onComplete={this.setProfileImage}
            />
          </GroupStyled.StepWrapper>
          <GroupStyled.StepWrapper visible={this.props.currentStep === 4}>
            <CoverUpload
              visible={this.props.currentStep === 4}
              starMode
              professionsList={this.state.professionsArray}
              profileImage={this.state.profileImage.image}
              featuredRatio={imageSizes.featured}
              secondaryRatio={imageSizes.first}
              groupName={this.props.userDetails.settings_userDetails.first_name}
              onComplete={this.setCoverImage}
              onImageUpload={this.imageUpload}
            />
          </GroupStyled.StepWrapper>
          <GroupStyled.StepWrapper visible={this.props.currentStep === 5}>
            <StarNotifications
              onComplete={this.submitOTPForm}
            />
          </GroupStyled.StepWrapper>
          <GroupStyled.StepWrapper visible={this.props.currentStep === 6}>
            <AddRepresentative
              onComplete={this.submitNotifications}
              skipStep={this.submitOTPForm}
            />
          </GroupStyled.StepWrapper>
          {
            this.props.currentStep === 7 && !verificationDisable &&
              <GroupStyled.VideoRecorderWrapper>
                <GroupStyled.VerificationHead>Video verification</GroupStyled.VerificationHead>
                <QAVideoRecorder
                  {...this.props}
                  src={this.state.videoUrl}
                  responseMode
                  persistentTitle
                  recordPlaceHolder="Start recording"
                  recordTitle={() => `Hi Starsona team, this is a quick video to verify that I am "the real" ${this.props.userDetails.settings_userDetails.first_name}`}
                  duration={recorder.signUpTimeOut}
                  onSubmit={this.getVideo}
                  noRecordCallback={this.noRecordCallback}
                />
              </GroupStyled.VideoRecorderWrapper>
          }
          {
            this.props.currentStep === 8 && (
              <GroupStyled.DetailsWrapper>
                <GroupStyled.HeadingWrapper>
                  <GroupStyled.SubHeading>
                    Your Star profile has been created!
                  </GroupStyled.SubHeading>
                </GroupStyled.HeadingWrapper>
                <GroupStyled.SuccessText>
                  Congratulations, you just created your Star profile. Someone from our team will review your video to verify your identity. As soon as you are verified you can start accepting requests.</GroupStyled.SuccessText>
                <GroupStyled.SuccessTextBold>-    Starsona Team</GroupStyled.SuccessTextBold>
                <GroupStyled.DoneButtonWrapper>
                  <GroupStyled.ControlButton
                    onClick={this.closeSignupFlow}
                  >
                    Done
                  </GroupStyled.ControlButton>
                </GroupStyled.DoneButtonWrapper>
              </GroupStyled.DetailsWrapper>
            )
          }
        </GroupStyled.ContentWrapper>
      </GroupStyled>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
  inAppPriceList: state.config.data.in_app_pricing,
  imageViewer: state.imageViewer,
  userDetails: state.userDetails,
  videoRecorder: state.videoRecorder,
  videoUploader: state.videoUploader,
  settingsSave: state.saveSettings,
  stripeRegistration: state.stripeRegistration,
  profileUploadStatus: state.photoUpload.profileUploadStatus,
});

const mapDispatchToProps = dispatch => ({
  fetchUserDetails: id => dispatch(fetchUserDetails(id)),
  fetchAllProfessions: () => dispatch(fetchAllProfessions()),
  celebrityFollowStatus: id => dispatch(celebrityFollowStatus(id)),
  resetUserDetails: () => dispatch(resetUserDetails()),
  resetProfilePhoto: () => dispatch(resetProfilePhoto()),
  onStartRecording: () => dispatch(startRecording()),
  onStopRecording: recordedVideo => dispatch(stopRecording(recordedVideo)),
  onPlayVideo: () => dispatch(playVideo()),
  deleteVideo: () => dispatch(deleteVideo()),
  onRerecord: () => dispatch(reRecord()),
  onClearStreams: () => dispatch(clearStreams()),
  onSaveVideo: videoFile => dispatch(saveVideo(videoFile)),
  uploadVideo: () => dispatch(uploadVideo()),
  onSaveImage: imageData => dispatch(saveImage(imageData)),
  updateUserDetails: (id, obj) => dispatch(updateUserDetails(id, obj)),
  updateNotification: obj => dispatch(updateNotification(obj)),
  updateProfilePhoto: obj => dispatch(updateProfilePhoto(obj)),
});

export const StarRegistration = connect(
  mapStateToProps,
  mapDispatchToProps,
)(starRegistrationComponent);
