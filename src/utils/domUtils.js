import { useState, useEffect } from 'react';

export const CheckInViewport = node => {
  const bounding = node.getBoundingClientRect();
  if (
    bounding.top <= window.innerHeight / 2 &&
    bounding.bottom >= window.innerHeight / 2
  ) {
    return true;
  }
  return false;
};

export const useMedia = mediaQuery => {
  const setInitialValue = () => {
    const mediaList = window.matchMedia(mediaQuery);
    return mediaList.matches;
  };

  const [match, setMatch] = useState(setInitialValue());
  const setMatchValue = matchEvent => {
    setMatch(matchEvent.matches);
  };

  useEffect(() => {
    const mediaList = window.matchMedia(mediaQuery);
    setMatchValue(mediaList);
    const handler = matchEvent => setMatchValue(matchEvent);
    mediaList.addListener(handler);
    return () => mediaList.removeListener(handler);
  }, []);
  return match;
};

export const downloadItem = (url, name = '') => {
  const link = document.createElement('a');
  link.target = '_blank';
  link.download = `${name}`;
  link.href = url;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


