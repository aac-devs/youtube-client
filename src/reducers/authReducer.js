import { types } from '../types/types';

const authReducer = (state, action) => {
  switch (action.type) {
    case types.authContext.login:
      return {
        user: action.payload,
      };
    case types.authContext.logout:
      return {
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
