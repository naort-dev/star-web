import { connect } from 'react-redux';
import Earnings from './Earnings.component';

const mapStateToProps = state => ({
  professionsList: state.professionsList,

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Earnings);
