import { connect } from 'react-redux';

import Starprofile from './Starprofile.component';
import { fetchCelebDetails, resetCelebDetails } from './actions/getCelebDetails';
import { fetchCelebVideosList, celebVideosListFetchStart } from './actions/getCelebVideos';
import { toggleLogin } from '../../store/shared/actions/toggleModals';

const mapStateToProps = state => ({
  celebrityDetails: state.celebDetails.celebrityDetails,
  userDetails: state.celebDetails.userDetails,
  detailsLoading: state.celebDetails.loading,
  detailsError: state.celebDetails.error,
  videosList: state.celebVideos,
  isLoggedIn: state.session,
});

const mapDispatchToProps = dispatch => ({
  fetchCelebDetails: id => dispatch(fetchCelebDetails(id)),
  resetCelebDetails: () => dispatch(resetCelebDetails()),
  toggleLogin: state => dispatch(toggleLogin(state)),
  fetchCelebVideosList: (offset, refresh, id, requestType) => dispatch(fetchCelebVideosList(offset, refresh, id, requestType)),
  celebVideosListFetchStart: () => dispatch(celebVideosListFetchStart(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Starprofile);
