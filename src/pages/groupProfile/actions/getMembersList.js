
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const MEMBERS_LIST_DETAILS = {
  start: 'fetch_start/group_member_list_details',
  end: 'fetch_end/group_member_list_details',
  success: 'fetch_success/group_member_list_details',
  failed: 'fetch_failed/group_member_list_details',
  reset: 'reset/group_member_list_details',
};

export const memberListFetchStart = () => ({
  type: MEMBERS_LIST_DETAILS.start,
});

export const memberListFetchEnd = () => ({
  type: MEMBERS_LIST_DETAILS.end,
});

export const memberListFetchSuccess = (details, offset, count) => ({
  type: MEMBERS_LIST_DETAILS.success,
  details,
  offset,
  count,
});

export const memberListFetchFailed = error => ({
  type: MEMBERS_LIST_DETAILS.failed,
  error,
});

export const resetMemberDetails = () => ({
  type: MEMBERS_LIST_DETAILS.reset,
});

export const fetchGroupMembers = (id, offset, refresh) => (dispatch, getState) => {
  if (!id) return null;
  const API_URL = Api.groupMembersList;
  const { limit } = getState().memberList;

  dispatch(memberListFetchStart());
  return fetch.get(`${API_URL}?account=${id}&limit=${limit}&offset=${offset}`).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(memberListFetchEnd());
      let list = getState().memberList.memberList;
      const { count } = resp.data.data;
      if (refresh) {
        list = resp.data.data.group_list;
      } else {
        list = [...list, ...resp.data.data.group_list];
      }
      dispatch(memberListFetchSuccess(list, offset, count));
    } else {
      dispatch(memberListFetchEnd());
      dispatch(memberListFetchFailed('404'));
    }
  }).catch((exception) => {
    dispatch(memberListFetchEnd());
    dispatch(memberListFetchFailed(exception));
  });
};
