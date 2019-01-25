import Api from '../../lib/api';
import { fetch } from '../../services/fetch';

export const deleteGroupMember = (id) => {
  return (fetch.delete(`${Api.getGroupMembers}${id}/`)
    .then(resp => resp.data.success)
  );
};

export const addGroupMember = (id, isStar) => {
  let options = {};
  if (isStar) {
    options = {
      account: id,
    };
  } else {
    options = {
      celebrity: id,
    };
  }
  return (fetch.post(Api.celebrityGroupFollow, options)
    .then(resp => resp.data.success)
  );
};

export const getGroupsList = () => {
  return (fetch(Api.getGroupsList)
    .then(resp => resp.data)
  );
};
