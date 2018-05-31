
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const REGISTER = {
  start: 'session/ON_LOGIN',
  end: 'session/ON_LOGIN_END',
  success: 'session/ON_LOGIN_SUCCESS',
  failed: 'session/ON_LOGIN_FAILED',
};

export const registerFetchStart = () => ({
  type: REGISTER.start,
});

export const registerFetchEnd = () => ({
  type: REGISTER.end,
});

export const registerFetchSuccess = (data) => {
  return (
    {
      type: REGISTER.success,
      data,
    });
};

export const registerFetchFailed = error => ({
  type: REGISTER.failed,
  error,
});

export const registerUser = register => (dispatch) => {
  dispatch(registerFetchStart());
  return fetch.post(Api.register, {
    first_name: register.firstName,
    last_name: register.lastName,
    password: register.password,
    email: register.email,
    role: register.role,

  }).then((resp) => {
    if (resp.data && resp.data.success) {
      localStorage.setItem('data', JSON.stringify(resp.data.data));
      dispatch(registerFetchEnd());
      dispatch(registerFetchSuccess(resp.data.data));
    } else {
      dispatch(registerFetchEnd());
    }
  }).catch((exception) => {
    dispatch(registerFetchEnd());
    dispatch(registerFetchFailed(exception));
  });
};
