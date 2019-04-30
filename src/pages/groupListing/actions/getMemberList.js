import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const MEMBER_LIST = {
  start: 'fetch_start/MEMBER_LIST',
  end: 'fetch_end/MEMBER_LIST',
  success: 'fetch_success/MEMBER_LIST',
  failed: 'fetch_failed/MEMBER_LIST',
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

export const fetchMemberList = (groupID, offset, refresh) => (dispatch, getState) => {
  const { limit } = getState().groupListing.memberList;
  dispatch(memberListFetchStart(refresh));
  let apiURl = Api.getGroupMemberList(groupID)+`&limit=${limit}&offset=${offset}`;

  return fetch.get(apiURl)
    .then((resp) => {
      if (resp.data && resp.data.success) {
        dispatch(memberListFetchEnd());
        let list = getState().groupListing.memberList.data;
        const { count } = resp.data.data;
        let newOffset = offset;
        if (refresh) {
          list = resp.data.data.group_list;
          newOffset = 0;
        } else {
          list = [...list, ...resp.data.data.group_list];
        }
        dispatch(memberListFetchSuccess(list, newOffset, count));
      } else {
        dispatch(memberListFetchEnd());
      }
    }).catch((exception) => {
      dispatch(memberListFetchFailed(exception));
    });
};
