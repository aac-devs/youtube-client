import { types } from '../types/types';

const authReducer = (state, action) => {
  switch (action.type) {
    case types.authContext.login:
      return {
        user: action.payload,
        favorites: [],
      };
    case types.authContext.logout:
      return {
        user: null,
        favorites: [],
      };
    case types.authContext.loadFavorites:
      return {
        ...state,
        favorites: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
