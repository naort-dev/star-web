import { connect } from 'react-redux';
import Confirm from './Confirm.component';
import { setBookingDetails, cancelBookingDetails } from '../../store/shared/actions/storeBooking';
import { setRedirectUrls } from '../../store/shared/actions/setRedirectReferrer';
import { requestVideo } from '../../store/shared/actions/processPayments';


const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  authToken: state.session.auth_token.authentication_token,
  loading: state.session.loading,
  celebrityDetails: state.celebDetails.celebrityDetails,
  userDetails: state.celebDetails.userDetails,
  eventsDetails: state.occasionList.data,
  bookingData: state.bookingData,
});

const mapDispatchToProps = dispatch => ({
  setBookingDetails: data => dispatch(setBookingDetails(data)),
  cancelBookingDetails: () => dispatch(cancelBookingDetails()),
  requestVideo: (bookingData, publicStatus) => dispatch(requestVideo(bookingData, publicStatus)),
  setRedirectUrls: (to, from) => dispatch(setRedirectUrls(to, from)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
