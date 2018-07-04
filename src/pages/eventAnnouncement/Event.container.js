import { connect } from 'react-redux';
import Event from './Event.component';
import { fetchOccasionlist } from './actions/getOccasionList';


const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  loading: state.session.loading,
  celebrityDetails: state.celebDetails.celebrityDetails,
  userDetails: state.celebDetails.userDetails,
  eventsDetails: state.occasionList.data,
});

const mapDispatchToProps = dispatch => ({
  fetchOccasionlist: id => dispatch(fetchOccasionlist(id)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Event);
