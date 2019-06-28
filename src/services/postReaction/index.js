import Api from '../../lib/api';
import { fetch } from '../fetch';

export function postReactionMedia(key, file, extension, fileType) {
  return fetch(Api.getawsCredentials(key, extension, fileType))
    .then((response) => {
      let fileName = response.data.data.fields.key.split('/');
      fileName = fileName[fileName.length - 1];
      const formData = new FormData();
      formData.append('success_action_status', response.data.data.fields.success_action_status);
      formData.append('signature', response.data.data.fields.signature);
      formData.append('x-amz-security-token', response.data.data.fields['x-amz-security-token']);
      formData.append('acl', response.data.data.fields.acl);
      formData.append('Access-Control-Allow-Origin', response.data.data.fields['Access-Control-Allow-Origin']);
      formData.append('policy', response.data.data.fields.policy);
      formData.append('key', response.data.data.fields.key);
      formData.append('AWSAccessKeyId', response.data.data.fields.AWSAccessKeyId);
      formData.append('file', file);
      return { formData, url: response.data.data.url, fileName };
    })
    // .then((response) => {
    //   axios.post(response.url, response.formData, {onUploadProgress: (progressEvent) => console.log(progressEvent)});
    //   return response.filename;
    // })
}

export const onReactionComplete = () => {
  return fetch.post(Api.reactionComplete)
  .then(resp => resp.data.success)
}
