export const fanRoutes = [
  '/user/favorites',
  '/user/myVideos',
  '/settings',
];
export const starRoutes = [
  ...fanRoutes,
  '/user/bookings',
  '/user/earnings',
  '/user/my-groups',
];
export const groupRoutes = [
  ...fanRoutes,
  '/user/star-supporters',
];
export const protectedRoutes = [
  ...fanRoutes,
  ...starRoutes,
  ...groupRoutes,
];
