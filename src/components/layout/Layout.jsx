import { useContext } from 'react';
import { ThemeProvider } from 'styled-components';

import AppContext from '../../context/app-context';

import GlobalStyles from '../../global-styles';
import { darkTheme, lightTheme } from '../../styles/themes';
import AppBar from '../app-bar/AppBar';
import { types } from '../../types/types';

const Layout = ({ children }) => {
  const { appTheme } = useContext(AppContext);
  return (
    <ThemeProvider theme={appTheme === types.theme.light ? lightTheme : darkTheme}>
      <GlobalStyles />
      <AppBar />
      {children}
    </ThemeProvider>
  );
};

export default Layout;
