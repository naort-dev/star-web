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

export const makeVideoPrivate = (bookingId, isPrivate) => {
  return fetch.post(Api.hideVideoFromProfile, {
    booking: bookingId,
    public: !isPrivate,
  })
    .then(resp => resp.data);
}

export const checkIfAnyBooking = async (role) => {
  try {
    const response = await fetch.get(`${Api.getUserVideos}?status=all&limit=1&role=${role}`)
    if (response.data && response.data.success) {
      if (response.data.data && response.data.data.request_list.length) {
        return true
      }
      return false;
    }
    return false;
  }
  catch(e) {
    return false;
  }
}
