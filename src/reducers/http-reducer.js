import { types } from '../types/types';

const concatItems = (stateArray, payloadArray) => {
  const newPayloadArray = payloadArray.filter((element) => {
    const newElement = stateArray.filter((el) => el.videoId === element.videoId);
    if (newElement.length === 0) {
      return element;
    }
  });
  return [...stateArray, ...newPayloadArray];
};

const addDataToList = (stateData, payloadData) => {
  return {
    nextPage: payloadData.nextPage,
    items: concatItems(stateData.items, payloadData.items),
  };
};

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
        data: !state.data ? action.payload : addDataToList(state.data, action.payload),
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
    case types.http.clearList: {
      return {
        data: null,
        error: null,
        loading: false,
      };
    }

    default:
      return state;
  }
};

export default httpReducer;
