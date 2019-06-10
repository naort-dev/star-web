import moment from 'moment';
import { requestTypes, requestTypeTitle } from '../constants/requestTypes';

export const starProfessionsFormater = (list, type) => {
  let string = '';
  if (list) {
    list.forEach((profession, index) => {
      if (index === list.length - 1) {
        string += `${type === 'search' ? profession : profession.title}`;
      } else {
        string += `${type === 'search' ? profession : profession.title}\xa0|\xa0`;
      }
    });
    return string;
  }
};

export const pipeSeparator = (list, key) => {
  let string = '';
  if (list) {
    list.forEach((listItem, index) => {
      if (index === list.length - 1) {
        string += `${listItem[key]}`;
      } else {
        string += `${listItem[key]}\xa0|\xa0`;
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

export const getStarName = (nickName = '', firstName = '', lastName = '') => {
  return nickName && nickName !== '' ? nickName : `${firstName} ${lastName}`;
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

export const getTime = (time) => {
  moment.relativeTimeThreshold('ss', 3);
  moment.relativeTimeThreshold('s', 60);
  moment.relativeTimeThreshold('m', 60);
  moment.relativeTimeThreshold('h', 24);
  moment.relativeTimeThreshold('d', 25);
  const timeObject = moment.utc(time);
  return timeObject.fromNow();
}
