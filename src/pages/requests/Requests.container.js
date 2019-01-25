import { connect } from 'react-redux';

import Requests from './Requests.component';
import { fetchMyVideosList, myVideosListReset, updateVideosList } from './actions/getMyVideosList';
import { changeRequestStatus, responseVideo, requestFetchStart, requestFetchEnd, requestFetchFailed } from './actions/handleRequests';
import { startRecording, stopRecording, playVideo, reRecord, clearStreams } from '../../store/shared/actions/videoRecorder';
import { saveVideo, deleteVideo } from '../../store/shared/actions/videoUploader';
import { rateCelebrity, contactSupport, reportAbuse } from '../../store/shared/actions/popupActions';
import { setBookingDetails, cancelBookingDetails } from '../../store/shared/actions/storeBooking';
import { updateUserDetails } from '../../store/shared/actions/saveSettings';
import { fetchCelebDetails } from '../starProfile/actions/getCelebDetails';
import { saveAudioRecording } from '../../store/shared/actions/audioRecorder';
import { setRequestFlow } from '../../store/shared/actions/toggleModals';
import { resetPaymentDetails } from '../../store/shared/actions/processPayments';

const mapStateToProps = state => ({
  professionsList: state.professionsList,
  session: state.session,
  requestsList: state.myVideosList.data,
  requestsLimit: state.myVideosList.limit,
  requestsOffset: state.myVideosList.offset,
  requestsCount: state.myVideosList.count,
  requestsLoading: state.myVideosList.loading,
  videoRecorder: state.videoRecorder,
  videoUploader: state.videoUploader,
  orderDetailsLoading: state.requestHandler.loading,
});

const mapDispatchToProps = dispatch => ({
  myVideosListReset: () => dispatch(myVideosListReset()),
  fetchMyVideosList: (offset, refresh, role, requestStatus, allDataType) => dispatch(fetchMyVideosList(offset, refresh, role, requestStatus, allDataType)),
  updateVideosList: (id, data) => dispatch(updateVideosList(id, data)),
  onStartRecording: () => dispatch(startRecording()),
  onStopRecording: (recordedVideo) => dispatch(stopRecording(recordedVideo)),
  onPlayVideo: () => dispatch(playVideo()),
  onRerecord: () => dispatch(reRecord()),
  onClearStreams: () => dispatch(clearStreams()),
  requestFetchStart: () => dispatch(requestFetchStart()),
  requestFetchEnd: () => dispatch(requestFetchEnd()),
  requestFetchFailed: () => dispatch(requestFetchFailed()),
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
  deleteVideo: () => dispatch(deleteVideo()),
  setRequestFlow: (celebId, requestType, step) => dispatch(setRequestFlow(celebId, requestType, step)),
  resetPaymentDetails: () => dispatch(resetPaymentDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Requests);
