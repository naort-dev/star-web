import Api from '../../lib/api';
import { fetch } from '../../services/fetch';

export const generateOtp = (phoneNumber, countryCode) => {
  const obj = {
    phone_number: phoneNumber,
    country_code: countryCode,
  };
  return fetch.post(Api.getOtpCode, {
    ...obj,
  }).then(resp => resp.data);
};

export const validateOtp = (phoneNumber, countryCode, code) => {
  const obj = {
    phone_number: phoneNumber,
    country_code: countryCode,
    verification_code: code,
  };
  return fetch.post(Api.validateOtpCode, {
    ...obj,
  }).then(resp => resp.data).catch(e => e);
};
