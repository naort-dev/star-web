import Api from '../../lib/api';
import { fetch } from '../../services/fetch';

export const getRequestDetails = (bookingId) => {
  return fetch(`${Api.getRequestDetails}${bookingId}/`)
    .then(resp => resp.data);
};
