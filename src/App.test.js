import { render, screen } from '@testing-library/react';
import matchMediaPolyfill from 'mq-polyfill';
import App from './App';

describe('App Component', () => {
  test('should render a header section', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  test('header section should render two buttons, one input & one label', () => {
    render(<App />);
    expect(screen.getByTestId('menu-btn')).toBeTruthy();
    expect(screen.getByTestId('login-btn')).toBeTruthy();
    expect(screen.getByPlaceholderText('search')).toBeTruthy();
    expect(screen.getByText('mode', { exact: false })).toBeTruthy();
  });

  test('header section should not renders the login button & the label when screen width is less than 960px', () => {
    matchMediaPolyfill(window);
    window.resizeTo = function resizeTo(width, height) {
      Object.assign(this, {
        innerWidth: width,
        innerHeight: height,
        outerWidth: width,
        outerHeight: height,
      }).dispatchEvent(new this.Event('resize'));
    };
    window.resizeTo(800, 300);
    render(<App />);
    expect(screen.getByTestId('menu-btn')).toBeTruthy();
    expect(screen.queryByTestId('login-btn')).toBeFalsy();
    expect(screen.getByPlaceholderText('search')).toBeTruthy();
    expect(screen.queryByText('mode', { exact: false })).toBeFalsy();
  });

  test('renders main section', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeTruthy();
  });

  test('main section should render a list of elements', () => {
    render(<App />);
    expect(screen.getByRole('list')).toBeTruthy();
  });
});
