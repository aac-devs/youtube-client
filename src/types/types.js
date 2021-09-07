export const types = {
  http: {
    send: 'SEND',
    success: 'SUCCESS',
    setError: 'SET ERROR',
    resetError: 'RESET ERROR',
    clearList: 'CLEAR LIST',
  },
  theme: {
    light: 'LIGHT',
    dark: 'DARK',
  },
  appContext: {
    setSearchValue: '[APP-CONTEXT] set search value',
    setAppTheme: '[APP-CONTEXT] set app theme',
  },
  authContext: {
    login: '[AUTH-CONTEXT] login',
    logout: '[AUTH-CONTEXT] logout',
    loadFavorites: '[AUTH-CONTEXT] load favorites',
    addToFavorites: '[AUTH-CONTEXT] add to favorites',
    removeFromFavorites: '[AUTH-CONTEXT] remove from favorites',
    setError: '[AUTH-CONTEXT] set error',
    resetError: '[AUTH-CONTEXT] reset error',
  },
};
