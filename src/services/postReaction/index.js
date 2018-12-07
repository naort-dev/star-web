import axios from 'axios';
import Api from '../../lib/api';
import { fetch } from '../fetch';

export default function postReactionMedia(key, file, extension, fileType) {
  return fetch(Api.getawsCredentials(key, extension, fileType))
    .then((response) => {
      let filename = response.data.data.fields.key.split('/');
      filename = filename[filename.length - 1];
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
      return { formData, url: response.data.data.url, filename };
    })
    .then((response) => {
      axios.post(response.url, response.formData);
      return response.filename;
    })
}
