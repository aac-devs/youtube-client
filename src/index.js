import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AppContextProvider } from './context/app-context';
import { AuthContextProvider } from './context/auth-context';

ReactDOM.render(
  <AuthContextProvider>
    <AppContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppContextProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);
