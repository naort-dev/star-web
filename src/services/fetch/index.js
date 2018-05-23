import axios from 'axios';

import {
  requestOnSuccess,
  requestOnFailed,
  responseOnSuccess,
  responseOnFailed,
} from './interceptors';

const fetch = axios.create({
  baseURL: env('API_URL'),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'device': 'ios',
    'version': '3.0',
  },
});

fetch.interceptors.request.use(requestOnSuccess, requestOnFailed);
fetch.interceptors.response.use(responseOnSuccess, responseOnFailed);

export default fetch;
