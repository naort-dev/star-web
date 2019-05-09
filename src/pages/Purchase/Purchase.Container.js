import { connect } from 'react-redux';
import Purchase from './Purchase.Component';
import {
  recordTrigger,
  updateMediaStore,
  playPauseMedia,
  loaderAction,
  setVideoUploadedFlag,
  updateToast,
} from '../../store/shared/actions/commonActions';
import {
  resetRecording,
  saveAudioRecording,
  clearAll,
} from '../../store/shared/actions/audioRecorder';
import {
  fetchOccasionlist,
  pageCountHandler,
  updateBookingData,
} from './actions/purchaseActions';
import {
  toggleRequestFlow,
  toggleLogin,
} from '../../store/shared/actions/toggleModals';
import { starsonaRequest } from '../../store/shared/actions/processPayments';
import { fetchCelebDetails } from '../starProfile/actions/getCelebDetails';

const mapStateToProps = state => ({
  OccasionDetails: state.occasionList.data,
  audioRecorder: state.audioRecorder,
  celebDetails: state.starDetails.celebDetails.celebrityDetails,
  userDetails: state.starDetails.celebDetails.userDetails,
});

function mapDispatchToProps(dispatch) {
  return {
    recordTrigger: () => {
      dispatch(recordTrigger());
    },
    updateMediaStore: payload => {
      dispatch(updateMediaStore(payload));
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
    toggleRequestFlow: state => {
      dispatch(toggleRequestFlow(state));
    },
    starsonaRequest: (bookingData, publicStatus, callback) => {
      dispatch(starsonaRequest(bookingData, publicStatus, callback));
    },
    fetchCelebDetails: id => {
      dispatch(fetchCelebDetails(id));
    },
    pageCountHandler: value => {
      dispatch(pageCountHandler(value));
    },
    updateBookingData: data => {
      dispatch(updateBookingData(data));
    },
    toggleLogin: state => dispatch(toggleLogin(state)),
    updateToast: toastObj => dispatch(updateToast(toastObj)),
    clearAll: () => {
      dispatch(clearAll());
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Purchase);
