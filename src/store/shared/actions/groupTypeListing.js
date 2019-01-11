
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const GROUP_TYPES = {
  start: 'fetch_start/group_types_listing',
  end: 'fetch_end/group_types_listing',
  success: 'fetch_success/group_types_listing',
  failed: 'fetch_failed/group_types_listing',
};

export const groupTypesFetchStart = () => ({
  type: GROUP_TYPES.start,
});

export const groupTypesFetchEnd = () => ({
  type: GROUP_TYPES.end,
});

export const groupTypesFetchSuccess = (data) => {
  return (
    {
      type: GROUP_TYPES.success,
      data,
    });
};

export const groupTypesFetchFailed = error => ({
  type: GROUP_TYPES.failed,
  error,
});

export const fetchGroupTypesListing = () => (dispatch) => {
  dispatch(groupTypesFetchStart());
  return fetch.get(Api.groupTypeListing).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(groupTypesFetchEnd());
      const groupTypes = resp.data.data.group_types.map((item) => {
        return ({
          ...item,
          value: item.id,
          label: item.group_name,
        });
      });
      dispatch(groupTypesFetchSuccess(groupTypes));
    } else {
      dispatch(groupTypesFetchEnd());
    }
  }).catch((exception) => {
    dispatch(groupTypesFetchEnd());
    dispatch(groupTypesFetchFailed(exception));
  });
};
