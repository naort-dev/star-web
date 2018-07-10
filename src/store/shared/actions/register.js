
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const REGISTER = {
  start: 'session/ON_LOGIN',
  end: 'session/ON_LOGIN_END',
  success: 'session/ON_LOGIN_SUCCESS',
  failed: 'session/ON_LOGIN_FAILED',
  incorrect: 'session/ON_LOGIN_INCORRECT',
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
export const registerFetchIncorrect = error => ({
  type: REGISTER.incorrect,
  error,
});

export const registerFetchFailed = error => ({
  type: REGISTER.failed,
  error,
});

export const registerUser = (
  UserFirstName,
  UserLastName,
  UserEmail,
  UserPassword,
  UserRole,
) => (dispatch, getState) => {
  dispatch(registerFetchStart());
  return fetch.post(Api.register, {
    first_name: UserFirstName,
    last_name: UserLastName,
    email: UserEmail,
    password: UserPassword,
    role: UserRole,

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
    console.log(exception);
    if (exception.response.status === 400) {
      dispatch(registerFetchIncorrect(exception.response.data.error.message));
    } else {
      dispatch(registerFetchFailed(exception));
    }
  });
};
