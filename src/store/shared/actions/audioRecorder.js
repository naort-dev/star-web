export const START_AUDIO_RECORDING = 'startAudioRecording';
export const STOP_AUDIO_RECORDING = 'stopAudioRecording';
export const SAVE_RECORDINGS = 'saveAudio';
export const CLEAR_ALL = 'clearAudio';
export const SHOW_RECORDER = 'showAudioRecorder';
export const CLOSE_RECORDER = 'closeRecorder';
export const SAVE_AUDIO_FILE = 'saveFile';
export const SHOW_FALLBACK = 'showFallback';
export const DEVICE_CHECK = 'checkDevice';
export const RESET_RECORDING = 'resetRecording';


export function deviceCheck(status) {
  return {
    type: DEVICE_CHECK,
    payload: status,
  };
}

export function showRecorder(displayText) {
  return {
    type: SHOW_RECORDER,
    payload: displayText,
  };
}

export function showFallback(displayText) {
  return {
    type: SHOW_FALLBACK,
    payload: displayText,
  };
}

export function startAudioRecording(data) {
  return {
    type: START_AUDIO_RECORDING,
    payload: data,
  };
}

export function stopAudioRecording() {
  return {
    type: STOP_AUDIO_RECORDING,
  };
}

export function saveAudioRecording(target, audio) {
  return {
    type: SAVE_RECORDINGS,
    payload: { target, audio },
  };
}

export function resetRecording(target) {
  return {
    type: RESET_RECORDING,
    payload: target,
  };
}

export function saveAudioFile(audio) {
  return {
    type: SAVE_AUDIO_FILE,
    payload: audio,
  };
}

export function closeRecorder() {
  return {
    type: CLOSE_RECORDER,
  };
}

export function clearAll() {
  return {
    type: CLEAR_ALL,
  };
}

