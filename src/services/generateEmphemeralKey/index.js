import Api from '../../lib/api';
import { fetch } from '../../services/fetch';

const fetchEphemeralKey = () => {
  return (fetch.post(Api.getEphemeralKey, {
    api_key: env('stripe_api_version'),
  }).then(resp => resp.data.data)
  );
};

export default fetchEphemeralKey;
