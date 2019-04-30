import { connect } from 'react-redux';
import Purchase from './Purchase.Component';
import { fetchOccasionlist } from './actions/purchaseActions';
import {
  recordTrigger,
  updateMediaStore,
  playPauseMedia,
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
    fetchOccasionlist: id => dispatch(fetchOccasionlist(id)),
    saveAudioRecording: (target, audio) => dispatch(saveAudioRecording(target, audio)),
    resetRecording: target => dispatch(resetRecording(target)),

  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Purchase);
