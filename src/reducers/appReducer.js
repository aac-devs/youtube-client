import { types } from '../types/types';

const appReducer = (state, action) => {
  switch (action.type) {
    case types.appContex.setSearchValue:
      return {
        ...state,
        searchValue: action.payload,
      };
    case types.appContex.setAppTheme:
      return {
        ...state,
        appTheme: action.payload,
      };
    case types.appContex.setCurrentPage:
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
