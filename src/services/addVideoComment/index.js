import Api from '../../lib/api';
import { fetch } from '../../services/fetch';

const addVideoComment = (videoId, comments) => {
  return (fetch.post(Api.addComment, {
    comments,
    video: videoId,
  }).then(resp => resp.data.data)
  );
};

export default addVideoComment;
