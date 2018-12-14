export const requestExpiryDays = 7;

export const fanInnerLinks = [
  { linkName: 'My videos', selectedName: 'myVideos', url: '/user/myVideos' },
  { linkName: 'Favorited stars', selectedName: 'favorites', url: '/user/favorites' },
  { linkName: 'Settings', selectedName: 'settings', url: '/settings' },
];

export const starInnerLinks = [
  { linkName: 'Requests', selectedName: 'requests', url: '/user/bookings' },
  { linkName: 'Earnings', selectedName: 'earnings', url: '/user/earnings' },
  { linkName: 'Settings', selectedName: 'settings', url: '/settings' },
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
