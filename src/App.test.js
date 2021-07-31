import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('should render a header section', () => {
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  test('header section should render two buttons, one input & one label', () => {
    expect(screen.getByTestId('menu-btn')).toBeTruthy();
    expect(screen.getByTestId('login-btn')).toBeTruthy();
    expect(screen.getByPlaceholderText('search')).toBeTruthy();
    expect(screen.getByText('mode', { exact: false })).toBeTruthy();
  });

  test('renders main section', () => {
    expect(screen.getByRole('main')).toBeTruthy();
  });

  test('main section should render a list of elements', () => {
    expect(screen.getByRole('list')).toBeTruthy();
  });
});
