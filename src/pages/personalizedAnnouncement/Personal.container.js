import { connect } from 'react-redux';
import Personal from './Personal.component';
import { fetchOccasionlist } from '../eventAnnouncement/actions/getOccasionList';


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

export default connect(mapStateToProps, mapDispatchToProps)(Personal);
