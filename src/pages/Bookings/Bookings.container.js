import { connect } from 'react-redux';
import { fetchBookingsList } from './actions/getBookingsList';
import { toggleBookingModal } from '../../store/shared/actions/toggleModals';
import Bookings from './Bookings.component';


const mapStateToProps = state => ({
  bookingsList: state.bookingsList,
  config: state.config.data,
});

const mapDispatchToProps = dispatch => ({
  fetchBookingsList: (offset, refresh, requestStatus) => dispatch(fetchBookingsList(offset, refresh, requestStatus)),
  toggleBookingModal: (state, bookingData, starMode) => dispatch(toggleBookingModal(state, bookingData, starMode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bookings);
