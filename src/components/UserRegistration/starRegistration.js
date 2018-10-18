import React from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';
import { fetch } from '../../services/fetch';
import GroupStyled from './styled';
import { celebritySignupProfile, updateSocialLinks } from '../../services/userRegistration';
import StarDetailsEntry from './modules/starDetailsEntry';
import ProfileUpload from './modules/profileUpload';
import CoverUpload from './modules/coverUpload';
import { imageSizes } from '../../constants/imageSizes';
import QAVideoRecorder from '../QAVideoRecorder';
import { recorder } from '../../constants/videoRecorder';
import getAWSCredentials from '../../utils/AWSUpload'
import { locations } from '../../constants/locations';
import Loader from '../Loader';
/* Import Actions */
import { saveImage } from '../../store/shared/actions/imageViewer';
import { startRecording, stopRecording, playVideo, reRecord, clearStreams } from '../../store/shared/actions/videoRecorder';
import { saveVideo, uploadVideo, deleteVideo } from '../../store/shared/actions/videoUploader';
import { fetchUserDetails } from '../../store/shared/actions/getUserDetails';
import { updateUserDetails, resetUserDetails } from '../../store/shared/actions/saveSettings';
import { updateNotification, resetNotification } from '../../store/shared/actions/updateNotification';
import { updateProfilePhoto, resetProfilePhoto } from '../../store/shared/actions/updateProfilePhoto';
import { changePassword, resetChangePassord } from '../../store/shared/actions/changePassword';
import { logOutUser } from '../../store/shared/actions/login';

class starRegistrationComponent extends React.Component {
  state = {
    celebrityDetails: null,
    industryList: [],
    videoUrl: null,
    professionsArray: [],
    featuredImage: {
      fileName: null,
      image: null,
    },
    profileImage: {
      fileName: null,
      image: null,
    },
  }

  componentWillMount() {
    fetch('user/professions/').then((response) => {
      let dropDownList = [];
      response.data.data.professions.map((profObj) => {
        dropDownList.push({ value: profObj.id, label: profObj.title });
        profObj.child.map((childObj) => {
          dropDownList.push({ value: childObj.id, label: childObj.title });
        });
      });
      return dropDownList;
    })
      .then(industryItem => this.setState({ industryList: industryItem }))
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

  getVideo = () => {
    this.setState({ loader: true });
    let uploadVideo;
    if (this.props.videoUploader.savedFile != null) {
      uploadVideo = this.props.videoUploader.savedFile;
      this.setState({ videoUrl: this.props.videoUploader.url });
    } else {
      uploadVideo = new File([this.props.videoRecorder.recordedBuffer], 'profile.mp4');
      this.setState({ videoUrl: this.props.videoRecorder.recordedBlob });
    }
    getAWSCredentials(locations.askAwsVideoCredentials, this.props.session.auth_token.authentication_token, uploadVideo)
      .then((response) => {
        if (response && response.filename) {
          axios.post(response.url, response.formData).then(() => {
            const celebrityProfileData = {
              ...this.state.celebrityDetails,
              profile_video: response.filename,
            }
            celebritySignupProfile(celebrityProfileData)
              .then((success) => {
                this.setState({ loader: false })
                if (success) {
                  this.props.changeStep(this.props.currentStep + 1);
                }
              })
          });
        }
      });
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
    this.props.changeStep(this.props.currentStep + 1);
  }

  submitAccountDetails = (celebrityDetails, socialLinks) => {
    const selectedProfessions = celebrityDetails.profession;
    const professionsArray = this.state.industryList.filter((profession) => {
      return selectedProfessions.indexOf(profession.value.toString()) > -1;
    });
    updateSocialLinks(socialLinks);
    this.setState({ celebrityDetails, professionsArray });
    this.props.changeStep(this.props.currentStep + 1);
  }

  render() {
    return (
      <GroupStyled>
        {
          this.props.currentStep >= 3 &&
            <GroupStyled.BackButton onClick={() => this.props.changeStep(this.props.currentStep - 1)} />
        }
        {
          this.state.loader ?
            <Loader />
          :
            <Scrollbars
              ref={node => {this.scrollRef = node;}}
              autoHide={false}
            >
              <GroupStyled.ContentWrapper>
                <GroupStyled.StepWrapper visible={this.props.currentStep === 2}>
                  <StarDetailsEntry
                    industryList={this.state.industryList}
                    submitAccountDetails={this.submitAccountDetails}
                  />
                </GroupStyled.StepWrapper>
                <GroupStyled.StepWrapper visible={this.props.currentStep === 3}>
                  <ProfileUpload
                    starMode
                    onComplete={(fileName, image) => this.setProfileImage(fileName, image)}
                  />
                </GroupStyled.StepWrapper>
                <GroupStyled.StepWrapper visible={this.props.currentStep === 4}>
                  <CoverUpload
                    visible={this.props.currentStep === 4}
                    starMode
                    professionsList={this.state.professionsArray}
                    scrollRef={this.scrollRef}
                    profileImage={this.state.profileImage.image}
                    featuredRatio={imageSizes.featured}
                    secondaryRatio={imageSizes.first}
                    groupName={this.props.userDetails.settings_userDetails.first_name}
                    onComplete={(imageType, fileName, image) => this.setCoverImage(imageType, fileName, image)}
                    onImageUpload={(secondaryImages, skip) => this.imageUpload(secondaryImages, skip)}
                  />
                </GroupStyled.StepWrapper>
                {
                  this.props.currentStep === 5 &&
                    <QAVideoRecorder
                      {...this.props}
                      src={this.state.videoUrl}
                      responseMode
                      recordTitle={() => `Hi Starsona team, this is a quick video to verify that I am "the real" ${this.props.userDetails.settings_userDetails.first_name}`}
                      duration={recorder.signUpTimeOut}
                      onSubmit={this.getVideo}
                    />
                }
                {
                  this.props.currentStep === 6 && (
                    <React.Fragment>
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
                          onClick={() => this.props.closeSignupFlow()}
                        >
                          Done
                        </GroupStyled.ControlButton>
                      </GroupStyled.DoneButtonWrapper>
                    </React.Fragment>
                  )
                }
              </GroupStyled.ContentWrapper>
            </Scrollbars>
        }
      </GroupStyled>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
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
  deleteVideo: () => dispatch(deleteVideo()),
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