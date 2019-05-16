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
  const { navigator } = window;
  if (
    navigator &&
    (navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
  ) {
    if (window.MediaRecorder) {
      return true;
    }
  }
  return false;
};

export const checkDevice = () => {
  return window.navigator.mediaDevices
    .getUserMedia({ audio: true, video: true })
    .then(() => true)
    .catch(() => false);
};

export const checkPrerender = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/Prerender/i.test(userAgent)) {
    return true;
  }
  return false;
};

export const audioSupport = () => {
  const onlyHas = [];
  return navigator.mediaDevices
    .enumerateDevices()
    .then(devices => {
      let haveSupport = false;
      devices.forEach(device => {
        onlyHas.push(device.kind);
        if (device.kind === 'audioinput') {
          haveSupport = true;
        }
      });
      return haveSupport;
    })
    .catch(() => false);
};
