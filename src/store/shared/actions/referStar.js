import axios from 'axios';
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';
import { fetchUserDetails } from './getUserDetails';

export const STAR_REFERRAL = {
  requestReferral: 'starReferral/REQUEST_REFERRAL',
  setReferralLink: 'starReferral/SET_REFERRAL_LINK',
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

export const referralListFetchSuccess = (data, offset) => (
  {
    type: STAR_REFERRAL.success,
    data,
    offset,
  });

export const referralListFetchFailed = error => ({
  type: STAR_REFERRAL.failed,
  error,
});

export const requestReferral = id => (dispatch, getState) => fetch.post(Api.requestReferral).then((resp) => {
  if (resp.data && resp.data.success) {
    dispatch(fetchUserDetails(id));
  }
});

export const setReferralLink = link => ({
  type: STAR_REFERRAL.setReferralLink,
  link,
});

export const getReferalLink = data => (dispatch) => {
  const dataAValues = {
    branch_key: env('BRANCH_IO_KEY'),
    data: {
      $deeplink_path: `invite/?invite_code=${data.code}`,
      // $desktop_url: 'https://about.starsona.com/#star-highlight',
      $desktop_url: `${window.location.origin}/applinks/invite/${data.code}`,
      $ios_deeplink_path: `invite/?invite_code=${data.code}`,
      $android_deeplink_path: `invite/?invite_code=${data.code}`,
      nav_to: 'invite',
      $canonical_identifier: `invite/${data.code}`,
      $canonical_url: `${env('API_URL').replace('/api/v1/', '')}/applinks/invite/${data.code}`,
      invite_code: data.code,
    },
  };
  return axios.post('https://api.branch.io/v1/url', dataAValues).then((resp) => {
    if (resp.data && resp.data.url) {
      dispatch(setReferralLink(resp.data.url));
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
