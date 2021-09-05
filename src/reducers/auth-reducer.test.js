import { types } from '../types/types';
import authReducer from './auth-reducer';

describe('appReducer', () => {
  const initialState = {
    user: null,
    favorites: [],
    error: null,
  };

  test('should return the initial state', () => {
    const state = authReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test('user should be logged', () => {
    const state = authReducer(initialState, {
      type: types.authContext.login,
      payload: {
        uid: '123456',
        displayName: 'name',
        photoURL: 'http://photo.png',
      },
    });
    expect(state).toEqual({
      favorites: [],
      user: {
        uid: '123456',
        displayName: 'name',
        photoURL: 'http://photo.png',
      },
      error: null,
    });
  });

  test('user should be unlogged', () => {
    const state = authReducer(initialState, {
      type: types.authContext.logout,
    });
    expect(state).toEqual({
      favorites: [],
      user: null,
      error: null,
    });
  });

  test('should load the favorites', () => {
    const state = authReducer(initialState, {
      type: types.authContext.loadFavorites,
      payload: [1, 2, 3],
    });
    expect(state).toEqual({
      ...state,
      favorites: [1, 2, 3],
    });
  });

  test('should set an error', () => {
    const state = authReducer(initialState, {
      type: types.authContext.setError,
      payload: 'This is an error message',
    });
    expect(state).toEqual({
      ...state,
      error: 'This is an error message',
    });
  });

  test('should reset an error', () => {
    const state = authReducer(
      { initialState, error: 'Has an error' },
      {
        type: types.authContext.resetError,
      }
    );
    expect(state).toEqual({
      ...state,
      error: null,
    });
  });
});
