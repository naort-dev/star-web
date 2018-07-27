
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';
import { fetchMyVideosList } from './getMyVideosList';

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
  const { status, offset } = getState().myVideosList;
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
      dispatch(fetchMyVideosList(offset, true, status));
    } else {
      dispatch(requestFetchEnd());
    }
  }).catch((exception) => {
    dispatch(requestFetchEnd());
    dispatch(requestFetchFailed(exception));
  });
};
