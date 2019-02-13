
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';
import { fetchUserDetails } from './getUserDetails';

export const SOCIALMEDIALOGIN = {
  start: 'session/ON_LOGIN',
  end: 'session/ON_LOGIN_END',
  success: 'session/ON_LOGIN_SUCCESS',
  failed: 'session/ON_LOGIN_FAILED',
  incorrect: 'session/ON_LOGIN_INCORRECT',
};

export const socialMediaLoginFetchStart = () => ({
  type: SOCIALMEDIALOGIN.start,
});

export const socialMediaLoginFetchEnd = () => ({
  type: SOCIALMEDIALOGIN.end,
});

export const socialMediaLoginFetchSuccess = (data) => {
  return (
    {
      type: SOCIALMEDIALOGIN.success,
      data,
    });
};

export const socialMediaLoginFetchIncorrect = (error, status) => ({
  type: SOCIALMEDIALOGIN.incorrect,
  error,
  status,
});

export const socialMediaLoginFetchFailed = error => ({
  type: SOCIALMEDIALOGIN.failed,
  error,
});

export const socialMediaLogin = ({userName, firstName, lastName, nickName, source, profilePhoto, role, fbId, gpId ,instId, referral, twId}) => (dispatch, getState) => {
  dispatch(socialMediaLoginFetchStart());
  return fetch.post(Api.socialMediaLogin, {
    username: userName,
    first_name: firstName,
    last_name: lastName,
    nick_name: nickName,
    sign_up_source: source,
    profile_photo: profilePhoto,
    role: role,
    fb_id: fbId,
    gp_id: gpId,
    in_id: instId,
    tw_id: twId,
    referral_code: referral,
  }).then((resp) => {
   
    if (resp.data && resp.data.success) {
      localStorage.setItem('data', JSON.stringify(resp.data.data));
      dispatch(socialMediaLoginFetchEnd());
      dispatch(socialMediaLoginFetchSuccess(resp.data.data));
      dispatch(fetchUserDetails(resp.data.data.user.id));
    } else {
      dispatch(socialMediaLoginFetchEnd());
      if (resp.data.status === '400') {
        dispatch(socialMediaLoginFetchIncorrect(resp.data.error.message, resp.data.status));
      } else if (resp.data.status === '410') {
        dispatch(socialMediaLoginFetchIncorrect(resp.data.error.message, resp.data.status));
      } else if (resp.data.status === '310') {
        dispatch(socialMediaLoginFetchIncorrect(resp.data.error.message, resp.data.status));
      }
    }
    return resp;
  }).catch((exception) => {
    dispatch(socialMediaLoginFetchEnd());
    dispatch(socialMediaLoginFetchFailed(exception));
  });
};
