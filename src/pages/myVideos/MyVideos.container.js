import { connect } from 'react-redux';

import MyVideos from './MyVideos.component';
import { fetchMyVideosList } from './actions/getMyVideosList';

const mapStateToProps = state => ({
  professionsList: state.professionsList,
  favouritesList: state.favouritesList,
});

const mapDispatchToProps = dispatch => ({
  fetchMyVideosList: (offset, refresh) => dispatch(fetchMyVideosList(offset, refresh)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyVideos);
