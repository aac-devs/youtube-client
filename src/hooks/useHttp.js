import { useReducer, useCallback } from 'react';
import httpReducer from '../reducers/httpReducer';
import { types } from '../types/types';

const initialState = {
  data: null,
  error: null,
  loading: false,
};

const useHttp = (requestFunction) => {
  const [httpState, dispatch] = useReducer(httpReducer, initialState);

  const sendRequest = useCallback(
    async (requestData) => {
      dispatch({ type: types.http.send });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: types.http.success, responseData });
      } catch (error) {
        dispatch({
          type: types.http.error,
          errorMessage: error.message,
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
  };
};

export default useHttp;
