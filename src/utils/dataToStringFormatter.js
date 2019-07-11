/* eslint-disable camelcase */
import moment from 'moment';
import { isEmpty, isPlainObject } from 'lodash';
import { ScriptGenerator } from '../components/ScriptGenerator';
import { requestTypes, requestTypeTitle } from '../constants/requestTypes';

export const starProfessionsFormater = (list, type) => {
  let string = '';
  if (list) {
    list.forEach((profession, index) => {
      if (index === list.length - 1) {
        string += `${type === 'search' ? profession : profession.title}`;
      } else {
        string += `${
          type === 'search' ? profession : profession.title
        }\xa0|\xa0`;
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
        string += `${listItem[key]} | `;
      }
    });
    return string;
  }
};

export const starProfessionsDotFormater = list => {
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
  if (requestType === 3) {
    // Q&A video
    return `Q&A ${requestTypeTitle[requestType]}`;
  }
  return `${occasion} ${requestTypeTitle[requestType]}`;
};

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
};

export const getTime = time => {
  moment.relativeTimeThreshold('s', 0);
  moment.relativeTimeThreshold('m', 60);
  moment.relativeTimeThreshold('h', 24);
  moment.relativeTimeThreshold('d', 25);
  const timeObject = moment(time);
  return timeObject.fromNow();
};

export const generateScriptFromData = data => {
  const {
    date,
    event_guest_honor,
    event_title,
    from_where,
    is_myself,
    relationship,
    stargramfrom,
  } = data.request_details;
  const specification = [event_guest_honor, event_title, from_where].find(
    field => !isEmpty(field),
  );
  let { stargramto } = data.request_details;
  if (is_myself) {
    stargramto = data.fan_first_name;
  }
  const relationshipTitle = isPlainObject(relationship)
    ? relationship.title
    : relationship;
  const script = ScriptGenerator({
    templateType: data.request_details.templateType,
    forName:
      !isEmpty(stargramto) &&
      stargramto.charAt(0).toUpperCase() + stargramto.slice(1),
    fromName:
      !isEmpty(stargramfrom) &&
      !is_myself &&
      stargramfrom.charAt(0).toUpperCase() + stargramfrom.slice(1),
    relationship:
      !isEmpty(relationshipTitle) && relationshipTitle.toLowerCase(),
    date,
    occasion: !isEmpty(data.occasion) ? data.occasion.toLowerCase() : '',
    someOneElse: !is_myself,
    specification: !isEmpty(specification) ? specification.toLowerCase() : '',
    occasionKey: data.occasion_id,
    responseTime: data.celebrity_average_response_time,
  });
  return script;
};
