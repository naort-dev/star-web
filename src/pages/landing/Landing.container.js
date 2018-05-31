import { connect } from 'react-redux';
import { fetchCelebrityList } from './actions/getCelebList';
import { fetchVideosList } from './actions/getVideosList';
import { updateCategory, switchTab, updateSearchParam } from './actions/updateFilters';

import Landing from './Landing.component';

const mapStateToProps = state => ({
  celebList: state.celebList,
  videosList: state.videosList,
  professionsList: state.professionsList,
  filters: state.filters,
});

const mapDispatchToProps = dispatch => ({
  fetchCelebrityList: (offset, refresh) => dispatch(fetchCelebrityList(offset, refresh)),
  fetchVideosList: (offset, refresh) => dispatch(fetchVideosList(offset, refresh)),
  updateCategory: (label, value) => dispatch(updateCategory(label, value)),
  switchTab: label => dispatch(switchTab(label)),
  updateSearchParam: searchParam => dispatch(updateSearchParam(searchParam)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
