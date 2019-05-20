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
      return `<span class="boldTxt">${occasion} today</span>`;
    } else if (daysDiff === -1) {
      return `<span class="boldTxt">${occasion} yesterday</span>`;
    } else if (daysDiff === 1) {
      return `<span class="boldTxt">${occasion} tomorrow</span>`;
    } else if (daysDiff === -2) {
      return `<span class="boldTxt">belated ${occasion}</span>`;
    } else if (daysDiff >= 2 && daysDiff <= 6) {
      return `<span class="boldTxt">${occasion}</span> this <span class="boldTxt">
      ${dateChk.format('dddd')}</span>`;
    } else if (daysDiff === 7) {
      return `<span class="boldTxt">${occasion} coming up</span>`;
    } else if (daysDiff > 7 || daysDiff < -2) {
      return `<span class="boldTxt">${occasion} on ${moment(date)
        .format('MMMM Do')
        .toLowerCase()}</span>`;
    }
    return `<span class="boldTxt">${occasion}</span> on <span class="boldTxt">
    ${dateChk.format('MMMM Do')}</span>`;
  }
  return `<span class="boldTxt">${occasion}</span>`;
};

const occasionChange = (templateType, occasion, occasionKey) => {
  if (templateType === 3) {
    if (occasionKey === 7) {
      return 'congratulations';
    } else if (occasionKey === 8) {
      return 'encouragement';
    } else if (occasionKey === 13) {
      return 'a romantic note';
    } else if (occasionKey === 16) {
      return 'a thank you';
    }
  }
  return occasion;
};

const swapContent = (
  specification,
  occasion,
  templateType,
  content,
  occasionKey,
) => {
  if (templateType === 3) {
    return `<span class="boldTxt">${occasionChange(
      templateType,
      occasion,
      occasionKey,
    )} </span> for ${content}<span class="boldTxt">${specification}</span>`;
  }
  return `<span class="boldTxt">${specification}</span>${content}<span class="boldTxt">${occasionChange(
    templateType,
    occasion,
    occasionKey,
  )}</span>`;
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
  templateType,
  occasionKey,
) => {
  if (
    isEmpty(relationship) &&
    isEmpty(fromName) &&
    isEmpty(date) &&
    isEmpty(specification)
  ) {
    return `${content1} <span class="boldTxt">${forName}, </span>${content3}<span class="boldTxt">${occasion}</span>${content5}.`;
  } else if (
    isEmpty(relationship) &&
    isEmpty(fromName) &&
    isEmpty(specification)
  ) {
    return `${content1} <span class="boldTxt">${forName}, </span>${content3} 
    ${dateFormatter(date, occasion)}${content5}.`;
  } else if (isEmpty(fromName) && isEmpty(date) && isEmpty(specification)) {
    return `${content1} <span class="boldTxt">${forName}, </span>${content2} <span class="boldTxt">${relationship}</span>${content3} 
    ${dateFormatter(date, occasion)}${content5}.`;
  } else if (isEmpty(relationship) && isEmpty(date) && isEmpty(specification)) {
    return `${content1} <span class="boldTxt">${forName}, </span><span class="boldTxt">${fromName}</span>${content3} 
    ${dateFormatter(date, occasion)}${content5}.`;
  } else if (isEmpty(relationship) && isEmpty(fromName) && isEmpty(date)) {
    return `${content1} <span class="boldTxt">${forName}, </span>${content3}${swapContent(
      specification,
      occasion,
      templateType,
      content4,
      occasionKey,
    )}${content5}.`;
  } else if (isEmpty(relationship) && isEmpty(fromName)) {
    return `${content1} <span class="boldTxt">${forName},</span>${content3}<span class="boldTxt">${specification}</span>
    ${dateFormatter(date, occasion)}${content5}.`;
  } else if (isEmpty(relationship) && isEmpty(date)) {
    return `${content1} <span class="boldTxt">${forName}, ${fromName}</span>${content3}${swapContent(
      specification,
      occasion,
      templateType,
      content4,
      occasionKey,
    )}${content5}.`;
  } else if (isEmpty(fromName) && isEmpty(date)) {
    return `${content1} <span class="boldTxt">${forName}, </span>${content2} <span class="boldTxt">${relationship}</span>${content3}${swapContent(
      specification,
      occasion,
      templateType,
      content4,
      occasionKey,
    )}${content5}.`;
  } else if (isEmpty(relationship) && isEmpty(specification)) {
    return `${content1} <span class="boldTxt">${forName}, ${fromName}</span>${content3}${swapContent(
      specification,
      occasion,
      templateType,
      content4,
      occasionKey,
    )} ${dateFormatter(date, '')}${content5}.`;
  } else if (isEmpty(fromName) && isEmpty(specification)) {
    return `${content1} <span class="boldTxt">${forName}, </span>${content2} <span class="boldTxt">${relationship}</span>${content3} ${dateFormatter(
      date,
      occasion,
    )}${content5}.`;
  } else if (isEmpty(specification) && isEmpty(date)) {
    return `${content1} <span class="boldTxt">${forName}, </span>${content2} <span class="boldTxt">${relationship} ${fromName}</span>${content3}<span class="boldTxt">${occasion}</span>${content5}.`;
  } else if (isEmpty(fromName)) {
    return `${content1} <span class="boldTxt">${forName}, </span>${content2} <span class="boldTxt">${relationship}</span>${content3}<span class="boldTxt">${specification}</span>
    ${dateFormatter(date, occasion)}${content5}.`;
  } else if (isEmpty(relationship)) {
    return `${content1} <span class="boldTxt">${forName}, ${fromName} </span>${content3}<span class="boldTxt">${specification}</span> 
    ${dateFormatter(date, occasion)}${content5}.`;
  } else if (isEmpty(date)) {
    return `${content1} <span class="boldTxt">${forName}, </span>${content2} <span class="boldTxt">${relationship} ${fromName}</span>${content3}${swapContent(
      specification,
      occasion,
      templateType,
      content4,
      occasionKey,
    )}${content5}.`;
  } else if (isEmpty(specification)) {
    return `${content1} <span class="boldTxt">${forName}, </span>${content2} <span class="boldTxt">${relationship} ${fromName}</span>${content3} 
    ${dateFormatter(date, occasion)}${content5}.`;
  }
  return `${content1} <span class="boldTxt">${forName}, </span>${content2} <span class="boldTxt">${relationship} ${fromName}</span>${content3}<span class="boldTxt">${specification}</span>
  ${dateFormatter(date, occasion)}${content5}.`;
};

