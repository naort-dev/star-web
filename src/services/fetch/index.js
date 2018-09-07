import axios from 'axios';

import {
  onRequest,
  requestOnFailed,
  responseOnSuccess,
  responseOnFailed,
} from './interceptors';

const fetch = axios.create({
  baseURL: env('API_URL'),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'device': env('device'),
    'version': env('ApiVersion'),
  },
});


const { CancelToken } = axios;

fetch.interceptors.request.use(onRequest, requestOnFailed);
fetch.interceptors.response.use(responseOnSuccess, responseOnFailed);

export { fetch, CancelToken };
