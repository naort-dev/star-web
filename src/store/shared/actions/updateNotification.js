
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

export const updateNotificationFetchSuccess = (details) => {
  return (
    {
      type: UPDATE_NOTIFICATION.success,
      details,
    });
};

export const updateNotificationFetchFailed = error => ({
  type: UPDATE_NOTIFICATION.failed,
  error,
});
export const resetNotification = () => ({
  type: UPDATE_NOTIFICATION.reset,
});


export const updateNotification = obj => (dispatch, getState) => {
  const { isLoggedIn, auth_token } = getState().session;
  let API_URL;
  let options;
  if (isLoggedIn) {
    API_URL = `${Api.updateNotification}`;
    options = {
      headers: {
        'Authorization': `token ${auth_token.authentication_token}`,
      },
    };
  }
  dispatch(updateNotificationFetchStart());
  return fetch.post(API_URL, obj, options).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(updateNotificationFetchEnd());
      dispatch(updateNotificationFetchSuccess(resp.data.data));
    } else {
      dispatch(updateNotificationFetchEnd());
      dispatch(updateNotificationFetchFailed('404'));
    }
    return resp.data;
  }).catch((exception) => {
    dispatch(updateNotificationFetchEnd());
    dispatch(updateNotificationFetchFailed(exception.response.data));
    return exception.response.data;
  })
};
