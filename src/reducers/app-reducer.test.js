import { types } from '../types/types';
import appReducer from './app-reducer';

describe('appReducer', () => {
  const initialState = {
    searchValue: 'react',
    appTheme: null,
  };

  test('should return the initial state', () => {
    const state = appReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test('should change the search value', () => {
    const state = appReducer(initialState, {
      type: types.appContext.setSearchValue,
      payload: 'javascript',
    });
    expect(state).toEqual({
      ...initialState,
      searchValue: 'javascript',
    });
  });

  test('should change the current them', () => {
    const state = appReducer(initialState, {
      type: types.appContext.setAppTheme,
      payload: types.theme.dark,
    });
    expect(state).toEqual({
      ...initialState,
      appTheme: types.theme.dark,
    });
  });
});
