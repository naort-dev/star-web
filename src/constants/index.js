export const requestExpiryDays = 7;

export const fanInnerLinks = [
  { linkName: 'My videos', selectedName: 'myVideos', url: '/manage/my-videos' },
  {
    linkName: 'Favorite stars',
    selectedName: 'favorites',
    tooltip:
      'Save your favorites and make it easy when booking a personalized shout-out.',
    url: '/manage/favorites',
  },
  { linkName: 'Profile', selectedName: 'profile', url: '/manage/profile' },
  {
    linkName: 'Refer A Star',
    selectedName: 'referStar',
    tooltip:
      'Do you know a star that would be great on Starsona?  Get them signed up  using your referral code and earn a 20% commission! Read the terms.',
    url: '/manage/refer-star',
  },
];

export const starInnerLinks = [
  {
    linkName: 'Dashboard',
    selectedName: 'dashboard',
    url: '/manage/dashboard',
  },
  { linkName: 'Bookings', selectedName: 'requests', url: '/manage/bookings' },
  {
    linkName: 'Promotional Tools',
    selectedName: 'promotional',
    url: '/manage/promotional-tools',
  },
  { linkName: 'Profile', selectedName: 'profile', url: '/manage/profile' },
  { linkName: 'Earnings', selectedName: 'earnings', url: '/manage/earnings' },
  {
    linkName: 'Account Settings',
    selectedName: 'settings',
    url: '/manage/settings',
  },
  {
    linkName: 'Referral Program',
    selectedName: 'referral',
    tooltip:
      'Do you have contacts that would enjoy Starsona? Help them sign up using your referral code and earn 20% of our commission!',
    url: '/manage/referral',
  },
];

export const groupInnerLinks = [
  ...fanInnerLinks,
  {
    linkName: 'Star supporters',
    selectedName: 'supporters',
    url: '/user/star-supporters',
  },
];

export const awsKeys = {
  reactions: 'reactions',
  accountImage: 'profile_images',
  accountVideo: 'authentication_videos',
  starsonaVIdeo: 'stargram_videos',
};

export const termsAnnouncement = `I understand and accept that neither Star Name, nor Starsona nor any
of its affiliates or representatives endorses or recommends this event
in any way. Furthermore, I acknowledge and agree that neither Star
Name, nor Starsona nor any of its affiliates controls or guarantees
the relevance or completeness of information produced during this
event, and I agree to hold harmless Star Name, Starsona and its
affiliates and representatives from any liability for any and all
damage caused by or related to the use of the information as published
in this event.`;

export const qAndATerms = `The information provided by the Star via a Starsona video, and any information on the Starsona site/app, is for general informational and entertainment purposes only. All information and entertainment provided by the Star and/or Starsona is provided in good faith, however neither the Star nor Starsona make a representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information provided.
Under no circumstance shall the Star or Starsona have any liability to you for any loss or damage of any kind incurred as a result of the use of Starsona or reliance on any information provided by the Star and/or Starsona. Your use of Starsona and your reliance on any information provided by the Star and/or Starsona is solely at your own risk.
Starsona videos and the site/app cannot and do not contain health, medical, fitness, legal, or any type of professional advice. Any information provided is for general informational and entertainment purposes only, and is not, and should not be treated as, a substitute for professional advice.
Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate, qualified professionals. We do not provide any kind of health, medical, fitness, legal, or any type of professional advice. The use or reliance on any information from a Starsona video or the Starsona site/app is solely at your own risk.
Starsona videos do not create an attorney-client relationship, nor is it a solicitation to offer legal advice. If you ignore this warning and convey confidential information in a request, private message, or comment, there is no duty to keep that information confidential or forego representation adverse to your interests. Seek the advice of a licensed attorney in the appropriate jurisdiction before taking any action that may affect your rights. If you believe you have a claim against someone, consult an attorney immediately, otherwise there is a risk that the time allotted to bring your claim may expire.`;

export const qAndASub = `***If you think you may have a medical emergency, call your doctor or (in the United States) 911 immediately. Always seek the advice of your doctor before starting or changing treatment.***`;
