import { connect } from 'react-redux';

import StarProfile from './Starprofile.component';
import { fetchCelebDetails, resetCelebDetails } from './actions/getCelebDetails';
import { fetchStarDetails, resetStarDetails } from './actions';
import { fetchCelebVideosList } from './actions/getCelebVideos';
import { fetchCelebReactionsList } from './actions/getCelebReactions';
import { toggleLogin, toggleRequestFlow, setRequestFlow, toggleBookingModal } from '../../store/shared/actions/toggleModals';
import { followCelebrity, updateFavouritesQueue } from '../../store/shared/actions/followCelebrity';

const mapStateToProps = state => ({
  celebDetails: state.starDetails.celebDetails.celebrityDetails,
  userDetails: state.starDetails.celebDetails.userDetails,
  detailsLoading: state.starDetails.celebDetails.loading,
  detailsError: state.starDetails.celebDetails.error,
  videosList: state.starDetails.celebVideos,
  reactionsList: state.starDetails.celebReactions,
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
  toggleBookingModal: (state, bookingData, starMode) =>
  dispatch(toggleBookingModal(state, bookingData, starMode)),
  fetchCelebVideosList: (id, offset, refresh, customLimit, requestType) => dispatch(fetchCelebVideosList(id, offset, refresh, customLimit, requestType)),
  fetchCelebReactionsList: (id, offset, refresh, customLimit) => dispatch(fetchCelebReactionsList(id, offset, refresh, customLimit)),
  toggleRequestFlow: state => dispatch(toggleRequestFlow(state)),
  setRequestFlow: (celebId, requestType, step) => dispatch(setRequestFlow(celebId, requestType, step)),
  followCelebrity: (celebId, follow) => dispatch(followCelebrity(celebId, follow)),
  updateFavouritesQueue: (celebId, follow) => dispatch(updateFavouritesQueue(celebId, follow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StarProfile);
