export const TRIGGER_RECORDING = 'TRIGGER_RECORDING';
export const UPDATE_RECORDMEDIA = 'UPDATE_RECORDMEDIA';
export const PLAY_PAUSE_MEDIA = 'PLAY_PAUSE_MEDIA';
export const LOADER_COMMON = 'LOADER_COMMON';
export const UPDATE_CUSTOMER_ID = 'UPDATE_CUSTOMER_ID';
export const SET_VIDEO_UPLOADED_FLG = 'SET_VIDEO_UPLOADED_FLG';
export const Actions = {
  TRIGGER_RECORDING: 'TRIGGER_RECORDING',
  UPDATE_RECORDMEDIA: 'UPDATE_RECORDMEDIA',
  PLAY_PAUSE_MEDIA: 'PLAY_PAUSE_MEDIA',
  LOADER_COMMON: 'LOADER_COMMON',
  UPDATE_CUSTOMER_ID: 'UPDATE_CUSTOMER_ID',
  SET_VIDEO_UPLOADED_FLG: 'SET_VIDEO_UPLOADED_FLG',
  SET_TOAST: 'SET_TOAST',
  AUDIO_RECORD_HANDLER: 'AUDIO_RECORD_HANDLER',
};

export const recordTrigger = () => ({
  type: Actions.TRIGGER_RECORDING,
});

export const updateMediaStore = payload => ({
  type: Actions.UPDATE_RECORDMEDIA,
  payload,
});

export const playPauseMedia = () => ({
  type: Actions.PLAY_PAUSE_MEDIA,
});

export const loaderAction = value => ({
  type: Actions.LOADER_COMMON,
  value,
});

export const updateCustomerId = value => ({
  type: Actions.UPDATE_CUSTOMER_ID,
  value,
});

export const setVideoUploadedFlag = value => ({
  type: Actions.SET_VIDEO_UPLOADED_FLG,
  value,
});

export const updateToast = toastObj => ({
  type: Actions.SET_TOAST,
  toastObj,
});

export const audioRecordHandler = audioFlags => ({
  type: Actions.AUDIO_RECORD_HANDLER,
  audioFlags,
});
