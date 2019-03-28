
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const FEATURED_STARS = {
  start: 'fetch_start/featured_stars',
  end: 'fetch_end/featured_stars',
  success: 'fetch_success/featured_stars',
  failed: 'fetch_failed/featured_stars',
};

export const featuredFetchStart = () => ({
  type: FEATURED_STARS.start,
});

export const featuredFetchEnd = () => ({
  type: FEATURED_STARS.end,
});

export const featuredFetchSuccess = (list) => {
  return (
    {
      type: FEATURED_STARS.success,
      list,
    });
};

export const featuredFetchFailed = error => ({
  type: FEATURED_STARS.failed,
  error,
});

export const fetchFeaturedStars = () => (dispatch) => {
  dispatch(featuredFetchStart());
  return fetch.get(Api.getFeaturedStars).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(featuredFetchEnd());
      dispatch(featuredFetchSuccess(resp.data.data.celebrity_display));
    } else {
      dispatch(featuredFetchEnd());
    }
  }).catch((exception) => {
    dispatch(featuredFetchFailed(exception));
  });
};

