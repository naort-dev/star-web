import { updateToast, loaderAction } from 'store/shared/actions/commonActions';
import Api from '../../../lib/api';
import { myVideosListFetchSuccess } from './getMyVideosList';
import { fetch } from '../../../services/fetch';

export const REQUESTS = {
  start: 'requests/START',
  end: 'requests/END',
  failed: 'requests/FAILED',
};

export const requestFetchStart = () => ({
  type: REQUESTS.start,
});

export const requestFetchEnd = () => ({
  type: REQUESTS.end,
});

export const requestFetchFailed = error => ({
  type: REQUESTS.failed,
  error,
});

export const changeRequestStatus = (requestId, requestStatus) => (dispatch, getState) => {
  let { data: bookingsList, count, offset, videoStatus } = getState().bookingsList;
  if (requestStatus === 5) { // decline bookings
    bookingsList = bookingsList.filter(booking => booking.booking_id !== requestId);
    offset -= 1;
    count -= 1;
  }
  dispatch(myVideosListFetchSuccess(bookingsList, offset, count, videoStatus));
}

export const changeBookingStatus = (requestId, requestStatus, comment) => (
  dispatch,
  getState,
) => {
  dispatch(requestFetchStart());
  dispatch(loaderAction(true));
  return fetch
    .post(
      Api.changeRequestStatus,
      {
        id: requestId,
        status: requestStatus,
        comment,
      }
    )
    .then(resp => {
      dispatch(loaderAction(false));
      if (resp.data && resp.data.success) {
        dispatch(requestFetchEnd());
        dispatch(changeRequestStatus(requestId, requestStatus))
      } else {
        dispatch(requestFetchEnd(requestId, requestStatus));
      }
      return resp.data.success;
    })
    .catch(exception => {
      dispatch(requestFetchEnd());
      dispatch(requestFetchFailed(exception));
      dispatch(updateToast({
        value: true,
        message: exception.response.data.error.message,
        variant: 'error',
      }))
    })
};
