import React, { useCallback, useEffect, useReducer } from 'react';
import {
  addFavoriteToFirebase,
  removeFavoriteFromFirebase,
  getDocuments,
} from '../lib/firebase-api';
import { db } from '../firebase/firebase-config';
import authReducer from '../reducers/auth-reducer';
import { types } from '../types/types';

const AuthContext = React.createContext({
  user: null,
  login: () => {},
  logout: () => {},
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
});

const initialState = {
  user: null,
  favorites: [],
};

let globalUser = null;

export const AuthContextProvider = (props) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);
  const { user, favorites } = authState;

  globalUser = user;

  const connectSocketFirebase = useCallback((fireUser) => {
    db.collection('favorites').onSnapshot((snap) => {
      const firebaseData = getDocuments(snap);
      if (firebaseData.length > 0) {
        if (fireUser) {
          if (fireUser.uid === globalUser?.uid) {
            const userData = firebaseData.filter((data) => data.userId === fireUser.uid);
            dispatch({ type: types.authContext.loadFavorites, payload: userData });
          }
        }
      }
    });
  }, []);

  useEffect(() => {
    const fetchLocalStorage = async () => {
      const storedUser = JSON.parse(localStorage.getItem('storedUser'));
      if (storedUser) {
        dispatch({ type: types.authContext.login, payload: storedUser });
      }
    };
    fetchLocalStorage();
  }, []);

  useEffect(() => {
    connectSocketFirebase(user);
  }, [user, connectSocketFirebase]);

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
    // console.log('logout handler');
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
    await addFavoriteToFirebase({ ...favVideo, userId: user.uid });
  };

  const removeFromFavoritesHandler = async (videoId) => {
    const video = favorites.find((item) => item.videoId === videoId);
    await removeFavoriteFromFirebase(video.docId);
  };

  // console.log(favorites);

  const value = {
    user,
    login: loginHandler,
    logout: logoutHandler,
    favorites,
    addToFavorites: addToFavoritesHandler,
    removeFromFavorites: removeFromFavoritesHandler,
  };
  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
