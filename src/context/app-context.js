import React, { useState, useEffect } from 'react';
import { types } from '../types/types';

const AppContext = React.createContext({
  searchValue: '',
  searchFor: () => {},
  appTheme: '',
  changeAppTheme: () => {},
  page: '', // provisional until react-router
  changePage: () => {}, // provisional until react-router
});

export const AppContextProvider = (props) => {
  const [searchValue, setSearchValue] = useState('Control Automático Autoclave');
  const [page, setPage] = useState('home');
  const [appTheme, setAppTheme] = useState(types.theme.light);

  useEffect(() => {
    const storedTheme = localStorage.getItem('storedTheme');
    if (storedTheme) {
      setAppTheme(storedTheme);
    } else {
      localStorage.setItem('storedTheme', types.theme.light);
    }
  }, []);

  const searchValueHandler = (value) => {
    setSearchValue(value);
    setPage('home');
  };
  const changePageHandler = (value) => {
    setPage(value);
  };

  const changeThemeHandler = (value) => {
    let theme;
    if (value) {
      theme = types.theme.light;
    } else {
      theme = types.theme.dark;
    }
    setAppTheme(theme);
    localStorage.setItem('storedTheme', theme);
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
