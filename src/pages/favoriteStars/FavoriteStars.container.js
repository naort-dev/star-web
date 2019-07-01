import { connect } from 'react-redux';

import FavoriteStars from './FavoriteStars.component';
import { fetchStarDetails } from '../starProfile/actions';
import { fetchFavouritesList, favoriteStar } from './actions/getFavouritesList';
import { toggleRequestFlow } from '../../store/shared/actions/toggleModals';


const mapStateToProps = state => ({
  professionsList: state.professionsList,
  favouritesList: state.favouritesList,
});

const mapDispatchToProps = dispatch => ({
  fetchFavouritesList: (offset, refresh) => dispatch(fetchFavouritesList(offset, refresh)),
  favoriteStar: (celebrityId, follow) => dispatch(favoriteStar(celebrityId, follow)),
  toggleRequestFlow: state => dispatch(toggleRequestFlow(state)),
  fetchStarDetails: id => dispatch(fetchStarDetails(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteStars);
