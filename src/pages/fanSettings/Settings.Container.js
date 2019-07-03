import { connect } from 'react-redux';
import { updateUserDetails } from 'store/shared/actions/saveSettings';
import { changePassword } from 'store/shared/actions/changePassword';
import { updateNotification } from 'store/shared/actions/updateNotification';
import { updateNotificationViewed } from 'services/userManagement';
import { updateProfilePhoto } from 'store/shared/actions/updateProfilePhoto';
import { loaderAction, updateToast } from 'store/shared/actions/commonActions';
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
    updateProfilePhoto: (obj, showToast) => {
      dispatch(updateProfilePhoto(obj, showToast));
    },
    loaderAction: value => {
      dispatch(loaderAction(value));
    },
    updateToast: toastObj => {
      dispatch(updateToast(toastObj));
    },
  };
}

export default connect(
  mapStates,
  mapDispatch,
)(Settings);
