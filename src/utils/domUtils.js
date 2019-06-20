import { useState, useEffect } from 'react';

export const CheckInViewport = (node) => {
  const bounding = node.getBoundingClientRect();
  // if (
  //   bounding.top >= 0 &&
  //   bounding.left >= 0 &&
  //   bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
  //   bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  // ) {
  //   return true;
  // }
  if (
    bounding.top <= (window.innerHeight / 2) &&
    bounding.bottom >= (window.innerHeight / 2)
  ) {
    return true;
  }
  return false;
};

export const useMedia = (mediaQuery) => {
  const [match, setMatch] = useState(false);
  const setMatchValue = (matchEvent) => {
    setMatch(matchEvent.matches);
  }

  useEffect(() => {
    const mediaList = window.matchMedia(mediaQuery);
    setMatchValue(mediaList);
    const handler = (matchEvent) => setMatchValue(matchEvent);
    mediaList.addListener(handler);
    return () => mediaList.removeListener(handler);
  }, [])
  return match;
}

