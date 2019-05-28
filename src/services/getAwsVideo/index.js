import Api from '../../lib/api';
import { fetch } from '../../services/fetch';

const fetchAWSVideo = (fileName) => {
  return (fetch(`${Api.getAWSVideo}${fileName}`).then(resp => resp.data.data)
  );
};

export default fetchAWSVideo;
