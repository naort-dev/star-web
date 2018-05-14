import axios from 'axios';

import env from '../../../env';
import {
  requestOnSuccess,
  requestOnFailed,
  responseOnSuccess,
  responseOnFailed,
} from './interceptors';

const fetch = axios.create({
  baseURL: env('API_URL'),
  timeout: 1000,
//   headers: {
//     'X-Custom-Header': 'foobar',
//   };
});

fetch.interceptors.request.use(requestOnSuccess, requestOnFailed);
fetch.interceptors.response.use(responseOnSuccess, responseOnFailed);

export default fetch;
