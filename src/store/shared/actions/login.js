
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const LOGIN = {
  start: 'session/ON_LOGIN',
  end: 'session/ON_LOGIN_END',
  success: 'session/ON_LOGIN_SUCCESS',
  failed: 'session/ON_LOGIN_FAILED',
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

export const loginFetchFailed = error => ({
  type: LOGIN.failed,
  error,
});

export const loginUser = loginValue => (dispatch) => {
  dispatch(loginFetchStart());
  return fetch.post(Api.login, {
    username: loginValue.email,
    password: loginValue.password,
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
    dispatch(loginFetchFailed(exception));
  });
};
