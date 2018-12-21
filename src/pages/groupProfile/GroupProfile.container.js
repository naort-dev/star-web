import { connect } from 'react-redux';
import { fetchGroupDetails, resetGroupDetails } from './actions/getGroupDetails';
import { fetchGroupMembers, resetMemberDetails } from './actions/getMembersList';
import { toggleLogin } from '../../store/shared/actions/toggleModals';
import GroupProfile from './GroupProfile.component';
import { celebrityFollowStatus, fanFollowStatus } from '../../store/shared/actions/followGroupCelebrity';

const mapStateToProps = state => ({
  groupDetails: state.groupDetails.userDetails,
  accountFollowDetails: state.groupDetails.userDetails ? state.groupDetails.userDetails.account_follow_details : {},
  memberListDetails: state.memberList,
  memberCount: state.memberList.count,
  isLoggedIn: state.session.isLoggedIn,
  sessionDetails: state.session.auth_token,
  userDetails: state.userDetails.settings_userDetails,
  detailsLoading: state.groupDetails.loading,
  groupDetailsError: state.groupDetails.error,
});

const mapDispatchToProps = dispatch => ({
  fetchGroupDetails: id => dispatch(fetchGroupDetails(id)),
  toggleLogin: state => dispatch(toggleLogin(state)),
  resetGroupDetails: () => dispatch(resetGroupDetails()),
  fetchGroupMembers: (id, offset, refresh) => dispatch(fetchGroupMembers(id, offset, refresh)),
  resetMemberDetails: () => dispatch(resetMemberDetails()),
  fanFollowStatus: (id, flag) => dispatch(fanFollowStatus(id, flag)),
  celebrityFollowStatus: id => dispatch(celebrityFollowStatus(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupProfile);
