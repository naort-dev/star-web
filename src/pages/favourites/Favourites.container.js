import { connect } from 'react-redux';

import Favourites from './Favourites.component';
import { fetchFavouritesList } from './actions/getFavouritesList';

const mapStateToProps = state => ({
  professionsList: state.professionsList,
  favouritesList: state.favouritesList,
});

const mapDispatchToProps = dispatch => ({
  fetchFavouritesList: (offset, refresh) => dispatch(fetchFavouritesList(offset, refresh)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
