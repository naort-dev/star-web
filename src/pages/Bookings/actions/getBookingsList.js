import axios from 'axios';
import { cloneDeep } from 'lodash';
import Api from '../../../lib/api';
import { fetch, CancelToken } from '../../../services/fetch';

export const BOOKINGS_LIST = {
  start: 'fetch_start/BOOKINGS_LIST',
  end: 'fetch_end/BOOKINGS_LIST',
  success: 'fetch_success/BOOKINGS_LIST',
  failed: 'fetch_failed/BOOKINGS_LIST',
  updateList: 'update/BOOKINGS_LIST',
  reset: 'RESET/BOOKINGS_LIST',
};

export const bookingsListFetchStart = (refresh, token) => ({
  type: BOOKINGS_LIST.start,
  refresh,
  token,
});

export const bookingsListFetchEnd = () => ({
  type: BOOKINGS_LIST.end,
});

export const bookingsListFetchSuccess = (list, offset, count, videoStatus) => {
  return (
    {
      type: BOOKINGS_LIST.success,
      list,
      offset,
      count,
      videoStatus,
    });
};

export const bookingsListFetchFailed = error => ({
  type: BOOKINGS_LIST.failed,
  error,
});

export const bookingsListUpdate = data => ({
  type: BOOKINGS_LIST.updateList,
  data,
});

export const bookingsListReset = () => ({
  type: BOOKINGS_LIST.reset,
});

export const updateBookingsList = (id, newData) => (dispatch, getState) => {
  const originalList = cloneDeep(getState().bookingsList.data);
  const dataIndex = originalList.findIndex(item => item.id === id);
  originalList[dataIndex] = newData;
  dispatch(bookingsListFetchStart(false, getState().bookingsList.token));
  dispatch(bookingsListUpdate(originalList));
};

export const fetchBookingsList = (offset, refresh, requestStatus) => (dispatch, getState) => {
  const { status, limit } = getState().bookingsList;
  const videoStatus = requestStatus ? requestStatus : status;
  const source = CancelToken.source();
  if (typeof getState().bookingsList.token !== typeof undefined) {
    getState().bookingsList.token.cancel('Operation canceled due to new request.');
  }
  dispatch(bookingsListFetchStart(refresh, source));
  return fetch.get(`${Api.getUserVideos}?status=${videoStatus}&limit=${limit}&offset=${offset}&role=celebrity_id`, {
    cancelToken: source.token,
  }).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(bookingsListFetchEnd());
      const { count } = resp.data.data;
      dispatch(bookingsListFetchSuccess(resp.data.data.request_list, offset, count, videoStatus));
    } else {
      dispatch(bookingsListFetchEnd());
    }
  }).catch((exception) => {
    if (axios.isCancel(exception)) {
      dispatch(bookingsListFetchEnd());
    }
    dispatch(bookingsListFetchFailed(exception));
  });
};
