import { useReducer, useCallback } from 'react';
import httpReducer from '../reducers/http-reducer';
import { types } from '../types/types';

// import mockRelated from '../mock/relatedToId/result.json';
// import mockList from '../mock/list/result.json';
// import mockSingle from '../mock/single/result.json';

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
        // Provisional para probar visualmente sin realizar peticiones a la api:
        // if (requestData.relatedToVideoId) {
        //   dispatch({ type: types.http.success, payload: mockRelated.data });
        // } else if (requestData.q) {
        //   dispatch({ type: types.http.success, payload: mockList.data });
        // } else {
        //   dispatch({ type: types.http.success, payload: mockSingle.data });
        // }

        // Código real: las pruebas fallan debido al MSW
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

  return {
    sendRequest,
    onResetError: resetErrorHandler,
    ...httpState,
  };
};

export default useHttp;
