export const START_VIDEO_RECORDING = 'startRecording';
export const STOP_VIDEO_RECORDING = 'stopRecording';
export const PLAY_RECORDED_VIDEO = 'playVideo';
export const RE_RECORD_VIDEO = 'reRecordVideo';
export const CLEAR_ALL_STREAMS = 'clearStreams';

export function startRecording() {
  return {
    type: START_VIDEO_RECORDING,
  };
}

export function stopRecording(videoData) {
  return {
    type: STOP_VIDEO_RECORDING,
    payload: {
      recordedURL: videoData.videoSrc,
      recordedBuffer: videoData.superBuffer,
    }
  };
}

export function playVideo() {
  return {
    type: PLAY_RECORDED_VIDEO,
  };
}

export function reRecord() {
  return {
    type: RE_RECORD_VIDEO,
  };
}

export function clearStreams() {
  return {
    type: CLEAR_ALL_STREAMS,
  };
}
