import { dashboardActions } from '../actions';

const initalState = {
  data: {},
};

const dashBoard = (state = { ...initalState }, action) => {
  switch (action.type) {
    case dashboardActions.DASHBOARD_SUCCESS:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};
export default dashBoard;
