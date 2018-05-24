
import Api from '../../../lib/api';
import fetch from '../../../services/fetch';

export const CELEB_LIST = {
  start: 'fetch_start/celeb_list',
  end: 'fetch_end/celeb_list',
  success: 'fetch_success/celeb_list',
  failed: 'fetch_failed/celeb_list',
  swapCacheStart: 'swap_cache_start/celeb_list',
  swapCacheEnd: 'swap_cache_end/celeb_list',
};

export const celebListFetchStart = refresh => ({
  type: CELEB_LIST.start,
  refresh,
});

export const celebListFetchEnd = () => ({
  type: CELEB_LIST.end,
});

export const celebListFetchSuccess = (list, offset, count, category) => {
  return (
    {
      type: CELEB_LIST.success,
      list,
      offset,
      count,
      category,
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
  const { category } = getState().filters;
  const cachedData = getState().celebList[category.label] && getState().celebList[category.label].data;
  const categoryChange = category.label !== getState().celebList.currentCategory;
  if (categoryChange && cachedData) {
    dispatch(celebListSwapCacheStart(refresh));
    setTimeout(() => {
      dispatch(celebListSwapCacheEnd(category.label));
    }, 0)
  }
  else {
    dispatch(celebListFetchStart(refresh));
    return fetch.get(Api.getCelebList + '&offset=' + offset + '&profession=' + category.value).then(resp => {
      if (resp.data && resp.data.success) {
        dispatch(celebListFetchEnd());
        let list = getState().celebList.data;
        let page = offset;
        let count = resp.data.data.count
        if(refresh) {
          list=resp.data.data.celebrity_list
        }
        else {
          list=[...list, ...resp.data.data.celebrity_list]
        }
        dispatch(celebListFetchSuccess(list, offset, count, category.label));
      }
      else {
        dispatch(celebListFetchEnd());
      }
    }).catch((exception) => {
      dispatch(celebListFetchEnd());
      dispatch(celebListFetchFailed(exception));
    });
  }
};

