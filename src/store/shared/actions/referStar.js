import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';
import { fetchUserDetails } from './getUserDetails';

export const STAR_REFERRAL = {
  requestReferral: 'starReferral/REQUEST_REFERRAL',
  start: 'starReferral/REFERRAL_LIST',
  end: 'starReferral/REFERRAL_LIST_END',
  success: 'starReferral/REFERRAL_LIST_SUCCESS',
  failed: 'starReferral/REFERRAL_LIST_FAILED',
};

export const referralListFetchStart = () => ({
  type: STAR_REFERRAL.start,
});

export const referralListFetchEnd = () => ({
  type: STAR_REFERRAL.end,
});

export const referralListFetchSuccess = (data, offset) => {
  return (
    {
      type: STAR_REFERRAL.success,
      data,
      offset,
    });
};

export const referralListFetchFailed = error => ({
  type: STAR_REFERRAL.failed,
  error,
});

export const requestReferral = id => (dispatch, getState) => {
  return fetch.post(Api.requestReferral).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(fetchUserDetails(id));
    }
  });
};

export const getReferralList = offset => (dispatch, getState) => {
  const { limit } = getState().referralDetails;
  dispatch(referralListFetchStart());
  return fetch(`${Api.getReferralList}?limit=${limit}&offset=${offset}`).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(referralListFetchEnd());
      dispatch(referralListFetchSuccess(resp.data.data, offset));
    } else {
      dispatch(referralListFetchEnd());
    }
  }).catch((exception) => {
    dispatch(referralListFetchEnd());
    dispatch(referralListFetchFailed(exception));
  });
};
