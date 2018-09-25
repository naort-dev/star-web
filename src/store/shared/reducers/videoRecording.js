import {
  START_VIDEO_RECORDING,
  STOP_VIDEO_RECORDING,
  PLAY_RECORDED_VIDEO,
  RE_RECORD_VIDEO,
  CLEAR_ALL_STREAMS,
} from '../actions/videoRecorder';

const initalState = {
  recordedBlob: null,
  recordedBuffer: null,
  start: null,
  stop: null,
  re_record: null,
  play: null,
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case START_VIDEO_RECORDING:
      return {
        ...state,
        start: true,
      };

    case STOP_VIDEO_RECORDING:
      return {
        ...state,
        start: false,
        stop: true,
        recordedBlob: action.payload.recordedURL,
        recordedBuffer: action.payload.recordedBuffer,
      };
    case PLAY_RECORDED_VIDEO:
      return {
        ...state,
        start: false,
        stop: false,
        play: true,
      };

    case RE_RECORD_VIDEO:
      return {
        ...initalState,
      };

    case CLEAR_ALL_STREAMS:
      return {
        ...initalState,
      };

    default:
      return state;
  }
};
