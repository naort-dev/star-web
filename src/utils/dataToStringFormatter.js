import { requestTypes, requestTypeTitle } from '../constants/requestTypes';
export const starProfessionsFormater = (list) => {
  let string = '';
  if (list) {
    list.forEach((professions, index) => {
      if (index === list.length - 1) {
        string += `${professions.title}`;
      } else {
        string += `${professions.title}\xa0|\xa0`;
      }
    });
    return string;
  }
};

export const starProfessionsDotFormater = (list) => {
  let string = '';
  if (list) {
    list.forEach((professions, index) => {
      if (index === list.length - 1) {
        string += `${professions.title}`;
      } else {
        string += `${professions.title}\xa0●\xa0`;
      }
    });
    return string;
  }
};

export const videoTitleGenerator = (requestType, occasion) => {
  if (requestType === 3) { // Q&A video
    return `Q&A ${requestTypeTitle[requestType]}`;
  }
  return `${occasion} ${requestTypeTitle[requestType]}`;
}

export const shareTitleGenerator = (bookingType, fullName) => {
  let title = '';
  if (requestTypes[bookingType] === 'Shout-out') {
    title = `Watch this video shout-out from ${fullName}`;
  } else if (requestTypes[bookingType] === 'Event') {
    title = `Check out my video announcement courtesy of ${fullName}`;
  } else if (requestTypes[bookingType] === 'Q&A') {
    title = `${fullName} answers my fan question!`;
  }
  return title;
}
