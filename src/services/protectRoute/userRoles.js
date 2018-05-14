export const USER = 'USER';
export const BOT = 'BOT';
export const KYC = 'KYC';
export const FINANCE = 'FINANCE';
export const SUPPORT = 'SUPPORT';
export const ADMIN = 'ADMIN';
export const SUPER_ADMIN = 'SUPER_ADMIN';

export const userRoles = {
  USER,
  BOT,
  KYC,
  FINANCE,
  SUPPORT,
  ADMIN,
  SUPER_ADMIN,
};
export const allUserRoles = [
  USER,
  BOT,
  KYC,
  FINANCE,
  SUPPORT,
  ADMIN,
  SUPER_ADMIN,
];
export const allUserRolesExcept = (filterOut = []) => (
  allUserRoles.filter(role => !filterOut.includes(role))
);
