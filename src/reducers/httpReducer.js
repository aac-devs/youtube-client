import { types } from '../types/types';

const httpReducer = (state, action) => {
  switch (action.type) {
    case types.http.send:
      return {
        data: null,
        error: null,
        loading: true,
      };
    case types.http.success:
      return {
        data: action.responseData,
        error: null,
        loading: false,
      };
    case types.http.error:
      return {
        data: null,
        error: action.errorMessage,
        loading: false,
      };

    default:
      return state;
  }
};

export default httpReducer;
