import { connect } from 'react-redux';
import Confirm from './Confirm.component';
import { setBookingDetails, cancelBookingDetails } from '../../store/shared/actions/storeBooking';
import { setRedirectUrls } from '../../store/shared/actions/setRedirectReferrer';
import { fetchCelebDetails } from '../starProfile/actions/getCelebDetails';
import { starsonaRequest, resetPaymentDetails } from '../../store/shared/actions/processPayments';
import { clearAll } from '../../store/shared/actions/audioRecorder';
import { deleteVideo } from '../../store/shared/actions/videoUploader';
import { clearStreams } from '../../store/shared/actions/videoRecorder'
import { resetRequestFlow } from '../../store/shared/actions/toggleModals';


const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  authToken: state.session.auth_token.authentication_token,
  loading: state.paymentDetails.loading,
  fromAudio: state.audioRecorder.recorded.from,
  toAudio: state.audioRecorder.recorded.for,
  celebrityDetails: state.celebDetails.celebrityDetails,
  userDetails: state.celebDetails.userDetails,
  eventsDetails: state.occasionList.data,
  bookingData: state.bookingData,
  paymentStatus: state.paymentDetails.paymentStatus,
  audioRecorder: state.audioRecorder,
});

const mapDispatchToProps = dispatch => ({
  fetchCelebDetails: id => dispatch(fetchCelebDetails(id)),
  setBookingDetails: data => dispatch(setBookingDetails(data)),
  cancelBookingDetails: () => dispatch(cancelBookingDetails()),
  starsonaRequest: (bookingData, publicStatus, callback) => dispatch(starsonaRequest(bookingData, publicStatus, callback)),
  resetPaymentDetails: () => dispatch(resetPaymentDetails()),
  setRedirectUrls: (to, from) => dispatch(setRedirectUrls(to, from)),
  resetRequestFlow: () => dispatch(resetRequestFlow()),
  clearAudio: () => dispatch(clearAll()),
  onClearStreams: () => dispatch(clearStreams()),
  deleteVideo: () => dispatch(deleteVideo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
