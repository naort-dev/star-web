import Api from '../../lib/api';
import { fetch } from '../../services/fetch';

export const getRequestDetails = (bookingId) => {
  return fetch(`${Api.getRequestDetails}${bookingId}/`)
    .then(resp => resp.data);
};

export const hideVideoFromProfile = (videoId) => {
  return fetch.post(Api.hideVideoFromProfile, {
    video: videoId,
  })
    .then(resp => resp.data);
}
