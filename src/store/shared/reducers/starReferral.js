import { STAR_REFERRAL } from '../actions/referStar';

const initialState = {
  referralList: [],
  loading: false,
  count: 0,
  offset: -1,
  limit: 15,
  error: {
    has: false,
    message: '',
  },
};

export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case STAR_REFERRAL.start:
      return {
        ...state,
        loading: true,
      };

    case STAR_REFERRAL.success:
      return {
        ...state,
        referralList: action.data.referral_list,
        count: action.data.count,
        offset: action.offset,
      };

    case STAR_REFERRAL.failed:
      return {
        ...state,
        loading: false,
        error: {
          has: true,
          message: action.error,
        },
      };
    case STAR_REFERRAL.end:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
