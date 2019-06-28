import { loaderAction, updateToast } from 'store/shared/actions/commonActions';
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';
import { userDetailsFetchSuccess, parseUserDetails } from './getUserDetails';

export const UPDATE_USER_DETAILS = {
  start: 'fetch_start/update_user_details',
  end: 'fetch_end/update_user_details',
  success: 'fetch_success/update_user_details',
  failed: 'fetch_failed/update_user_details',
  reset: 'reset/reset_user_details',
};

export const updateUserDetailsFetchStart = () => ({
  type: UPDATE_USER_DETAILS.start,
});

export const updateUserDetailsFetchEnd = () => ({
  type: UPDATE_USER_DETAILS.end,
});

export const updateUserDetailsFetchSuccess = details => {
  return {
    type: UPDATE_USER_DETAILS.success,
    details,
  };
};

export const updateUserDetailsFetchFailed = error => ({
  type: UPDATE_USER_DETAILS.failed,
  error,
});
export const resetUserDetails = () => ({
  type: UPDATE_USER_DETAILS.reset,
});

export const updateUserDetails = (id, obj) => (dispatch, getState) => {
  const { isLoggedIn, auth_token } = getState().session;
  let API_URL;
  let options;
  if (isLoggedIn) {
    API_URL = `${Api.modifyUserDetails}/${id}/`;
    options = {
      headers: {
        Authorization: `token ${auth_token.authentication_token}`,
      },
    };
  }
  dispatch(updateUserDetailsFetchStart());
  dispatch(loaderAction(true));
  return fetch
    .put(API_URL, obj, options)
    .then(resp => {
      if (resp.data && resp.data.success) {
        dispatch(updateUserDetailsFetchEnd());
        dispatch(updateUserDetailsFetchSuccess(resp.data.data));
        dispatch(userDetailsFetchSuccess(resp.data.data));
      } else {
        dispatch(updateUserDetailsFetchEnd());
        dispatch(updateUserDetailsFetchFailed('404'));
      }
      dispatch(loaderAction(false));
      dispatch(
        updateToast({
          value: true,
          message: 'Successfully updated',
          variant: 'success',
        }),
      );
    })
    .catch(exception => {
      dispatch(loaderAction(false));
      dispatch(
        updateToast({
          value: true,
          message: exception.response.data.error.message,
          variant: 'error',
        }),
      );
      dispatch(updateUserDetailsFetchEnd());
      dispatch(updateUserDetailsFetchFailed(exception));
      return Promise.reject(exception);
    });
};
