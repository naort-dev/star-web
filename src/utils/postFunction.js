import { fetch } from '../services/fetch';

export default function postFunction(url, data) {
  return fetch.post(url, data).then(response => response).catch((exception) => { throw exception; });
}
