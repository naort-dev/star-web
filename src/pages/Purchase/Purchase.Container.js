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
    starsonaRequest: (bookingData, publicStatus, callback) => {
      dispatch(starsonaRequest(bookingData, publicStatus, callback));
    },
    createCharge: (starsonaId, amount, tokenId, callBack) => {
      dispatch(createCharge(starsonaId, amount, tokenId, callBack));
    },
    fetchSourceList: () => {
      dispatch(fetchSourceList());
    },
    fetchCelebDetails: (id) => {
      dispatch(fetchCelebDetails(id));
    },
    modifySourceList: (source, customer, action, callBack) => {
      dispatch(modifySourceList(source, customer, action, callBack));
    },
    updateCustomerId: (value) => {
      dispatch(updateCustomerId(value));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Purchase);
