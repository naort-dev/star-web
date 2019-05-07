import axios from 'axios';
import Api from '../../../lib/api';
import { fetch, CancelToken } from '../../../services/fetch';

export const NON_MEMBER_LIST = {
  start: 'fetch_start/NON_MEMBER_LIST',
  end: 'fetch_end/NON_MEMBER_LIST',
  success: 'fetch_success/NON_MEMBER_LIST',
  failed: 'fetch_failed/NON_MEMBER_LIST',
  updateAll: 'fetch_all/NON_MEMBER_LIST',
  reset: 'RESET/NON_MEMBER_LIST',
};

export const memberListFetchStart = (refresh, token) => ({
  type: NON_MEMBER_LIST.start,
  refresh,
  token,
});

export const memberListFetchEnd = () => ({
  type: NON_MEMBER_LIST.end,
});

export const memberListFetchSuccess = (list, offset, count, searchText) => {
  return (
    {
      type: NON_MEMBER_LIST.success,
      list,
      offset,
      count,
      searchText,
    });
};

export const memberListFetchFailed = error => ({
  type: NON_MEMBER_LIST.failed,
  error,
});

export const memberListReset = () => ({
  type: NON_MEMBER_LIST.reset,
});

export const removeNonMember = userId => (dispatch, getState) => {
  let { data: memberList, count, offset } = getState().groupSupporters.nonMemberList;
  memberList = memberList.filter((member) => {
    return member.user_id !== userId;
  });
  count -= 1;
  offset -= 1;
  dispatch(memberListFetchSuccess(memberList, offset, count));
};


export const fetchNonMemberList = (offset, refresh, isStar, customSearchText) => (dispatch, getState) => {
  const { limit, searchText } = getState().groupSupporters.nonMemberList;
  if (typeof getState().groupSupporters.nonMemberList.token !== typeof undefined) {
    getState().groupSupporters.nonMemberList.token.cancel('Operation canceled due to new request.');
  }
  const source = CancelToken.source();
  dispatch(memberListFetchStart(refresh, source));
  let apiURL = `${Api.getGroupMembers}?limit=${limit}&offset=${offset}`;
  let newSearchText;
  if (refresh) {
    newSearchText = customSearchText;
  } else {
    newSearchText = searchText;
  }
  if (isStar) {
    apiURL = `${apiURL}&celebrity=true`;
  } else if (newSearchText) {
    apiURL = `${Api.getGroupMembers}?limit=${limit}&offset=${offset}&name=${newSearchText}`;
  }
  return fetch.get(apiURL, {
    cancelToken: source.token,
  })
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
        dispatch(memberListFetchSuccess(list, newOffset, count, newSearchText));
      } else {
        dispatch(memberListFetchEnd());
      }
    }).catch((exception) => {
      if (axios.isCancel(exception)) {
        dispatch(memberListFetchFailed());
      }
      dispatch(memberListFetchFailed(exception));
    });
};
