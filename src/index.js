import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AppContextProvider } from './context/app-context';
import GlobalStyles from './global-styles';

ReactDOM.render(
  <>
    <GlobalStyles />
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </>,
  document.getElementById('root')
);
