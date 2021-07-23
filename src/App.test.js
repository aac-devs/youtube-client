import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  render(<App />);
});

describe('App Component', () => {
  test('renders a header tag', () => {
    const headerElement = screen.queryByRole('heading', {
      level: 2,
    });
    expect(headerElement).toBeInTheDocument();
  });
  test('renders a main tag', () => {
    const mainElement = screen.queryByRole('main');
    expect(mainElement).toBeInTheDocument();
  });
});
