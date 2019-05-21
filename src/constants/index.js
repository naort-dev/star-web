export const requestExpiryDays = 7;

export const fanInnerLinks = [
  { linkName: 'My videos', selectedName: 'myVideos', url: '/manage/my-videos' },
  { linkName: 'Favorite stars', selectedName: 'favorites', url: '/manage/favorites' },
  { linkName: 'Profile', selectedName: 'profile', url: '/manage/profile' },
  { linkName: 'Refer A Star', selectedName: 'referStar', url: '/manage/refer-star' },
];

export const starInnerLinks = [
  { linkName: 'Dashboard', selectedName: 'dashboard', url: '/manage/dashboard' },
  { linkName: 'Bookings', selectedName: 'requests', url: '/manage/bookings' },
  { linkName: 'Promotional Tools', selectedName: 'promotional', url: '/manage/promotional-tools' },
  { linkName: 'Profile', selectedName: 'profile', url: '/manage/profile' },
  { linkName: 'Earnings', selectedName: 'earnings', url: '/manage/earnings' },
  { linkName: 'Account Settings', selectedName: 'settings', url: '/manage/settings' },
  { linkName: 'Referral Program', selectedName: 'referral', url: '/manage/referral' },
];

export const groupInnerLinks = [
  ...fanInnerLinks,
  { linkName: 'Star supporters', selectedName: 'supporters', url: '/user/star-supporters' },
];

export const awsKeys = {
  reactions: 'reactions',
  accountImage: 'profile_images',
  accountVideo: 'authentication_videos',
  starsonaVIdeo: 'stargram_videos',
};
