export function numberToDollarFormatter(input) {
  let prefix = '$';
  if (input < 0) {
    prefix = '-$';
  }
  const newInput = Math.abs(parseInt(input, 10));
  return (prefix + newInput.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
}

export function numberToCommaFormatter(input) {
  return (parseInt(input, 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
}

export function commaToNumberFormatter(input) {
  return (parseInt(input.replace(/,/g, ''), 10));
}
