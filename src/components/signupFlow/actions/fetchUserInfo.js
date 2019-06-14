import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';


export const fetchUserInfo = (id, authToken) => () => {
    const API_URL = `${Api.authGetCelebDetails}${id}/`;
    const options = {
      headers: {
        'Authorization': `token ${authToken.authentication_token}`,
      },
    };
  if (API_URL) {
    return fetch.get(API_URL, options).then((resp) => {
      if (resp.data && resp.data.success) {
        return resp.data.data;
      }
    }).catch((exception) => {
      console.log(exception);
    });
  }
  return false;
};