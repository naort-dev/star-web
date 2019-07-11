import { connect } from 'react-redux';
import { updateUserDetails } from 'store/shared/actions/saveSettings';
import { changePassword } from 'store/shared/actions/changePassword';
import {
  updateNotification,
  userDetailsUpdateHandler,
} from 'store/shared/actions/updateNotification';
import { updateNotificationViewed } from 'services/userManagement';
import { updateToast, loaderAction } from 'store/shared/actions/commonActions';
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
    updateToast: errorObject => dispatch(updateToast(errorObject)),
    loaderAction: state => dispatch(loaderAction(state)),
    userDetailsUpdateHandler: obj => {
      dispatch(userDetailsUpdateHandler(obj));
    },
  };
}

export default connect(
  mapStates,
  mapDispatch,
)(Settings);
