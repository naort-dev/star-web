import { connect } from 'react-redux';

import Starprofile from './Starprofile.component';
import { fetchCelebDetails } from './actions/getCelebDetails';
import { fetchCelebVideosList } from './actions/getCelebVideos';

const mapStateToProps = state => ({
  celebrityDetails: state.celebDetails.celebrityDetails,
  userDetails: state.celebDetails.userDetails,
  videosList: state.celebVideos,
});

const mapDispatchToProps = dispatch => ({
  fetchCelebDetails: id => dispatch(fetchCelebDetails(id)),
  fetchCelebVideosList: (offset, refresh, id, requestType) => dispatch(fetchCelebVideosList(offset, refresh, id, requestType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Starprofile);
