import Api from '../lib/api';
import { fetch } from './fetch';

export const getStarsonaVideo = (videoId) => {
  return (fetch(`${Api.starsonaVideo}${videoId}/get/`)
    .then(resp => resp.data)
  );
};
