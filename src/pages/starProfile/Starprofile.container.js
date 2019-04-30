import { connect } from 'react-redux';

import StarProfile from './Starprofile.component';
import { fetchCelebDetails, resetCelebDetails } from './actions/getCelebDetails';
import { fetchStarDetails, resetStarDetails } from './actions';
import { fetchCelebVideosList } from './actions/getCelebVideos';
import { toggleLogin, toggleRequestFlow, setRequestFlow } from '../../store/shared/actions/toggleModals';
import { followCelebrity, updateFavouritesQueue } from '../../store/shared/actions/followCelebrity';

const mapStateToProps = state => ({
  celebDetails: state.starDetails.celebDetails.celebrityDetails,
  userDetails: state.starDetails.celebDetails.userDetails,
  detailsLoading: state.starDetails.celebDetails.loading,
  detailsError: state.starDetails.celebDetails.error,
  videosList: state.celebVideos,
  requestFlowDetails: state.modals.requestFlowDetails,
  isLoggedIn: state.session.isLoggedIn,
  professionsList: state.professionsList,
});
const mapDispatchToProps = dispatch => ({
  fetchStarDetails: id => dispatch(fetchStarDetails(id)),
  resetStarDetails: () => dispatch(resetStarDetails()),
  fetchCelebDetails: id => dispatch(fetchCelebDetails(id)),
  resetCelebDetails: () => dispatch(resetCelebDetails()),
  toggleLogin: state => dispatch(toggleLogin(state)),
  fetchCelebVideosList: (offset, refresh, id, requestType) => dispatch(fetchCelebVideosList(offset, refresh, id, requestType)),
  toggleRequestFlow: state => dispatch(toggleRequestFlow(state)),
  setRequestFlow: (celebId, requestType, step) => dispatch(setRequestFlow(celebId, requestType, step)),
  followCelebrity: (celebId, celebProfessions, follow) => dispatch(followCelebrity(celebId, celebProfessions, follow)),
  updateFavouritesQueue: (celebId, celebProfessions, follow) => dispatch(updateFavouritesQueue(celebId, celebProfessions, follow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StarProfile);
