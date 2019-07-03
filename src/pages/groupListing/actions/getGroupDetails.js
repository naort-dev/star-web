import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const GROUP_DETAILS = {
  start: 'fetch_start/GROUP_DETAILS',
  end: 'fetch_end/GROUP_DETAILS',
  success: 'fetch_success/GROUP_DETAILS',
  failed: 'fetch_failed/GROUP_DETAILS',
};

export const memberListFetchStart = () => ({
  type: GROUP_DETAILS.start,
});

export const memberListFetchEnd = () => ({
  type: GROUP_DETAILS.end,
});

export const memberListFetchSuccess = (data) => {
  return (
    {
      type: GROUP_DETAILS.success,
      data,
    });
};

export const memberListFetchFailed = error => ({
  type: GROUP_DETAILS.failed,
  error,
});

export const fetchGroupDetails = (groupID) => (dispatch, getState) => {
  dispatch(memberListFetchStart());
  let apiURl = Api.getGroupDetails(groupID);

  return fetch.get(apiURl)
    .then((resp) => {
      if (resp.data && resp.data.success) {
        dispatch(memberListFetchEnd());
        dispatch(memberListFetchSuccess(resp.data.data.user));
      } else {
        dispatch(memberListFetchEnd());
      }
    }).catch((exception) => {
      dispatch(memberListFetchFailed(exception));
    });
};
