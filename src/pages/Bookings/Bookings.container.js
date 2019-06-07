import { connect } from 'react-redux';
import { fetchBookingsList } from './actions/getBookingsList';
import Bookings from './Bookings.component';


const mapStateToProps = state => ({
  bookingsList: state.bookingsList,
  config: state.config.data,
});

const mapDispatchToProps = dispatch => ({
  fetchBookingsList: (offset, refresh, requestStatus) => dispatch(fetchBookingsList(offset, refresh, requestStatus)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bookings);
