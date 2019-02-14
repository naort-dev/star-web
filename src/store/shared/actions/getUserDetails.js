import cloneDeep from 'lodash/cloneDeep';

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
  const finalUserData = cloneDeep(userData);
  let stageName = '';
  let avatarPhoto;
  let avatarPhotoHD;
  if (finalUserData.user) {
    stageName = finalUserData.user.nick_name !== '' ? finalUserData.user.nick_name : `${finalUserData.user.first_name} ${finalUserData.user.last_name}`;
    if (finalUserData.user.avatar_photo) {
      avatarPhoto = finalUserData.user.avatar_photo.thumbnail_url || finalUserData.user.avatar_photo.image_url;
      avatarPhotoHD = finalUserData.user.avatar_photo.image_url;
    } else if (finalUserData.user.profile_photo) {
      avatarPhoto = finalUserData.user.profile_photo;
      avatarPhotoHD = finalUserData.user.profile_photo;
    }
  }
  finalUserData.user.stageName = stageName;
  finalUserData.user.avatarPhoto = avatarPhoto;
  finalUserData.user.avatarPhotoHD = avatarPhotoHD;
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
