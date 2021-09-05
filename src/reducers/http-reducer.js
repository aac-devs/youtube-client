import { types } from '../types/types';

const httpReducer = (state, action) => {
  switch (action.type) {
    case types.http.send:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case types.http.success:
      return {
        data: action.payload,
        error: null,
        loading: false,
      };
    case types.http.setError:
      return {
        data: null,
        error: action.payload,
        loading: false,
      };
    case types.http.resetError:
      return {
        ...state,
        error: null,
        loading: false,
      };

    default:
      return state;
  }
};

export default httpReducer;
