import { START_AUDIO_RECORDING, STOP_AUDIO_RECORDING, SAVE_RECORDINGS, SAVE_AUDIO_FILE, CLOSE_RECORDER, CLEAR_ALL, SHOW_RECORDER } from '../actions/audioRecorder';

const initalState = {
  recordedBlob: null,
  recordedBuffer: null,
  start: null,
  stop: null,
  re_record: null,
  play: null,
  showRecorder: null,
  label: null,
  target: null,
  file: { from: null, to: null },
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case SHOW_RECORDER:
      return {
        ...state,
        showRecorder: true,
        target: action.payload,
        label: action.payload === "for" ? "who is the Starsona video for?" : "who is the Starsona video from?",
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
    case CLOSE_RECORDER:
     return {
       ...state,
       start: null,
       stop: null,
       showRecorder: false,
     }
    case SAVE_RECORDINGS:
      return {
        ...state,
        recordedBlob: action.payload,
      };
      case SAVE_AUDIO_FILE:
      return {
        ...state,
        file: { ...state.file, ...action.payload },
      };
    case CLEAR_ALL:
      return {
        ...initalState,
      };
    default:
      return state;
  }
};
