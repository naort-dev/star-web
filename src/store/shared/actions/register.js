import isEmpty from 'lodash/isEmpty';
import Api from '../../../lib/api';
import {ROLES} from '../../../constants/usertype'
import { fetch } from '../../../services/fetch';
import { userDetailsFetchSuccess } from '../actions/getUserDetails';

export const REGISTER = {
  start: 'session/ON_LOGIN',
  end: 'session/ON_LOGIN_END',
  success: 'session/ON_LOGIN_SUCCESS',
  failed: 'session/ON_LOGIN_FAILED',
  updateTempDetails: 'session/ON_TEMP_LOGIN',
  incorrect: 'session/ON_LOGIN_INCORRECT',
  clearErrors: 'session/ON_REGISTER_CLEAR',
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

export const registerTempSuccess = (data) => ({
  type: REGISTER.updateTempDetails,
  data,
});

export const clearRegisterErrors = () => ({
  type: REGISTER.clearErrors,
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
  let tempDetails;
  if(localStorage) {
    tempDetails = localStorage.getItem('tempAuthToken');
  }
  dispatch(registerFetchStart());
  let method = 'post';
  if (!isEmpty(tempDetails)) {
    method = 'put';
  }
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
  return fetch[method](Api.register, header).then((resp) => {
    if (resp.data && resp.data.success) {
      const obj = {
        ...resp.data.data,
        celebrity_details: {},
      };
      if (UserRole === 'R1002') {
        const tempToken = resp.data.data.user.authentication_token;
        localStorage.setItem('tempAuthToken', JSON.stringify(tempToken));
        dispatch(registerTempSuccess(resp.data.data));
      } else {
        localStorage.setItem('data', JSON.stringify(resp.data.data));
        dispatch(registerFetchEnd());
        dispatch(userDetailsFetchSuccess(obj));
        dispatch(registerFetchSuccess(obj));
      }
      return resp
    } 
    dispatch(registerFetchEnd());
  }).catch((exception) => {
    dispatch(registerFetchEnd());
    if (exception.response.status === 400) {
      dispatch(registerFetchIncorrect(exception.response.data.error.message));
    } else {
      dispatch(registerFetchFailed(exception));
    }
  });
};
