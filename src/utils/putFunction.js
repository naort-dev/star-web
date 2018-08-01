import { fetch } from '../services/fetch';

export default function putFunction(url, data) {
  return fetch.put(url, data).then(response => response).catch((exception) => { throw exception; });
}
