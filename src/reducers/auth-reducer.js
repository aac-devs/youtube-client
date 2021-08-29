import { types } from '../types/types';

const authReducer = (state, action) => {
  switch (action.type) {
    case types.authContext.login:
      return {
        user: action.payload,
        favorites: [],
        error: null,
      };
    case types.authContext.logout:
      return {
        user: null,
        favorites: [],
        error: null,
      };
    case types.authContext.loadFavorites:
      return {
        ...state,
        favorites: action.payload,
      };
    case types.authContext.addToFavorites:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case types.authContext.removeFromFavorites:
      return {
        ...state,
        favorites: state.favorites.filter((fav) => fav.docId !== action.payload),
      };
    case types.authContext.setError:
      console.log('reducer set error');
      return {
        ...state,
        error: action.payload,
      };
    case types.authContext.resetError:
      console.log('reducer reset error');
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
