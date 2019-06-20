export const commonAuthRoutes = ['/manage', '/manage/profile', '/manage/my-videos'];

export const fanRoutes = [
  '/manage/refer-star',
  '/manage/favorites',
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
];
export const groupRoutes = [...fanRoutes, '/user/star-supporters'];
export const protectedRoutes = [
  ...commonAuthRoutes,
  ...fanRoutes,
  ...starRoutes,
];
