
import Api from '../../../lib/api';
import { fetch, CancelToken } from '../../../services/fetch';
import axios from 'axios';

export const CELEB_LIST = {
  start: 'fetch_start/celeb_list',
  end: 'fetch_end/celeb_list',
  success: 'fetch_success/celeb_list',
  failed: 'fetch_failed/celeb_list',
  swapCacheStart: 'swap_cache_start/celeb_list',
  swapCacheEnd: 'swap_cache_end/celeb_list',
};

export const celebListFetchStart = (refresh, token, category) => ({
  type: CELEB_LIST.start,
  refresh,
  token,
  category,
});

export const celebListFetchEnd = () => ({
  type: CELEB_LIST.end,
});

export const celebListFetchSuccess = (list, offset, count, category, searchParam, lowPrice, highPrice, sortValue) => {
  return (
    {
      type: CELEB_LIST.success,
      list,
      offset,
      count,
      category,
      searchParam,
      lowPrice,
      highPrice,
      sortValue,
    });
};

export const celebListFetchFailed = error => ({
  type: CELEB_LIST.failed,
  error,
});

export const celebListSwapCacheStart = refresh => ({
  type: CELEB_LIST.swapCacheStart,
  refresh,
});

export const celebListSwapCacheEnd = key => ({
  type: CELEB_LIST.swapCacheEnd,
  key,
});

export const fetchCelebrityList = (offset, refresh) => (dispatch, getState) => {
  const {
    category,
    searchParam,
    lowPrice,
    highPrice,
    sortValue,
  } = getState().filters;
  const { filters } = getState();
  const cachedData = getState().celebList[category.label] && getState().celebList[category.label].data;
  const categoryChange = category.label !== getState().celebList.currentCategory;
  const priceRangeChange =
    lowPrice !== (getState().celebList[category.label] && getState().celebList[category.label].lowPrice) ||
    highPrice !== (getState().celebList[category.label] && getState().celebList[category.label].highPrice);
  const searchParamChange = searchParam !== (getState().celebList[category.label] && getState().celebList[category.label].currentSearchParam);
  const sortValueChange = sortValue !== (getState().celebList[category.label] && getState().celebList[category.label].sortValue);
  const { limit } = getState().celebList;
  if (categoryChange && !searchParamChange && ((!priceRangeChange && !sortValueChange) || category.label === 'featured') && cachedData) {
    if (typeof getState().celebList.token !== typeof undefined) {
      getState().celebList.token.cancel('Operation canceled due to new request.');
    }
    dispatch(celebListSwapCacheStart(refresh));
    return new Promise((resolve) => {
      setTimeout(resolve, 0);
    }).then(() => {
      dispatch(celebListSwapCacheEnd(category.label));
    });
  }
  if (typeof getState().celebList.token !== typeof undefined) {
    getState().celebList.token.cancel('Operation canceled due to new request.');
  }
  const source = CancelToken.source();
  dispatch(celebListFetchStart(refresh, source, category.label));
  let API_URL;
  if (category.label === 'featured') {

    API_URL = `${Api.getCelebList}?limit=${limit}&offset=${offset}&name=${searchParam}&sort=featured`;
  } else {
    const subCategoryList = filters[category.value];
    const professsion = subCategoryList && Object.keys(subCategoryList).length ? Object.keys(subCategoryList).toString() : category.value;
    API_URL = `${Api.getCelebList}?limit=${limit}&offset=${offset}&profession=${professsion}&name=${searchParam}&urate=${highPrice}&lrate=${lowPrice}&sort=${sortValue}`;
  }
  return fetch.get(API_URL, {
    cancelToken: source.token,
  }).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(celebListFetchEnd());
      let list = getState().celebList.data;
      const { count } = resp.data.data;
      if (refresh) {
        list = resp.data.data.celebrity_list;
      } else {
        list = [...list, ...resp.data.data.celebrity_list];
      }
      dispatch(celebListFetchSuccess(list, offset, count, category.label, searchParam, lowPrice, highPrice, sortValue));
    } else {
      dispatch(celebListFetchEnd());
    }
  }).catch((exception) => {
    if (!axios.isCancel(exception)) {
      dispatch(celebListFetchEnd());
    }
    dispatch(celebListFetchFailed(exception));
  });
};

