export function numberToDollarFormatter(input) {
  let prefix = '$';
  if (input < 0) {
    prefix = '-$';
  }
  const newInput = Math.abs(parseFloat(input));
  return (prefix + newInput.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
}

export function numberToCommaFormatter(input) {
  if (!input) {
    return 0;
  }
  if (typeof(input) === 'string') {
    return input.replace(/\B(?=(\d{3})+(?!\d))/g, ','); 
  }
  return (parseFloat(input, 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
}

export function commaToNumberFormatter(input) {
  return (parseFloat(input.replace(/,/g, ''), 10));
}

export function iosPriceFinder(actualPrice, priceList) {
  let iosPrice = '';
  for (let i = 0; i < priceList.length; i++) {
    const currentPrice = priceList[i].price;
    if (actualPrice === currentPrice || parseFloat(actualPrice - currentPrice).toFixed(2) === '0.01') {
      iosPrice = currentPrice;
      break;
    } else if (currentPrice > actualPrice) {
      iosPrice = currentPrice;
      break;
    }
  }
  return iosPrice;
}

export function findCompletedVideo(bookingData) {
  if (bookingData && bookingData.request_video) {
    const finalVideo = bookingData.request_video.find(videoItem => videoItem.video_status === 1);
    return finalVideo;
  }
  return {}
}

export function parseQueryString(queryString) {
  const  queryList = {}
  if (queryString) {
    const query = queryString.split('?')[1];
    const queryItem = query.split('&');
    queryItem.forEach((item) => {
      const queryArray = item.split('=')
      queryList[queryArray[0]] = queryArray[1];
    })
  }
  return queryList;
}
