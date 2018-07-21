import { connect } from 'react-redux';
import Askquestion from './Askquestion.component';
import { startRecording, stopRecording, playVideo, reRecord, clearStreams } from '../../store/shared/actions/videoRecorder';
import { setRedirectUrls } from '../../store/shared/actions/setRedirectReferrer';

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  loading: state.session.loading,
  celebrityDetails: state.celebDetails.celebrityDetails,
  userDetails: state.celebDetails.userDetails,
  videoRecorder: state.videoRecorder,
  session: state.session
});

const mapDispatchToProps = dispatch => ({
  onStartRecording: () => dispatch(startRecording()),
  onStopRecording: (recordedVideo) => dispatch(stopRecording(recordedVideo)),
  onPlayVideo: () => dispatch(playVideo()),
  onRerecord: () => dispatch(reRecord()),
  onClearStreams: () => dispatch(clearStreams()),
  setRedirectUrls: (to, from) => dispatch(setRedirectUrls(to, from)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Askquestion);
