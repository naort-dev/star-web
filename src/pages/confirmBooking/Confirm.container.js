import { connect } from 'react-redux';
import Confirm from './Confirm.component';
import { setBookingDetails } from '../../store/shared/actions/storeBooking';


const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  loading: state.session.loading,
  celebrityDetails: state.celebDetails.celebrityDetails,
  userDetails: state.celebDetails.userDetails,
  eventsDetails: state.occasionList.data,
  bookingData: state.bookingData,
});

const mapDispatchToProps = dispatch => ({
  setBookingDetails: data => dispatch(setBookingDetails(data)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
