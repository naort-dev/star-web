import { connect } from 'react-redux';
import Purchase from './Purchase.Component';
import {
  recordTrigger,
  updateMediaStore,
  playPauseMedia,
  loaderAction,
  updateCustomerId,
} from '../../store/shared/actions/commonActions';
import {
  showRecorder,
  resetRecording,
  startAudioRecording,
  saveAudioRecording,
  deviceCheck,
  stopAudioRecording,
  showFallback,
  saveAudioFile,
  closeRecorder,
  clearAll
} from '../../store/shared/actions/audioRecorder';
import {
  setVideoUploadedFlag,
  fetchOccasionlist,
} from './actions/purchaseActions';
import {
  starsonaRequest,
  createCharge,
  fetchSourceList,
  modifySourceList,
} from '../../store/shared/actions/processPayments';
import { fetchCelebDetails } from '../starProfile/actions/getCelebDetails';

const mapStateToProps = state => ({
  OccasionDetails: state.occasionList.data,
  bookingData: state.bookingData,
  audioRecorder: state.audioRecorder,
});

function mapDispatchToProps(dispatch) {
  return {
    recordTrigger: () => {
      dispatch(recordTrigger());
    },
    updateMediaStore: (videoSrc, superBuffer) => {
      dispatch(updateMediaStore(videoSrc, superBuffer));
    },
    playPauseMedia: () => {
      dispatch(playPauseMedia());
    },
    loaderAction: value => {
      dispatch(loaderAction(value));
    },
    fetchOccasionlist: id => {
      dispatch(fetchOccasionlist(id));
    },
    saveAudioRecording: (target, audio) => {
      dispatch(saveAudioRecording(target, audio));
    },
    resetRecording: target => {
      dispatch(resetRecording(target));
    },
    setVideoUploadedFlag: value => {
      dispatch(setVideoUploadedFlag(value));
    },
    starsonaRequest: (bookingData, publicStatus, callback) => {
      dispatch(starsonaRequest(bookingData, publicStatus, callback));
    },
    fetchCelebDetails: id => {
      dispatch(fetchCelebDetails(id));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Purchase);
