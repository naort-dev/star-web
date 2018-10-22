export function numberToDollarFormatter(input) {
  let prefix = '$';
  if (input < 0) {
    prefix = '-$';
  }
  const newInput = Math.abs(parseInt(input,10));
  return (prefix + newInput.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
}
