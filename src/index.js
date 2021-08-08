import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { SearchContextProvider } from './context/search-context';
import GlobalStyles from './global-styles';

ReactDOM.render(
  <>
    <GlobalStyles />
    <SearchContextProvider>
      <App />
    </SearchContextProvider>
  </>,
  document.getElementById('root')
);
