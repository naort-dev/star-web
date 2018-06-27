
import Api from '../../../lib/api';
import { fetch, CancelToken } from '../../../services/fetch';
import axios from 'axios';

export const FAVOURITES_LIST = {
  start: 'fetch_start/FAVOURITES_LIST',
  end: 'fetch_end/FAVOURITES_LIST',
  success: 'fetch_success/FAVOURITES_LIST',
  failed: 'fetch_failed/FAVOURITES_LIST',
};

export const favouritesListFetchStart = refresh => ({
  type: FAVOURITES_LIST.start,
  refresh,
});

export const favouritesListFetchEnd = () => ({
  type: FAVOURITES_LIST.end,
});

export const favouritesListFetchSuccess = (list, offset, count) => {
  return (
    {
      type: FAVOURITES_LIST.success,
      list,
      offset,
      count,
    });
};

export const favouritesListFetchFailed = error => ({
  type: FAVOURITES_LIST.failed,
  error,
});


export const fetchFavouritesList = (offset, refresh) => (dispatch, getState) => {
  const { isLoggedIn, auth_token } = getState().session;
  const { limit } = getState().favouritesList;
  dispatch(favouritesListFetchStart(refresh));
  return fetch.get(`${Api.getUserFavourites}?offset=${offset}&limit=${limit}`, {
    headers: {
      'Authorization': `token ${auth_token.authentication_token}`,
    },
  }).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(favouritesListFetchEnd());
      let list = getState().favouritesList.data;
      const { count } = resp.data.data;
      if (refresh) {
        list = resp.data.data.celebrity_list;
      } else {
        list = [...list, ...resp.data.data.celebrity_list];
      }
      dispatch(favouritesListFetchSuccess(list, offset, count));
    } else {
      dispatch(favouritesListFetchEnd());
    }
  }).catch((exception) => {
    dispatch(favouritesListFetchEnd());
    dispatch(favouritesListFetchFailed(exception));
  });
};

