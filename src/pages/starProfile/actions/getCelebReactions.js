
import axios from 'axios';
import Api from '../../../lib/api';
import { fetch, CancelToken } from '../../../services/fetch';
import { checkPrerender } from '../../../utils/checkOS';


export const CELEB_REACTIONS_LIST = {
  start: 'fetch_start/celeb_reactions_list',
  end: 'fetch_end/celeb_reactions_list',
  success: 'fetch_success/celeb_reactions_list',
  failed: 'fetch_failed/celeb_reactions_list',
  celebLoading: 'loading/celeb_reactions_list',
};

export const celebReactionsListFetchStart = (refresh, token) => ({
  type: CELEB_REACTIONS_LIST.start,
  refresh,
  token,
});

export const celebReactionsListFetchEnd = () => ({
  type: CELEB_REACTIONS_LIST.end,
});

export const celebReactionsListFetchSuccess = (list, offset, count, newLimit) => {
  return (
    {
      type: CELEB_REACTIONS_LIST.success,
      list,
      offset,
      count,
      newLimit,
    });
};

export const celebReactionsListFetchFailed = error => ({
  type: CELEB_REACTIONS_LIST.failed,
  error,
});

export const celebReactionsListFetchLoading = refresh => ({
  type: CELEB_REACTIONS_LIST.celebLoading,
  refresh,
});

export const fetchCelebReactionsList = (id, offset, refresh, customLimit) => (dispatch, getState) => {
  if (checkPrerender()) {
    return null;
  }
  const { limit } = getState().starDetails.celebReactions;
  if (typeof getState().starDetails.celebReactions.token !== typeof undefined) {
    getState().starDetails.celebReactions.token.cancel('Operation canceled due to new request.');
  }
  const source = CancelToken.source();
  if (offset === 0) {
    dispatch(celebReactionsListFetchStart(refresh, source));
  } else {
    dispatch(celebReactionsListFetchLoading());
  }
  const newLimit = customLimit || limit;
  return fetch.get(`${Api.getStarReaction}${id}/?limit=${newLimit}&offset=${offset}`, {
    cancelToken: source.token,
  }).then((resp) => {
    if (resp.data && resp.data.success) {
      let list = getState().starDetails.celebReactions.data;
      const { count } = resp.data.data;
      if (refresh) {
        list = resp.data.data['reactions-details'];
      } else {
        list = [...list, ...resp.data.data['reactions-details']];
      }
      dispatch(celebReactionsListFetchSuccess(list, offset, count, newLimit));
      dispatch(celebReactionsListFetchEnd());
    } else {
      dispatch(celebReactionsListFetchEnd());
    }
  }).catch((exception) => {
    if (axios.isCancel(exception)) {
      dispatch(celebReactionsListFetchEnd());
    }
    dispatch(celebReactionsListFetchFailed(exception));
  });
};

