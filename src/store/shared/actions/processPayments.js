
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const PAYMENTS = {
  start: 'payments/REQUEST',
  end: 'payments/REQUEST_END',
  success: 'payments/REQUEST_SUCCESS',
  failed: 'payments/REQUEST_FAILED',
};

export const paymentFetchStart = () => ({
  type: PAYMENTS.start,
});

export const paymentFetchEnd = () => ({
  type: PAYMENTS.end,
});

export const paymentFetchSuccess = (data) => {
  return (
    {
      type: PAYMENTS.success,
      data,
    });
};

export const paymentFetchFailed = error => ({
  type: PAYMENTS.failed,
  error,
});

export const createCharge = (starsonaId, amount, tokenId) => (dispatch, getState) => {
  dispatch(paymentFetchStart());
  return fetch.post(Api.createCharge, {
    username: loginEmail,
    password: loginPassword,
  }).then((resp) => {
    if (resp.data && resp.data.success) {
      localStorage.setItem('data', JSON.stringify(resp.data.data));
      dispatch(paymentFetchEnd());
      dispatch(paymentFetchSuccess(resp.data.data));
    } else {
      dispatch(paymentFetchEnd());
    }
  }).catch((exception) => {
    dispatch(paymentFetchEnd());
    if (exception.response.status === 400) {
      dispatch(loginFetchIncorrect(exception.response.data.error.message, exception.response.status));
    } else {
      dispatch(paymentFetchFailed(exception));
    }
  });
};
