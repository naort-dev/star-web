import { connect } from 'react-redux';
import Account from './Account.Component';
import { getDashboardData } from '../../services/userManagement';

const mapStates = state => ({});
function mapDispatch(dispatch) {
  return {};
}

export default connect(
  mapStates,
  mapDispatch,
)(Account);
