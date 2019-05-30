import axios from 'axios';
import { cloneDeep } from 'lodash';
import Api from '../../../lib/api';
import { fetch, CancelToken } from '../../../services/fetch';

export const MY_VIDEOS_LIST = {
  start: 'fetch_start/MY_VIDEOS_LIST',
  end: 'fetch_end/MY_VIDEOS_LIST',
  success: 'fetch_success/MY_VIDEOS_LIST',
  failed: 'fetch_failed/MY_VIDEOS_LIST',
  updateList: 'update/MY_VIDEOS_LIST',
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

export const myVideosListFetchFailed = error => ({
  type: MY_VIDEOS_LIST.failed,
  error,
});

export const myVideosListUpdate = data => ({
  type: MY_VIDEOS_LIST.updateList,
  data,
});

export const myVideosListReset = () => ({
  type: MY_VIDEOS_LIST.reset,
});

export const updateVideosList = (id, newData) => (dispatch, getState) => {
  const originalList = cloneDeep(getState().myVideosList.data);
  const dataIndex = originalList.findIndex(item => item.id === id);
  originalList[dataIndex] = newData;
  dispatch(myVideosListFetchStart(false, getState().myVideosList.token));
  dispatch(myVideosListUpdate(originalList));
};

export const fetchMyVideosList = (offset, refresh, currentRole, requestStatus) => (dispatch, getState) => {
  const { status, limit, role } = getState().myVideosList;
  const videoStatus = requestStatus ? requestStatus : status;
  const finalRole = currentRole ? currentRole: role;
  const source = CancelToken.source();
  if (typeof getState().myVideosList.token !== typeof undefined) {
    getState().myVideosList.token.cancel('Operation canceled due to new request.');
  }
  dispatch(myVideosListFetchStart(refresh, source));
  return fetch.get(`${Api.getUserVideos}?status=${videoStatus}&limit=${limit}&offset=${offset}&role=${finalRole}`, {
    cancelToken: source.token,
  }).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(myVideosListFetchEnd());
      let list = getState().myVideosList.data;
      const { count } = resp.data.data;
      let newOffset = offset;
      if (refresh) {
        list = resp.data.data.request_list;
        newOffset = 0;
      } else {
        list = [...list, ...resp.data.data.request_list];
      }
      dispatch(myVideosListFetchSuccess(list, newOffset, count, videoStatus, finalRole));
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
