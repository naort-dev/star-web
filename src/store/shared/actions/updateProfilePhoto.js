import { loaderAction, updateToast } from 'store/shared/actions/commonActions';
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';
import { fetchUserDetails } from './getUserDetails';

export const UPDATE_PROFILE_PHOTO = {
  start: 'fetch_start/update_profile_photo',
  end: 'fetch_end/update_profile_photo',
  success: 'fetch_success/update_profile_photo',
  failed: 'fetch_failed/update_profile_photo',
  reset: 'reset/reset_update_profile_photo',
};

export const SET_PROFILE_PIC_TO_STATE = 'setProfilePicToState';

export const updateProfilePhotoFetchStart = () => ({
  type: UPDATE_PROFILE_PHOTO.start,
});

export const updateProfilePhotoFetchEnd = () => ({
  type: UPDATE_PROFILE_PHOTO.end,
});

export const updateProfilePhotoFetchSuccess = details => {
  return {
    type: UPDATE_PROFILE_PHOTO.success,
    details,
  };
};

export const updateProfilePhotoFetchFailed = error => ({
  type: UPDATE_PROFILE_PHOTO.failed,
  error,
});
export const resetProfilePhoto = () => ({
  type: UPDATE_PROFILE_PHOTO.reset,
});

export const setProfilePicToState = profilePic => ({
  type: SET_PROFILE_PIC_TO_STATE,
  payload: profilePic,
});

export const updateProfilePhoto = (obj, showToast) => (dispatch, getState) => {
  const API_URL = `${Api.updatePhoto}`;
  dispatch(updateProfilePhotoFetchStart());
  dispatch(loaderAction(true));
  return fetch
    .post(API_URL, obj)
    .then(resp => {
      if (resp.data && resp.data.success) {
        dispatch(updateProfilePhotoFetchEnd());
        dispatch(updateProfilePhotoFetchSuccess(resp.data.data));
        dispatch(
          fetchUserDetails(getState().userDetails.settings_userDetails.id),
        );
        dispatch(loaderAction(false));
        if (showToast)
          dispatch(
            updateToast({
              value: true,
              message: 'Successfully updated',
              variant: 'success',
            }),
          );
        return resp.data.data;
      }
      dispatch(updateProfilePhotoFetchEnd());
      dispatch(updateProfilePhotoFetchFailed('404'));
      dispatch(loaderAction(false));
    })
    .catch(exception => {
      dispatch(loaderAction(false));
      if (showToast)
        dispatch(
          updateToast({
            value: true,
            message: exception.response.data.error.message,
            variant: 'error',
          }),
        );
      dispatch(updateProfilePhotoFetchEnd());
      dispatch(updateProfilePhotoFetchFailed(exception));
    });
};
