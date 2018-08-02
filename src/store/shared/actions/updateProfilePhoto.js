
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';


export const UPDATE_PROFILE_PHOTO = {
  start: 'fetch_start/update_profile_photo',
  end: 'fetch_end/update_profile_photo',
  success: 'fetch_success/update_profile_photo',
  failed: 'fetch_failed/update_profile_photo',
  reset: 'reset/reset_update_profile_photo',
};

export const updateProfilePhotoFetchStart = () => ({
  type: UPDATE_PROFILE_PHOTO.start,
});

export const updateProfilePhotoFetchEnd = () => ({
  type: UPDATE_PROFILE_PHOTO.end,
});

export const updateProfilePhotoFetchSuccess = (details) => {
  return (
    {
      type: UPDATE_PROFILE_PHOTO.success,
      details,
    });
};

export const updateProfilePhotoFetchFailed = error => ({
  type: UPDATE_PROFILE_PHOTO.failed,
  error,
});
export const resetProfilePhoto = () => ({
  type: UPDATE_PROFILE_PHOTO.reset,
});


export const updateProfilePhoto = obj => (dispatch, getState) => {
  const { isLoggedIn, auth_token } = getState().session;
  let API_URL;
  let options;
  if (isLoggedIn) {
    API_URL = `${Api.updatePhoto}`;
    options = {
      headers: {
        'Authorization': `token ${auth_token.authentication_token}`,
      },
    };
  }
  dispatch(updateProfilePhotoFetchStart());
  return fetch.post(API_URL, obj, options).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(updateProfilePhotoFetchEnd());
      dispatch(updateProfilePhotoFetchSuccess(resp.data.data));
    } else {
      dispatch(updateProfilePhotoFetchEnd());
      dispatch(updateProfilePhotoFetchFailed('404'));
    }
  }).catch((exception) => {
    dispatch(updateProfilePhotoFetchEnd());
    dispatch(updateProfilePhotoFetchFailed(exception));
  });
};
