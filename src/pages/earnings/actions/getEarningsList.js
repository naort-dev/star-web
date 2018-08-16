
import Api from '../../../lib/api';
import { fetch, CancelToken } from '../../../services/fetch';
import axios from 'axios';

export const EARNINGS_LIST = {
  start: 'fetch_start/EARNINGS_LIST',
  end: 'fetch_end/EARNINGS_LIST',
  success: 'fetch_success/EARNINGS_LIST',
  failed: 'fetch_failed/EARNINGS_LIST',
  pendingSuccess: 'fetch_pending_success/EARNINGS_LIST',
  paidSuccess: 'fetch_paid_success/EARNINGS_LIST',
};

export const earningsListFetchStart = status => ({
  type: EARNINGS_LIST.start,
  status,
});

export const earningsListFetchEnd = status => ({
  type: EARNINGS_LIST.end,
  status,
});

export const earningsListFetchSuccess = list => (
  {
    type: EARNINGS_LIST.success,
    list,
  });

export const pendingEarningsListFetchSuccess = (list, offset) => (
  {
    type: EARNINGS_LIST.pendingSuccess,
    list,
    offset,
  });

export const paidEarningsListFetchSuccess = (list, offset) => (
  {
    type: EARNINGS_LIST.paidSuccess,
    list,
    offset,
  });


export const earningsListFetchFailed = error => ({
  type: EARNINGS_LIST.failed,
  error,
});

export const fetchEarningsList = params => (dispatch, getState) => {
  dispatch(earningsListFetchStart(params.status));
  return fetch.get(Api.getEarningsList, { params }).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(earningsListFetchEnd(params.status));
      if (params.status === 1) dispatch(pendingEarningsListFetchSuccess(resp.data.data, params.offset));
      else if (params.status === 2) dispatch(paidEarningsListFetchSuccess(resp.data.data, params.offset));
      else dispatch(earningsListFetchSuccess(resp.data.data));
    } else {
      dispatch(earningsListFetchEnd(params.status));
    }
  }).catch((exception) => {
    dispatch(earningsListFetchEnd(params.status));
    dispatch(earningsListFetchFailed(exception));
  });
};

