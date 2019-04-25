import {
  TRIGGER_RECORDING,
  UPDATE_RECORDMEDIA,
  PLAY_PAUSE_MEDIA,
  LOADER_COMMON,
  UPDATE_CUSTOMER_ID,
} from '../actions/commonActions';

const initalState = {
  shouldRecord: false,
  videoSrc: null,
  file: null,
  playPauseMedia: false,
  loader: false,
  customerId: null,
};

const commonReducer = (state = { ...initalState }, action) => {
  switch (action.type) {
    case TRIGGER_RECORDING:
      return {
        ...state,
        shouldRecord: !state.shouldRecord,
      };

    case UPDATE_RECORDMEDIA:
      return {
        ...state,
        videoSrc: action.payload.videoSrc,
        file: action.payload.superBuffer,
      };

    case PLAY_PAUSE_MEDIA:
      return {
        ...state,
        playPauseMedia: !state.playPauseMedia,
      };

    case LOADER_COMMON:
      return {
        ...state,
        loader: action.value,
      };

    case UPDATE_CUSTOMER_ID:
      return {
        ...state,
        customerId: action.value,
      };

    default:
      return state;
  }
};
export default commonReducer;
