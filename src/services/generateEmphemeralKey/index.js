import Api from '../../lib/api';
import { fetch } from '../../services/fetch';

const fetchEphemeralKey = () => {
  return (fetch.post(Api.getEphemeralKey, {
    api_key: env('stripe_api_version'),
  }).then(resp => ({ data: resp.data.data, success: resp.data.success }))
  );
};

export default fetchEphemeralKey;
