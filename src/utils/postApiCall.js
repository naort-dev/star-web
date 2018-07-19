import { fetch } from '../services/fetch';

export default function postApiCall(url, data) {
  return fetch.post(url, data).then(response => response.data).catch(exception => exception);
}
