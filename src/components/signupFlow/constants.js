import { faFireAlt } from '@fortawesome/pro-regular-svg-icons';
import { iosPriceFinder } from '../../utils/dataformatter'

export const FAN_REG_SUCCESS = {
  ICON: faFireAlt,
  IMAGE_URL: 'assets/images/art_highfive.svg',
  MESSAGE: 'Welcome to Starsona',
  DESCRIPTION: 'Now you can connect with all your favorite stars and start requesting videos!',
  TITLE: 'High Five!',
  PRIMARY_BUTTON: 'Browse Stars',
  SECONDARY_BUTTON: 'See Who is Trending '
};

export const STAR_REG_SUCCESS = {
  IMAGE_URL: 'assets/images/art_highfive.svg',
  HIGHLIGHT_TEXT: 'This is going to be amazing!',
  MESSAGE: 'Welcome to Starsona',
  DESCRIPTION: "You are all ready to start taking requests through your profile page. And don’t forget to share this with your fans so they know you’re available.",
  TITLE: 'High Five!',
  PRIMARY_BUTTON: 'See Your Profile',
  SECONDARY_BUTTON: 'Go to Your Dashboard',
  NO_DEVICE_DESCRIPTION: 'We are so glad to have you as one of our stars, but come back soon to record your welcome video so you can start to receive bookings.',
  SKIP_VIDEO_DESCRIPTION: 'We are so glad to have you as one of our stars. Remember, your profile won’t be live on Starsona until you complete your welcome video. Come back soon to complete it it, or go back and do it now. You can always re-do it later if you want to make it better.'
};

export const SET_PRICE = {
  CONFIRM_PRIMARY_BUTTON: 'Yes, I’m worth it!',
  CONFIRMATION_TITLE: 'Are you sure?',
  CONFIRMATION_DESCRIPTION: 'Pick a price that is worth it to you, and still within the range of your fans.',
  IMAGE_URL: 'assets/images/art_price.svg',
  DESCRIPTION: "How much would you like to charge for each video?",
  TITLE: 'Set your price',
  LINK: 'Have a referral code?',
  PRIMARY_BUTTON: 'Continue',
  ACTION: 'One Last Thing!'
};


export const convertedApplePrice = (actualPrice, inAppPriceList) => {
  const price = iosPriceFinder(actualPrice, inAppPriceList),
    priceText = `In the iOS app we will convert your price to the nearest supported Apple price (for example, $25 will be $24.99 in the iOS app).`
  return priceText
}

export const MAX_STAR_PRICE = 500;
