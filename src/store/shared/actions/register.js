
import Api from '../../../lib/api';
import {ROLES} from '../../../constants/usertype'
import { fetch } from '../../../services/fetch';
import { userDetailsFetchSuccess } from '../actions/getUserDetails';

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
  UserNickName,
  UserRole,
  referral,
) => (dispatch, getState) => {
  dispatch(registerFetchStart());
  let header = {
    first_name: UserFirstName,
    last_name: UserLastName,
    email: UserEmail,
    role: UserRole,
    referral_code: referral,
  }
  if(UserRole===ROLES.star) {
    header = {...header,
      nick_name: UserNickName
    }
  } else {
    header = {...header,
      password: UserPassword
    }
  }
  return fetch.post(Api.register, header).then((resp) => {
    if (resp.data && resp.data.success) {
      const obj = {
        ...resp.data.data,
        celebrity_details: {},
      };
      localStorage.setItem('data', JSON.stringify(resp.data.data));
      dispatch(registerFetchEnd());
      dispatch(userDetailsFetchSuccess(obj));
      dispatch(registerFetchSuccess(obj));

      return resp
    } else {
      dispatch(registerFetchEnd());
    }
  }).catch((exception) => {
    dispatch(registerFetchEnd());
    if (exception.response.status === 400) {
      dispatch(registerFetchIncorrect(exception.response.data.error.message));
    } else {
      dispatch(registerFetchFailed(exception));
    }
  });
};
