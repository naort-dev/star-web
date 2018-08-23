export const SAVE_VIDEO = 'saveRecording';
export const UPLOAD_VIDEO = 'uploadVideo';
export const DELETE_VIDEO = 'deleteVideo';

export function saveVideo(videoData) {
  return {
    type: SAVE_VIDEO,
    payload: videoData,
  };
}

export function uploadVideo() {
  return {
    type: UPLOAD_VIDEO,
  };
}

export function deleteVideo() {
  return {
    type: DELETE_VIDEO,
  };
}
