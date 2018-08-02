import { connect } from 'react-redux';

import MyVideos from './MyVideos.component';
import { fetchMyVideosList } from './actions/getMyVideosList';
import { changeRequestStatus, responseVideo, requestFetchStart, requestFetchEnd } from './actions/handleRequests';
import { startRecording, stopRecording, playVideo, reRecord, clearStreams } from '../../store/shared/actions/videoRecorder';
import { saveVideo } from '../../store/shared/actions/videoUploader';
import { rateCelebrity, contactSupport, reportAbuse } from '../../store/shared/actions/popupActions'

const mapStateToProps = state => ({
  professionsList: state.professionsList,
  session: state.session,
  myVideosList: state.myVideosList,
  videoRecorder: state.videoRecorder,
  videoUploader: state.videoUploader,
  orderDetailsLoading: state.requestHandler.loading,
});

const mapDispatchToProps = dispatch => ({
  fetchMyVideosList: (offset, refresh, requestStatus) => dispatch(fetchMyVideosList(offset, refresh, requestStatus)),
  onStartRecording: () => dispatch(startRecording()),
  onStopRecording: (recordedVideo) => dispatch(stopRecording(recordedVideo)),
  onPlayVideo: () => dispatch(playVideo()),
  onRerecord: () => dispatch(reRecord()),
  onClearStreams: () => dispatch(clearStreams()),
  requestFetchStart: () => dispatch(requestFetchStart()),
  requestFetchEnd: () => dispatch(requestFetchEnd()),
  changeRequestStatus: (requestId, requestStatus, comment) => dispatch(changeRequestStatus(requestId, requestStatus, comment)),
  onSaveVideo: (videoFile) => dispatch(saveVideo(videoFile)),
  responseVideo: (requestId, fileName) => dispatch(responseVideo(requestId, fileName)),
  rateCelebrity: data => dispatch(rateCelebrity(data)),
  contactSupport: data => dispatch(contactSupport(data)),
  reportAbuse: data => dispatch(reportAbuse(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyVideos);
