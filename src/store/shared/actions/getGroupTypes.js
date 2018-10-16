
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const GROUP_TYPES = {
  start: 'fetch_start/group_types',
  end: 'fetch_end/group_types',
  success: 'fetch_success/group_types',
  failed: 'fetch_failed/group_types',
};

export const groupTypesFetchStart = () => ({
  type: GROUP_TYPES.start,
});

export const groupTypestFetchEnd = () => ({
  type: GROUP_TYPES.end,
});

export const groupTypestFetchSuccess = (data) => {
  return (
    {
      type: GROUP_TYPES.success,
      data,
    });
};

export const groupTypestFetchFailed = error => ({
  type: GROUP_TYPES.failed,
  error,
});

export const fetchGroupTypes = () => (dispatch) => {
  dispatch(groupTypesFetchStart());
  return fetch.get(Api.getGroupTypes).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(groupTypestFetchEnd());
      const groupTypes = resp.data.data.group_types.map((item) => {
        return ({
          ...item,
          value: item.id,
          label: item.group_name,
        });
      });
      dispatch(groupTypestFetchSuccess(groupTypes));
    } else {
      dispatch(groupTypestFetchEnd());
    }
  }).catch((exception) => {
    dispatch(groupTypestFetchEnd());
    dispatch(groupTypestFetchFailed(exception));
  });
};
