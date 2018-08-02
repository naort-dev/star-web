import { connect } from 'react-redux';
import Confirm from './Confirm.component';
import { setBookingDetails, cancelBookingDetails } from '../../store/shared/actions/storeBooking';
import { resetPaymentDetails } from '../../store/shared/actions/processPayments';
import { setRedirectUrls } from '../../store/shared/actions/setRedirectReferrer';
import { starsonaRequest } from '../../store/shared/actions/processPayments';


const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  authToken: state.session.auth_token.authentication_token,
  loading: state.paymentDetails.loading,
  celebrityDetails: state.celebDetails.celebrityDetails,
  userDetails: state.celebDetails.userDetails,
  eventsDetails: state.occasionList.data,
  bookingData: state.bookingData,
  paymentStatus: state.paymentDetails.paymentStatus,
});

const mapDispatchToProps = dispatch => ({
  setBookingDetails: data => dispatch(setBookingDetails(data)),
  cancelBookingDetails: () => dispatch(cancelBookingDetails()),
  starsonaRequest: (bookingData, publicStatus, callback) => dispatch(starsonaRequest(bookingData, publicStatus, callback)),
  resetPaymentDetails: () => dispatch(resetPaymentDetails()),
  setRedirectUrls: (to, from) => dispatch(setRedirectUrls(to, from)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
