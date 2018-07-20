const renderStarProfessions = (list) => {
  let string = '';
  list.forEach((professions, index) => {
    if (index === list.length - 1) {
      string += `${professions.title}`;
    } else {
      string += `${professions.title}\xa0|\xa0`;
    }
  });
  return string;
}

export default renderStarProfessions;
