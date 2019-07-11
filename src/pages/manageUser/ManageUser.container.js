import { connect } from 'react-redux';

import ManageUser from './ManageUser.component';
import { fetchFavouritesList } from './actions/getFavouritesList';

const mapStateToProps = state => ({
  professionsList: state.professionsList,
  favouritesList: state.favouritesList,
});

const mapDispatchToProps = dispatch => ({
  fetchFavouritesList: (offset, refresh) => dispatch(fetchFavouritesList(offset, refresh)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);
