import { cloneDeep } from 'lodash';
import { updateUserDetails } from 'store/shared/actions/getUserDetails';
import Api from '../../lib/api';
import { fetch } from '../fetch';
import { dashBoardSuccess } from '../../pages/dashboard/actions';
import { updateToast } from '../../store/shared/actions/commonActions';

export const dashBoardUpdate = () => dispatch => {
  return fetch
    .get(Api.dashboardUpdate, {})
    .then()
    .catch();
};

export const getDashboardData = callBack => dispatch => {
  return fetch
    .get(Api.dashBoard, {})
    .then(resp => {
      dispatch(dashBoardSuccess(resp.data.data.dashboard));
      if (callBack) callBack();
    })
    .catch(error => {
      if (callBack) callBack();
      dispatch(
        updateToast({
          value: true,
          message: error.response.data.error.message,
          variant: 'error',
        }),
      );
    });
};

function getUpdatedUserDetails(getState) {
  const temp = cloneDeep(getState().userDetails.settings_userDetails);
  temp.notification_settings.is_viewed = true;
  return {
    userDetails: temp,
    celbDetails: getState().userDetails.settings_celebrityDetails,
  };
}

export const updateNotificationViewed = () => (dispatch, getState) => {
  return fetch
    .post(Api.notificationViewed, {})
    .then(resp => {
      dispatch(updateUserDetails(getUpdatedUserDetails(getState)));
    })
    .catch(error => {});
};
