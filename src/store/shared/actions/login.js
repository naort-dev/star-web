
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';
import { clearSessionDetails } from '../../../utils/clearSessionDetails';
import { fetchUserDetails } from '../actions/getUserDetails';

export const LOGIN = {
  start: 'session/ON_LOGIN',
  end: 'session/ON_LOGIN_END',
  success: 'session/ON_LOGIN_SUCCESS',
  failed: 'session/ON_LOGIN_FAILED',
  incorrect: 'session/ON_LOGIN_INCORRECT',
  logout: 'session/ON_LOGOUT',
  updateLoginStatus: 'session/ON_UPDATE_LOGIN_STATUS',
  reset: 'session/ON_SESSION_ERROR_RESET',
};

export const loginFetchStart = () => ({
  type: LOGIN.start,
});

export const loginFetchEnd = () => ({
  type: LOGIN.end,
});

export const loginFetchSuccess = (data) => {
  return (
    {
      type: LOGIN.success,
      data,
    });
};

export const loginFetchIncorrect = (error, status) => ({
  type: LOGIN.incorrect,
  error,
  status,
});

export const loginFetchFailed = error => ({
  type: LOGIN.failed,
  error,
});

export const logOut = () => ({
  type: LOGIN.logout,
});

export const updateLoginStatus = sessionDetails => ({
  type: LOGIN.updateLoginStatus,
  sessionDetails,
});

export const logOutUser = () => (dispatch) => {
  dispatch(logOut());
  clearSessionDetails();
};

export const loginUser = (loginEmail, loginPassword) => (dispatch, getState) => {
  dispatch(loginFetchStart());
  return fetch.post(Api.login, {
    username: loginEmail,
    password: loginPassword,
  }).then((resp) => {
    if (resp.data && resp.data.success) {
      localStorage.setItem('data', JSON.stringify(resp.data.data));
      dispatch(loginFetchEnd());
      dispatch(loginFetchSuccess(resp.data.data));
      dispatch(fetchUserDetails(resp.data.data.user.id));
    } else {
      dispatch(loginFetchEnd());
    }
  }).catch((exception) => {
    dispatch(loginFetchEnd());
    if (exception.response.status === 400) {
      dispatch(loginFetchIncorrect(exception.response.data.error.message, exception.response.status));
    } else {
      dispatch(loginFetchFailed(exception));
    }
  });
};

export const resetSessionError = () => ({
  type: LOGIN.reset,
});
