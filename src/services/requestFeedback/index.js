import Api from '../../lib/api';
import { fetch } from '../../services/fetch';

export const requestFeedback = (files, booking, comments, reason, fanRate) => {
  return (fetch.post(Api.requestFeedback, {
    files,
    booking,
    comments,
    reason,
    fan_rate: fanRate,
  }).then(resp => resp.data.success)
  );
};

export const setVideoViewStatus = (videoId) => {
  return fetch(`${Api.setVideoView}${videoId}/`)
    .then(resp => resp.data.success)
};
