import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';
import { loaderAction } from '../../../store/shared/actions/commonActions';

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
  return {
    type: CELEB_DETAILS.success,
    details,
  };
};

export const celebDetailstFetchFailed = (error) => ({
  type: CELEB_DETAILS.failed,
  error,
});

export const celebDetailstFetchFollowUpdate = (details) => {
  return {
    type: CELEB_DETAILS.update,
    details,
  };
};

export const resetCelebDetails = () => ({
  type: CELEB_DETAILS.reset,
});

export const updateCelebDetailsFollow = (follow) => (dispatch, getState) => {
  const { userDetails } = getState().celebDetails;
  const { is_follow: isFollow } = userDetails;
};

export const fetchCelebDetails = (id) => (dispatch, getState) => {
  if (!id) return null;
  const { isLoggedIn } = getState().session;
  let API_URL;
  if (isLoggedIn) {
    API_URL = `${Api.authGetCelebDetails}${id}/`;
  } else {
    API_URL = Api.getCelebDetails(id);
  }
  dispatch(loaderAction(true));
  return fetch
    .get(API_URL, {})
    .then((resp) => {
      if (resp.data && resp.data.success) {
        dispatch(celebDetailstFetchSuccess(resp.data.data));
        dispatch(loaderAction(false));
      } else {
        dispatch(loaderAction(false));
        dispatch(celebDetailstFetchFailed('404'));
      }
    })
    .catch((exception) => {
      dispatch(loaderAction(false));
      dispatch(celebDetailstFetchFailed(exception.response.data));
    });
};
