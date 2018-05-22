import { connect } from 'react-redux';
import { fetchCelebrityList } from '../../store/shared/actions/getCelebList';
import { fetchProfessionsList } from '../../store/shared/actions/getProfessions';

import Landing from './Landing.component';

const mapStateToProps = state => ({
  celebList: state.celebList,
  professionsList: state.professionsList,
});

const mapDispatchToProps = dispatch => ({
  fetchCelebrityList: offset => dispatch(fetchCelebrityList(offset)),
  fetchProfessionsList: () => dispatch(fetchProfessionsList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
