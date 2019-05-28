import Api from '../../lib/api';
import { fetch } from '../../services/fetch';

const fetchAWSVideo = (key, fileName) => {
  return (fetch(`${Api.getAWSVideo}${key}&file_name=${fileName}`).then(resp => resp.data.data)
  );
};

export default fetchAWSVideo;
