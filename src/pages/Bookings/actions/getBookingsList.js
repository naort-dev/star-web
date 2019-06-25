import axios from 'axios';
import { cloneDeep, isEqual } from 'lodash';
import { celebOpenStatusList } from '../../../constants/requestStatusList';
import { updateUnseenCount } from '../../../services';
import Api from '../../../lib/api';
import { filterOptions, sortBy } from '../constants';
import { updateUserDetails } from '../../../store/shared/actions/getUserDetails';
import { fetch, CancelToken } from '../../../services/fetch';

export const BOOKINGS_LIST = {
  start: 'fetch_start/BOOKINGS_LIST',
  end: 'fetch_end/BOOKINGS_LIST',
  success: 'fetch_success/BOOKINGS_LIST',
  failed: 'fetch_failed/BOOKINGS_LIST',
  updateList: 'update/BOOKINGS_LIST',
  reset: 'RESET/BOOKINGS_LIST',
  update: 'UPDATE_BOOKING_LIST',
};

export const bookingsListFetchStart = (refresh, token) => ({
  type: BOOKINGS_LIST.start,
  refresh,
  token,
});

export const bookingsListFetchEnd = () => ({
  type: BOOKINGS_LIST.end,
});

export const bookingsListFetchSuccess = (list, offset, count, videoStatus, miscData = {}) => {
  return {
    type: BOOKINGS_LIST.success,
    list,
    offset,
    count,
    videoStatus,
    miscData,
  };
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

export const updateBookingList = data => ({
  type: BOOKINGS_LIST.update,
  data,
});

export const updateBookingsList = (id, newData) => (dispatch, getState) => {
  const originalList = cloneDeep(getState().bookings.bookingsList.data);
  const dataIndex = originalList.findIndex(item => item.booking_id === id);
  originalList[dataIndex] = newData;
  dispatch(bookingsListUpdate(originalList));
};

export const favoriteVideo = (bookingId, videoId) => (dispatch, getState) => {
  return fetch.post(Api.favoriteVideo, {
    booking: bookingId,
    video: videoId,
  })
    .then((resp) => {
      if (resp.data && resp.data.success) {
        const originalList = cloneDeep(getState().bookings.bookingsList.data);
        const booking = originalList.find(item => item.booking_id === bookingId);
        dispatch(updateBookingsList(bookingId, { ...booking, favorite: !booking.favorite }));
      }
    })
}

export const fetchBookingsList = (offset, refresh, requestStatus, filterParam = '', sortParam = '') => (
  dispatch,
  getState,
) => {
  const { unseen_bookings: unseenBookings } = getState().userDetails.settings_userDetails;
  const { status, limit } = getState().bookings.bookingsList;
  const videoStatus = requestStatus ? requestStatus : status;
  const source = CancelToken.source();
  let filterString = '';
  let sortString = '';
  filterOptions.forEach((filterOption) => {
    if (filterOption.id !== '') {
      filterString = `${filterString}&${filterOption.id}=${filterOption.id === filterParam}`;
    }
  })
  sortBy.forEach((sortOption) => {
    if (sortOption.id !== '') {
      sortString = `${sortString}&${sortOption.id}=${sortOption.id === sortParam}`;
    }
  })
  if (typeof getState().bookings.bookingsList.token !== typeof undefined) {
    getState().bookings.bookingsList.token.cancel(
      'Operation canceled due to new request.',
    );
  }
  dispatch(bookingsListFetchStart(refresh, source));
  return fetch
    .get(
      `${Api.getUserVideos}?status=${videoStatus}&limit=${limit}&offset=${offset}${filterString}${sortString}&role=celebrity_id`,
      {
        cancelToken: source.token,
      },
    )
    .then(resp => {
      if (resp.data && resp.data.success) {
        if (isEqual(videoStatus, celebOpenStatusList) && unseenBookings) {
          const { settings_userDetails, settings_celebrityDetails } = getState().userDetails;
          const userData = {
            userDetails: {...settings_userDetails, unseen_bookings: 0},
            celbDetails: settings_celebrityDetails,
          }
          updateUnseenCount();
          dispatch(updateUserDetails(userData));
        }
        dispatch(bookingsListFetchEnd());
        const { count } = resp.data.data;
        const miscData = {
          highCancel: resp.data.data.high_cancel,
          highCancelCount: resp.data.data.high_cancel_count,
        }
        dispatch(
          bookingsListFetchSuccess(
            resp.data.data.request_list,
            offset,
            count,
            videoStatus,
            miscData,
          ),
        );
      } else {
        dispatch(bookingsListFetchEnd());
      }
    })
    .catch(exception => {
      if (axios.isCancel(exception)) {
        dispatch(bookingsListFetchEnd());
      }
      dispatch(bookingsListFetchFailed(exception));
    });
};
