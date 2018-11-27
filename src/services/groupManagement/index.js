import Api from '../../lib/api';
import { fetch } from '../../services/fetch';

export const deleteGroupMember = (id) => {
  return (fetch.delete(Api.getGroupMembers, {
    data: {
      id,
    },
  }).then(resp => resp.data.success)
  );
};
