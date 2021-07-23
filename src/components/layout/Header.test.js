import { render, screen } from '@testing-library/react';
import Header from './Header';

beforeEach(() => {
  render(<Header />);
});

describe('Header Component', () => {
  test('renders two buttons', () => {
    const buttonElements = screen.queryAllByRole('button');
    expect(buttonElements.length).toBe(2);
  });
  test('renders a search section', () => {
    const searchSection = screen.queryByRole('search');
    expect(searchSection).toBeInTheDocument();
  });
  test('renders a theme mode section', () => {
    const paragraphElement = screen.queryByText(/mode/i, { exact: false });
    expect(paragraphElement).toBeInTheDocument();
  });
});
