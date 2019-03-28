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

