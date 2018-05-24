import { connect } from 'react-redux';
import { fetchCelebrityList } from './actions/getCelebList';
import { fetchProfessionsList } from '../../store/shared/actions/getProfessions';
import { updateCategory } from './actions/updateFilters';

import Landing from './Landing.component';

const mapStateToProps = state => ({
  celebList: state.celebList,
  professionsList: state.professionsList,
  filters: state.filters,
});

const mapDispatchToProps = dispatch => ({
  fetchCelebrityList: (offset, refresh) => dispatch(fetchCelebrityList(offset, refresh)),
  fetchProfessionsList: () => dispatch(fetchProfessionsList()),
  updateCategory: value => dispatch(updateCategory(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
