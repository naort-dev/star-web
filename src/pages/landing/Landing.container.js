import { connect } from 'react-redux';
import { fetchCelebrityList, updateCelebrityFollow } from './actions/getCelebList';
import { fetchVideosList } from './actions//getVideosList';

import {
  updateCategory,
  switchTab,
  updateSearchParam,
  updatePriceRange,
  updateSort,
  updateSelectedSubCategory,
  updateSelectedVideoType,
  updateSelectedVideoDate,
} from './actions/updateFilters';

import Landing from './Landing.component';

const mapStateToProps = state => ({
  celebList: state.celebList,
  videosList: state.videosList,
  professionsList: state.professionsList,
  filters: state.filters,
  isLoggedIn: state.session.isLoggedIn,
  followCelebData: state.followCelebrityStatus,
});

const mapDispatchToProps = dispatch => ({
  fetchCelebrityList: (offset, refresh) => dispatch(fetchCelebrityList(offset, refresh)),
  fetchVideosList: (offset, refresh) => dispatch(fetchVideosList(offset, refresh)),
  updateCategory: (label, value) => dispatch(updateCategory(label, value)),
  switchTab: label => dispatch(switchTab(label)),
  updateSearchParam: searchParam => dispatch(updateSearchParam(searchParam)),
  updatePriceRange: (lowPrice, highPrice) => dispatch(updatePriceRange(lowPrice, highPrice)),
  updateSort: value => dispatch(updateSort(value)),
  updateSelectedSubCategory: (selectedList, category) => dispatch(updateSelectedSubCategory(selectedList, category)),
  updateSelectedVideoType: videoType => dispatch(updateSelectedVideoType(videoType)),
  updateSelectedVideoDate: timeSpan => dispatch(updateSelectedVideoDate(timeSpan)),
  updateCelebrityFollow: (celebId, celebProfessions, follow) => dispatch(updateCelebrityFollow(celebId, celebProfessions, follow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
