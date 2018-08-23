import { connect } from 'react-redux';

import Starprofile from './Starprofile.component';
import { fetchCelebDetails, resetCelebDetails } from './actions/getCelebDetails';
import { fetchCelebVideosList } from './actions/getCelebVideos';
import { toggleLogin, toggleRequestFlow, setRequestFlow } from '../../store/shared/actions/toggleModals';

const mapStateToProps = state => ({
  celebrityDetails: state.celebDetails.celebrityDetails,
  userDetails: state.celebDetails.userDetails,
  detailsLoading: state.celebDetails.loading,
  detailsError: state.celebDetails.error,
  videosList: state.celebVideos,
  requestFlowDetails: state.modals.requestFlowDetails,
  isLoggedIn: state.session.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  fetchCelebDetails: id => dispatch(fetchCelebDetails(id)),
  resetCelebDetails: () => dispatch(resetCelebDetails()),
  toggleLogin: state => dispatch(toggleLogin(state)),
  fetchCelebVideosList: (offset, refresh, id, requestType) => dispatch(fetchCelebVideosList(offset, refresh, id, requestType)),
  toggleRequestFlow: state => dispatch(toggleRequestFlow(state)),
  setRequestFlow: (celebId, requestType, step) => dispatch(setRequestFlow(celebId, requestType, step)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Starprofile);
