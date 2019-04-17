import { connect } from 'react-redux';
import Purchase from './Purchase.Component';
import { fetchOccasionlist } from './actions/purchaseActions';
import {
  recordTrigger,
  updateMediaStore,
  playPauseMedia,
  loaderAction,
} from '../../store/shared/actions/commonActions';

import { setVideoUploadedFlag } from './actions/purchaseActions';

const mapStateToProps = (state) => ({
  OccasionDetails: state.occasionList.data,
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
    loaderAction: (value) => {
      dispatch(loaderAction(value));
    },
    fetchOccasionlist: (id) => {
      dispatch(fetchOccasionlist(id));
    },
    setVideoUploadedFlag: (value) => {
      dispatch(setVideoUploadedFlag(value));
    },
  };
}
export default connect(
  null,
  mapDispatchToProps,
)(Purchase);
