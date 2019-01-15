import { connect } from 'react-redux';

import StarSupporters from './StarSupporters.component';
import { fetchMemberList, removeMember } from './actions/getMemberList';
import { fetchNonMemberList, removeNonMember } from './actions/getNonMembers';
import { setRequestFlow } from '../../store/shared/actions/toggleModals';


const mapStateToProps = state => ({
  membersList: state.groupSupporters.memberList.data,
  membersCount: state.groupSupporters.memberList.count,
  membersLimit: state.groupSupporters.memberList.limit,
  membersLoading: state.groupSupporters.memberList.loading,
  membersOffset: state.groupSupporters.memberList.offset,
  nonMemberList: state.groupSupporters.nonMemberList,
});

const mapDispatchToProps = dispatch => ({
  fetchMemberList: (offset, refresh, type) => dispatch(fetchMemberList(offset, refresh, true, type)),
  setRequestFlow: (celebId, requestType, step) => dispatch(setRequestFlow(celebId, requestType, step)),
  fetchNonMemberList: (offset, refresh) => dispatch(fetchNonMemberList(offset, refresh)),
  removeMember: userId => dispatch(removeMember(userId)),
  removeNonMember: userId => dispatch(removeNonMember(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StarSupporters);
