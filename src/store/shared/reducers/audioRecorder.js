import {
  SAVE_RECORDINGS,
  DEVICE_CHECK,
  CLEAR_ALL,
  RESET_RECORDING,
} from '../actions/audioRecorder';

const initalState = {
  recorded: { from: null, for: null, host: null, honor: null },
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case DEVICE_CHECK:
      return {
        ...state,
        status: action.payload,
      };

    case SAVE_RECORDINGS:
      return {
        ...state,
        recorded: {
          ...state.recorded,
          [action.payload.target]: action.payload.audio,
        },
      };

    case RESET_RECORDING:
      return {
        ...state,
        recorded: { ...state.recorded, [action.payload]: null },
      };

    case CLEAR_ALL:
      return {
        ...initalState,
      };
    default:
      return state;
  }
};
