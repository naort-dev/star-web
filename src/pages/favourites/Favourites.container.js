import { connect } from 'react-redux';

import Favourites from './Favourites.component';
import { fetchFavouritesList } from './actions/getFavouritesList';
import { followCelebrity } from '../../store/shared/actions/followCelebrity';

const mapStateToProps = state => ({
  professionsList: state.professionsList,
  favouritesList: state.favouritesList,
  followCelebData: state.followCelebrityStatus,
});

const mapDispatchToProps = dispatch => ({
  fetchFavouritesList: (offset, refresh) => dispatch(fetchFavouritesList(offset, refresh)),
  followCelebrity: (celebId, celebProfessions, follow, callback) => dispatch(followCelebrity(celebId, celebProfessions, follow, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
