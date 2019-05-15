import { isEmpty } from 'lodash';
import moment from 'moment';
import { get } from 'https';

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

const forSomeone = (
  forName,
  relationship,
  fromName,
  occasion,
  date,
  specification,
) => {
  if (isEmpty(relationship) && isEmpty(fromName) && isEmpty(date)) {
    return `Hey <span class="boldTxt">${forName},</span> I wanted me to wish you an amazing <span class="boldTxt">${occasion}</span>.`;
  } else if (isEmpty(relationship) && isEmpty(fromName)) {
    return `Hey <span class="boldTxt">${forName},</span> I wanted me to wish you an amazing 
    ${dateFormatter(date, occasion)}`;
  } else if (isEmpty(relationship) && isEmpty(date)) {
    return `Hey <span class="boldTxt">${forName}, ${fromName}</span> wanted me to wish you an amazing <span class="boldTxt">${occasion}</span>.`;
  } else if (isEmpty(fromName) && isEmpty(date)) {
    return `Hey <span class="boldTxt">${forName},</span> your <span class="boldTxt">${relationship}</span> wanted me to wish you an amazing <span class="boldTxt">${occasion}</span>.`;
  } else if (isEmpty(fromName)) {
    return `Hey <span class="boldTxt">${forName},</span> your <span class="boldTxt">${relationship}</span></span> wanted me to wish you an amazing ${dateFormatter(
      date,
      occasion,
    )}`;
  } else if (isEmpty(relationship)) {
    return `Hey <span class="boldTxt">${forName}, ${fromName}</span> wanted me to wish you an amazing ${dateFormatter(
      date,
      occasion,
    )}`;
  } else if (isEmpty(date)) {
    return `Hey <span class="boldTxt">${forName},</span> your <span class="boldTxt">${relationship} ${fromName}</span> wanted me to wish you an amazing <span class="boldTxt">${occasion}</span>.`;
  }
  return `Hey <span class="boldTxt">${forName},</span> your <span class="boldTxt">${relationship} ${fromName}</span> wanted me to wish you an amazing ${dateFormatter(
    date,
    occasion,
  )}`;
};

const getMainText=(someOneElse)=>{
  if(someOneElse){
    return "wanted me to wish you an amazing"
  }
} 

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
  if ([1, 2, 3, 4, 5].includes(templateType)) {
    htmlElm += forSomeone(
      forName,
      relationship,
      fromName,
      occasion,
      date,
      specification,
      "Hey"
      getMainText(someOneElse)
    );
  } else if ([6, 7].includes(templateType)) {
    htmlElm = forSomeone(
      forName,
      relationship,
      fromName,
      occasion,
      date,
      specification,
    );
  }
  htmlElm += '</p>';
  return htmlElm;
};
