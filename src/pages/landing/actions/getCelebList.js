import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep'
import Api from '../../../lib/api';
import { updateSelectedSubCategory } from './updateFilters';
import { fetch, CancelToken } from '../../../services/fetch';

export const CELEB_LIST = {
  start: 'fetch_start/celeb_list',
  end: 'fetch_end/celeb_list',
  success: 'fetch_success/celeb_list',
  failed: 'fetch_failed/celeb_list',
  updateCelebList: 'update_celeb_follow/celeb_list',
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

export const celebListFetchSuccess = (list, offset, count, category, searchParam, isLoggedIn, newCachedData) => {
  return (
    {
      type: CELEB_LIST.success,
      list,
      offset,
      count,
      category,
      searchParam,
      isLoggedIn,
      newCachedData,
    });
};

export const celebListFetchFailed = error => ({
  type: CELEB_LIST.failed,
  error,
});

export const celebListUpdateFollow = cachedData => ({
  type: CELEB_LIST.updateCelebList,
  cachedData,
});

export const celebListSwapCacheStart = refresh => ({
  type: CELEB_LIST.swapCacheStart,
  refresh,
});

export const celebListSwapCacheEnd = key => ({
  type: CELEB_LIST.swapCacheEnd,
  key,
});

export const updateCelebrityFollow = (celebrityId, celebProfessions, follow) => (dispatch, getState) => {
  const {
    category,
  } = getState().filters;
  const categoryList = celebProfessions.map((profession, index) => {
    return profession.parent;
  });
  categoryList.push('featured');
  let cachedData = { ...getState().celebList.cachedData };
  Object.keys(cachedData).map((key, index) => {
    if (categoryList.indexOf(key) > -1) {
      cachedData[key].data.map((celeb) => {
        if (celeb.id === celebrityId) {
          celeb.celebrity_follow = follow;
        }
      });
    }
  });
  dispatch(celebListUpdateFollow(cachedData));
}
export const fetchCelebrityList = (offset, refresh, selectedCategory) => (dispatch, getState) => {
  const {
    category,
    searchParam,
    lowPrice,
    highPrice,
    sortValue,
    tag,
  } = getState().filters;
  const { filters } = getState();
  const { cachedData: storeCache } = getState().celebList;
  const { isLoggedIn, auth_token } = getState().session;
  const loginChange = isLoggedIn === (getState().celebList.cachedData[category.label] && getState().celebList.cachedData[category.label].isLoggedIn);
  const cachedData = getState().celebList.cachedData[category.label] && getState().celebList.cachedData[category.label].data;
  const categoryChange = category.label !== getState().celebList.currentCategory;
  const priceRangeChange =
    lowPrice !== (getState().celebList.cachedData[category.label] && getState().celebList.cachedData[category.label].lowPrice) ||
    highPrice !== (getState().celebList.cachedData[category.label] && getState().celebList.cachedData[category.label].highPrice);
  const searchParamChange = searchParam !== (getState().celebList.cachedData[category.label] && getState().celebList.cachedData[category.label].currentSearchParam);
  const sortValueChange = sortValue !== (getState().celebList.cachedData[category.label] && getState().celebList.cachedData[category.label].sortValue);
  const { limit } = getState().celebList;
  if (categoryChange && loginChange && !searchParamChange && ((!priceRangeChange && !sortValueChange) || category.label === 'Featured') && cachedData) {
    if (typeof getState().celebList.token !== typeof undefined) {
      getState().celebList.token.cancel('Operation canceled due to new request.');
    }
    dispatch(celebListSwapCacheStart(refresh));
    return new Promise((resolve) => {
      setTimeout(resolve, 0);
    }).then(() => {
      dispatch(updateSelectedSubCategory(storeCache[category.label].selectedList))
      dispatch(celebListSwapCacheEnd(category.label));
    });
  }
  if (typeof getState().celebList.token !== typeof undefined) {
    getState().celebList.token.cancel('Operation canceled due to new request.');
  }
  const source = CancelToken.source();
  dispatch(celebListFetchStart(refresh, source, category.label));
  let API_BASE;
  let options;
  if (isLoggedIn) {
    API_BASE = Api.authGetCelebList;
    options = {
      cancelToken: source.token,
      headers: {
        'Authorization': `token ${auth_token.authentication_token}`,
      },
    };
  } else {
    API_BASE = Api.getCelebList;
    options = {
      cancelToken: source.token
    };
  }
  let API_URL;
  if (!isEmpty(tag)) {
    API_URL = `${API_BASE}?limit=${limit}&offset=${offset}&name=${searchParam}&urate=${highPrice}&lrate=${lowPrice}&sort=${sortValue}&tag=${tag.id}`;
  } else if (category.label === 'Featured')  {
    API_URL = `${API_BASE}?limit=${limit}&offset=${offset}&name=${searchParam}&sort=popularity`;
  } else {
    const subCategoryList = filters.category.selected;
    const professsion = subCategoryList && subCategoryList.length ? subCategoryList.map(cat => cat.id).toString() : category.value;
    if (selectedCategory === 'Group') {
      API_URL = `${API_BASE}?limit=${limit}&offset=${offset}&group_type=${professsion}&name=${searchParam}&urate=${highPrice}&lrate=${lowPrice}&sort=${sortValue}`;
    } else {
      API_URL = `${API_BASE}?limit=${limit}&offset=${offset}&profession=${professsion === 0 ? '' : professsion}&name=${searchParam}&urate=${highPrice}&lrate=${lowPrice}&sort=${sortValue}`;
    }
  }
  return fetch.get(API_URL, options).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(celebListFetchEnd());
      let list = getState().celebList.data;
      const { count } = resp.data.data;
      if (refresh) {
        list = resp.data.data.celebrity_list;
      } else {
        list = [...list, ...resp.data.data.celebrity_list];
      }
      let newCachedData = cloneDeep(storeCache);
      if (isEmpty(tag)) {
        newCachedData = {
          ...newCachedData,
          [category.label]: {
            offset,
            data: list,
            count,
            currentSearchParam: searchParam,
            lowPrice,
            highPrice,
            sortValue,
            selectedList: category.selected,
            isLoggedIn,
          }
        }
      }
      dispatch(celebListFetchSuccess(list, offset, count, category.label, searchParam, isLoggedIn, newCachedData));
    } else {
      dispatch(celebListFetchEnd());
    }
  }).catch((exception) => {
    if (axios.isCancel(exception)) {
      dispatch(celebListFetchEnd());
    }
    dispatch(celebListFetchFailed(exception));
  });
};

