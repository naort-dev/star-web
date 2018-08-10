
export const SET_SOCIAL_MEDIA_DATA = 'setSocialMediaData';
export const RESET_SOCIAL_MEDIA_DATA = 'cancelSocialMediaData';
export const setSocialMediaData = data => ({
  type: SET_SOCIAL_MEDIA_DATA,
  payload: data,
});
export const resetSocialMediaData = data => ({
  type: RESET_SOCIAL_MEDIA_DATA,
  payload: data,
});
