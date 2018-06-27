
import Api from '../../../lib/api';
import { fetch, CancelToken } from '../../../services/fetch';
import axios from 'axios';

export const MY_VIDEOS_LIST = {
  start: 'fetch_start/MY_VIDEOS_LIST',
  end: 'fetch_end/MY_VIDEOS_LIST',
  success: 'fetch_success/MY_VIDEOS_LIST',
  failed: 'fetch_failed/MY_VIDEOS_LIST',
};

export const myVideosListFetchStart = refresh => ({
  type: MY_VIDEOS_LIST.start,
  refresh,
});

export const myVideosListFetchEnd = () => ({
  type: MY_VIDEOS_LIST.end,
});

export const myVideosListFetchSuccess = (list, offset, count) => {
  return (
    {
      type: MY_VIDEOS_LIST.success,
      list,
      offset,
      count,
    });
};

export const myVideosListFetchFailed = error => ({
  type: MY_VIDEOS_LIST.failed,
  error,
});


export const fetchMyVideosList = (offset, refresh) => (dispatch, getState) => {
  const { isLoggedIn, auth_token } = getState().session;
  dispatch(myVideosListFetchStart(refresh));
  return fetch.get(Api.getUserVideos, {
    headers: {
      'Authorization': `token ${auth_token.authentication_token}`,
    }
  }).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(myVideosListFetchEnd());
      let list = getState().myVideosList.data;
      const { count } = resp.data.data;
      if (refresh) {
        list = resp.data.data.celebrity_list;
      } else {
        list = [...list, ...resp.data.data.celebrity_list];
      }
      console.log(resp.data);
      dispatch(myVideosListFetchSuccess(list, offset, count));
    } else {
      dispatch(myVideosListFetchEnd());
    }
  }).catch((exception) => {
    dispatch(myVideosListFetchEnd());
    dispatch(myVideosListFetchFailed(exception));
  });
};

