import { types } from '../types/types';

const appReducer = (state, action) => {
  switch (action.type) {
    case types.appContext.setSearchValue:
      return {
        ...state,
        searchValue: action.payload,
      };
    case types.appContext.setAppTheme:
      return {
        ...state,
        appTheme: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
