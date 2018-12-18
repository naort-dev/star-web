export const fanRoutes = [
  '/user/favorites',
  '/user/myVideos',
  '/settings',
];
export const starRoutes = [
  ...fanRoutes,
  '/user/bookings',
  '/user/earnings',
  '/myStar',
];
export const protectedRoutes = [
  ...fanRoutes,
  ...starRoutes,
];
