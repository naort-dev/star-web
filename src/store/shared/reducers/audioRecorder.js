import { START_AUDIO_RECORDING, STOP_AUDIO_RECORDING, SAVE_RECORDINGS, CLEAR_ALL, SHOW_RECORDER } from '../actions/audioRecorder';

const initalState = {
  recordedBlob: null,
  recordedBuffer: null,
  start: null,
  stop: null,
  re_record: null,
  play: null,
  showRecorder: null,
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case SHOW_RECORDER:
      return {
        ...initalState,
        showRecorder: true,
      };
    case START_AUDIO_RECORDING:
      return {
        ...state,
        start: true,
      };
    case STOP_AUDIO_RECORDING:
      return {
        ...state,
        start: false,
        stop: true,
      };
    case SAVE_RECORDINGS:
      return {
        ...state,
        recordedBlob: action.payload,
      };
    case CLEAR_ALL:
      return {
        ...initalState,
      };
    default:
      return state;
  }
};
