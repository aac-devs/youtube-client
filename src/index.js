import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { AppContextProvider } from './context/app-context';
import { AuthContextProvider } from './context/auth-context';

ReactDOM.render(
  <AuthContextProvider>
    <AppContextProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </AppContextProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);
