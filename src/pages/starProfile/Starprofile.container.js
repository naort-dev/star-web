import { connect } from 'react-redux';

import Starprofile from './Starprofile.component';
import { fetchCelebDetails, resetCelebDetails } from './actions/getCelebDetails';
import { fetchCelebVideosList } from './actions/getCelebVideos';
import { toggleLogin, toggleRequestFlow, setRequestFlow } from '../../store/shared/actions/toggleModals';
import { followCelebrity, updateFavouritesQueue } from '../../store/shared/actions/followCelebrity';

const mapStateToProps = state => ({
  celebrityDetails: state.celebDetails.celebrityDetails,
  userDetails: state.celebDetails.userDetails,
  detailsLoading: state.celebDetails.loading,
  detailsError: state.celebDetails.error,
  videosList: state.celebVideos,
  requestFlowDetails: state.modals.requestFlowDetails,
  isLoggedIn: state.session.isLoggedIn,
  professionsList: state.professionsList,
});

const mapDispatchToProps = dispatch => ({
  fetchCelebDetails: id => dispatch(fetchCelebDetails(id)),
  resetCelebDetails: () => dispatch(resetCelebDetails()),
  toggleLogin: state => dispatch(toggleLogin(state)),
  fetchCelebVideosList: (offset, refresh, id, requestType) => dispatch(fetchCelebVideosList(offset, refresh, id, requestType)),
  toggleRequestFlow: state => dispatch(toggleRequestFlow(state)),
  setRequestFlow: (celebId, requestType, step) => dispatch(setRequestFlow(celebId, requestType, step)),
  followCelebrity: (celebId, celebProfessions, follow) => dispatch(followCelebrity(celebId, celebProfessions, follow)),
  updateFavouritesQueue: (celebId, celebProfessions, follow) => dispatch(updateFavouritesQueue(celebId, celebProfessions, follow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Starprofile);
