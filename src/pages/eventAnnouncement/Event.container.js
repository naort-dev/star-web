import { connect } from 'react-redux';
import Event from './Event.component';
import { fetchOccasionlist } from './actions/getOccasionList';
import { setBookingDetails } from '../../store/shared/actions/storeBooking';


const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  loading: state.session.loading,
  celebrityDetails: state.celebDetails.celebrityDetails,
  userDetails: state.celebDetails.userDetails,
  eventsDetails: state.occasionList.data,
});

const mapDispatchToProps = dispatch => ({
  fetchOccasionlist: id => dispatch(fetchOccasionlist(id)),
  setBookingDetails: data => dispatch(setBookingDetails(data)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Event);
