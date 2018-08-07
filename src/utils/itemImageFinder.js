export const cardTypeImageFinder = (brand) => {
  const iconsFolder = 'assets/images/card-icons';
  switch (brand) {
    case 'Visa': return `${iconsFolder}/visa.png`;
    case 'MasterCard': return `${iconsFolder}/mastercard.png`;
    case 'American Express': return `${iconsFolder}/amex.png`;
    case 'Discover': return `${iconsFolder}/discover.png`;
    case 'JCB': return `${iconsFolder}/jcb.png`;
    case 'Diners Club': return `${iconsFolder}/diners.png`;
    default: return `${iconsFolder}/default-icon.svg`;
  }
};
