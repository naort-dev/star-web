import Api from '../../lib/api';
import { fetch } from '../../services/fetch';

export const sendFeedback = (type, bookingId, data) => {
  let requestData = { booking: bookingId };
  if (type === 'rating') {
    requestData = {
      ...requestData,
      type: 'rating',
      fan_rate: data.rating,
      comments: '',
      reason: '',
    };
  } else {
    console.log(data)
    requestData = {
      ...requestData,
      type: 'reaction',
      file_type: data.fileType,
      reaction_file: data.fileName,
    };
  }
  return (fetch.post(Api.requestFeedback, requestData)
    .then(resp => resp.data.success)
  );
};

export const setVideoViewStatus = (videoId) => {
  return fetch(`${Api.setVideoView}${videoId}/`)
    .then(resp => resp.data)
};

export const getReactions = (bookingId) => {
  return fetch(`${Api.getReactions}${bookingId}/`)
    .then(resp => ({ reactionFiles: resp.data.data['reactions-details'].reaction_files, tipDetails: resp.data.data['reactions-details'].tip_details }) )
}
