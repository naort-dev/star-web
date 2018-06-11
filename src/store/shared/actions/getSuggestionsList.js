import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const SUGGESTION_LIST = {
  start: 'fetch_start/suggestion_list',
  end: 'fetch_end/suggestion_list',
  success: 'fetch_success/suggestion_list',
  failed: 'fetch_failed/suggestion_list',
  resetSearchParam: 'reset_search/search_param',
};

export const suggestionListFetchStart = searchText => ({
  type: SUGGESTION_LIST.start,
  searchText,
});

export const suggestionListtFetchEnd = () => ({
  type: SUGGESTION_LIST.end,
});

export const suggestionListtFetchSuccess = (suggestions) => {
  return (
    {
      type: SUGGESTION_LIST.success,
      suggestions,
    });
};

export const suggestionListtFetchFailed = error => ({
  type: SUGGESTION_LIST.failed,
  error,
});

export const resetSearchParam = searchParam => ({
  type: SUGGESTION_LIST.resetSearchParam,
  searchParam,
});

export const fetchSuggestionList = searchParam => (dispatch, getState) => {
  dispatch(suggestionListFetchStart(searchParam));
  return fetch.get(Api.getSuggestionList + '?s=' + searchParam).then((resp) => {
    if (resp.data && resp.data.success && searchParam === getState().suggestionsList.searchText) {
      dispatch(suggestionListtFetchEnd());
      dispatch(suggestionListtFetchSuccess(resp.data.data.suggestion_list));
    } else if (searchParam === getState().suggestionsList.searchText) {
      dispatch(suggestionListtFetchEnd());
    }
  }).catch((exception) => {
    dispatch(suggestionListtFetchEnd());
    dispatch(suggestionListtFetchFailed(exception));
  });
};
