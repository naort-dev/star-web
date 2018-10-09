import Api from '../../lib/api';
import { fetch } from '../../services/fetch';

export const updateGroupAccount = (data) => {
  return (fetch.post(Api.updateGroupAccount, {
    ...data,
  }).then(resp => resp.data.success)
  );
};

export const updateSocialLinks = (data) => {
  return (fetch.post(Api.modifySocialLinks, {
    ...data,
  }).then(resp => resp.data.success)
  );
};
