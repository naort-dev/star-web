import {
  TRIGGER_RECORDING,
  UPDATE_RECORDMEDIA,
  PLAY_PAUSE_MEDIA,
} from '../actions/commonActions';

const initalState = {
  shouldRecord: false,
  videoSRC: null,
  file: null,
  playPauseMedia: false,
};

const PurchaseReducer = (state = { ...initalState }, action) => {
  switch (action.type) {
    case TRIGGER_RECORDING:
      return {
        ...state,
        shouldRecord: !state.shouldRecord,
      };

    case UPDATE_RECORDMEDIA:
      return {
        ...state,
        videoSRC: action.payload.videoSrc,
        file: action.payload.superBuffer,
      };

    case PLAY_PAUSE_MEDIA:
      return {
        ...state,
        playPauseMedia: !state.playPauseMedia,
      };

    default:
      return state;
  }
};
export default PurchaseReducer;
