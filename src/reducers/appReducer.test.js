import { types } from '../types/types';
import appReducer from './appReducer';

describe('appReducer', () => {
  const initialState = {
    searchValue: 'react',
    appTheme: null,
    page: types.page.home,
  };

  test('should return the initial state', () => {
    const state = appReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test('should change the search value', () => {
    const state = appReducer(initialState, {
      type: types.appContex.setSearchValue,
      payload: 'javascript',
    });
    expect(state).toEqual({
      ...initialState,
      searchValue: 'javascript',
    });
  });

  test('should change the current page', () => {
    const state = appReducer(initialState, {
      type: types.appContex.setCurrentPage,
      payload: types.page.details,
    });
    expect(state).toEqual({
      ...initialState,
      page: types.page.details,
    });
  });

  test('should change the current them', () => {
    const state = appReducer(initialState, {
      type: types.appContex.setAppTheme,
      payload: types.theme.dark,
    });
    expect(state).toEqual({
      ...initialState,
      appTheme: types.theme.dark,
    });
  });
});
