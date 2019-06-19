import { connect } from 'react-redux';
import { updateUserDetails } from 'store/shared/actions/saveSettings';
import { changePassword } from 'store/shared/actions/changePassword';
import Settings from './Settings.Component';

const mapStates = state => ({
  userDetails: state.userDetails.settings_userDetails,
  celbDetails: state.userDetails.settings_celebrityDetails,
  stripeCard: state.stripeRegistration.cardDetails,
  stripeUrl: state.stripeRegistration.dashboardURL,
});
function mapDispatch(dispatch) {
  return {
    updateUserDetails: (id, obj) => {
      dispatch(updateUserDetails(id, obj));
    },
    changePassword: data => {
      dispatch(changePassword(data));
    },
  };
}

export default connect(
  mapStates,
  mapDispatch,
)(Settings);
