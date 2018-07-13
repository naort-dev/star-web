
import moment from 'moment';
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const PAYMENTS = {
  start: 'payments/REQUEST',
  end: 'payments/REQUEST_END',
  success: 'payments/REQUEST_SUCCESS',
  fetchSourceStart: 'payments/SOURCE_FETCH_START',
  fetchSourceEnd: 'payments/SOURCE_FETCH_END',
  setPaymentStatus: 'payments/PAYMENT_STATUS',
  resetPayments: 'payments/RESET_PAYMENTS',
  failed: 'payments/REQUEST_FAILED',
};

export const paymentFetchStart = () => ({
  type: PAYMENTS.start,
});

export const paymentFetchEnd = () => ({
  type: PAYMENTS.end,
});

export const paymentFetchSourceStart = () => ({
  type: PAYMENTS.fetchSourceStart,
});

export const paymentFetchSourceEnd = () => ({
  type: PAYMENTS.fetchSourceEnd,
});

export const paymentFetchSuccess = (data) => {
  return (
    {
      type: PAYMENTS.success,
      data,
    });
};

export const setPaymentStatus = (status) => {
  return (
    {
      type: PAYMENTS.setPaymentStatus,
      status,
    });
};

export const paymentFetchFailed = error => ({
  type: PAYMENTS.failed,
  error,
});

export const resetPaymentDetails = () => ({
  type: PAYMENTS.resetPayments,
});

export const createCharge = (starsonaId, amount, tokenId) => (dispatch, getState) => {
  const { authentication_token: authToken } = getState().session.auth_token;
  dispatch(paymentFetchStart());
  return fetch.post(Api.createCharge, {
    starsona: starsonaId,
    amount,
    source: tokenId,
  }, {
    headers: {
      'Authorization': `token ${authToken}`,
    },
  }).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(paymentFetchEnd());
      dispatch(setPaymentStatus(resp.data.success));
    } else {
      dispatch(paymentFetchEnd());
    }
  }).catch((exception) => {
    dispatch(paymentFetchEnd());
    dispatch(paymentFetchFailed(exception));
  });
};


export const requestVideo = (bookingData, publicStatus) => (dispatch, getState) => {
  const { authentication_token: authToken } = getState().session.auth_token;
  let requestDetails = {
    stargramto: bookingData.userName,
    stargramfrom: bookingData.hostName,
    relationship: bookingData.requestRelationshipData,
    show_relationship: true,
    specifically_for: bookingData.specification,
    important_info: bookingData.importantinfo,
    date: moment.utc(bookingData.date).format(),
    event_title: bookingData.eventdetailName,
    event_guest_honor: bookingData.hostName,
  };
  let formData = new FormData();
  formData.append('celebrity', bookingData.starDetail.id);
  formData.append('occasion', bookingData.selectedValue);
  formData.append('public_request', publicStatus);
  formData.append('request_details', JSON.stringify(requestDetails));
  formData.append('request_type', bookingData.type);
  dispatch(paymentFetchStart());
  return fetch.post(Api.requestVideo, formData, {
    headers: {
      'Authorization': `token ${authToken}`,
    },
  }).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(paymentFetchEnd());
      dispatch(paymentFetchSuccess(resp.data.data['stargramz_response']));
    } else {
      dispatch(paymentFetchEnd());
    }
  }).catch((exception) => {
    dispatch(paymentFetchEnd());
    dispatch(paymentFetchFailed(exception));
  });
};
