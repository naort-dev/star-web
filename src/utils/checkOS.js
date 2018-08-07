export const getMobileOperatingSystem = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/windows phone/i.test(userAgent)) {
    return true;
  }
  if (/android/i.test(userAgent)) {
    return true;
  }
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return true;
  }
  return false;
};

export const checkMediaRecorderSupport = () => {
  if (window.navigator && (window.navigator.mediaDevices && window.navigator.mediaDevices.getUserMedia)) {
    if (window.MediaRecorder) {
      return true;
    }
  }
  return false;
};

export const checkDevice = () => {
  return window.navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    .then(() => true, () => false);
};