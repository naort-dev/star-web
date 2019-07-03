import { connect } from 'react-redux';
import { updateUserDetails } from 'store/shared/actions/saveSettings';
import { changePassword } from 'store/shared/actions/changePassword';
import { updateNotification } from 'store/shared/actions/updateNotification';
import { updateNotificationViewed } from 'services/userManagement';
import Settings from './Settings.Component';

const mapStates = state => ({
  userDetails: state.userDetails.settings_userDetails,
  celbDetails: state.userDetails.settings_celebrityDetails,
  stripeCard: state.stripeRegistration.cardDetails,
  stripeUrl: state.stripeRegistration.stripeURL,
  dashboardURL: state.stripeRegistration.dashboardURL,
});
function mapDispatch(dispatch) {
  return {
    updateUserDetails: (id, obj) => {
      dispatch(updateUserDetails(id, obj));
    },
    changePassword: data => {
      dispatch(changePassword(data));
    },
    updateNotification: obj => {
      dispatch(updateNotification(obj));
    },
    updateNotificationViewed: () => {
      dispatch(updateNotificationViewed());
    },
  };
}

export default connect(
  mapStates,
  mapDispatch,
)(Settings);
