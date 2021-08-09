import React, { useState } from 'react';

const AppContext = React.createContext({
  searchValue: '',
  page: '',
  searchFor: () => {},
  changePage: () => {},
});

export const AppContextProvider = (props) => {
  const [searchValue, setSearchValue] = useState('Control Automático Autoclave');
  const [page, setPage] = useState('home');

  const searchValueHandler = (value) => {
    setSearchValue(value);
    setPage('home');
  };
  const changePageHandler = (value) => {
    setPage(value);
  };

  const value = {
    searchValue,
    page,
    searchFor: searchValueHandler,
    changePage: changePageHandler,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContext;
