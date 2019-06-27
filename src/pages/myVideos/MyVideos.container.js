import { connect } from 'react-redux';
import { fetchMyVideosList } from './actions/getMyVideosList';
import { fetchRecentActivity } from './actions/getRecentActivity';
import { toggleBookingModal } from '../../store/shared/actions/toggleModals';
import MyVideos from './MyVideos.component';

const mapStateToProps = state => ({
  myVideosList: state.myVideos.myVideosList,
  recentActivity: state.myVideos.recentActivity,
  config: state.config.data,
});

const mapDispatchToProps = dispatch => ({
  fetchMyVideosList: (offset, refresh, requestStatus) =>
    dispatch(fetchMyVideosList(offset, refresh, requestStatus)),
  toggleBookingModal: (state, bookingData, starMode) =>
    dispatch(toggleBookingModal(state, bookingData, starMode)),
  fetchRecentActivity: () => dispatch(fetchRecentActivity()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyVideos);
