import { connect } from 'react-redux';
import Dashboard from './Dashboard.Component';
import { getDashboardData } from '../../services/userManagement';

const mapStates = state => ({
  dashBoardData: state.dashBoard.data,
});
function mapDispatch(dispatch) {
  return {
    getDashboardData: () => {
      dispatch(getDashboardData());
    },
  };
}

export default connect(
  mapStates,
  mapDispatch,
)(Dashboard);
