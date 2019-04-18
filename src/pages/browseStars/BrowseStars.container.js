import { connect } from 'react-redux';
import { fetchCelebrityList } from '../landing/actions/getCelebList';
import { fetchFeaturedStars } from '../landing/actions/getFeaturedStars';
import BrowseStars from './BrowseStars.component';

const mapStateToProps = state => ({
  category: state.filters.category,
  celebList: state.celebList,
  featuredStars: state.featuredStars,
  lowPrice: state.filters.lowPrice,
  highPrice: state.filters.highPrice,
  sortValue: state.filters.sortValue,
});

const mapDispatchToProps = dispatch => ({
  fetchFeaturedStars: profession => dispatch(fetchFeaturedStars(profession)),
  fetchCelebrityList: (offset, refresh, selectedCategory) => dispatch(fetchCelebrityList(offset, refresh, selectedCategory)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BrowseStars);
