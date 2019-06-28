export const commonAuthRoutes = [
  '/manage',
  '/manage/profile',
  '/manage/my-videos',
];

export const fanRoutes = [
  '/manage/refer-star',
  '/manage/favorites',
  '/manage/profile/account-info',
  '/manage/profile/password',
  '/manage/profile/payment',
  '/manage/profile/notification',
  '/manage/profile/profile-photo',
];
export const starRoutes = [
  '/manage/dashboard',
  '/manage/promotional-tools',
  '/manage/referral',
  '/manage/bookings',
  '/manage/earnings',
  '/manage/settings',
  '/manage/profile/name-photo',
  '/manage/profile/welcome-video',
  '/manage/profile/bio',
  '/manage/profile/industry',
  '/manage/profile/social-handles',
  '/manage/profile/price-limits',
  '/manage/settings/account-info',
  '/manage/settings/password',
  '/manage/settings/payment',
  '/manage/settings/notification',
  '/manage/earnings',
];
export const groupRoutes = [...fanRoutes, '/user/star-supporters'];
export const protectedRoutes = [
  ...commonAuthRoutes,
  ...fanRoutes,
  ...starRoutes,
];
