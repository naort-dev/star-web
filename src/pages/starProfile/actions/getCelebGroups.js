import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';
import { loaderAction } from '../../../store/shared/actions/commonActions';

export const CELEB_GROUP_LIST = {
  start: 'fetch_start/celeb_group_list',
  end: 'fetch_end/celeb_group_list',
  success: 'fetch_success/celeb_group_list',
  failed: 'fetch_failed/celeb_group_list',
  reset: 'reset/celeb_group_list',
};

export const celebGroupsFetchStart = () => ({
  type: CELEB_GROUP_LIST.start,
});

export const celebGroupsFetchEnd = () => ({
  type: CELEB_GROUP_LIST.end,
});

export const celebGroupsFetchSuccess = (details, offset, count) => {
  return {
    type: CELEB_GROUP_LIST.success,
    details,
    offset,
    count,
  };
};

export const celebGroupsFetchFailed = (error) => ({
  type: CELEB_GROUP_LIST.failed,
  error,
});

export const resetCelebGroups = () => ({
  type: CELEB_GROUP_LIST.reset,
});

export const fetchCelebGroups = (id, offset, refresh) => (dispatch, getState) => {
  if (!id) return null;
  const API_URL = Api.groupMembersList;
  const { limit } = getState().starDetails.celebGroups;
  dispatch(celebGroupsFetchStart());
  return fetch
    .get(`${API_URL}?celebrity=${id}&limit=${limit}&offset=${offset}`)
    .then((resp) => {
      if (resp.data && resp.data.success) {
        let list = getState().starDetails.celebGroups.groupList;
        const { count } = resp.data.data;
        if (refresh) {
          list = resp.data.data.group_list;
        } else {
          list = [...list, ...resp.data.data.group_list];
        }
        dispatch(celebGroupsFetchSuccess(list, offset, count));
        dispatch(loaderAction(false));
      } else {
        dispatch(loaderAction(false));
        dispatch(celebGroupsFetchFailed('404'));
      }
    })
    .catch((exception) => {
      dispatch(loaderAction(false));
      dispatch(celebGroupsFetchFailed(exception.response.data));
    });
};
