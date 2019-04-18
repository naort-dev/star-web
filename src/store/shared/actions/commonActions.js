export const TRIGGER_RECORDING = 'TRIGGER_RECORDING';
export const UPDATE_RECORDMEDIA = 'UPDATE_RECORDMEDIA';
export const PLAY_PAUSE_MEDIA = 'PLAY_PAUSE_MEDIA';
export const LOADER_COMMON = 'LOADER_COMMON';

export const recordTrigger = () => ({
  type: TRIGGER_RECORDING,
});

export const updateMediaStore = payload => ({
  type: UPDATE_RECORDMEDIA,
  payload,
});

export const playPauseMedia = () => ({
  type: PLAY_PAUSE_MEDIA,
});

export const loaderAction = value => ({
  type: LOADER_COMMON,
  value,
});
