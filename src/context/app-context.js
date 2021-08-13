import React, { useEffect, useReducer } from 'react';
import appReducer from '../reducers/appReducer';
import { types } from '../types/types';

const AppContext = React.createContext({
  searchValue: '',
  searchFor: () => {},
  appTheme: '',
  changeAppTheme: () => {},
  page: '',
  changePage: () => {},
});

const initialState = {
  searchValue: 'Control Automático Autoclave',
  appTheme: null,
  page: types.page.home,
};

export const AppContextProvider = (props) => {
  const [appState, dispatch] = useReducer(appReducer, initialState);
  const { searchValue, appTheme, page } = appState;

  useEffect(() => {
    const stored = localStorage.getItem('storedTheme');
    if (!stored) {
      localStorage.setItem('storedTheme', types.theme.light);
      dispatch({ type: types.appContex.setAppTheme, payload: types.theme.light });
    } else if (stored && appTheme) {
      localStorage.setItem('storedTheme', appTheme);
    } else {
      dispatch({ type: types.appContex.setAppTheme, payload: stored });
    }
  }, [appTheme]);

  const searchValueHandler = (value) => {
    dispatch({ type: types.appContex.setSearchValue, payload: value });
    if (page !== types.page.home) {
      dispatch({ type: types.appContex.setCurrentPage, payload: types.page.home });
    }
  };

  const changePageHandler = (value) => {
    dispatch({ type: types.appContex.setCurrentPage, payload: value });
  };

  const changeThemeHandler = (value) => {
    const theme = value ? types.theme.light : types.theme.dark;
    dispatch({ type: types.appContex.setAppTheme, payload: theme });
  };

  const value = {
    searchValue,
    searchFor: searchValueHandler,
    page,
    changePage: changePageHandler,
    appTheme,
    changeAppTheme: changeThemeHandler,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContext;
