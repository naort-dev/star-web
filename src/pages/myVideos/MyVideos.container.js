import { connect } from 'react-redux';

import MyVideos from './MyVideos.component';
import { fetchMyVideosList } from './actions/getMyVideosList';
import { changeRequestStatus, responseVideo, requestFetchStart, requestFetchEnd } from './actions/handleRequests';
import { startRecording, stopRecording, playVideo, reRecord, clearStreams } from '../../store/shared/actions/videoRecorder';
import { saveVideo } from '../../store/shared/actions/videoUploader';
import { rateCelebrity, contactSupport, reportAbuse } from '../../store/shared/actions/popupActions';
import { setBookingDetails, cancelBookingDetails } from '../../store/shared/actions/storeBooking';
import { updateUserDetails } from '../../store/shared/actions/saveSettings';
import { fetchCelebDetails } from '../starProfile/actions/getCelebDetails';
import { saveAudioRecording } from '../../store/shared/actions/audioRecorder';
import { setRequestFlow } from '../../store/shared/actions/toggleModals';


const mapStateToProps = state => ({
  professionsList: state.professionsList,
  session: state.session,
  starAvailability: state.userDetails.settings_celebrityDetails ? state.userDetails.settings_celebrityDetails.availability : false,
  userDetails: state.userDetails,
  myVideosList: state.myVideosList,
  videoRecorder: state.videoRecorder,
  videoUploader: state.videoUploader,
  orderDetailsLoading: state.requestHandler.loading,
});

const mapDispatchToProps = dispatch => ({
  fetchMyVideosList: (offset, refresh, role, requestStatus) => dispatch(fetchMyVideosList(offset, refresh, role, requestStatus)),
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
  saveAudioRecording: (target, audio) => dispatch(saveAudioRecording(target, audio)),
  reportAbuse: data => dispatch(reportAbuse(data)),
  setBookingDetails: data => dispatch(setBookingDetails(data)),
  cancelBookingDetails: () => dispatch(cancelBookingDetails()),
  updateUserDetails: (id, data) => dispatch(updateUserDetails(id, data)),
  fetchCelebDetails: id => dispatch(fetchCelebDetails(id)),
  setRequestFlow: (celebId, requestType, step) => dispatch(setRequestFlow(celebId, requestType, step)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyVideos);
