import { connect } from 'react-redux';
import Askquestion from './Askquestion.component';
import { fetchCelebDetails, resetCelebDetails } from '../starProfile/actions/getCelebDetails';

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  loading: state.session.loading,
  celebrityDetails: state.celebDetails.celebrityDetails,
  userDetails: state.celebDetails.userDetails,
});

const mapDispatchToProps = dispatch => ({
  fetchCelebDetails: id => dispatch(fetchCelebDetails(id)),
  resetCelebDetails: () => dispatch(resetCelebDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Askquestion);
