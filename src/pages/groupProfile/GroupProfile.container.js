import { connect } from 'react-redux';
import { fetchGroupDetails, resetGroupDetails } from './actions/getGroupDetails';
import { fetchGroupMembers } from './actions/getMembersList';
import { toggleLogin } from '../../store/shared/actions/toggleModals';
import GroupProfile from './GroupProfile.component';

const mapStateToProps = state => ({
  groupDetails: state.groupDetails.userDetails,
  memberListDetails: state.memberList.memberList,
  memberCount: state.memberList.count,
});

const mapDispatchToProps = dispatch => ({
  fetchGroupDetails: id => dispatch(fetchGroupDetails(id)),
  toggleLogin: state => dispatch(toggleLogin(state)),
  resetGroupDetails: () => dispatch(resetGroupDetails()),
  fetchGroupMembers: id => dispatch(fetchGroupMembers(id)),
  // resetMemberDetails: () => dispatch(resetMemberDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupProfile);
