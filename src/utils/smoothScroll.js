const smoothScroll = (target) => {
  let scrollContainer = target;
  do {
    scrollContainer = scrollContainer.parentNode;
    if (!scrollContainer) return;
    scrollContainer.scrollTop += 1;
  } while (scrollContainer.scrollTop == 0);

  let targetY = 0;
  do {
    if (target == scrollContainer) break;
    targetY += target.offsetTop;
  } while (target = target.offsetParent);

  const scroll =  (container, top, element, i) => {
    i++;
    if (i > 30) return;
    container.scrollTop = top + (element - top) / 30 * i;
    setTimeout(() => { scroll(container, top, element, i); }, 20);
  };
  scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
};

export default smoothScroll;
