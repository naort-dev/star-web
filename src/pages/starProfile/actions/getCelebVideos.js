
import Api from '../../../lib/api';
import { fetch, CancelToken } from '../../../services/fetch';
import axios from 'axios';

export const CELEB_VIDEOS_LIST = {
  start: 'fetch_start/celeb_video_list',
  end: 'fetch_end/celeb_video_list',
  success: 'fetch_success/celeb_video_list',
  failed: 'fetch_failed/celeb_video_list',
  swapCacheStart: 'swap_cache_start/celeb_video_list',
  swapCacheEnd: 'swap_cache_end/celeb_video_list',
};

export const celebVideosListFetchStart = (refresh, token) => ({
  type: CELEB_VIDEOS_LIST.start,
  refresh,
  token,
});

export const celebVideosListFetchEnd = () => ({
  type: CELEB_VIDEOS_LIST.end,
});

export const celebVideosListFetchSuccess = (list, offset, count) => {
  return (
    {
      type: CELEB_VIDEOS_LIST.success,
      list,
      offset,
      count,
    });
};

export const celebVideosListFetchFailed = error => ({
  type: CELEB_VIDEOS_LIST.failed,
  error,
});

export const celebVideosListSwapCacheStart = refresh => ({
  type: CELEB_VIDEOS_LIST.swapCacheStart,
  refresh,
});

export const celebVideosListSwapCacheEnd = key => ({
  type: CELEB_VIDEOS_LIST.swapCacheEnd,
  key,
});

export const fetchCelebVideosList = (offset, refresh, id, requestType) => (dispatch, getState) => {
  // const cachedData = getState().videosList[category.label] && getState().videosList[category.label].data;
  const { limit } = getState().videosList;
  const request = requestType ? requestType: '';
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
  dispatch(celebVideosListFetchStart(refresh, source));
  return fetch.get(`${Api.getVideosList}?limit=${limit}&offset=${offset}&request_type=${request}&user_id=${id}`, {
    cancelToken: source.token,
  }).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(celebVideosListFetchEnd());
      let list = getState().videosList.data;
      const { count } = resp.data.data;
      if (refresh) {
        list = resp.data.data.featured_videos;
      } else {
        list = [...list, ...resp.data.data.featured_videos];
      }
      dispatch(celebVideosListFetchSuccess(list, offset, count));
    } else {
      dispatch(celebVideosListFetchEnd());
    }
  }).catch((exception) => {
    if (!axios.isCancel(exception)) {
      dispatch(celebVideosListFetchEnd());
    }
    dispatch(celebVideosListFetchFailed(exception));
  });
};

