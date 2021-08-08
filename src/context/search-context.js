import React, { useState } from 'react';

const SearchContext = React.createContext({
  searchValue: '',
  page: '',
  searchFor: () => {},
  changePage: () => {},
});

export const SearchContextProvider = (props) => {
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

  return <SearchContext.Provider value={value}>{props.children}</SearchContext.Provider>;
};

export default SearchContext;
