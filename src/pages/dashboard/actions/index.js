export const dashboardActions = {
  DASHBOARD_SUCCESS: 'DASHBOARD_SUCCESS',
};

export const dashBoardSuccess = data => ({
  type: dashboardActions.DASHBOARD_SUCCESS,
  data,
});
