import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const MEMBER_LIST = {
  start: 'fetch_start/MEMBER_LIST',
  end: 'fetch_end/MEMBER_LIST',
  success: 'fetch_success/MEMBER_LIST',
  failed: 'fetch_failed/MEMBER_LIST',
  updateAll: 'fetch_all/MEMBER_LIST',
  reset: 'RESET/MEMBER_LIST',
};

export const memberListFetchStart = refresh => ({
  type: MEMBER_LIST.start,
  refresh,
});

export const memberListFetchEnd = () => ({
  type: MEMBER_LIST.end,
});

export const memberListFetchSuccess = (list, offset, count) => {
  return (
    {
      type: MEMBER_LIST.success,
      list,
      offset,
      count,
    });
};

export const memberListFetchFailed = error => ({
  type: MEMBER_LIST.failed,
  error,
});

export const memberListReset = () => ({
  type: MEMBER_LIST.reset,
});

export const removeMember = userId => (dispatch, getState) => {
  let { data: memberList, count, offset } = getState().groupSupporters.memberList;
  memberList = memberList.filter((member) => {
    return member.user_id !== userId;
  });
  count -= count;
  offset -= offset;
  dispatch(memberListFetchSuccess(memberList, offset, count));
};

export const fetchMemberList = (offset, refresh, isMember = false, type) => (dispatch, getState) => {
  const { limit } = getState().groupSupporters.memberList;
  dispatch(memberListFetchStart(refresh));
  let apiURl = `${Api.getGroupMembers}?member=${isMember}&limit=${limit}&offset=${offset}`;
  if (type === 'support') {
    apiURl = `${Api.getGroupMembers}?member=${isMember}&status=true&limit=${limit}&offset=${offset}`;
  } else if (type === 'pending') {
    apiURl = `${Api.getGroupMembers}?member=${isMember}&status=false&limit=${limit}&offset=${offset}`;
  }
  return fetch.get(apiURl)
    .then((resp) => {
      if (resp.data && resp.data.success) {
        dispatch(memberListFetchEnd());
        let list = getState().groupSupporters.memberList.data;
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