const getMainText = (
  someOneElse,
  selfElseText,
  selfText,
  fromName,
  relationship,
) => {
  if (someOneElse && (!isEmpty(fromName) || !isEmpty(relationship))) {
    return selfElseText;
  }
  return selfText;
};

const getAnnouncementScript = (
  forName,
  specification,
  date,
  occasion,
  templateType,
) => {
  if (templateType === 6) {
    return `Just wanted to invite you to  <span class="boldTxt">${forName}’s ${specification} ${occasion}</span>${dateFormatter(
      date,
      '',
    )}.`;
  }
  return `<span class="boldTxt">${specification}’s</span>  having a <span class="boldTxt">${occasion}</span>${dateFormatter(
    date,
    '',
  )}. Hope you can make it!`;
};

const getStep5Script = (
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
  if (isEmpty(fromName) && isEmpty(relationship) && isEmpty(date)) {
    return `${content1} <span class="boldTxt">${forName}, </span>${content3} 
    ${dateFormatter(date, occasion)}. ${content5}`;
  } else if (isEmpty(fromName) && isEmpty(relationship)) {
    return `${content1} <span class="boldTxt">${forName}, </span> ${content3}
    ${dateFormatter(date, occasion)}. ${content5}`;
  } else if (isEmpty(fromName) && isEmpty(date)) {
    return `${content1} <span class="boldTxt">${forName}, </span> ${content3}
    <span class="boldTxt">${occasion}</span>. 
    Your <span class="boldTxt">${relationship}</span> ${content5}`;
  } else if (isEmpty(relationship) && isEmpty(date)) {
    return `${content1} <span class="boldTxt">${forName}, ${fromName}</span> ${content3} 
    ${dateFormatter(date, occasion)}. ${content5}`;
  } else if (isEmpty(fromName)) {
    return `${content1} <span class="boldTxt">${forName}, </span> ${content3} 
    ${dateFormatter(date, occasion)}. 
    Your <span class="boldTxt">${relationship}</span> ${content5}`;
  } else if (isEmpty(relationship)) {
    return `${content1} <span class="boldTxt">${forName}, ${fromName}</span> ${content3} 
    ${dateFormatter(date, occasion)}. ${content5}`;
  } else if (isEmpty(date)) {
    return `${content1} <span class="boldTxt">${forName}, ${fromName}</span> ${content3} 
    <span class="boldTxt">${occasion}</span>. 
    Your <span class="boldTxt">${relationship}</span> ${content5}`;
  }

  return `${content1} <span class="boldTxt">${forName}, ${fromName}</span> ${content3} 
  ${dateFormatter(date, occasion)}. 
  Your <span class="boldTxt">${relationship}</span> ${content5}`;
};

