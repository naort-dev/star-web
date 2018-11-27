import { connect } from 'react-redux';

import StarSupporters from './StarSupporters.component';
import { fetchMemberList, removeMember } from './actions/getMemberList';
import { fetchNonMemberList } from './actions/getNonMembers';


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
  fetchNonMemberList: (offset, refresh) => dispatch(fetchNonMemberList(offset, refresh)),
  removeMember: userId => dispatch(removeMember(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StarSupporters);
