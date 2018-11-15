
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';
import { fetchMyVideosList } from './getMyVideosList';
import { fetchUserDetails } from '../../../store/shared/actions/getUserDetails';

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


export const changeRequestStatus = (requestId, requestStatus, comment) => (dispatch, getState) => {
  const { authentication_token: authToken } = getState().session.auth_token;
  const { status, offset, role } = getState().myVideosList;
  const { id } = getState().userDetails.settings_userDetails;
  dispatch(requestFetchStart());
  return fetch.post(Api.changeRequestStatus, {
    id: requestId,
    status: requestStatus,
    comment,
  }, {
    headers: {
      'Authorization': `token ${authToken}`,
    },
  }).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(requestFetchEnd());
      dispatch(fetchMyVideosList(0, true, role, status));
      dispatch(fetchUserDetails(id));
    } else {
      dispatch(requestFetchEnd());
    }
  }).catch((exception) => {
    dispatch(requestFetchEnd());
    dispatch(requestFetchFailed(exception));
  });
};


export const responseVideo = (requestId, fileName) => (dispatch, getState) => {
  const { authentication_token: authToken } = getState().session.auth_token;
  const { status, offset, role } = getState().myVideosList;
  const { id } = getState().userDetails.settings_userDetails;
  dispatch(requestFetchStart());
  return fetch.post(Api.starsonaVideo, {
    video: fileName,
    stragramz_request: requestId,
    duration: '00:00',
  }, {
    headers: {
      'Authorization': `token ${authToken}`,
    },
  }).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(requestFetchEnd());
      dispatch(fetchMyVideosList(0, true, role, status));
      dispatch(fetchUserDetails(id));
    } else {
      dispatch(requestFetchEnd());
    }
  }).catch((exception) => {
    dispatch(requestFetchEnd());
    dispatch(requestFetchFailed(exception));
  });
};

