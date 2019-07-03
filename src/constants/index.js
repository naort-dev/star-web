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
  { linkName: 'My videos', selectedName: 'myVideos', url: '/manage/my-videos' },
  {
    linkName: 'Favorite stars',
    selectedName: 'favorites',
    tooltip:
      'Save your favorites and make it easy when booking a personalized shout-out.',
    url: '/manage/favorites',
  },
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

