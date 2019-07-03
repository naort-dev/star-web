import { connect } from 'react-redux';
import Askquestion from './Askquestion.component';
import { startRecording, stopRecording, playVideo, reRecord, clearStreams } from '../../store/shared/actions/videoRecorder';
import { setBookingDetails, cancelBookingDetails } from '../../store/shared/actions/storeBooking';
import { saveVideo, deleteVideo } from '../../store/shared/actions/videoUploader';
import { toggleRequestFlow } from '../../store/shared/actions/toggleModals';

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  loading: state.session.loading,
  celebrityDetails: state.celebDetails.celebrityDetails,
  userDetails: state.celebDetails.userDetails,
  videoRecorder: state.videoRecorder,
  bookingData: state.bookingData,
  session: state.session,
  videoUploader: state.videoUploader,
});

const mapDispatchToProps = dispatch => ({
  onStartRecording: () => dispatch(startRecording()),
  onStopRecording: recordedVideo => dispatch(stopRecording(recordedVideo)),
  onPlayVideo: () => dispatch(playVideo()),
  onRerecord: () => dispatch(reRecord()),
  onClearStreams: () => dispatch(clearStreams()),
  setBookingDetails: data => dispatch(setBookingDetails(data)),
  cancelBookingDetails: () => dispatch(cancelBookingDetails()),
  onSaveVideo: videoFile => dispatch(saveVideo(videoFile)),
  deleteVideo: () => dispatch(deleteVideo()),
  toggleRequestFlow: state => dispatch(toggleRequestFlow(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Askquestion);
