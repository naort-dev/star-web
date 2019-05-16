import { isEmpty } from 'lodash';
import moment from 'moment';

const getFormattedDate = date => {
  return moment(date)
    .local()
    .minutes(0)
    .seconds(0)
    .milliseconds(0);
};

const dateFormatter = (date, occasion) => {
  if (date) {
    const curDate = getFormattedDate(moment().format('MM/DD/YYYY'));
    const dateChk = getFormattedDate(date);
    const daysDiff = dateChk.diff(curDate, 'days');
    if (daysDiff === 0) {
      return `<span class="boldTxt">${occasion} Today</span>.`;
    } else if (daysDiff === -1) {
      return `<span class="boldTxt">${occasion} Yesterday</span>.`;
    } else if (daysDiff === 1) {
      return `<span class="boldTxt">${occasion} Tomorrow</span>.`;
    } else if (daysDiff === -2) {
      return `<span class="boldTxt">belated ${occasion}</span>.`;
    } else if (daysDiff >= 2 && daysDiff <= 6) {
      return `<span class="boldTxt">${occasion} this ${dateChk.format(
        'dddd',
      )}</span>.`;
    } else if (daysDiff >= 7) {
      return `<span class="boldTxt">${occasion} coming up</span>.`;
    }
    return `<span class="boldTxt">${occasion} on ${dateChk.format(
      'MMMM Do',
    )}</span>.`;
  }
  return '';
};

const getScript = (
  forName,
  relationship,
  fromName,
  occasion,
  date,
  specification,
  content1,
  content2,
  content3,
  content4,
  content5,
) => {
  if (
    isEmpty(relationship) &&
    isEmpty(fromName) &&
    isEmpty(date) &&
    isEmpty(specification)
  ) {
    return `${content1} <span class="boldTxt">${forName},</span> ${content3} <span class="boldTxt">${occasion}</span> ${content5}.`;
  } else if (
    isEmpty(relationship) &&
    isEmpty(fromName) &&
    isEmpty(specification)
  ) {
    //
  }
  if (isEmpty(relationship) && isEmpty(fromName) && isEmpty(date)) {
    return `${content1} <span class="boldTxt">${forName},</span> ${content3} <span class="boldTxt">${occasion}</span> ${content5}.`;
  } else if (isEmpty(relationship) && isEmpty(fromName)) {
    return `${content1} <span class="boldTxt">${forName},</span> ${content3} 
    ${dateFormatter(date, occasion)}`;
  } else if (isEmpty(relationship) && isEmpty(date)) {
    return `${content1} <span class="boldTxt">${forName}, ${fromName}</span> ${content3} <span class="boldTxt">${occasion}</span> ${content5}.`;
  } else if (isEmpty(fromName) && isEmpty(date)) {
    return `${content1} <span class="boldTxt">${forName},</span> ${content2} <span class="boldTxt">${relationship}</span> ${content3} <span class="boldTxt">${occasion}</span> ${content5}.`;
  } else if (isEmpty(fromName)) {
    return `${content1} <span class="boldTxt">${forName},</span> ${content2} <span class="boldTxt">${relationship}</span></span> ${content3} ${dateFormatter(
      date,
      occasion,
    )}`;
  } else if (isEmpty(relationship)) {
    return `${content1} <span class="boldTxt">${forName}, ${fromName}</span> ${content3} ${dateFormatter(
      date,
      occasion,
    )} ${content5}`;
  } else if (isEmpty(date)) {
    return `${content1} <span class="boldTxt">${forName},</span> ${content2} <span class="boldTxt">${relationship} ${fromName}</span> ${content3} <span class="boldTxt">${occasion}</span> ${content5}.`;
  }
  return `${content1} <span class="boldTxt">${forName},</span> ${content2} <span class="boldTxt">${relationship} ${fromName}</span> ${content3} ${dateFormatter(
    date,
    occasion,
  )} ${content5}`;
};

const getMainText = (someOneElse, selfElseText, selfText, fromName) => {
  if (someOneElse && !isEmpty(fromName)) {
    return selfElseText;
  }
  return selfText;
};

export const ScriptGenerator = ({
  templateType,
  forName,
  fromName,
  relationship,
  date,
  occasion,
  someOneElse,
  specification,
}) => {
  let htmlElm = '<p class="script">';
  if (templateType === 1) {
    htmlElm += getScript(
      forName,
      relationship,
      fromName,
      occasion,
      date,
      specification,
      'Hey',
      'your',
      getMainText(
        someOneElse,
        'wanted me to wish you an amazing',
        'I wanted to wish you an amazing',
        fromName,
      ),
      'on',
      '',
    );
  } else if (templateType === 2) {
    htmlElm += getScript(
      forName,
      relationship,
      fromName,
      occasion,
      date,
      specification,
      'Hey',
      'your',
      getMainText(
        someOneElse,
        'wanted me to wish you congratulations on',
        'I wanted to wish you congratulations on',
        fromName,
      ),
      'on',
      '',
    );
  } else if ([6, 7].includes(templateType)) {
    //
  }
  htmlElm += '</p>';
  return htmlElm;
};
