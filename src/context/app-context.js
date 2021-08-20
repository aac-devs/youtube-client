import React, { useEffect, useReducer } from 'react';
import appReducer from '../reducers/appReducer';
import { types } from '../types/types';

const AppContext = React.createContext({
  searchValue: '',
  searchFor: () => {},
  appTheme: '',
  changeAppTheme: () => {},
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
});

const initialState = {
  searchValue: 'Control Automático Autoclave',
  appTheme: null,
  favorites: [],
};

export const AppContextProvider = (props) => {
  const [appState, dispatch] = useReducer(appReducer, initialState);
  const { searchValue, appTheme, favorites } = appState;

  useEffect(() => {
    const stored = localStorage.getItem('storedTheme');
    if (!stored) {
      localStorage.setItem('storedTheme', types.theme.light);
      dispatch({ type: types.appContext.setAppTheme, payload: types.theme.light });
    } else if (stored && appTheme) {
      localStorage.setItem('storedTheme', appTheme);
    } else {
      dispatch({ type: types.appContext.setAppTheme, payload: stored });
    }
  }, [appTheme]);

  const searchValueHandler = (value) => {
    dispatch({ type: types.appContext.setSearchValue, payload: value });
  };

  const changeThemeHandler = (value) => {
    const theme = value ? types.theme.light : types.theme.dark;
    dispatch({ type: types.appContext.setAppTheme, payload: theme });
  };

  const addToFavoritesHandler = (video) => {
    const { videoId, videoImage, videoTitle, videoDuration, channelTitle } = video;
    const favVideo = {
      videoId,
      videoImage,
      videoTitle,
      videoDuration,
      channelTitle,
    };
    dispatch({ type: types.appContext.addToFavorites, payload: favVideo });
    // Enviar a Firebase
  };

  const removeFromFavoritesHandler = (videoId) => {
    dispatch({ type: types.appContext.removeFromFavorites, payload: videoId });
    // Enviar a Firebase
  };

  console.log(favorites);

  const value = {
    searchValue,
    searchFor: searchValueHandler,
    appTheme,
    changeAppTheme: changeThemeHandler,
    favorites,
    addToFavorites: addToFavoritesHandler,
    removeFromFavorites: removeFromFavoritesHandler,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContext;