const responseDateCheck = (date, responseTime) => {
  const calcDate = getFormattedDate(moment().format('MM/DD/YYYY')).add(
    responseTime,
    'days',
  );
  return getFormattedDate(date) >= calcDate;
};

const getDateSpecificText = (date, responseTime, fromName, someOneElse) => {
  if (!someOneElse) {
    return ' I want to congratulate you for your ';
  } else if (!isEmpty(fromName)) {
    if (responseDateCheck(date, responseTime)) return ' told me you have a ';
    return ' told me you just had a ';
  }
  return ' I heard you just had a ';
};

const getLastContent = (
  date,
  responseTime,
  fromName,
  relationship,
  someOneElse,
) => {
  if (!someOneElse) return '';
  if (!isEmpty(relationship)) {
    if (responseDateCheck(date, responseTime))
      return 'and I want to congratulate you.';
    return 'and I both wanted to congratulate you.';
  }
  if (responseDateCheck(date, responseTime)) {
    const text = isEmpty(fromName)
      ? ''
      : `<span class="boldTxt">${fromName}</span> and `;
    return `${text}I want to congratulate you.`;
  }
  return `I wanted to congratulate you.`;
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
  occasionKey,
  responseTime,
}) => {
  let htmlElm = '<p class="script">';
  if (templateType === 1) {
    htmlElm += getScript(
      forName,
      relationship,
      fromName,
      occasion,
      date,
      `${specification}`,
      'Hey',
      'your',
      getMainText(
        someOneElse,
        ' wanted me to wish you an amazing ',
        ' I wanted to wish you an amazing ',
        fromName,
        relationship,
      ),
      '',
      '',
      templateType,
      occasionKey,
    );
  } else if (templateType === 2) {
    let spec = specification;
    if (!isEmpty(specification)) {
      spec = `${specification}'s `;
    }
    if (occasionKey === 15) {
      htmlElm += getScript(
        forName,
        relationship,
        fromName,
        '',
        date,
        spec,
        'Hey',
        'your',
        getMainText(
          someOneElse,
          ' wanted me to you send you my sincerest sympathies for ',
          ' I wanted to send you my sincerest sympathies for ',
          fromName,
          relationship,
        ),
        '',
        ' passing',
        templateType,
        occasionKey,
      );
    } else {
      htmlElm += getScript(
        forName,
        relationship,
        fromName,
        occasion,
        date,
        spec,
        'Hey',
        'your',
        getMainText(
          someOneElse,
          ' wanted me to wish you congratulations on ',
          ' I wanted to wish you congratulations on ',
          fromName,
          relationship,
        ),
        '',
        '',
        templateType,
        occasionKey,
      );
    }
  } else if (templateType === 3) {
    let text1 = ' wanted me to send you ';
    let text2 = ' I wanted me to send you ';
    let occasionText = occasion;
    if (occasionKey === 37) {
      text1 = ' wanted me to propose ';
      text2 = ' I wanted me to propose ';
      occasionText = '';
    }
    if (isEmpty(fromName) && !isEmpty(relationship)) {
      text2 = ' wanted me to send you ';
    }
    htmlElm += getScript(
      forName,
      relationship,
      fromName,
      occasionText,
      date,
      `${specification}`,
      'Hey',
      'your',
      getMainText(someOneElse, text1, text2, fromName, relationship),
      '',
      '',
      templateType,
      occasionKey,
    );
  } else if (templateType === 4) {
    htmlElm += getScript(
      forName,
      relationship,
      fromName,
      '',
      date,
      specification,
      'Hey',
      'your',
      getMainText(
        someOneElse,
        ' wanted me to reach out to you because ',
        ' this shout-out is because ',
        fromName,
        relationship,
      ),
      '',
      '',
      templateType,
      occasionKey,
    );
  } else if (templateType === 5) {
    let days = [0];
    if (!isEmpty(responseTime)) {
      days = responseTime.split(' ');
    }
    htmlElm += getStep5Script(
      forName,
      relationship,
      fromName,
      occasion,
      date,
      `${specification}`,
      'Hey',
      'your',
      getDateSpecificText(date, days[0], fromName, someOneElse),
      '',
      getLastContent(date, days[0], fromName, relationship, someOneElse),
    );
  } else if (templateType === 6) {
    htmlElm += getAnnouncementScript(
      forName,
      specification,
      date,
      occasion,
      templateType,
    );
  } else if ([6, 7].includes(templateType)) {
    htmlElm += getAnnouncementScript(
      forName,
      specification,
      date,
      occasion,
      templateType,
    );
  }
  htmlElm += '</p>';
  return htmlElm;
};
