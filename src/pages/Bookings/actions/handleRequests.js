import { updateToast, loaderAction } from 'store/shared/actions/commonActions';
import Api from '../../../lib/api';
import { bookingsListFetchSuccess } from './getBookingsList';
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

export const changeBookingList = (requestId, requestStatus) => (dispatch, getState) => {
  let { data: bookingsList, count, offset, videoStatus } = getState().bookingsList;
  if (requestStatus === 5) { // decline bookings
    bookingsList = bookingsList.filter(booking => booking.booking_id === requestId);
    offset -= 1;
    count -= 1;
  }
  dispatch(bookingsListFetchSuccess(bookingsList, offset, count, videoStatus));
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
        dispatch(changeBookingList())
      } else {
        dispatch(requestFetchEnd(requestId, requestStatus));
      }
    })
    .catch(exception => {
      dispatch(requestFetchEnd());
      dispatch(requestFetchFailed(exception));
      dispatch(updateToast({
        value: true,
        message: exception.response.data.error.message,
        variant: 'error',
      }))
    });
};

export const responseVideo = (requestId, fileName, callBack) => (
  dispatch,
  getState,
) => {
  const { authentication_token: authToken } = getState().session.auth_token;
  const { status, offset, role } = getState().myVideosList;
  const { id } = getState().userDetails.settings_userDetails;
  dispatch(requestFetchStart());
  return fetch
    .post(
      Api.starsonaVideo,
      {
        video: fileName,
        stragramz_request: requestId,
        duration: '00:00',
      },
      {
        headers: {
          Authorization: `token ${authToken}`,
        },
      },
    )
    .then(resp => {
      if (resp.data && resp.data.success) {
        dispatch(requestFetchEnd());
        if (callBack) callBack();
      } else {
        dispatch(requestFetchEnd());
      }
    })
    .catch(exception => {
      dispatch(updateToast({
        value: true,
        message: exception.response.data.error.message,
        variant: 'error',
      }));
      dispatch(requestFetchEnd());
      dispatch(requestFetchFailed(exception));
    });
};
