export const fanRoutes = [
  '/user/favorites',
  '/user/myVideos',
  '/settings',
];
export const starRoutes = [
  ...fanRoutes,
  '/user/bookings',
];
export const protectedRoutes = [
  ...fanRoutes,
  ...starRoutes,
];
