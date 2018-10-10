import React from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import GroupStyled from './styled';
import StarDetailsEntry from './modules/starDetailsEntry';
import ProfileUpload from './modules/profileUpload';
import CoverUpload from './modules/coverUpload';
/* Import Actions */
import { saveImage } from '../../store/shared/actions/imageViewer';
import { startRecording, stopRecording, playVideo, reRecord, clearStreams } from '../../store/shared/actions/videoRecorder';
import { saveVideo, uploadVideo } from '../../store/shared/actions/videoUploader';
import { fetchUserDetails } from '../../store/shared/actions/getUserDetails';
import { updateUserDetails, resetUserDetails } from '../../store/shared/actions/saveSettings';
import { updateNotification, resetNotification } from '../../store/shared/actions/updateNotification';
import { updateProfilePhoto, resetProfilePhoto } from '../../store/shared/actions/updateProfilePhoto';
import { fetchURL, checkStripe } from '../../store/shared/actions/stripeRegistration';
import { changePassword, resetChangePassord } from '../../store/shared/actions/changePassword';
import { logOutUser } from '../../store/shared/actions/login';

class starRegistrationComponent extends React.Component {
  state = {

  }
  render() {
    return (
      <GroupStyled>
        <Scrollbars autoHide={false}>
          <GroupStyled.ContentWrapper>
            {
              this.props.currentStep === 2 && (
                <StarDetailsEntry
                  groupTypes={this.props.groupTypes}
                  submitGroupDetails={this.submitGroupAccountDetails}
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
                  groupName={this.props.userDetails.first_name}
                  onComplete={(imageType, fileName, image) => this.setCoverImage(imageType, fileName, image)}
                  onImageUpload={secondaryImages => this.imageUpload(secondaryImages)}
                />
              )
            }
            {
              this.props.currentStep === 5 && (
                <React.Fragment>
                  <GroupStyled.HeadingWrapper>
                    <GroupStyled.SubHeading>
                      Your group profile has been created!
                    </GroupStyled.SubHeading>
                    <GroupStyled.SubHeadingDescription>
                      Now what do we do?
                    </GroupStyled.SubHeadingDescription>
                  </GroupStyled.HeadingWrapper>
                  <GroupStyled.ConfirmationWrapper>
                    <GroupStyled.ConfirmationHead>Most groups choose to do 3 things:</GroupStyled.ConfirmationHead>
                    <GroupStyled.confirmationSteps>
                      1.  Invite your Stars who are already on Starsona to join your group.
                    </GroupStyled.confirmationSteps>
                    <GroupStyled.confirmationSteps>
                      2.  Invite other Stars who support you to join Starsona.
                    </GroupStyled.confirmationSteps>
                    <GroupStyled.confirmationSteps>
                      3.  Let fans know about your group page.
                    </GroupStyled.confirmationSteps>
                  </GroupStyled.ConfirmationWrapper>
                  <GroupStyled.DoneButtonWrapper>
                    <GroupStyled.DoneButton
                      onClick={() => this.props.closeSignupFlow()}
                    >
                      Done
                    </GroupStyled.DoneButton>
                  </GroupStyled.DoneButtonWrapper>
                </React.Fragment>
              )
            }
          </GroupStyled.ContentWrapper>
        </Scrollbars>
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
  onRerecord: () => dispatch(reRecord()),
  onClearStreams: () => dispatch(clearStreams()),
  onSaveVideo: videoFile => dispatch(saveVideo(videoFile)),
  uploadVideo: () => dispatch(uploadVideo()),
  onSaveImage: imageData => dispatch(saveImage(imageData)),
  updateUserDetails: (id, obj) => dispatch(updateUserDetails(id, obj)),
  updateNotification: obj => dispatch(updateNotification(obj)),
  updateProfilePhoto: obj => dispatch(updateProfilePhoto(obj)),
  fetchURL: () => dispatch(fetchURL()),
  checkStripe: () => dispatch(checkStripe()),
  changePassword: data => dispatch(changePassword(data)),
  logOut: () => dispatch(logOutUser()),
  resetChangePassord: () => dispatch(resetChangePassord()),
});

export const StarRegistration =  connect(mapStateToProps, mapDispatchToProps)(starRegistrationComponent);
