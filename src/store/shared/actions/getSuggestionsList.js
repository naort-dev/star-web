import axios from 'axios';
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

const parseSearchResult = (results) => {
  let professions = [];
  let stars = [];
  results.forEach((searchItem) => {
    if (searchItem['_index'] === 'celebrities') {
      stars = [...stars, { ...searchItem['_source'] }];
    } else if (searchItem['_index'] === 'professions') {
      professions = [...professions, { ...searchItem['_source'] }]
    }
  });
  return { stars, professions };
};

export const fetchSuggestionList = searchParam => (dispatch, getState) => {
  const { data: configData } = getState().config;
  dispatch(suggestionListFetchStart(searchParam));
  const query = {
    query: {
      multi_match: {
        query: searchParam,
        fields: ['title', 'first_name', 'last_name', 'nick_name'],
        type: 'phrase_prefix',
      },
    },
  };
  return axios.get(`${configData.elastic_search_endpoint}_search?size=10000`, {
    params: {
      source: JSON.stringify(query),
      source_content_type: 'application/json',
    },
  }).then((resp) => {
    if (resp.data && resp.data.hits && resp.data.hits.hits && searchParam === getState().suggestionsList.searchText) {
      dispatch(suggestionListtFetchEnd());
      dispatch(suggestionListtFetchSuccess(parseSearchResult(resp.data.hits.hits)));
    } else if (searchParam === getState().suggestionsList.searchText) {
      dispatch(suggestionListtFetchEnd());
    }
  }).catch((exception) => {
    dispatch(suggestionListtFetchEnd());
    dispatch(suggestionListtFetchFailed(exception));
  })
};
