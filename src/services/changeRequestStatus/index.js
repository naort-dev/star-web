import Api from '../../lib/api';
import { fetch } from '../../services/fetch';

const changeRequestStatus = (authToken) => {
  return (fetch.post(Api.changeRequestStatus, {
    api_key: env('stripe_api_version'),
  }, {
    headers: {
      'Authorization': `token ${authToken}`,
    },
  }).then(resp => resp.data.data)
  );
};

export default changeRequestStatus;
