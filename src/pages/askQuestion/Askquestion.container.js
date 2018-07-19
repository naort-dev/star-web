import { connect } from 'react-redux';
import Askquestion from './Askquestion.component';
import { startRecording, stopRecording, playVideo, reRecord, clearStreams } from '../../store/shared/actions/videoRecorder'

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  loading: state.session.loading,
  celebrityDetails: state.celebDetails.celebrityDetails,
  userDetails: state.celebDetails.userDetails,
  videoRecorder: state.videoRecorder,
});

const mapDispatchToProps = dispatch => ({
  onStartRecording: () => dispatch(startRecording()),
  onStopRecording: (recordedVideo) => dispatch(stopRecording(recordedVideo)),
  onPlayVideo: () => dispatch(playVideo()),
  onRerecord: () => dispatch(reRecord()),
  onClearStreams: () => dispatch(clearStreams())
});

export default connect(mapStateToProps, mapDispatchToProps)(Askquestion);
