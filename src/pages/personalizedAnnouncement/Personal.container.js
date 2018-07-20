import { connect } from 'react-redux';
import Personal from './Personal.component';
import { fetchOccasionlist } from '../eventAnnouncement/actions/getOccasionList';
import { setBookingDetails, cancelBookingDetails } from '../../store/shared/actions/storeBooking';
import { postOtherRelation } from '../../store/shared/actions/otherRelation';

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  loading: state.session.loading,
  loginDetails: state.session.auth_token,
  celebrityDetails: state.celebDetails.celebrityDetails,
  userDetails: state.celebDetails.userDetails,
  eventsDetails: state.occasionList.data,
  bookingData: state.bookingData,
  otherRelationData: state.otherRelation.data,
});

const mapDispatchToProps = dispatch => ({
  fetchOccasionlist: id => dispatch(fetchOccasionlist(id)),
  setBookingDetails: data => dispatch(setBookingDetails(data)),
  cancelBookingDetails: () => dispatch(cancelBookingDetails()),
  postOtherRelation: other => dispatch(postOtherRelation(other)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Personal);
