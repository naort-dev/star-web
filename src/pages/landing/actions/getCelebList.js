
import Api from '../../../lib/api';
import fetch from '../../../services/fetch';

export const CELEB_LIST = {
  start: 'fetch_start/celeb_list',
  end: 'fetch_end/celeb_list',
  success: 'fetch_success/celeb_list',
  failed: 'fetch_failed/celeb_list',
}

export const celebListFetchStart = refresh => ({
  type: CELEB_LIST.start,
  refresh,
});

export const celebListFetchEnd = () => ({
  type: CELEB_LIST.end,
});

export const celebListFetchSuccess = (list, offset, count) => {
  return (
    {
      type: CELEB_LIST.success,
      list,
      offset,
      count,
    });
};

export const celebListFetchFailed = error => ({
  type: CELEB_LIST.failed,
  error,
});

export const fetchCelebrityList = (offset, refresh) => (dispatch, getState) => {
  dispatch(celebListFetchStart(refresh));
  const profession = getState().filters.category;
  return fetch.get(Api.getCelebList + '&offset=' + offset + '&profession=' + profession).then(resp => {
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
      dispatch(celebListFetchSuccess(list, offset, count));
    }
    else {
      dispatch(celebListFetchEnd());
    }
  }).catch((exception) => {
    dispatch(celebListFetchEnd());
    dispatch(celebListFetchFailed(exception));
  });
};

