export const TRIGGER_RECORDING = 'TRIGGER_RECORDING';
export const UPDATE_RECORDMEDIA = 'UPDATE_RECORDMEDIA';
export const PLAY_PAUSE_MEDIA = 'PLAY_PAUSE_MEDIA';

export const recordTrigger = () => ({
  type: TRIGGER_RECORDING,
});

export const updateMediaStore = (payload) => ({
  type: UPDATE_RECORDMEDIA,
  payload,
});

export const playPauseMedia = () => ({
  type: PLAY_PAUSE_MEDIA,
});
