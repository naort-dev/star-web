import { PROFESSION_LIST } from '../actions/getProfessions';

const initalState = {
  professions: [],
  allProfessions: [],
  loading: false,
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case PROFESSION_LIST.start:
      return {
        ...state,
        loading: true,
      };

    case PROFESSION_LIST.end:
      return {
        ...state,
        loading: false,
      };

    case PROFESSION_LIST.success:
      return {
        ...state,
        loading: false,
        professions: action.data['filtered-professions'],
      };

    case PROFESSION_LIST.successAll:
      return {
        ...state,
        loading: false,
        allProfessions: action.data.professions,
      };

    case PROFESSION_LIST.failed:
      return {
        ...initalState,
        loading: false,
      };

    default:
      return state;
  }
};
