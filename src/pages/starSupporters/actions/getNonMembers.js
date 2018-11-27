import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const NON_MEMBER_LIST = {
  start: 'fetch_start/NON_MEMBER_LIST',
  end: 'fetch_end/NON_MEMBER_LIST',
  success: 'fetch_success/NON_MEMBER_LIST',
  failed: 'fetch_failed/NON_MEMBER_LIST',
  updateAll: 'fetch_all/NON_MEMBER_LIST',
  reset: 'RESET/NON_MEMBER_LIST',
};

export const memberListFetchStart = refresh => ({
  type: NON_MEMBER_LIST.start,
  refresh,
});

export const memberListFetchEnd = () => ({
  type: NON_MEMBER_LIST.end,
});

export const memberListFetchSuccess = (list, offset, count) => {
  return (
    {
      type: NON_MEMBER_LIST.success,
      list,
      offset,
      count,
    });
};

export const memberListFetchFailed = error => ({
  type: NON_MEMBER_LIST.failed,
  error,
});

export const memberListReset = () => ({
  type: NON_MEMBER_LIST.reset,
});


export const fetchNonMemberList = (offset, refresh) => (dispatch, getState) => {
  const { limit } = getState().groupSupporters;
  dispatch(memberListFetchStart(refresh));
  return fetch.get(`${Api.getGroupMembers}?limit=${limit}&offset=${offset}`)
    .then((resp) => {
      if (resp.data && resp.data.success) {
        dispatch(memberListFetchEnd());
        let list = getState().groupSupporters.nonMemberList.data;
        const { count } = resp.data.data;
        let newOffset = offset;
        if (refresh) {
          list = resp.data.data.group_follow_members.group_user;
          newOffset = 0;
        } else {
          list = [...list, ...resp.data.data.group_follow_members.group_user];
        }
        dispatch(memberListFetchSuccess(list, newOffset, count));
      } else {
        dispatch(memberListFetchEnd());
      }
    }).catch((exception) => {
      dispatch(memberListFetchFailed(exception));
    });
};
