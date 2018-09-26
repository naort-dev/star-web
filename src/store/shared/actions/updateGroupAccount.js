
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const UPDATE_GROUP_ACCOUNT = {
  start: 'fetch_start/update_group_account',
  end: 'fetch_end/update_group_account',
  success: 'fetch_success/update_group_account',
  failed: 'fetch_failed/update_group_account',
};

export const updateGroupAccountFetchStart = () => ({
  type: UPDATE_GROUP_ACCOUNT.start,
});

export const updateGroupAccountFetchEnd = () => ({
  type: UPDATE_GROUP_ACCOUNT.end,
});

// export const updateGroupAccountFetchSuccess = (details) => {
//   return (
//     {
//       type: UPDATE_GROUP_ACCOUNT.success,
//       details,
//     });
// };

export const updateGroupAccountFetchFailed = error => ({
  type: UPDATE_GROUP_ACCOUNT.failed,
  error,
});


export const updateGroupAccount = obj => (dispatch, getState) => {
  dispatch(updateGroupAccountFetchStart());
  return fetch.put(Api.updateGroupAccount, obj).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(updateGroupAccountFetchEnd());
      // dispatch(updateGroupAccountFetchSuccess(resp.data.data));
    } else {
      dispatch(updateGroupAccountFetchEnd());
      dispatch(updateGroupAccountFetchFailed('404'));
    }
  }).catch((exception) => {
    dispatch(updateGroupAccountFetchEnd());
    dispatch(updateGroupAccountFetchFailed(exception));
  });
};
