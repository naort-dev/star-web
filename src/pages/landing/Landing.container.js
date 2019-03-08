import { connect } from 'react-redux';
import { fetchCelebrityList, updateCelebrityFollow } from './actions/getCelebList';
import { toggleSignup } from '../../store/shared/actions/toggleModals';
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
  configData: state.config.data,
  isLoggedIn: state.session.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  fetchCelebrityList: (offset, refresh, category) => dispatch(fetchCelebrityList(offset, refresh, category)),
  fetchVideosList: (offset, refresh) => dispatch(fetchVideosList(offset, refresh)),
  updateCategory: (label, value) => dispatch(updateCategory(label, value)),
  switchTab: label => dispatch(switchTab(label)),
  updateSearchParam: searchParam => dispatch(updateSearchParam(searchParam)),
  updatePriceRange: (lowPrice, highPrice) => dispatch(updatePriceRange(lowPrice, highPrice)),
  updateSort: value => dispatch(updateSort(value)),
  updateSelectedSubCategory: (selectedList, category) => dispatch(updateSelectedSubCategory(selectedList, category)),
  updateSelectedVideoType: videoType => dispatch(updateSelectedVideoType(videoType)),
  updateSelectedVideoDate: timeSpan => dispatch(updateSelectedVideoDate(timeSpan)),
  toggleSignup: state => dispatch(toggleSignup(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
