import { START_AUDIO_RECORDING, STOP_AUDIO_RECORDING, SAVE_RECORDINGS, DEVICE_CHECK, SHOW_FALLBACK, SAVE_AUDIO_FILE, CLOSE_RECORDER, CLEAR_ALL, SHOW_RECORDER, RESET_RECORDING } from '../actions/audioRecorder';

const initalState = {
  start: null,
  status: null,
  stop: null,
  re_record: null,
  play: null,
  showRecorder: null,
  showFallback: null,
  label: null,
  target: null,
  file: { from: null, for: null },
  recorded: { from: null, for: null },
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {

    case DEVICE_CHECK: 
     return {
       ...state,
       status: action.payload,

     }
    case SHOW_RECORDER:
      return {
        ...state,
        showRecorder: true,
        target: action.payload,
        label: action.payload === "for" ? "Who is the Starsona video for?" : "Who is the Starsona video from?",
      };
      case SHOW_FALLBACK:
      return {
        ...state,
        showFallback: true,
        target: action.payload,
        label: action.payload === "for" ? "Who is the Starsona video for?" : "Who is the Starsona video from?",
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
        recorded: { ...state.recorded, [action.payload.target]: action.payload.audio },
      };

    case RESET_RECORDING:
    return {
      ...state,
      recorded: { ...state.recorded, [action.payload]: null },
      showRecorder: null,
      status: null,
    }
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
