
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const LOGIN = {
  start: 'session/ON_LOGIN',
  end: 'session/ON_LOGIN_END',
  success: 'session/ON_LOGIN_SUCCESS',
  failed: 'session/ON_LOGIN_FAILED',
  incorrect: 'session/ON_LOGIN_INCORRECT',
  logout: 'session/ON_LOGOUT',
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

export const loginFetchIncorrect = error => ({
  type: LOGIN.incorrect,
  error,
});

export const loginFetchFailed = error => ({
  type: LOGIN.failed,
  error,
});

export const logOut = () => ({
  type: LOGIN.logout,
});

export const loginUser = (loginEmail, loginPassword) => (dispatch) => {
  dispatch(loginFetchStart());
  return fetch.post(Api.login, {
    username: loginEmail,
    password: loginPassword,
  }).then((resp) => {
    if (resp.data && resp.data.success) {
      localStorage.setItem('data', JSON.stringify(resp.data.data));
      dispatch(loginFetchEnd());
      dispatch(loginFetchSuccess(resp.data.data));
    } else {
      dispatch(loginFetchEnd());
    }
  }).catch((exception) => {
    dispatch(loginFetchEnd());
    if (exception.response.status === 400) {
      dispatch(loginFetchIncorrect(exception.response.data.error.message));
    } else {
      dispatch(loginFetchFailed(exception));
    }
  });
};
