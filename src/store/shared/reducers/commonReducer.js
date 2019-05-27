import { Actions } from '../actions/commonActions';

const initalState = {
  shouldRecord: false,
  videoSrc: null,
  file: null,
  recordedTime: '00:00',
  playPauseMedia: false,
  loader: false,
  customerId: null,
  videoUploaded: false,
  toastObj: {
    value: false,
    message: '',
    variant: '',
  },
  recorded: false,
};

const commonReducer = (state = { ...initalState }, action) => {
  switch (action.type) {
    case Actions.TRIGGER_RECORDING:
      return {
        ...state,
        shouldRecord: !state.shouldRecord,
      };

    case Actions.UPDATE_RECORDMEDIA:
      return {
        ...state,
        videoSrc: action.payload.videoSrc,
        file: action.payload.superBuffer,
        recordedTime: action.payload.recordedTime,
        recorded: action.payload.recorded,
      };

    case Actions.PLAY_PAUSE_MEDIA:
      return {
        ...state,
        playPauseMedia: !state.playPauseMedia,
      };

    case Actions.LOADER_COMMON:
      return {
        ...state,
        loader: action.value,
      };

    case Actions.UPDATE_CUSTOMER_ID:
      return {
        ...state,
        customerId: action.value,
      };
    case Actions.SET_VIDEO_UPLOADED_FLG:
      return {
        ...state,
        videoUploaded: action.value,
      };
    case Actions.SET_TOAST:
      return {
        ...state,
        toastObj: action.toastObj,
      };

    default:
      return state;
  }
};
export default commonReducer;
