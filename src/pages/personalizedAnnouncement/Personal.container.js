import { connect } from 'react-redux';
import Personal from './Personal.component';
import { fetchCelebDetails, resetCelebDetails } from '../starProfile/actions/getCelebDetails';
import { fetchOccasionlist } from '../eventAnnouncement/actions/getOccasionList';


const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  loading: state.session.loading,
  celebrityDetails: state.celebDetails.celebrityDetails,
  userDetails: state.celebDetails.userDetails,
  eventsDetails: state.occasionList.data,
});

const mapDispatchToProps = dispatch => ({
  fetchCelebDetails: id => dispatch(fetchCelebDetails(id)),
  resetCelebDetails: () => dispatch(resetCelebDetails()),
  fetchOccasionlist: id => dispatch(fetchOccasionlist(id)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Personal);
