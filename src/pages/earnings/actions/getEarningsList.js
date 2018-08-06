
import Api from '../../../lib/api';
import { fetch, CancelToken } from '../../../services/fetch';
import axios from 'axios';

export const EARNINGS_LIST = {
  start: 'fetch_start/EARNINGS_LIST',
  end: 'fetch_end/EARNINGS_LIST',
  success: 'fetch_success/EARNINGS_LIST',
  failed: 'fetch_failed/EARNINGS_LIST',
};

export const earningsListFetchStart = () => ({
  type: EARNINGS_LIST.start,
});

export const earningsListFetchEnd = () => ({
  type: EARNINGS_LIST.end,
});

export const earningsListFetchSuccess = (list) => {
  return (
    {
      type: EARNINGS_LIST.success,
      list,
    });
};

export const earningsListFetchFailed = error => ({
  type: EARNINGS_LIST.failed,
  error,
});

export const fetchEarningsList = () => (dispatch, getState) => {
  dispatch(earningsListFetchStart());
  return fetch.get(Api.getEarningsList).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(earningsListFetchEnd());
      dispatch(earningsListFetchSuccess(resp.data.data));
    } else {
      dispatch(earningsListFetchEnd());
    }
  }).catch((exception) => {
    dispatch(earningsListFetchEnd());
    dispatch(earningsListFetchFailed(exception));
  });
};

