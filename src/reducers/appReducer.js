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
    case types.appContext.addToFavorites:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case types.appContext.removeFromFavorites:
      return {
        ...state,
        favorites: state.favorites.filter((item) => item.videoId !== action.payload),
      };
    default:
      return state;
  }
};

export default appReducer;
