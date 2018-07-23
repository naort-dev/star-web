import Api from '../../lib/api';
import { fetch } from '../../services/fetch';

const fetchAWSVideo = (authToken, fileName) => {
  return (fetch(`${Api.getAWSVideo}${fileName}`, {
    headers: {
      'Authorization': `token ${authToken}`,
    },
  }).then(resp => resp.data.data)
  );
};

export default fetchAWSVideo;
