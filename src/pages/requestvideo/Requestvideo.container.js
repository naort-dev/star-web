import { connect } from 'react-redux';
import Requestvideo from './Requestvideo.component';
import { setRedirectUrls } from '../../store/shared/actions/setRedirectReferrer';
import { cancelBookingDetails } from '../../store/shared/actions/storeBooking';
import { clearAll } from '../../store/shared/actions/audioRecorder';
import { clearStreams } from '../../store/shared/actions/videoRecorder';
import { fetchCelebDetails } from '../starProfile/actions/getCelebDetails';
import { deleteVideo } from '../../store/shared/actions/videoUploader';
import { toggleLogin, resetRequestFlow, setRequestFlow, toggleRequestFlow } from '../../store/shared/actions/toggleModals';

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  loading: state.session.loading,
  celebrityDetails: state.celebDetails.celebrityDetails,
  userDetails: state.celebDetails.userDetails,
  celebId: state.modals.requestFlowDetails.celebId,
  requestType: state.modals.requestFlowDetails.type,
  stepCount: state.modals.requestFlowDetails.step
});

const mapDispatchToProps = dispatch => ({
  fetchCelebDetails: id => dispatch(fetchCelebDetails(id)),
  setRedirectUrls: (to, from) => dispatch(setRedirectUrls(to, from)),
  cancelBookingDetails: () => dispatch(cancelBookingDetails()),
  toggleLogin: state => dispatch(toggleLogin(state)),
  clearAll: () => dispatch(clearAll()),
  onClearStreams: () => dispatch(clearStreams()),
  resetRequestFlow: () => dispatch(resetRequestFlow()),
  toggleRequestFlow: state => dispatch(toggleRequestFlow(state)),
  setRequestFlow: (celebId, requestType, step) => dispatch(setRequestFlow(celebId, requestType, step)),
  deleteVideo: () => dispatch(deleteVideo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Requestvideo);
