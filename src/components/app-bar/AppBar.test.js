import { ThemeProvider } from 'styled-components';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchMediaPolyfill from 'mq-polyfill';
import AppBar from './AppBar';
import { darkTheme } from '../../styles/themes';
import { AppContextProvider } from '../../context/app-context';
import App from '../../App';

describe('<Header />', () => {
  matchMediaPolyfill(window);
  window.resizeTo = function resizeTo(width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
      outerWidth: width,
      outerHeight: height,
    }).dispatchEvent(new this.Event('resize'));
  };

  test('should not renders the login button & the theme label when screen width is less than 960px', () => {
    window.resizeTo(800, 300);
    render(
      <ThemeProvider theme={darkTheme}>
        <AppBar />
      </ThemeProvider>
    );

    expect(screen.getByTestId('brand-btn')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('search..')).toBeInTheDocument();
    expect(screen.queryByText('mode', { exact: false })).not.toBeInTheDocument();
    expect(screen.queryByTestId('login-btn')).not.toBeInTheDocument();
  });

  test('should change app theme when switch button is clicked', async () => {
    window.resizeTo(1200, 300);
    render(
      <AppContextProvider>
        <App />
      </AppContextProvider>
    );
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
});
