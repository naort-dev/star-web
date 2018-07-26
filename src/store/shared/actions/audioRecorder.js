export const START_AUDIO_RECORDING = 'startAudioRecording';
export const STOP_AUDIO_RECORDING = 'stopAudioRecording';
export const SAVE_RECORDINGS = 'saveAudio';
export const CLEAR_ALL = 'clearAudio';
export const SHOW_RECORDER = 'showAudioRecorder';
export const CLOSE_RECORDER = 'closeRecorder';
export const SAVE_AUDIO_FILE = 'saveFile';

export function showRecorder(displayText) {
  return {
    type: SHOW_RECORDER,
    payload: displayText,
  };
}

export function startAudioRecording() {
  return {
    type: START_AUDIO_RECORDING,
  };
}

export function stopAudioRecording() {
  return {
    type: STOP_AUDIO_RECORDING,
  };
}

export function saveAudioRecording(audio) {
  return {
    type: SAVE_RECORDINGS,
    payload: audio,
  };
}

export function saveAudioFile(audio) {
  return {
    type: SAVE_AUDIO_FILE,
    payload: audio,
  };
}

export function closeRecorder(){
  return {
    type: CLOSE_RECORDER,
  }
}

export function clearAll() {
  return {
    type: CLEAR_ALL,
  };
}

