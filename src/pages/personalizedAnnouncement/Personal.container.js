import { connect } from 'react-redux';
import Personal from './Personal.component';
import { fetchOccasionlist } from '../eventAnnouncement/actions/getOccasionList';
import { setBookingDetails, cancelBookingDetails } from '../../store/shared/actions/storeBooking';
import { showRecorder, startAudioRecording, saveAudioRecording, deviceCheck, stopAudioRecording, showFallback, saveAudioFile, closeRecorder, clearAll } from '../../store/shared/actions/audioRecorder';
import { postOtherRelation } from '../../store/shared/actions/otherRelation';

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  loading: state.session.loading,
  loginDetails: state.session.auth_token,
  celebrityDetails: state.celebDetails.celebrityDetails,
  userDetails: state.celebDetails.userDetails,
  eventsDetails: state.occasionList.data,
  bookingData: state.bookingData,
  otherRelationData: state.otherRelation.data,
  audioRecorder: state.audioRecorder,
});

const mapDispatchToProps = dispatch => ({
  fetchOccasionlist: id => dispatch(fetchOccasionlist(id)),
  setBookingDetails: data => dispatch(setBookingDetails(data)),
  cancelBookingDetails: () => dispatch(cancelBookingDetails()),
  postOtherRelation: other => dispatch(postOtherRelation(other)),
  showRecorder: displayText => dispatch(showRecorder(displayText)),
  showFallback: displayText => dispatch(showFallback(displayText)),
  startAudioRecording: () => dispatch(startAudioRecording()),
  stopAudioRecording: () => dispatch(stopAudioRecording()),
  saveAudioFile: audio => dispatch(saveAudioFile(audio)),
  saveAudioRecording: (target, audio) => dispatch(saveAudioRecording(target, audio)),
  closeRecorder: () => dispatch(closeRecorder()),
  clearAll: () => dispatch(clearAll()),
  deviceCheck: (status) => dispatch(deviceCheck(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Personal);
