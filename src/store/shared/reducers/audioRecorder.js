import { START_AUDIO_RECORDING, STOP_AUDIO_RECORDING, SAVE_RECORDINGS, DEVICE_CHECK, SHOW_FALLBACK, SAVE_AUDIO_FILE, CLOSE_RECORDER, CLEAR_ALL, SHOW_RECORDER, RESET_RECORDING } from '../actions/audioRecorder';

const initalState = {
  recorded: { from: null, for: null }
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case DEVICE_CHECK: 
     return {
       ...state,
       status: action.payload,
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
    }
 
    case CLEAR_ALL:
      return {
        ...initalState,
      };
    default:
      return state;
  }
};
