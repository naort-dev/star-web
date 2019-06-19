export const commonAuthRoutes = ['/manage', '/manage/profile'];

export const fanRoutes = [
  '/manage/refer-star',
  '/manage/favorites',
  '/manage/my-videos',
];
export const starRoutes = [
  '/manage/dashboard',
  '/manage/promotional-tools',
  '/manage/referral',
  '/manage/bookings',
  '/manage/earnings',
  '/manage/settings',
  '/manage/settings/account-info',
  '/manage/settings/password',
  '/manage/settings/payment',
  '/manage/settings/notification',
];
export const groupRoutes = [...fanRoutes, '/user/star-supporters'];
export const protectedRoutes = [
  ...commonAuthRoutes,
  ...fanRoutes,
  ...starRoutes,
  // ...groupRoutes,
];
