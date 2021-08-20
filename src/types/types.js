export const types = {
  http: {
    send: 'SEND',
    success: 'SUCCESS',
    error: 'ERROR',
  },
  theme: {
    light: 'LIGHT',
    dark: 'DARK',
  },
  appContext: {
    setSearchValue: '[APP-CONTEXT] set search value',
    setAppTheme: '[APP-CONTEXT] set app theme',
    addToFavorites: '[APP-CONTEXT] add to favorites',
    removeFromFavorites: '[APP-CONTEXT] remove from favorites',
  },
  authContext: {
    login: '[AUTH-CONTEXT] login',
    logout: '[AUTH-CONTEXT] logout',
  },
};
