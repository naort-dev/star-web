import Api from '../../lib/api';
import { fetch } from '../../services/fetch';

export const updateGroupAccount = (data) => {
  return (fetch.post(Api.updateGroupAccount, {
    ...data,
  }).then(resp => resp.data.success)
  );
};
