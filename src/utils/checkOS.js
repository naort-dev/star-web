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

export const isIOSDevice = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
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

export const audioVideoSupport = type => {
  if (checkMediaRecorderSupport()) {
    return navigator.mediaDevices
      .enumerateDevices()
      .then(devices => {
        let haveSupport = false;
        if (devices) {
          if (type === 'audioinput') {
            if (devices.find(device => device.kind === 'audioinput')) {
              haveSupport = true;
            }
          } else if (type === 'videoinput') {
            if (
              devices.find(device => device.kind === 'audioinput') &&
              devices.find(device => device.kind === 'videoinput')
            ) {
              haveSupport = true;
            }
          }
        }
        return haveSupport;
      })
      .catch(() => {
        return false;
      });
  }
  return new Promise((resolve, reject) => {
    reject(Error(false));
  });
};

export const isWebSafari = () => {
  if (navigator.userAgent.indexOf('Safari') !== -1 && !isIOSDevice()) {
    return true;
  }
  return false;
};
