export const fanRoutes = [
  '/user/favorites',
  '/user/myVideos',
  '/settings',
];
export const starRoutes = [
  ...fanRoutes,
  '/user/bookings',
  '/user/earnings',
];
export const protectedRoutes = [
  ...fanRoutes,
  ...starRoutes,
];
