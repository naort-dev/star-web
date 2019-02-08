
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const USER_DETAILS = {
  start: 'fetch_start/user_details',
  end: 'fetch_end/user_details',
  success: 'fetch_success/user_details',
  failed: 'fetch_failed/user_details',
  updateUserRole: 'update_role/user_details',
  reset: 'reset/user_details',
};

export const userDetailsFetchStart = () => ({
  type: USER_DETAILS.start,
});

export const userDetailsFetchEnd = () => ({
  type: USER_DETAILS.end,
});

export const userDetailsFetchSuccess = (details) => {
  return (
    {
      type: USER_DETAILS.success,
      details,
    });
};

export const userDetailsFetchFailed = error => ({
  type: USER_DETAILS.failed,
  error,
});

export const resetUserDetails = () => ({
  type: USER_DETAILS.reset,
});


const parseUserDetails = (userData) => {
  const finalUserData = { ...userData };
  let stageName = '';
  let avatarPhoto;
  if (finalUserData.user) {
    stageName = finalUserData.user.nick_name !== '' ? finalUserData.user.nick_name : `${finalUserData.user.first_name} ${finalUserData.user.last_name}`;
    avatarPhoto = finalUserData.user.avatar_photo && finalUserData.user.avatar_photo.thumbnail_url;
  }
  finalUserData.user.stageName = stageName;
  finalUserData.user.avatarPhoto = avatarPhoto;
  return finalUserData;
};

export const fetchUserDetails = id => (dispatch, getState) => {
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
  }
  dispatch(userDetailsFetchStart());
  return fetch.get(API_URL, options).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(userDetailsFetchEnd());
      dispatch(userDetailsFetchSuccess(parseUserDetails(resp.data.data)));
      return resp.data.data;
    }
    dispatch(userDetailsFetchEnd());
    dispatch(userDetailsFetchFailed('404'));
  }).catch((exception) => {
    dispatch(userDetailsFetchEnd());
    dispatch(userDetailsFetchFailed(exception));
  });
};
