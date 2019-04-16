import { connect } from 'react-redux';
import Purchase from './Purchase.Component';
import {
  recordTrigger,
  updateMediaStore,
  playPauseMedia,
} from '../../store/shared/actions/commonActions';

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
  };
}
export default connect(
  null,
  mapDispatchToProps,
)(Purchase);
