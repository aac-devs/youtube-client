import { render, screen } from '@testing-library/react';
import matchMediaPolyfill from 'mq-polyfill';
import Header from './Header';

describe('Header Component', () => {
  test('should not renders the login button & the label when screen width is less than 960px', () => {
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
    render(<Header />);
    expect(screen.getByTestId('menu-btn')).toBeTruthy();
    expect(screen.getByPlaceholderText('search')).toBeTruthy();
    expect(screen.queryByText('mode', { exact: false })).toBeFalsy();
    expect(screen.queryByTestId('login-btn')).toBeFalsy();
  });
});
