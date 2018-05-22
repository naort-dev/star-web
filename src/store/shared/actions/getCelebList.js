
import Api from '../../../lib/api';
import fetch from '../../../services/fetch';

export const CELEB_LIST = {
  start: 'fetch_start/celeb_list',
  end: 'fetch_end/celeb_list',
  success: 'fetch_success/celeb_list',
  failed: 'fetch_failed/celeb_list',
}

export const celebListFetchStart = () => ({
  type: CELEB_LIST.start,
});

export const celebListFetchEnd = () => ({
  type: CELEB_LIST.end,
});

export const celebListFetchSuccess = (data) => {
  return (
    {
      type: CELEB_LIST.success,
      data,
    });
};

export const celebListFetchFailed = error => ({
  type: CELEB_LIST.failed,
  error,
});

export const fetchCelebrityList = offset => (dispatch, getState) => {
  dispatch(celebListFetchStart());
  return fetch(Api.getCelebList+offset).then(resp => {
    if (resp.data && resp.data.success) {
      dispatch(celebListFetchEnd());
      dispatch(celebListFetchSuccess(resp.data.data));
    }
    else {
      dispatch(celebListFetchEnd());
    }
  }).catch((exception) => {
    dispatch(celebListFetchEnd());
    dispatch(celebListFetchFailed(exception));
  });
};
