import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Starbio from './Starbio.component';
import { saveImage } from '../../store/shared/actions/imageViewer';
import { startRecording, stopRecording, playVideo, reRecord, clearStreams } from '../../store/shared/actions/videoRecorder'
import { saveVideo, uploadVideo } from '../../store/shared/actions/videoUploader';
import { fetchUserDetails } from '../../store/shared/actions/getUserDetails';
import { updateUserDetails, resetUserDetails } from '../../store/shared/actions/saveSettings';
import { updateNotification, resetNotification } from '../../store/shared/actions/updateNotification';
import { updateProfilePhoto, resetProfilePhoto } from '../../store/shared/actions/updateProfilePhoto';

const mapStateToProps = state => ({
  session: state.session,
  imageViewer: state.imageViewer,
  userDetails: state.userDetails,
  videoRecorder: state.videoRecorder,
  videoUploader: state.videoUploader,
  settingsSave: state.saveSettings,
});

const mapDispatchToProps = dispatch => ({
  fetchUserDetails: id => dispatch(fetchUserDetails(id)),
  resetUserDetails: () => dispatch(resetUserDetails()),
  resetNotification: () => dispatch(resetNotification()),
  resetProfilePhoto: () => dispatch(resetProfilePhoto()),
  onStartRecording: () => dispatch(startRecording()),
  onStopRecording: (recordedVideo) => dispatch(stopRecording(recordedVideo)),
  onPlayVideo: () => dispatch(playVideo()),
  onRerecord: () => dispatch(reRecord()),
  onClearStreams: () => dispatch(clearStreams()),
  onSaveVideo: (videoFile) => dispatch(saveVideo(videoFile)),
  uploadVideo: () => dispatch(uploadVideo()),
  onSaveImage: imageData => dispatch(saveImage(imageData)),
  updateUserDetails: (id, obj) => dispatch(updateUserDetails(id, obj)),
  updateNotification: obj => dispatch(updateNotification(obj)),
  updateProfilePhoto: obj => dispatch(updateProfilePhoto(obj)),

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Starbio));

