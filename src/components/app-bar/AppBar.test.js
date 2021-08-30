import { ThemeProvider } from 'styled-components';
import { act, render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import AppContext from '../../context/app-context';
import AuthContext from '../../context/auth-context';
import AppBar from './AppBar';
import { darkTheme } from '../../styles/themes';
import userEvent from '@testing-library/user-event';
import matchMediaPolyfill from 'mq-polyfill';

describe('<AppBar />', () => {
  const loadingPortal = document.createElement('div');
  loadingPortal.setAttribute('id', 'spinner-root');
  const authPortal = document.createElement('div');
  authPortal.setAttribute('id', 'modal-root');

  const history = createMemoryHistory();

  const authContextValue = {
    user: null,
    login: jest.fn(),
    logout: jest.fn(),
    favorites: [],
    addToFavorites: jest.fn(),
    removeFromFavorites: jest.fn(),
  };

  const appContextValue = {
    searchValue: '',
    searchFor: jest.fn(),
    appTheme: 'DARK',
    changeAppTheme: jest.fn(),
  };

  describe('Normal screen size', () => {
    beforeEach(() => {
      history.push('/videos/lWQ69WX7-hA');
      render(
        <AuthContext.Provider value={authContextValue}>
          <AppContext.Provider value={appContextValue}>
            <ThemeProvider theme={darkTheme}>
              <Router history={history}>
                <AppBar />
              </Router>
            </ThemeProvider>
          </AppContext.Provider>
        </AuthContext.Provider>,
        { container: document.body.appendChild(authPortal) }
      );
    });

    test('should call searchFor function when a search is carried out', () => {
      const searchInput = screen.getByPlaceholderText(/search../i);
      userEvent.type(searchInput, 'react{enter}');
      expect(appContextValue.searchFor).toHaveBeenCalledTimes(1);
      expect(appContextValue.searchFor).toHaveBeenCalledWith('react');
    });

    test('should change the theme color when clicking on the theme switch', async () => {
      const switchTheme = document.getElementById('switch-theme');
      expect(screen.getByText(/light/i)).toBeInTheDocument();

      userEvent.click(switchTheme);
      await waitFor(() => {
        expect(screen.getByText(/dark/i)).toBeInTheDocument();
      });

      userEvent.click(switchTheme);
      await waitFor(() => {
        expect(screen.getByText(/light/i)).toBeInTheDocument();
      });
    });

    test('should change the url when clicking on the youtube logo button', async () => {
      const homeButton = screen.getByTestId('brand-btn');
      userEvent.click(homeButton);
      expect(history.location.pathname).toBe('/videos');
    });

    test('should open the login modal when login button is clicked', async () => {
      const loginBtn = screen.getByTestId('login-btn');
      userEvent.click(loginBtn);
      await waitFor(() => {
        expect(screen.getByTestId('signin-btn')).toBeInTheDocument();
      });
      expect(screen.getByPlaceholderText(/enter your password../i)).toBeInTheDocument();
    });
  });

  describe('Reduced screen size', () => {
    const authPortal = document.createElement('div');
    authPortal.setAttribute('id', 'modal-root');

    matchMediaPolyfill(window);
    window.resizeTo = function resizeTo(width, height) {
      Object.assign(this, {
        innerWidth: width,
        innerHeight: height,
        outerWidth: width,
        outerHeight: height,
      }).dispatchEvent(new this.Event('resize'));
    };

    beforeEach(() => {
      history.push('/videos/lWQ69WX7-hA');
      render(
        <AuthContext.Provider value={authContextValue}>
          <AppContext.Provider value={appContextValue}>
            <ThemeProvider theme={darkTheme}>
              <Router history={history}>
                <AppBar />
              </Router>
            </ThemeProvider>
          </AppContext.Provider>
        </AuthContext.Provider>,
        { container: document.body.appendChild(authPortal) }
      );
    });

    test('should not renders the theme label when screen width is less than 600px', () => {
      expect(screen.getByTestId('brand-btn')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('search..')).toBeInTheDocument();
      expect(screen.getByText('Dark mode')).toBeInTheDocument();
      act(() => {
        window.resizeTo(600, 300);
      });
      expect(screen.queryByText('Dark mode')).not.toBeInTheDocument();
    });

    test('should call changeAppTheme when change to light mode is clicked after open the side menu options', async () => {
      act(() => {
        window.resizeTo(600, 300);
      });
      const youtubeLogoBtn = screen.getByTestId('brand-btn');
      userEvent.click(youtubeLogoBtn);
      const themeBtn = screen.getByText('Change to light mode');
      expect(themeBtn).toBeInTheDocument();
      userEvent.click(themeBtn);
      expect(appContextValue.changeAppTheme).toHaveBeenCalledTimes(1);
    });
  });
});
