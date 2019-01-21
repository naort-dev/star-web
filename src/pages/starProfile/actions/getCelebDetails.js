
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const CELEB_DETAILS = {
  start: 'fetch_start/celeb_details',
  end: 'fetch_end/celeb_details',
  success: 'fetch_success/celeb_details',
  failed: 'fetch_failed/celeb_details',
  reset: 'reset/celeb_details',
  update: 'reset/celeb_details',
};

export const celebDetailsFetchStart = () => ({
  type: CELEB_DETAILS.start,
});

export const celebDetailstFetchEnd = () => ({
  type: CELEB_DETAILS.end,
});

export const celebDetailstFetchSuccess = (details) => {
  return (
    {
      type: CELEB_DETAILS.success,
      details,
    });
};

export const celebDetailstFetchFailed = error => ({
  type: CELEB_DETAILS.failed,
  error,
});

export const celebDetailstFetchUpdate = (details) => {
  return (
    {
      type: CELEB_DETAILS.update,
      details,
    });
};

export const resetCelebDetails = () => ({
  type: CELEB_DETAILS.reset,
});

export const updateCelebDetailsFollow = follow => (dispatch, getState) => {
  const { userDetails } = getState().celebDetails;
  const { is_follow: isFollow } = userDetails;
};

export const fetchCelebDetails = id => (dispatch, getState) => {
  if (!id) return null;
  const { isLoggedIn, auth_token } = getState().session;
  let API_URL;
  let options;
  if (isLoggedIn) {
    API_URL = `${Api.authGetCelebDetails}${id}/`;
    options = {
      headers: {
        'Authorization': `token ${auth_token.authentication_token}`,
      },
    };
  } else {
    API_URL = Api.getCelebDetails(id);
    options = {};
  }
  dispatch(celebDetailsFetchStart());
  return fetch.get(API_URL, options).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(celebDetailstFetchEnd());
      dispatch(celebDetailstFetchSuccess(resp.data.data));
    } else {
      dispatch(celebDetailstFetchEnd());
      dispatch(celebDetailstFetchFailed('404'));
    }
  }).catch((exception) => {
    dispatch(celebDetailstFetchEnd());
    dispatch(celebDetailstFetchFailed(exception.response.data));
  });
};
