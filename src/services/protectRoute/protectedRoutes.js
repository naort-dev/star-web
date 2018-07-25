export const fanRoutes = [
  '/user/favorites',
  '/user/myVideos',
];
export const starRoutes = [
  ...fanRoutes,
  '/user/bookings',
];
export const protectedRoutes = [
  ...fanRoutes,
  ...starRoutes,
];
