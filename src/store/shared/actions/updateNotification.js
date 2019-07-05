import { cloneDeep } from 'lodash';
import { loaderAction, updateToast } from 'store/shared/actions/commonActions';
import { updateUserDetails } from 'store/shared/actions/getUserDetails';
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const UPDATE_NOTIFICATION = {
  start: 'fetch_start/update_notification',
  end: 'fetch_end/update_notification',
  success: 'fetch_success/update_notification',
  failed: 'fetch_failed/update_notification',
  reset: 'reset/reset_update_notification',
};

export const updateNotificationFetchStart = () => ({
  type: UPDATE_NOTIFICATION.start,
});

export const updateNotificationFetchEnd = () => ({
  type: UPDATE_NOTIFICATION.end,
});

export const updateNotificationFetchSuccess = details => {
  return {
    type: UPDATE_NOTIFICATION.success,
    details,
  };
};

export const updateNotificationFetchFailed = error => ({
  type: UPDATE_NOTIFICATION.failed,
  error,
});
export const resetNotification = () => ({
  type: UPDATE_NOTIFICATION.reset,
});

function getUpdatedUserDetails(getState, property) {
  const temp = cloneDeep(getState().userDetails.settings_userDetails);
  temp.notification_settings = { ...temp.notification_settings, ...property };
  return {
    userDetails: temp,
    celbDetails: getState().userDetails.settings_celebrityDetails,
  };
}

export const updateNotification = obj => (dispatch, getState) => {
  const { isLoggedIn, auth_token } = getState().session;
  let API_URL;
  let options;
  if (isLoggedIn) {
    API_URL = `${Api.updateNotification}`;
    options = {
      headers: {
        Authorization: `token ${auth_token.authentication_token}`,
      },
    };
  }
  dispatch(updateNotificationFetchStart());
  dispatch(loaderAction(true));
  return fetch
    .post(API_URL, obj, options)
    .then(resp => {
      if (resp.data && resp.data.success) {
        dispatch(updateUserDetails(getUpdatedUserDetails(getState, obj)));
        dispatch(updateNotificationFetchEnd());
        dispatch(updateNotificationFetchSuccess(resp.data.data));
      } else {
        dispatch(updateNotificationFetchEnd());
        dispatch(updateNotificationFetchFailed('404'));
      }
      dispatch(loaderAction(false));
      dispatch(
        updateToast({
          value: true,
          message: 'Successfully updated',
          variant: 'success',
        }),
      );
      return resp.data;
    })
    .catch(exception => {
      dispatch(updateNotificationFetchEnd());
      dispatch(loaderAction(false));
      dispatch(
        updateToast({
          value: true,
          message: exception.response.data.error.message,
          variant: 'error',
        }),
      );
      dispatch(updateNotificationFetchFailed(exception.response.data));
      return exception.response.data;
    });
};
