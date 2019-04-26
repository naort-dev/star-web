
import Api from '../../../lib/api';
import { fetch, CancelToken } from '../../../services/fetch';
import axios from 'axios';
import { checkPrerender } from '../../../utils/checkOS';


export const CELEB_VIDEOS_LIST = {
  start: 'fetch_start/celeb_video_list',
  end: 'fetch_end/celeb_video_list',
  success: 'fetch_success/celeb_video_list',
  failed: 'fetch_failed/celeb_video_list',
  swapCacheStart: 'swap_cache_start/celeb_video_list',
  swapCacheEnd: 'swap_cache_end/celeb_video_list',
  celebLoading: 'loading/celeb_video_list',
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

export const celebVideosListFetchLoading = refresh => ({
  type: CELEB_VIDEOS_LIST.celebLoading,
  refresh,
});

export const fetchCelebVideosList = (offset, refresh, id, requestType) => (dispatch, getState) => {
  if (checkPrerender()) {
    return null;
  }
  const { limit } = getState().starDetails.celebVideos;
  const request = requestType ? requestType: '';
  if (typeof getState().starDetails.celebVideos.token !== typeof undefined) {
    getState().starDetails.celebVideos.token.cancel('Operation canceled due to new request.');
  }
  const source = CancelToken.source();
  if (offset === 0) {
    dispatch(celebVideosListFetchStart(refresh, source));
  } else {
    dispatch(celebVideosListFetchLoading());
  }
  return fetch.get(`${Api.getVideosList}?limit=${limit}&offset=${offset}&request_type=${request}&user_id=${id}`, {
    cancelToken: source.token,
  }).then((resp) => {
    if (resp.data && resp.data.success) {
      let list = getState().starDetails.celebVideos.data;
      const { count } = resp.data.data;
      if (refresh) {
        list = resp.data.data.featured_videos;
      } else {
        list = [...list, ...resp.data.data.featured_videos];
      }
      dispatch(celebVideosListFetchSuccess(list, offset, count));
      dispatch(celebVideosListFetchEnd());
    } else {
      dispatch(celebVideosListFetchEnd());
    }
  }).catch((exception) => {
    if (axios.isCancel(exception)) {
      dispatch(celebVideosListFetchEnd());
    }
    dispatch(celebVideosListFetchFailed(exception));
  });
};

