
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const TRENDING_STARS = {
  start: 'fetch_start/trending_stars',
  end: 'fetch_end/trending_stars',
  success: 'fetch_success/trending_stars',
  failed: 'fetch_failed/trending_stars',
};

export const trendingFetchStart = () => ({
  type: TRENDING_STARS.start,
});

export const trendingFetchEnd = () => ({
  type: TRENDING_STARS.end,
});

export const trendingFetchSuccess = (list) => {
  return (
    {
      type: TRENDING_STARS.success,
      list,
    });
};

export const trendingFetchFailed = error => ({
  type: TRENDING_STARS.failed,
  error,
});

export const fetchTrendingStars = () => (dispatch) => {
  dispatch(trendingFetchStart());
  return fetch.get(Api.getTrendingStars).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(trendingFetchEnd());
      dispatch(trendingFetchSuccess(resp.data.data.trending_celebrity));
    } else {
      dispatch(trendingFetchEnd());
    }
  }).catch((exception) => {
    dispatch(trendingFetchFailed(exception));
  });
};

