import { connect } from 'react-redux';

import StarRequests from './StarRequests.component';
import { fetchMyVideosList } from './actions/getMyVideosList';

const mapStateToProps = state => ({
  professionsList: state.professionsList,
  myVideosList: state.myVideosList,
});

const mapDispatchToProps = dispatch => ({
  fetchMyVideosList: (offset, refresh, requestStatus) => dispatch(fetchMyVideosList(offset, refresh, requestStatus)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StarRequests);
