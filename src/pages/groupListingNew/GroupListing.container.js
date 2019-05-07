import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GroupListing from './GroupListing.component';
import { fetchMemberList } from './actions/getMemberList';
import { fetchGroupDetails } from './actions/getGroupDetails';


const mapStateToProps = state => ({
  membersList: state.groupListing.memberList.data,
  membersCount: state.groupListing.memberList.count,
  membersLimit: state.groupListing.memberList.limit,
  membersLoading: state.groupListing.memberList.loading,
  membersOffset: state.groupListing.memberList.offset,
  groupDetails: state.groupListing.groupDetails.data,
});

const mapDispatchToProps = dispatch => ({
  fetchMemberList: (groupID, offset, refresh) => dispatch(fetchMemberList(groupID, offset, refresh)),
  fetchGroupDetails: (groupID) => dispatch(fetchGroupDetails(groupID)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupListing));
