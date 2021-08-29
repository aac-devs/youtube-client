import React, { useEffect, useReducer } from 'react';
import {
  addFavoriteToFirebase,
  getAllFromFavorites,
  removeFavoriteFromFirebase,
} from '../lib/firebase-api';
import authReducer from '../reducers/auth-reducer';
import { types } from '../types/types';

const AuthContext = React.createContext({
  user: null,
  login: () => {},
  logout: () => {},
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  error: null,
  setError: () => {},
  resetError: () => {},
});

const initialState = {
  user: null,
  favorites: [],
  error: null,
};

export const AuthContextProvider = (props) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);
  const { user, favorites, error } = authState;

  useEffect(() => {
    const fetchLocalStorage = async () => {
      const storedUser = JSON.parse(localStorage.getItem('storedUser'));
      if (storedUser) {
        dispatch({ type: types.authContext.resetError });
        dispatch({ type: types.authContext.login, payload: storedUser });
      }
    };
    fetchLocalStorage();
  }, []);

  useEffect(() => {
    const getFavoritesFromFirebase = async () => {
      if (user) {
        dispatch({ type: types.authContext.resetError });
        const resp = await getAllFromFavorites(user.uid);
        if (resp.ok) {
          dispatch({ type: types.authContext.loadFavorites, payload: resp.data });
        }
        // Guardar el error
        dispatch({
          type: types.authContext.setError,
          payload: { title: 'Favorites read', message: resp.error },
        });
      }
    };
    getFavoritesFromFirebase();
  }, [user]);

  const loginHandler = async (signInUser) => {
    const { photoURL } = signInUser;
    let photo = photoURL;
    if (photoURL) {
      [photo] = photoURL.split('=');
    }
    const loggedUser = { ...signInUser, photoURL: photo };
    dispatch({ type: types.authContext.login, payload: loggedUser });
    localStorage.setItem('storedUser', JSON.stringify(loggedUser));
  };

  const logoutHandler = () => {
    dispatch({ type: types.authContext.logout });
    localStorage.setItem('storedUser', null);
  };

  /// FAVORITES:
  const addToFavoritesHandler = async (video) => {
    const { videoId, videoImage, videoTitle, videoDuration, channelTitle } = video;
    const favVideo = {
      videoId,
      videoImage,
      videoTitle,
      videoDuration,
      channelTitle,
    };
    dispatch({ type: types.authContext.resetError });
    const resp = await addFavoriteToFirebase({ ...favVideo, userId: user.uid });
    if (resp.ok) {
      dispatch({
        type: types.authContext.addToFavorites,
        payload: { docId: resp.docId, ...favVideo },
      });
    }
  };

  const removeFromFavoritesHandler = async (videoId) => {
    const video = favorites.find((item) => item.videoId === videoId);
    dispatch({ type: types.authContext.resetError });
    const resp = await removeFavoriteFromFirebase(user.uid, video.docId);
    if (resp.ok) {
      dispatch({
        type: types.authContext.removeFromFavorites,
        payload: video.docId,
      });
    }
  };

  const setErrorHandler = (title, message) => {
    dispatch({ type: types.authContext.setError, payload: { title, message } });
  };

  const resetErrorHandler = () => {
    dispatch({ type: types.authContext.resetError });
  };

  console.log({ user });
  console.log({ favorites });
  console.log({ error });

  const value = {
    user,
    login: loginHandler,
    logout: logoutHandler,
    favorites,
    addToFavorites: addToFavoritesHandler,
    removeFromFavorites: removeFromFavoritesHandler,
    error,
    setError: setErrorHandler,
    resetError: resetErrorHandler,
  };
  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
