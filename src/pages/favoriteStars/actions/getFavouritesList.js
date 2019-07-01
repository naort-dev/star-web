
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const FAVOURITES_LIST = {
  start: 'fetch_start/FAVOURITES_LIST',
  end: 'fetch_end/FAVOURITES_LIST',
  success: 'fetch_success/FAVOURITES_LIST',
  failed: 'fetch_failed/FAVOURITES_LIST',
  resetLoaded: 'reset/FAVOURITE_LOADED',
  updateFollow: 'update_list/FAVOURTIE_LIST',
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

export const favouritesListResetLoaded = () => ({
  type: FAVOURITES_LIST.resetLoaded,
});

export const favouritesListUpdateFollow = (list, newCount) => ({
  type: FAVOURITES_LIST.updateFollow,
  list,
  newCount,
});

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

export const updateFavouriteList = (celebrityId, follow) => (dispatch, getState) => {
  if (follow) {
    dispatch(fetchFavouritesList(0, true));
  } else {
    const newFavList = getState().favouritesList.data.filter((celeb) => {
      return celeb.id !== celebrityId;
    });
    const newCount = getState().favouritesList.count - 1;
    dispatch(favouritesListUpdateFollow(newFavList, newCount));
  }
};

export const favoriteStar = (celebrityId, follow) => (dispatch) => {
  return fetch.post(Api.followCelebrity, {
    celebrity: celebrityId,
    follow,
  }).then(() => {
      dispatch(updateFavouriteList(celebrityId, follow));
  }).catch((exception) => {
    // dispatch(followCelebrityFailed(exception));
  });
};

