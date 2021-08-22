import { useReducer, useCallback } from 'react';
import httpReducer from '../reducers/httpReducer';
import { types } from '../types/types';

// import mockRelated from '../helper/mock/relatedToId/result.json';
// import mockList from '../helper/mock/list/result.json';
// import mockSingle from '../helper/mock/single/result.json';

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
        //   dispatch({ type: types.http.success, responseData: mockRelated.data });
        // } else if (requestData.q) {
        //   dispatch({ type: types.http.success, responseData: mockList.data });
        // } else {
        //   dispatch({ type: types.http.success, responseData: mockSingle });
        // }

        // Código real: las pruebas fallan debido al MSW
        const responseData = await requestFunction(requestData);
        if (!responseData.ok) {
          throw new Error(responseData.error);
        }
        dispatch({ type: types.http.success, responseData: responseData.data });
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
