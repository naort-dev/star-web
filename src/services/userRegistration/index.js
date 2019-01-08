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

export const celebritySignupProfile = (data) => {
  return (fetch.post(Api.celebrityProfile, {
    ...data,
  }).then(resp => resp.data.success)
  );
};

export const addRepresentative = (firstName, lastName, email, phone, emailNotify, phoneNotify) => {
  return (fetch.post(Api.celebRepresentative, {
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
    email_notify: emailNotify,
    sms_notify: phoneNotify,
  }).then(resp => resp.data)
  );
};

export const deleteRepresentative = (repId) => {
  return (fetch.delete(`${Api.celebRepresentative}${repId}/`)
    .then(resp => resp.data)
  );
};

export const updateRepresentative = (repId, firstName, lastName, email, phone, emailNotify, phoneNotify) => {
  return (fetch.post(`${Api.celebRepresentative}${repId}/`, {
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
    email_notify: emailNotify,
    sms_notify: phoneNotify,
  }).then(resp => resp.data)
  );
};

export const getRepresentative = () => {
  return (fetch(Api.celebRepresentative)
    .then(resp => resp.data)
  );
};

export const createGroupNotification = (category, groupName, comments) => {
  return (fetch.post(Api.createGroupNotification, {
    body: {
      group_name: groupName,
      group_type: category,
      content: comments,
    },
  })
    .then(resp => resp.data)
  );
};

