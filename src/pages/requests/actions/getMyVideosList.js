
import Api from '../../../lib/api';
import { fetch, CancelToken } from '../../../services/fetch';
import axios from 'axios';

export const MY_VIDEOS_LIST = {
  start: 'fetch_start/MY_VIDEOS_LIST',
  end: 'fetch_end/MY_VIDEOS_LIST',
  success: 'fetch_success/MY_VIDEOS_LIST',
  failed: 'fetch_failed/MY_VIDEOS_LIST',
  updateAll: 'fetch_all/MY_VIDEOS_LIST',
  reset: 'RESET/MY_VIDEOS_LIST',
};

export const myVideosListFetchStart = (refresh, token) => ({
  type: MY_VIDEOS_LIST.start,
  refresh,
  token,
});

export const myVideosListFetchEnd = () => ({
  type: MY_VIDEOS_LIST.end,
});

export const myVideosListFetchSuccess = (list, offset, count, videoStatus, role) => {
  return (
    {
      type: MY_VIDEOS_LIST.success,
      list,
      offset,
      count,
      videoStatus,
      role,
    });
};

export const myVideosListUpdateAllData = (list, key) => ({
  type: MY_VIDEOS_LIST.updateAll,
  list,
  key,
});

export const myVideosListFetchFailed = error => ({
  type: MY_VIDEOS_LIST.failed,
  error,
});

export const myVideosListReset = () => ({
  type: MY_VIDEOS_LIST.reset,
});

export const fetchMyVideosList = (offset, refresh, currentRole, requestStatus, allDataType) => (dispatch, getState) => {
  const { isLoggedIn, auth_token } = getState().session;
  const { status, limit, role } = getState().myVideosList;
  const videoStatus = requestStatus ? requestStatus : status;
  const finalRole = currentRole ? currentRole: role;
  const source = CancelToken.source();
  if (typeof getState().myVideosList.token !== typeof undefined && allDataType !== 'open' && allDataType !== 'completed') {
    getState().myVideosList.token.cancel('Operation canceled due to new request.');
  }
  dispatch(myVideosListFetchStart(refresh, source));
  return fetch.get(`${Api.getUserVideos}?status=${videoStatus}&limit=${limit}&offset=${offset}&role=${finalRole}`, {
    cancelToken: source.token,
    headers: {
      'Authorization': `token ${auth_token.authentication_token}`,
    },
  }).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(myVideosListFetchEnd());
      let list = getState().myVideosList.data;
      if (allDataType === 'open' || allDataType === 'completed') {
        dispatch(myVideosListUpdateAllData(resp.data.data.request_list, allDataType));
      } else {
        const { count } = resp.data.data;
        if (refresh) {
          list = resp.data.data.request_list;
        } else {
          list = [...list, ...resp.data.data.request_list];
        }
        dispatch(myVideosListFetchSuccess(list, offset, count, videoStatus, finalRole));
      }
    } else {
      dispatch(myVideosListFetchEnd());
    }
  }).catch((exception) => {
    if (axios.isCancel(exception)) {
      dispatch(myVideosListFetchEnd());
    }
    dispatch(myVideosListFetchFailed(exception));
  });
};

