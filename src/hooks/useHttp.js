import { useReducer, useCallback } from 'react';
import httpReducer from '../reducers/http-reducer';
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
        if (!responseData.ok) {
          throw new Error(responseData.error);
        }
        dispatch({ type: types.http.success, payload: responseData.data });
      } catch (error) {
        dispatch({
          type: types.http.setError,
          payload: { title: 'Error', message: error.message },
        });
      }
    },
    [requestFunction]
  );

  const resetErrorHandler = () => {
    dispatch({ type: types.http.resetError });
  };

  const clearListHandler = useCallback(() => {
    dispatch({ type: types.http.clearList });
  }, []);

  return {
    sendRequest,
    onResetError: resetErrorHandler,
    onClearList: clearListHandler,
    ...httpState,
  };
};

export default useHttp;
