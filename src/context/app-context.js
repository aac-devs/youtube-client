import React, { useEffect, useReducer } from 'react';
import appReducer from '../reducers/app-reducer';
import { types } from '../types/types';

const AppContext = React.createContext({
  searchValue: '',
  searchFor: () => {},
  appTheme: '',
  changeAppTheme: () => {},
});

const initialState = {
  searchValue: 'Control Automático Autoclave',
  appTheme: null,
};

export const AppContextProvider = (props) => {
  const [appState, dispatch] = useReducer(appReducer, initialState);
  const { searchValue, appTheme } = appState;

  useEffect(() => {
    const stored = localStorage.getItem('storedTheme');
    if (!stored) {
      localStorage.setItem('storedTheme', types.theme.light);
      dispatch({ type: types.appContext.setAppTheme, payload: types.theme.light });
    } else if (stored && appTheme) {
      localStorage.setItem('storedTheme', appTheme);
    } else {
      dispatch({ type: types.appContext.setAppTheme, payload: stored });
    }
  }, [appTheme]);

  const searchValueHandler = (value) => {
    dispatch({ type: types.appContext.setSearchValue, payload: value });
  };

  const changeThemeHandler = (value) => {
    const theme = value ? types.theme.light : types.theme.dark;
    dispatch({ type: types.appContext.setAppTheme, payload: theme });
  };

  const value = {
    searchValue,
    searchFor: searchValueHandler,
    appTheme,
    changeAppTheme: changeThemeHandler,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContext;
