import { types } from '../types/types';
import httpReducer from './http-reducer';

describe('httpReducer', () => {
  const initialState = {
    data: null,
    error: null,
    loading: false,
  };

  test('should return the initial state', () => {
    const state = httpReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test('should return the start loading state', () => {
    const state = httpReducer(initialState, {
      type: types.http.send,
    });
    expect(state).toEqual({
      data: null,
      error: null,
      loading: true,
    });
  });

  test('should return a data array', () => {
    const state = httpReducer(initialState, {
      type: types.http.success,
      responseData: [1, 2, 3],
    });
    expect(state).toEqual({
      data: [1, 2, 3],
      error: null,
      loading: false,
    });
  });

  test('should return an error message', () => {
    const state = httpReducer(initialState, {
      type: types.http.error,
      errorMessage: 'Something went wrong',
    });
    expect(state).toEqual({
      data: null,
      error: 'Something went wrong',
      loading: false,
    });
  });
});
