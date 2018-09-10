import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const STAR_REFERRAL = {
  requestReferral: 'starReferral/REQUEST_REFERRAL',
};

export const requestReferral = () => (dispatch, getState) => {
  return fetch.post(Api.requestReferral).then((resp) => {
  });
};
