import axios from 'axios';
import Api from '../../../lib/api';
import { fetch, CancelToken } from '../../../services/fetch';

export const FEATURED_STARS = {
  start: 'fetch_start/featured_stars',
  end: 'fetch_end/featured_stars',
  success: 'fetch_success/featured_stars',
  successCategory: 'fetch_success/category_stars',
  failed: 'fetch_failed/featured_stars',
};

export const featuredFetchStart = token => ({
  type: FEATURED_STARS.start,
  token,
});

export const featuredFetchEnd = () => ({
  type: FEATURED_STARS.end,
});

export const featuredFetchSuccess = (title, list) => {
  return (
    {
      type: FEATURED_STARS.success,
      title,
      list,
    });
};


export const featuredCategorySuccess = (title, list, profession) => {
  return (
    {
      type: FEATURED_STARS.successCategory,
      title,
      list,
      profession,
    });
};

export const featuredFetchFailed = error => ({
  type: FEATURED_STARS.failed,
  error,
});

export const fetchFeaturedStars = profession => (dispatch, getState) => {
  const source = CancelToken.source();
  if (typeof getState().featuredStars.token !== typeof undefined) {
    getState().featuredStars.token.cancel('Operation canceled due to new request.');
  }
  dispatch(featuredFetchStart());
  let API = Api.getFeaturedStars;
  if (profession) {
    API = `${API}?profession=${profession.value}`;
  }
  return fetch.get(API).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(featuredFetchEnd(source));
      if (profession) {
        dispatch(featuredCategorySuccess(resp.data.data.display_title, resp.data.data.celebrity_display, profession));
      } else {
        dispatch(featuredFetchSuccess(resp.data.data.display_title, resp.data.data.celebrity_display));
      }
    } else {
      dispatch(featuredFetchEnd());
    }
  }).catch((exception) => {
    if (axios.isCancel(exception)) {
      dispatch(featuredFetchEnd());
    }
    dispatch(featuredFetchFailed(exception));
  });
};


