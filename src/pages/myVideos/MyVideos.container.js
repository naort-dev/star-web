import { connect } from 'react-redux';

import MyVideos from './MyVideos.component';
import { fetchMyVideosList } from './actions/getMyVideosList';
import { changeRequestStatus } from './actions/handleRequests';

const mapStateToProps = state => ({
  professionsList: state.professionsList,
  myVideosList: state.myVideosList,
});

const mapDispatchToProps = dispatch => ({
  fetchMyVideosList: (offset, refresh, requestStatus) => dispatch(fetchMyVideosList(offset, refresh, requestStatus)),
  changeRequestStatus: (requestId, requestStatus, comment) => dispatch(changeRequestStatus(requestId, requestStatus, comment)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyVideos);
