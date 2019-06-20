import { loaderAction, updateToast } from 'store/shared/actions/commonActions';
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const CHANGE_PASSWORD = {
  start: 'user/CHANGE_PASSWORD',
  end: 'user/CHANGE_PASSWORD_END',
  success: 'user/CHANGE_PASSWORD_SUCCESS',
  failed: 'user/CHANGE_PASSWORD_FAILED',
  reset: 'user/CHANGE_PASSWORD_RESET',
};

export const changePasswordStart = () => ({
  type: CHANGE_PASSWORD.start,
});

export const changePasswordEnd = () => ({
  type: CHANGE_PASSWORD.end,
});

export const changePasswordSuccess = data => ({
  type: CHANGE_PASSWORD.success,
  data,
});

export const changePasswordFailed = error => ({
  type: CHANGE_PASSWORD.failed,
  error,
});

export const changePassword = data => dispatch => {
  dispatch(changePasswordStart());
  dispatch(loaderAction(true));
  return fetch
    .post(Api.changePassword, data)
    .then(resp => {
      dispatch(changePasswordEnd());
      if (resp.data && resp.data.success) {
        dispatch(changePasswordSuccess(resp.data.data));
      } else if (resp.data && resp.data.error) {
        dispatch(changePasswordFailed(resp.data.error));
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
      dispatch(changePasswordEnd());
      dispatch(changePasswordFailed(exception));
      dispatch(
        updateToast({
          value: true,
          message: exception.response.data.error.message,
          variant: 'error',
        }),
      );
    });
};

export const resetChangePassword = () => ({
  type: CHANGE_PASSWORD.reset,
});
