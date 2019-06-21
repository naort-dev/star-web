import { connect } from 'react-redux';
import { fetchBookingsList } from './actions/getBookingsList';
import { fetchRecentActivity } from './actions/getRecentActivity';
import { toggleBookingModal } from '../../store/shared/actions/toggleModals';
import Bookings from './Bookings.component';

const mapStateToProps = state => ({
  bookingsList: state.bookings.bookingsList,
  recentActivity: state.bookings.recentActivity,
  config: state.config.data,
});

const mapDispatchToProps = dispatch => ({
  fetchBookingsList: (offset, refresh, requestStatus, filterParam, sortParam) =>
    dispatch(fetchBookingsList(offset, refresh, requestStatus, filterParam, sortParam)),
  toggleBookingModal: (state, bookingData, starMode) =>
    dispatch(toggleBookingModal(state, bookingData, starMode)),
    fetchRecentActivity: () => dispatch(fetchRecentActivity()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Bookings);
