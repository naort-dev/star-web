import { connect } from 'react-redux';
import Earnings from './Earnings.component';
import { fetchEarningsList } from './actions/getEarningsList';

const mapStateToProps = state => ({
  professionsList: state.professionsList,

});

const mapDispatchToProps = dispatch => ({
  fetchEarningsList: () => dispatch(fetchEarningsList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Earnings);
