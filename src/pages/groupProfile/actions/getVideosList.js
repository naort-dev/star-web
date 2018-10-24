
import Api from '../../../lib/api';
import { fetch, CancelToken } from '../../../services/fetch';
import axios from 'axios';

export const VIDEOS_LIST = {
  start: 'fetch_start/videos_list',
  end: 'fetch_end/videos_list',
  success: 'fetch_success/videos_list',
  failed: 'fetch_failed/videos_list',
  swapCacheStart: 'swap_cache_start/videos_list',
  swapCacheEnd: 'swap_cache_end/videos_list',
};

export const videosListFetchStart = (refresh, token) => ({
  type: VIDEOS_LIST.start,
  refresh,
  token,
});

export const videosListFetchEnd = () => ({
  type: VIDEOS_LIST.end,
});

export const videosListFetchSuccess = (list, offset, count) => {
  return (
    {
      type: VIDEOS_LIST.success,
      list,
      offset,
      count,
    });
};

export const videosListFetchFailed = error => ({
  type: VIDEOS_LIST.failed,
  error,
});

export const videosListSwapCacheStart = refresh => ({
  type: VIDEOS_LIST.swapCacheStart,
  refresh,
});

export const videosListSwapCacheEnd = key => ({
  type: VIDEOS_LIST.swapCacheEnd,
  key,
});

export const fetchVideosList = (offset, refresh) => (dispatch, getState) => {
  const { lowPrice, highPrice, selectedVideoType, selectedVideoDate } = getState().filters;
  // const cachedData = getState().videosList[category.label] && getState().videosList[category.label].data;
  const { limit } = getState().videosList;
  // if (categoryChange && cachedData) {
  //   if (typeof getState().videosList.token !== typeof undefined) {
  //     getState().videosList.token.cancel('Operation canceled due to new request.');
  //   }
  //   dispatch(videosListSwapCacheStart(refresh));
  //   return new Promise((resolve) => {
  //     setTimeout(resolve, 0);
  //   }).then(() => {
  //     dispatch(videosListSwapCacheEnd(category.label));
  //   });
  //   // setTimeout(() => {
  //   //   dispatch(videosListSwapCacheEnd(category.label));
  //   // }, 0);
  // }
  if (typeof getState().videosList.token !== typeof undefined) {
    getState().videosList.token.cancel('Operation canceled due to new request.');
  }
  const source = CancelToken.source();
  dispatch(videosListFetchStart(refresh, source));
  return fetch.get(`${Api.getVideosList}?limit=${limit}&offset=${offset}&request_type=${selectedVideoType}&date=${selectedVideoDate}`, {
    cancelToken: source.token,
  }).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(videosListFetchEnd());
      let list = getState().videosList.data;
      const { count } = resp.data.data;
      if (refresh) {
        list = resp.data.data.featured_videos;
      } else {
        list = [...list, ...resp.data.data.featured_videos];
      }
      dispatch(videosListFetchSuccess(list, offset, count));
    } else {
      dispatch(videosListFetchEnd());
    }
  }).catch((exception) => {
    if (axios.isCancel(exception)) {
      dispatch(videosListFetchEnd());
    }
    dispatch(videosListFetchFailed(exception));
  });
};

