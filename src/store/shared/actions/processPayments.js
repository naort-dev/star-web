import moment from 'moment';
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const PAYMENTS = {
  start: 'payments/REQUEST',
  end: 'payments/REQUEST_END',
  success: 'payments/REQUEST_SUCCESS',
  requestPostStart: 'payments/REQUEST_POST_START',
  fetchSourceStart: 'payments/SOURCE_FETCH_START',
  fetchSourceEnd: 'payments/SOURCE_FETCH_END',
  setPaymentStatus: 'payments/PAYMENT_STATUS',
  resetPayments: 'payments/RESET_PAYMENTS',
  failed: 'payments/PAYMENT_FAILED',
  sourceListStart: 'payments/SOURCE_LIST_START',
  sourceListSuccess: 'payments/SOURCE_LIST_SUCCESS',
  sourceListEnd: 'payments/SOURCE_LIST_END',
  sourceListFailed: 'payments/SOURCE_LIST_FAILED',
  modifySourceListStart: 'payments/MODIFY_SOURCE_START',
  modifySourceListEnd: 'payments/MODIFY_SOURCE_END',
  modifySourceListFailed: 'payments/MODIFY_SOURCE_FAILED',
  requestFailed: 'payments/REQUEST_FAILED',
  resetError: 'reset/PAYMENT_ERROR',
};

export const paymentFetchStart = () => ({
  type: PAYMENTS.start,
});

export const requestPostStart = () => ({
  type: PAYMENTS.requestPostStart,
});

export const paymentFetchEnd = () => ({
  type: PAYMENTS.end,
});

export const paymentFetchSuccess = (data) => {
  return {
    type: PAYMENTS.success,
    data,
  };
};

export const paymentFetchFailed = (error) => ({
  type: PAYMENTS.failed,
  error,
});

export const requestPostFailed = (error) => ({
  type: PAYMENTS.requestFailed,
  error,
});

export const paymentFetchSourceStart = () => ({
  type: PAYMENTS.fetchSourceStart,
});

export const paymentFetchSourceEnd = () => ({
  type: PAYMENTS.fetchSourceEnd,
});

export const resetPaymentsError = () => ({
  type: PAYMENTS.resetError,
});

export const setPaymentStatus = (status) => {
  return {
    type: PAYMENTS.setPaymentStatus,
    status,
  };
};

export const resetPaymentDetails = () => ({
  type: PAYMENTS.resetPayments,
});

export const sourceListModifyStart = () => ({
  type: PAYMENTS.modifySourceListStart,
});

export const sourceListModifyEnd = () => ({
  type: PAYMENTS.modifySourceListEnd,
});

export const sourceListModifyFailed = (error) => ({
  type: PAYMENTS.modifySourceListFailed,
  error,
});

export const sourceListFetchStart = () => ({
  type: PAYMENTS.sourceListStart,
});

export const sourceListFetchEnd = () => ({
  type: PAYMENTS.sourceListEnd,
});

export const sourceListFetchSuccess = (data) => {
  return {
    type: PAYMENTS.sourceListSuccess,
    data,
  };
};

export const sourceListFetchFailed = (error) => ({
  type: PAYMENTS.sourceListFailed,
  error,
});

export const fetchSourceList = () => (dispatch, getState) => {
  const { authentication_token: authToken } = getState().session.auth_token;
  dispatch(sourceListFetchStart());
  return fetch(Api.getSourceList, {
    headers: {
      Authorization: `token ${authToken}`,
    },
  })
    .then((resp) => {
      if (resp.data && resp.data.success) {
        dispatch(sourceListFetchEnd());
        dispatch(sourceListFetchSuccess(resp.data.data.cards));
      } else {
        dispatch(sourceListFetchEnd());
      }
    })
    .catch((exception) => {
      dispatch(paymentFetchEnd());
      dispatch(sourceListFetchFailed(exception.response.data.error));
    });
};

export const modifySourceList = (source, customer, action, callback) => (
  dispatch,
  getState,
) => {
  const { authentication_token: authToken } = getState().session.auth_token;
  const { sourceList } = getState().paymentDetails;
  dispatch(sourceListFetchStart());
  return fetch
    .post(
      Api.modifySourceList,
      {
        customer,
        source,
        action,
      },
      {
        headers: {
          Authorization: `token ${authToken}`,
        },
      },
    )
    .then((resp) => {
      if (resp.data && resp.data.success) {
        dispatch(sourceListFetchEnd());
        dispatch(fetchSourceList(resp.data.data.cards));
        if (callback) {
          callback();
        }
      } else {
        dispatch(sourceListFetchEnd());
      }
    })
    .catch((exception) => {
      dispatch(paymentFetchEnd());
      dispatch(sourceListFetchFailed(exception.response.data.error));
    });
};

