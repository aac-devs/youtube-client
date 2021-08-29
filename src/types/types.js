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
  },
  authContext: {
    login: '[AUTH-CONTEXT] login',
    logout: '[AUTH-CONTEXT] logout',
    loadFavorites: '[AUTH-CONTEXT] load favorites',
  },
};
