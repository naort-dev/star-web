import { connect } from 'react-redux';

import Starprofile from './Starprofile.component';
import { fetchCelebDetails, resetCelebDetails } from './actions/getCelebDetails';
import { fetchCelebVideosList } from './actions/getCelebVideos';

const mapStateToProps = state => ({
  celebrityDetails: state.celebDetails.celebrityDetails,
  userDetails: state.celebDetails.userDetails,
  detailsLoading: state.celebDetails.loading,
  videosList: state.celebVideos,
  isLoggedIn: state.session,
});

const mapDispatchToProps = dispatch => ({
  fetchCelebDetails: id => dispatch(fetchCelebDetails(id)),
  resetCelebDetails: () => dispatch(resetCelebDetails()),
  fetchCelebVideosList: (offset, refresh, id, requestType) => dispatch(fetchCelebVideosList(offset, refresh, id, requestType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Starprofile);
