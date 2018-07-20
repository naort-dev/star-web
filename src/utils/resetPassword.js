import { fetch } from '../services/fetch';

export default function resetPassword(url, data) {
  return fetch.post(url, data).then(response => response).catch((exception) => { throw exception; });
}
