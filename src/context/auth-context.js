import React, { useEffect, useReducer } from 'react';
import authReducer from '../reducers/authReducer';
import { types } from '../types/types';

const AuthContext = React.createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

const initialState = {
  user: null,
};

export const AuthContextProvider = (props) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('storedUser'));
    console.log(storedUser);
    if (storedUser) {
      dispatch({ type: types.authContext.login, payload: storedUser });
    }
  }, []);

  const loginHandler = (user) => {
    const { photoURL } = user;
    let photo = photoURL;
    if (photoURL) {
      [photo] = photoURL.split('=');
    }
    const loggedUser = { ...user, photoURL: photo };
    dispatch({ type: types.authContext.login, payload: loggedUser });
    localStorage.setItem('storedUser', JSON.stringify(loggedUser));
  };

  const logoutHandler = () => {
    console.log('logout handler');
    dispatch({ type: types.authContext.logout });
    localStorage.setItem('storedUser', null);
  };

  const value = {
    user: authState.user,
    login: loginHandler,
    logout: logoutHandler,
  };
  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
