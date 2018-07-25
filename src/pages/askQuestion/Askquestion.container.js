import { connect } from 'react-redux';
import Askquestion from './Askquestion.component';
import { startRecording, stopRecording, playVideo, reRecord, clearStreams } from '../../store/shared/actions/videoRecorder';
import { setRedirectUrls } from '../../store/shared/actions/setRedirectReferrer';
import { setBookingDetails, cancelBookingDetails } from '../../store/shared/actions/storeBooking';
import { saveVideo, deleteVideo } from '../../store/shared/actions/videoUploader';

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  loading: state.session.loading,
  celebrityDetails: state.celebDetails.celebrityDetails,
  userDetails: state.celebDetails.userDetails,
  videoRecorder: state.videoRecorder,
  session: state.session,
  videoUploader: state.videoUploader,
});

const mapDispatchToProps = dispatch => ({
  onStartRecording: () => dispatch(startRecording()),
  onStopRecording: recordedVideo => dispatch(stopRecording(recordedVideo)),
  onPlayVideo: () => dispatch(playVideo()),
  onRerecord: () => dispatch(reRecord()),
  onClearStreams: () => dispatch(clearStreams()),
  setRedirectUrls: (to, from) => dispatch(setRedirectUrls(to, from)),
  setBookingDetails: data => dispatch(setBookingDetails(data)),
  cancelBookingDetails: () => dispatch(cancelBookingDetails()),
  onSaveVideo: videoFile => dispatch(saveVideo(videoFile)),
  deleteVideo: () => dispatch(deleteVideo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Askquestion);