export const createCharge = (starsonaId, amount, tokenId) => (dispatch) => {
  dispatch(paymentFetchStart());
  return fetch
    .post(Api.createCharge, {
      starsona: starsonaId,
      amount,
      source: tokenId,
    })
    .then((resp) => {
      if (resp.data && resp.data.success) {
        dispatch(paymentFetchEnd());
        dispatch(setPaymentStatus(resp.data.success));
      } else {
        dispatch(paymentFetchEnd());
      }
    })
    .catch((exception) => {
      dispatch(paymentFetchEnd());
      dispatch(paymentFetchFailed(exception.response.data.error));
    });
};

export const tipPayment = (bookingId, amount, tokenId) => (dispatch) => {
  dispatch(paymentFetchStart());
  return fetch
    .post(Api.tipPayment, {
      booking: bookingId,
      amount,
      source: tokenId,
    })
    .then((resp) => {
      if (resp.data && resp.data.success) {
        dispatch(paymentFetchEnd());
        dispatch(setPaymentStatus(resp.data.success));
      } else {
        dispatch(paymentFetchEnd());
      }
    })
    .catch((exception) => {
      dispatch(paymentFetchEnd());
      dispatch(paymentFetchFailed(exception.response.data.error));
    });
};

const starsonaVideo = (filename, requestId, duration, dispatch, callback) => {
  return fetch
    .post(Api.starsonaVideo, {
      video: filename,
      stragramz_request: requestId,
      duration,
    })
    .then((resp) => {
      if (resp.data && resp.data.success) {
        dispatch(paymentFetchEnd());
        if (callback) {
          callback(requestId);
        }
      }
    })
    .catch((exception) => {
      dispatch(paymentFetchEnd());
      dispatch(requestPostFailed(exception.response.data.error));
    });
};

export const starsonaRequest = (bookingData, publicStatus, callback) => (
  dispatch,
  getState,
) => {
  const { authentication_token: authToken } = getState().session.auth_token;
  const requestDetails = {
    stargramto: bookingData.hostName,
    stargramfrom: bookingData.userName,
    relationship: bookingData.requestRelationshipData,
    show_relationship: true,
    question: bookingData.question,
    specifically_for: bookingData.specification,
    from_where: bookingData.specification,
    important_info: bookingData.importantinfo,
    date: bookingData.date
      ? `${moment.utc(bookingData.date).format('YYYY-MM-DDTHH:mm:ss.SSSS')}Z`
      : '',
    event_title: bookingData.eventdetailName,
    event_guest_honor: bookingData.hostName,
  };
  const formData = new FormData();
  formData.append('celebrity', bookingData.starDetail.id);
  if (bookingData.type !== 3) {
    formData.append('occasion', bookingData.selectedValue);
  }
  formData.append('public_request', publicStatus);
  formData.append('request_details', JSON.stringify(requestDetails));
  formData.append('request_type', bookingData.type);
  if (bookingData.from_audio_file) {
    formData.append('from_audio_file', bookingData.from_audio_file);
  }
  if (bookingData.from_audio_file) {
    formData.append('to_audio_file', bookingData.to_audio_file);
  }
  if (bookingData.remove_audios) {
    formData.append('remove_audios', bookingData.remove_audios);
  }
  let ApiUrl = Api.starsonaRequest;
  let method = 'post';
  if (bookingData.requestId) {
    ApiUrl = `${ApiUrl}${bookingData.requestId}/`;
    method = 'put';
  }
  dispatch(requestPostStart());
  return fetch[method](ApiUrl, formData, {
    headers: {
      Authorization: `token ${authToken}`,
    },
  })
    .then((resp) => {
      if (resp.data && resp.data.success) {
        if (bookingData.type === 3) {
          starsonaVideo(
            bookingData.fileName,
            resp.data.data['stargramz_response'].id,
            '00:00',
            dispatch,
            callback,
          );
          //Q&A
        } else if (callback) {
          callback(resp.data.data.stargramz_response.id);
        }
        dispatch(paymentFetchSuccess(resp.data.data['stargramz_response']));
      } else {
        dispatch(paymentFetchEnd());
      }
    })
    .catch((exception) => {
      dispatch(paymentFetchEnd());
      dispatch(requestPostFailed(exception.response.data.error));
    });
};
